import * as z from "zod";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { TabsContent } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { User } from "@/state/api/user/userApi";
import { useForm } from "react-hook-form";
import { ChangePasswordSchme, ProfileSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from "@/state/api/user/userApi";
import { useToast } from "@/hooks/use-toast";
import Loader from "../Loader/Loader";
import { FormError } from "../form-error";

type Props = {
  user: User | null;
};

const Settings = ({ user }: Props) => {
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [profileUpdate, { isLoading, isSuccess }] = useUpdateProfileMutation();
  const [
    changePassword,
    { isLoading: passwordLoading, isSuccess: passwordSuccess, error },
  ] = useChangePasswordMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      bio: user?.profile?.bio ?? "",
      githubLink: user?.profile?.social?.githubLink ?? "",
      mailLink: user?.profile?.social?.mailLink ?? "",
      instaLink: user?.profile?.social?.instaLink ?? "",
      facebookLink: user?.profile?.social?.facebookLink ?? "",
      linkedinLink: user?.profile?.social?.linkedinLink ?? "",
    },
  });

  const passwordForm = useForm<z.infer<typeof ChangePasswordSchme>>({
    resolver: zodResolver(ChangePasswordSchme),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Profile Updated Successfully" });
    }
  }, [isSuccess, toast]);

  useEffect(() => {
    if (passwordSuccess) {
      toast({ title: "Password Changed Successfully" });
      passwordForm.reset();
    }
  }, [passwordSuccess, toast]);

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    await profileUpdate(values);
  };

  const changePasswordHandle = async (
    values: z.infer<typeof ChangePasswordSchme>
  ) => {
    await changePassword(values);
  };

  return (
    <TabsContent value="settings">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-destructive text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-destructive text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      readOnly
                      disabled={isLoading}
                      className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Bio <span className="text-destructive text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isLoading}
                      className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="mailLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isLoading}
                      className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="instaLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      pattern="https://.*"
                      disabled={isLoading}
                      className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="githubLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      pattern="https://.*"
                      disabled={isLoading}
                      className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="facebookLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      pattern="https://.*"
                      disabled={isLoading}
                      className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="linkedinLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      pattern="https://.*"
                      disabled={isLoading}
                      className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full sm:w-auto bg-fuchsia-600 text-white hover:bg-fuchsia-700"
          >
            Save Changes {isLoading && <Loader isButton={true} />}
          </Button>
        </form>
      </Form>
      {!user?.isSocial && (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Change Password
          </h3>
          <Form {...passwordForm}>
            <form
              className="space-y-4"
              onSubmit={passwordForm.handleSubmit(changePasswordHandle)}
            >
              <div className="space-y-2">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="flex relative">
                          <Input
                            {...field}
                            disabled={isLoading}
                            type={showCurrentPassword ? "text" : "password"}
                            className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                          />
                          {showCurrentPassword ? (
                            <EyeOff
                              onClick={() => setShowCurrentPassword(false)}
                              size={"20px"}
                              className="absolute right-2 top-[25%] cursor-pointer text-gray-600"
                            />
                          ) : (
                            <Eye
                              onClick={() => setShowCurrentPassword(true)}
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
              </div>
              <div className="space-y-2">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="flex relative">
                          <Input
                            {...field}
                            disabled={isLoading}
                            type={showNewPassword ? "text" : "password"}
                            className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                          />
                          {showNewPassword ? (
                            <EyeOff
                              onClick={() => setShowNewPassword(false)}
                              size={"20px"}
                              className="absolute right-2 top-[25%] cursor-pointer text-gray-600"
                            />
                          ) : (
                            <Eye
                              onClick={() => setShowNewPassword(true)}
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
              </div>
              <FormError message={error ? error.data.message : ""} />
              <Button
                type="submit"
                className="bg-fuchsia-600 text-white hover:bg-fuchsia-700"
              >
                Change Password {passwordLoading && <Loader isButton={true} />}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </TabsContent>
  );
};

export default Settings;
