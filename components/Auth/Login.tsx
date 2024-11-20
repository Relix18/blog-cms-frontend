"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // const result = await signUp(formData)
    // if (result.error) {
    //   setError(result.error)
    //   setSuccess(null)
    // } else if (result.success) {
    //   setSuccess(result.success)
    //   setError(null)
    // }
  }

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gradient-to-br from-fuchsia-400 via-fuchsia-600 to-purple-800">
      <Card className="w-full max-w-md backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-fuchsia-600">
            Login to Blog App
          </CardTitle>
          <CardDescription className="text-center">
            Login or sign up with a social provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="focus:border-fuchsia-600 focus:ring-fuchsia-600 "
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              >
                Login
              </Button>
            </div>
          </form>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-4 text-sm text-green-600">{success}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-background px-2 dark:text-gray-300 text-gray-600">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => socialSignIn("github")}
              className="border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50 dark:hover:bg-background dark:hover:text-primary"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => socialSignIn("google")}
              className="border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50 dark:hover:bg-background dark:hover:text-primary"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="text-center text-sm  text-fuchsia-900 dark:text-fuchsia-600">
            Don't have account?{" "}
            <Link
              href="/register"
              className="font-semibold text-fuchsia-600 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
