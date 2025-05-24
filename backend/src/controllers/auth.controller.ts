import { Request, Response, NextFunction } from "express";
import Login from "../models/loginId";
import jwt from 'jsonwebtoken';

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
    const emailLower = email.toLowerCase().trim();

    // console.log('Attempting signup with:', { email: emailLower, username, googleId });

    const existingUsers = await Login.find({
      $or: [
        { email: { $regex: new RegExp(`^${emailLower}$`, 'i') } },
        ...(username ? [{ username }] : []),
        ...(googleId ? [{ googleId }] : [])
      ]
    });

    // console.log('All matching users found:', existingUsers);

    if (existingUsers.length > 0) {
      const emailConflict = existingUsers.some(u => u.email.toLowerCase() === emailLower);
      const usernameConflict = username && existingUsers.some(u => u.username === username);
      const googleConflict = googleId && existingUsers.some(u => u.googleId === googleId);

      if (emailConflict) {
        res.status(400).json({ 
          error: "User already exists",
          details: "Email already registered"
        });
      } else if (usernameConflict) {
        res.status(400).json({ 
          error: "User already exists",
          details: "Username already taken"
        });
      } else if (googleConflict) {
        res.status(400).json({ 
          error: "User already exists",
          details: "Google account already registered"
        });
      }
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

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || user.username || user.googleName
      }
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