import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";

export function GoogleCallback() {
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

      if (!code) {
        toast({
          title: "Error",
          description: "No authorization code received from Google",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

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
        // Clear the URL parameters immediately to prevent reuse
        window.history.replaceState({}, document.title, window.location.pathname);

        console.log('Sending code to backend:', code);
        const base = import.meta.env.VITE_Base_api || process.env.Base_api || "http://localhost:4000";
        const response = await fetch(`${base}/api/auth/google/callback?code=${encodeURIComponent(code)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        });

        const data = await response.json();
        console.log('Backend response:', data);

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
          throw new Error(data.error || data.details || "Failed to authenticate with Google");
        }

        if (data.success && data.user && data.token) {
          await login(data.user, data.token);
          toast({
            title: "Success!",
            description: "You have been logged in with Google.",
          });
          navigate("/");
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (error) {
        console.error('Google callback error:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Something went wrong",
          variant: "destructive",
        });
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, login, toast, isLoading]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing Google Sign In...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
} 