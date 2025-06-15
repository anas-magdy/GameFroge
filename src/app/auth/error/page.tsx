'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link may have expired or has already been used.';
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return 'There was a problem with the authentication process.';
      case 'OAuthAccountNotLinked':
        return 'To confirm your identity, sign in with the same account you used originally.';
      case 'EmailSignin':
        return 'The email could not be sent.';
      case 'CredentialsSignin':
        return 'Sign in failed. Check the details you provided are correct.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'An error occurred during authentication.';
    }
  };

  return (
    <div className="z-10 w-full max-w-md">
      <div className="mb-8 flex flex-col items-center">
        <Link href="/" className="mb-2 flex items-center gap-1 text-2xl font-bold text-primary">
          <Gamepad2 className="h-8 w-8" />
          <span>Game Store</span>
        </Link>
        <h1 className="text-2xl font-bold text-destructive mb-2">Authentication Error</h1>
        <p className="text-center text-muted-foreground">
          {getErrorMessage(error)}
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        <Link 
          href="/auth/login"
          className="w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Back to Login
        </Link>
        <Link 
          href="/"
          className="w-full text-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background/50 backdrop-blur-sm p-4">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
      <Suspense fallback={
        <div className="z-10 w-full max-w-md text-center">
          <div className="mb-8 flex flex-col items-center">
            <Link href="/" className="mb-2 flex items-center gap-1 text-2xl font-bold text-primary">
              <Gamepad2 className="h-8 w-8" />
              <span>Game Store</span>
            </Link>
            <h1 className="text-2xl font-bold text-destructive mb-2">Loading...</h1>
          </div>
        </div>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
} 