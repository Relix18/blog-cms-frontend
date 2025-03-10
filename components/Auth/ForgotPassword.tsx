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
import Link from "next/link";
import * as z from "zod";
import { ForgotPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import Loader from "../Loader/Loader";
import { useForgotPasswordMutation } from "@/state/api/auth/authApi";
import { isApiResponse } from "@/types/types";

export default function ForgotPassword() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [forgotPassword, { data, error: isError, isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (isApiResponse(isError)) {
      setError(isError?.data?.message);
    }
    if (isSuccess) {
      setSuccess(data.message);
    }
  }, [isError, isSuccess, data]);

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");
    await forgotPassword(values);
  };

  return (
    <div className="flex items-center bgGradient justify-center min-h-screen">
      <Card className="w-full max-w-md backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accentColor ">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center ">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
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

                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accentColor hover:bg-accentColor/90 text-white"
                >
                  Reset Password {isLoading && <Loader isButton={true} />}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/login"
            className="text-sm text-accentColor hover:underline"
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
