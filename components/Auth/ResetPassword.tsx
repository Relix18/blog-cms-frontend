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
import * as z from "zod";
import { ResetPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import Loader from "../Loader/Loader";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useResetPasswordMutation } from "@/state/api/auth/authApi";

interface props {
  token: string;
}

export default function ResetPassword({ token }: props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [resetPassword, { data, error: isError, isSuccess, isLoading }] =
    useResetPasswordMutation();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isError) {
      setError(isError?.data?.message);
    }
    if (isSuccess) {
      setSuccess(data.message);
    }
  }, [isError, isSuccess, data]);

  const onSubmit = async (value: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    const values = {
      token,
      password: value.password,
      confirmPassword: value.confirmPassword,
    };

    await resetPassword(values);
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gradient-to-br from-fuchsia-400 via-fuchsia-600 to-purple-800">
      <Card className="w-full max-w-md backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-fuchsia-600">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center ">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          type={"password"}
                          className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          type={"password"}
                          className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
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
                  className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
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
            className="text-sm text-fuchsia-600 hover:underline"
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
