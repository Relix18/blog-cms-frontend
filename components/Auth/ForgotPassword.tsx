"use client";

import { useState, useTransition } from "react";
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
import useAuth from "@/app/hooks/useAuth";
import Loader from "../Loader/Loader";

export default function ForgotPassword() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [pending, setPending] = useState<boolean>(false);
  const { forgotPassword } = useAuth();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");
    setPending(true);

    startTransition(() => {
      forgotPassword(values)
        .then((data) => {
          setSuccess(data.message);
        })
        .catch((err) => {
          setError(err?.response.data.message);
        })
        .finally(() => {
          setPending(false);
        });
    });
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gradient-to-br from-fuchsia-400 via-fuchsia-600 to-purple-800">
      <Card className="w-full max-w-md backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-fuchsia-600 ">
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
                          disabled={isPending}
                          type="email"
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
                  disabled={isPending}
                  className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                >
                  Reset Password {pending && <Loader isButton={true} />}
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