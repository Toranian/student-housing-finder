import Link from "next/link";
import Step from "./Step";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to Our App</h1>
      <div className="mt-8 flex flex-col gap-6">
        <Step title="Sign In">
          <Link
            href="/login"
            className="font-bold hover:underline text-foreground/80"
          >
            Login
          </Link>
        </Step>
        <Step title="Register">
          <Link
            href="/register"
            className="font-bold hover:underline text-foreground/80"
          >
            Register
          </Link>
        </Step>
      </div>
    </div>
  );
}
