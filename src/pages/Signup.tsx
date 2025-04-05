
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'operator'>('farmer');

  const { signup, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || 
        (user.role === 'farmer' ? '/farmer' : '/operator');
      navigate(from);
    }
  }, [user, navigate, location]);

  // Added health check to verify server connection
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/health');
        const data = await response.json();
        console.log('Server health check:', data);
      } catch (error) {
        console.error('Server health check failed:', error);
        setError('Unable to connect to the server. Please make sure the server is running.');
        toast({
          title: 'Server connection error',
          description: 'Unable to connect to the server. Please make sure the server is running.',
          variant: 'destructive'
        });
      }
    };
    
    checkServerHealth();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all the required fields.');
      toast({
        title: 'Missing information',
        description: 'Please fill all the required fields.',
        variant: 'destructive'
      });
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive'
      });
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log('Attempting signup with:', { name, email, role: selectedRole });
      await signup(name, email, password, selectedRole);

      toast({
        title: 'Account created!',
        description: 'Your account has been successfully created.'
      });

      // Navigation will be handled by the useEffect
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'There was an error creating your account. Please try again.');
      toast({
        title: 'Registration failed',
        description: error.message || 'There was an error creating your account. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-earth-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="bg-green-500 p-2 rounded-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to create your BioHarvest account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="farmer" className="mb-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="farmer" onClick={() => setSelectedRole('farmer')}>
                Farmer
              </TabsTrigger>
              <TabsTrigger value="operator" onClick={() => setSelectedRole('operator')}>
                Operator
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                  </>
                ) : (
                  `Sign Up as ${selectedRole === 'farmer' ? 'Farmer' : 'Operator'}`
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <div className="text-sm text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
