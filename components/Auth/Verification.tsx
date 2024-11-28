"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { VerificationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { useRouter } from "next/navigation";
import {
  useActivateUserMutation,
  useResendOtpMutation,
} from "@/state/api/auth/authApi";

const Verificaiton = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [activateUser, { error: err, isLoading, isSuccess }] =
    useActivateUserMutation();
  const [
    resendOTP,
    { data: successMessage, isSuccess: resendSuccess, error: resendError },
  ] = useResendOtpMutation();

  const router = useRouter();

  const form = useForm<z.infer<typeof VerificationSchema>>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (err) {
      const { data } = err;
      setError(data?.message);
    }
    if (isSuccess) {
      router.push("/");
    }
  }, [err, isSuccess, router]);

  useEffect(() => {
    if (resendError) {
      const { data } = resendError;
      setError(data?.message);
    }
    if (resendSuccess) {
      setSuccess(successMessage?.message);
    }
  }, [resendSuccess, resendError]);

  const onSubmit = async (values: z.infer<typeof VerificationSchema>) => {
    setError("");
    await activateUser(values);
  };

  const resendOtpHandler = async () => {
    setSuccess("");
    setError("");
    await resendOTP();
  };

  return (
    <Card className="w-full max-w-md backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-fuchsia-600">
          Verify OTP
        </CardTitle>
        <CardDescription className="text-center">
          Enter the one-time password sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="text-center">
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
                Verify OTP {isLoading && <Loader isButton={true} />}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-fuchsia-900">
          Didn't receive the code?{" "}
          <Button
            variant="link"
            onClick={resendOtpHandler}
            className="text-fuchsia-600 hover:underline p-0"
          >
            Resend OTP
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Verificaiton;
