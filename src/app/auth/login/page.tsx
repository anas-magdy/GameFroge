import LoginForm from "@/app/(components)/auth/LoginForm";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background/50 backdrop-blur-sm p-4">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
      
      <div className="z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="mb-2 flex items-center gap-1 text-2xl font-bold text-primary">
            <Gamepad2 className="h-8 w-8" />
            <span>Game Store</span>
          </Link>
          <p className="text-center text-muted-foreground">
            Sign in to your account to continue your gaming journey
          </p>
        </div>
        
        <LoginForm />
        
      </div>
    </div>
  );
}
