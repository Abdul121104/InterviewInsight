import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";

export function GoogleCallback() {
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

      if (!code) {
        toast({
          title: "Error",
          description: "No authorization code received from Google",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      try {
        // Clear the URL parameters immediately to prevent reuse
        window.history.replaceState({}, document.title, window.location.pathname);

        const response = await fetch("http://localhost:4000/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
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
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Something went wrong",
          variant: "destructive",
        });
        navigate("/login");
      } finally {
        setIsProcessing(false);
      }
    };

    handleGoogleCallback();
  }, [navigate, login, toast, isProcessing]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing Google Sign In...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
} 