"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Send } from "lucide-react";
import { useContactUsMutation } from "@/state/api/user/userApi";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [sendMessage, { data, isSuccess, isLoading }] = useContactUsMutation();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast({ title: data?.message });
      form.reset();
    }
  }, [toast, data, isSuccess, form]);

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    await sendMessage(values);
  };

  return (
    <div className="pt-20 md:pt-28 p-4 grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>
            Fill out the form below to get in touch with us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                <Send className="mr-2 h-4 w-4" />{" "}
                {!isLoading ? "Send Message" : "Sending..."}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Policies</CardTitle>
          <CardDescription>
            Important information about our contact policies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Privacy Policy:</span> Your
              information is secure and will not be shared with third parties.
            </li>
            <li>
              <span className="font-semibold">Response Time:</span> We aim to
              respond to your message within 2-3 business days.
            </li>
            <li>
              <span className="font-semibold">Usage Policy:</span> Messages sent
              through this form must align with our community guidelines.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
