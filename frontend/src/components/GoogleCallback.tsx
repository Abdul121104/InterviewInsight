import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";

export function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const data = searchParams.get("data");
      const error = searchParams.get("error");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to authenticate with Google. Please try again.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      if (!data) {
        toast({
          title: "Error",
          description: "No authentication data received",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      try {
        const authData = JSON.parse(decodeURIComponent(data));
        
        if (authData.success && authData.user && authData.token) {
          // Store the auth data
          await login(authData.user, authData.token);
          
          // Show success message
          toast({
            title: "Success!",
            description: "You have been logged in with Google.",
          });

          // Force a small delay to ensure the toast is visible
          setTimeout(() => {
            // Redirect to home page
            window.location.href = '/';
          }, 1000);
        } else {
          throw new Error("Invalid authentication data");
        }
      } catch (error) {
        console.error('Error processing auth data:', error);
        toast({
          title: "Error",
          description: "Failed to process authentication data",
          variant: "destructive",
        });
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, login, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Processing Google Sign In...</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we complete your authentication.</p>
        </div>
      </div>
    );
  }

  return null;
} 