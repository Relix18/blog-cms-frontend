"use client";

import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { SiteSettingSchema } from "@/schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetSiteSettingsQuery,
  useUpdateSiteSettingsMutation,
} from "@/state/api/site/siteApi";
import { isApiResponse, ISiteSettings } from "@/types/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import Loader from "../Loader/Loader";

export default function SiteSettings() {
  const [siteName, setSiteName] = useState("My Awesome Site");
  const [logo, setLogo] = useState<string | null>(null);
  const [accentColor, setAccentColor] = useState("#d946ef");
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [gradientStart, setGradientStart] = useState("#d946ef");
  const [gradientEnd, setGradientEnd] = useState("#ec4899");
  const [heroTitle, setHeroTitle] = useState("Welcome to Our Site");
  const [heroDescription, setHeroDescription] = useState(
    "Discover amazing content and features"
  );
  const { data } = useGetSiteSettingsQuery({});
  const [updateSettings, { data: updated, isLoading, isSuccess, error }] =
    useUpdateSiteSettingsMutation();
  const { toast } = useToast();

  const siteForm = useForm<z.infer<typeof SiteSettingSchema>>({
    resolver: zodResolver(SiteSettingSchema),
    defaultValues: {
      accentColor: "",
      gradientStart: "",
      gradientEnd: "",
      siteName: "",
      heroTitle: "",
      heroDescription: "",
    },
  });

  useEffect(() => {
    if (data?.siteSettings) {
      const settings: ISiteSettings = data.siteSettings;

      siteForm.reset({
        accentColor: settings.accentColor,
        siteName: settings.siteName,
        gradientStart: settings.gradientStart,
        gradientEnd: settings.gradientEnd,
        heroTitle: settings.heroTitle,
        heroDescription: settings.heroDescription,
      });

      setLogo(settings.logoUrl);
      setSiteName(settings.siteName);
      setAccentColor(settings.accentColor);
      setGradientStart(settings.gradientStart);
      setGradientEnd(settings.gradientEnd);
      setHeroDescription(settings.heroDescription);
      setHeroImage(settings.heroImageUrl);
      setHeroTitle(settings.heroTitle);
    }
  }, [data, siteForm]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ title: updated.message });
    }
    if (isApiResponse(error)) {
      toast({ title: error?.data.message, variant: "destructive" });
    }
  }, [isSuccess, updated, error, toast]);

  const onSubmit = async (values: z.infer<typeof SiteSettingSchema>) => {
    const allData = {
      ...values,
      id: data.siteSettings.id,
      logo,
      heroImage,
    };
    await updateSettings(allData);
    console.log(allData);
  };

  return (
    <div className="grid container mx-auto py-8">
      <Card className="mx-4">
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>
            Customize your site's appearance and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...siteForm}>
            <form
              className="space-y-6"
              onSubmit={siteForm.handleSubmit(onSubmit)}
            >
              <FormField
                control={siteForm.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSiteName(value);
                          field.onChange(value);
                        }}
                        placeholder="Enter site Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Site Logo</Label>
                <div className="flex items-center space-x-4">
                  {logo && (
                    <div className="relative w-16 h-16">
                      <img
                        src={logo}
                        alt="Site Logo"
                        className="w-full h-full object-contain"
                      />
                      <button
                        onClick={() => setLogo(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-600 rounded-md">
                      <Upload size={20} />
                      <span>Upload Logo</span>
                    </div>
                    <Input
                      id="logo-upload"
                      type="file"
                      className="hidden"
                      onChange={handleLogoUpload}
                      accept="image/*"
                    />
                  </Label>
                </div>
              </div>

              <FormField
                control={siteForm.control}
                name="accentColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accent Color</FormLabel>
                    <HexColorPicker
                      color={field.value}
                      onChange={(color) => {
                        setAccentColor(color);
                        field.onChange(color);
                      }}
                    />
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const color = e.target.value;
                          setAccentColor(color);
                          field.onChange(color);
                        }}
                        placeholder="Enter Accent Color"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="space-y-2">
                <Label>Hero Image</Label>
                <div className="flex items-center space-x-4">
                  {heroImage && (
                    <div className="relative w-32 h-20">
                      <img
                        src={heroImage}
                        alt="Hero Image"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        onClick={() => setHeroImage(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <Label htmlFor="hero-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-600 rounded-md">
                      <Upload size={20} />
                      <span>Upload Hero Image</span>
                    </div>
                    <Input
                      id="hero-upload"
                      type="file"
                      className="hidden"
                      onChange={handleHeroImageUpload}
                      accept="image/*"
                    />
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hero Background Gradient</Label>
                <div className="flex space-x-4">
                  <FormField
                    control={siteForm.control}
                    name="gradientStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Color</FormLabel>
                        <HexColorPicker
                          color={field.value}
                          onChange={(color) => {
                            setGradientStart(color);
                            field.onChange(color);
                          }}
                        />
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              const color = e.target.value;
                              setGradientStart(color);
                              field.onChange(color);
                            }}
                            placeholder="Enter Start Color"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={siteForm.control}
                    name="gradientEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Color</FormLabel>
                        <HexColorPicker
                          color={field.value}
                          onChange={(color) => {
                            setGradientEnd(color);
                            field.onChange(color);
                          }}
                        />
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              const color = e.target.value;
                              setGradientEnd(color);
                              field.onChange(color);
                            }}
                            placeholder="Enter End Color"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={siteForm.control}
                name="heroTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          setHeroTitle(value);
                          field.onChange(value);
                        }}
                        placeholder="Enter site Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={siteForm.control}
                name="heroDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          setHeroDescription(value);
                          field.onChange(value);
                        }}
                        placeholder="Enter site Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                style={{ backgroundColor: accentColor }}
              >
                Save Changes {isLoading && <Loader isButton={true} />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mx-4 mt-8">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div
              className="h-64 flex flex-col justify-between text-white"
              style={{
                background: heroImage
                  ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage}) center/cover no-repeat`
                  : `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
              }}
            >
              <div className="bg-white p-2 shadow-md inline-flex items-center space-x-2 mb-4">
                {logo && (
                  <img
                    src={logo}
                    alt="Site Logo"
                    className="w-10 h-10 object-contain"
                  />
                )}
                <h1 className="text-xl text-black font-bold">{siteName}</h1>
              </div>
              <div className="pb-8 pl-4">
                <h2 className="text-3xl font-bold mb-2">{heroTitle}</h2>
                <p className=" max-w-md">{heroDescription}</p>
              </div>
            </div>
            <div className="p-4">
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: accentColor }}
              >
                Content Preview
              </h2>
              <p>
                This is a preview of how your site's header and hero section
                might look with the current settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
