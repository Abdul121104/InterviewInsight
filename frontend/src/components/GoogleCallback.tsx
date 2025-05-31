<<<<<<< HEAD
import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";

export function GoogleCallback() {
<<<<<<< HEAD
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const processedCodeRef = useRef<string | null>(null);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = searchParams.get("code");
      console.log('Received code from URL:', code);
=======
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      if (isProcessing) return;
      setIsProcessing(true);

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8

      if (!code) {
        toast({
          title: "Error",
<<<<<<< HEAD
          description: "No authorization code received",
=======
          description: "No authorization code received from Google",
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

<<<<<<< HEAD
      // Skip if we've already processed this code
      if (processedCodeRef.current === code) {
        return;
      }

      // Skip if we're already loading
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      processedCodeRef.current = code;

      try {
        console.log('Sending code to backend:', code);
        const base = import.meta.env.VITE_Base_api || process.env.Base_api || "http://localhost:4000";
        const response = await fetch(`${base}/api/auth/google/callback`, {
=======
      try {
        // Clear the URL parameters immediately to prevent reuse
        window.history.replaceState({}, document.title, window.location.pathname);

        const response = await fetch("http://localhost:4000/api/auth/google", {
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
<<<<<<< HEAD
          credentials: 'include'
        });

        const data = await response.json();
        console.log('Backend response:', data);

        if (!response.ok) {
          throw new Error(data.error || data.details || "Failed to authenticate with Google");
        }

        await login(data.user, data.token);
        toast({
          title: "Success!",
          description: "You have been logged in with Google.",
        });
        navigate("/");
      } catch (error) {
        console.error('Google callback error:', error);
=======
        });

        const data = await response.json();
        console.log('Google auth response:', data);

        if (!response.ok) {
          if (data.error === 'Failed to exchange code for token' && data.details === 'invalid_grant') {
            // If the code was already used, redirect to login
            toast({
              title: "Session expired",
              description: "Please try signing in again",
              variant: "destructive",
            });
            navigate("/login");
            return;
          }
          throw new Error(data.error || "Google authentication failed");
        }

        if (data.success && data.user && data.token) {
          await login(data.user, data.token);
          toast({
            title: "Success!",
            description: "You have been logged in with Google.",
          });
          // Navigate immediately after successful login
          navigate("/");
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (error) {
        console.error('Google auth error details:', error);
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Something went wrong",
          variant: "destructive",
        });
        navigate("/login");
      } finally {
<<<<<<< HEAD
        setIsLoading(false);
=======
        setIsProcessing(false);
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
      }
    };

    handleGoogleCallback();
<<<<<<< HEAD
  }, [searchParams, navigate, login, toast, isLoading]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
=======
  }, [navigate, login, toast, isProcessing]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing Google Sign In...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we complete your authentication.</p>
      </div>
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
    </div>
  );
} 