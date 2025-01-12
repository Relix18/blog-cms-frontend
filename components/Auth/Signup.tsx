"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "../form-error";
import Verificaiton from "./Verification";
import Loader from "../Loader/Loader";
import { useSession, signIn } from "next-auth/react";
import {
  useRegisterMutation,
  useSocialAuthMutation,
} from "@/state/api/auth/authApi";
import { isApiResponse } from "@/types/types";

export default function SignUpPage() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [hidden, setHidden] = useState(true);
  const { data } = useSession();
  const [register, { isSuccess, isLoading, error: err }] =
    useRegisterMutation();
  const [socialAuth, { error: socialErr }] = useSocialAuthMutation();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    if (data) {
      socialAuth({
        name: data.user?.name as string,
        email: data.user?.email as string,
        avatar: data.user?.image as string,
      });
    }

    if (isApiResponse(socialErr)) {
      setError(socialErr?.data.message);
    }
  }, [data, socialAuth, socialErr]);

  useEffect(() => {
    setError("");
    if (isApiResponse(err)) {
      setError(err?.data.message);
    }
  }, [err]);

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    await register(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bgGradient">
      {!isSuccess ? (
        <Card className="w-full max-w-md backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold  text-center text-accentColor">
              Sign Up for OrbitBlog
            </CardTitle>
            <CardDescription className="text-center">
              Create an account or sign up with a social provider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            className="focus:border-accentColor focus:ring-accentColor"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            type="email"
                            className="focus:border-accentColor focus:ring-accentColor"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="flex relative">
                            <Input
                              {...field}
                              disabled={isLoading}
                              type={hidden ? "password" : "text"}
                              className="focus:border-accentColor focus:ring-accentColor"
                            />
                            {hidden ? (
                              <Eye
                                onClick={() => setHidden(false)}
                                size={"20px"}
                                className="absolute right-2 top-[25%] cursor-pointer text-gray-600"
                              />
                            ) : (
                              <EyeOff
                                onClick={() => setHidden(true)}
                                size={"20px"}
                                className="absolute right-2 top-[25%] cursor-pointer text-gray-600"
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormError message={error} />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accentColor hover:bg-accentColor/90 text-white"
                  >
                    Sign Up {isLoading && <Loader isButton={true} />}
                  </Button>
                </div>
              </form>
            </Form>
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
                onClick={() => signIn("github")}
                className="border-accentColor text-accentColor hover:bg-slate-50 dark:hover:bg-background hover:text-accentColor/80"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                onClick={() => signIn("google")}
                className="border-accentColor text-accentColor hover:bg-slate-50 dark:hover:bg-background hover:text-accentColor/80"
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="text-center text-sm text-accentColor/80 dark:text-accentColor">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-accentColor hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Verificaiton />
      )}
    </div>
  );
}
