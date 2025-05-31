import { Request, Response, NextFunction } from "express";
import Login from "../models/loginId";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: "http://localhost:5173/auth/google/callback"
});

// Debug route to check existing users
export const checkUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await Login.find({}, { password: 0 });
    console.log('All users in database:', users);
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error checking users:', error);
    res.status(500).json({ error: "Error checking users" });
  }
};
 
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, username, password, name, googleId, googleName } = req.body;
    console.log('Signup attempt with:', { email, username, name, googleId });

    const emailLower = email.toLowerCase().trim();

    // Check for existing users
    const existingUsers = await Login.find({
      $or: [
        { email: { $regex: new RegExp(`^${emailLower}$`, 'i') } },
        ...(username ? [{ username }] : []),
        ...(googleId ? [{ googleId }] : [])
      ]
    });

    console.log('Existing users found:', existingUsers.length);

    if (existingUsers.length > 0) {
      const emailConflict = existingUsers.some(u => u.email.toLowerCase() === emailLower);
      const usernameConflict = username && existingUsers.some(u => u.username === username);
      const googleConflict = googleId && existingUsers.some(u => u.googleId === googleId);

      if (emailConflict) {
        console.log('Email conflict detected');
        res.status(400).json({ 
          error: "User already exists",
          details: "Email already registered"
        });
      } else if (usernameConflict) {
        console.log('Username conflict detected');
        res.status(400).json({ 
          error: "User already exists",
          details: "Username already taken"
        });
      } else if (googleConflict) {
        console.log('Google account conflict detected');
        res.status(400).json({ 
          error: "User already exists",
          details: "Google account already registered"
        });
      }
      return;
    }

    // Validate required fields
    if (!email || !username || !password) {
      console.log('Missing required fields:', { email: !!email, username: !!username, password: !!password });
      res.status(400).json({ 
        error: "Missing required fields",
        details: "Email, username, and password are required"
      });
      return;
    }

    // Create new user
    const user = new Login({
      email: emailLower,
      username,
      password,
      name,
      googleId,
      googleName
    });

    await user.save();
    console.log('User created successfully:', { id: user._id, email: user.email });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || user.username || user.googleName
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password, googleId } = req.body;
    if (googleId) {
      const user = await Login.findOne({ googleId });
      if (!user) {
        res.status(401).json({ error: "Google account not found" });
        return;
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name || user.googleName
        },
        token
      });
      return;
    }
    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const user = await Login.findOne({ username });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || user.username
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

export const handleGoogleCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { code } = req.body;
    console.log('Received code:', code);
    
    if (!code) {
      console.error('No code provided in request body');
      res.status(400).json({ error: "Authorization code is required" });
      return;
    }

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.error('Missing Google OAuth credentials');
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    try {
      console.log('Exchanging code for token with client ID:', process.env.GOOGLE_CLIENT_ID);
      
      // Create a new client instance for each request
      const oauth2Client = new OAuth2Client({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: "http://localhost:5173/auth/google/callback"
      });

      const { tokens } = await oauth2Client.getToken(code);
      console.log('Received tokens:', tokens);
      
      if (!tokens.id_token) {
        console.error('No ID token in response');
        res.status(400).json({ error: "Invalid token response from Google" });
        return;
      }

      const ticket = await oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const payload = ticket.getPayload();
      if (!payload) {
        console.error('No payload in ticket');
        res.status(400).json({ error: "Invalid Google token" });
        return;
      }

      console.log('Token payload:', payload);
      const { sub: googleId, email, name } = payload;
      
      // Find or create user
      let user = await Login.findOne({ googleId });
      
      if (!user) {
        // Check if user exists with this email
        user = await Login.findOne({ email });
        
        if (user) {
          // Update existing user with Google ID
          user.googleId = googleId;
          user.googleName = name;
          await user.save();
        } else {
          // Create new user
          user = new Login({
            email,
            googleId,
            googleName: name
          });
          await user.save();
        }
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name || user.googleName
        },
        token
      });
    } catch (tokenError) {
      console.error('Error exchanging code for token:', tokenError);
      res.status(400).json({ 
        error: "Failed to exchange code for token",
        details: tokenError instanceof Error ? tokenError.message : "Unknown error"
      });
    }
  } catch (error) {
    console.error('Google callback error:', error);
    next(error);
  }
}; 