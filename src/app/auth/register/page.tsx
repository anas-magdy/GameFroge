import RegisterForm from "@/app/(components)/auth/RegisterForm";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
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
            Create a new account to start your gaming adventure
          </p>
        </div>
        
        <RegisterForm />
        
      </div>
    </div>
    );
  }