import { LoginForm } from "@/components/auth/login-form";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold font-headline text-center text-foreground">
            OurInterns
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
