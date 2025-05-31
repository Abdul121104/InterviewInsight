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
          description: "No authorization code received",
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
        console.log('Sending code to backend:', code);
        const base = import.meta.env.VITE_Base_api || process.env.Base_api || "http://localhost:4000";
        const response = await fetch(`${base}/api/auth/google/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
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
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
} 