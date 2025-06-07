import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/components/ui/use-toast';

export function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      console.log('Received code from Google:', code);
      
      if (!code) {
        console.error('No authorization code received from Google');
        toast({
          title: "Error",
          description: "No authorization code received from Google",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      try {
        const base = import.meta.env.VITE_Base_api || "https://interview-i5c0.onrender.com";
        console.log('Making request to backend:', `${base}/api/auth/google/callback?code=${code}`);
        
        const response = await fetch(`${base}/api/auth/google/callback?code=${code}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        console.log('Backend response status:', response.status);
        const data = await response.json();
        console.log('Backend response data:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to authenticate with Google');
        }

        await login(data.user, data.token);
        toast({
          title: "Success!",
          description: "You have been logged in with Google.",
        });
        navigate('/');
      } catch (error) {
        console.error('Google callback error:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to authenticate with Google",
          variant: "destructive",
        });
        navigate('/login');
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate, login, toast]);

  if (!isProcessing) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing Google Sign In...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
} 