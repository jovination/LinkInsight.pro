
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password reset functionality
    toast({
      title: "Reset link sent!",
      description: "Check your email for password reset instructions.",
      duration: 5000,
    });
    setSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <CardDescription>
                {!submitted 
                  ? "Enter your email to reset your password" 
                  : "Check your email for reset instructions"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="john@example.com" className="pl-10" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-600">
                    Send Reset Link
                  </Button>
                </form>
              ) : (
                <div className="py-6 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Check your email</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We've sent a password reset link to your email address. 
                    Please check your inbox.
                  </p>
                  <Button 
                    onClick={() => setSubmitted(false)} 
                    variant="outline" 
                    className="mt-6 w-full"
                  >
                    Back to Reset Form
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-center">
              <div className="w-full">
                <Link to="/login" className="inline-flex items-center text-sm text-primary hover:text-primary-600">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
