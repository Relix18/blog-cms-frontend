"use client";

import { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { PostSchmea } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Editor from "./QuillEditor";

export default function CreateNewPost() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState([
    { value: "technology", label: "Technology" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food" },
    { value: "health", label: "Health" },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const postForm = useForm<z.infer<typeof PostSchmea>>({
    resolver: zodResolver(PostSchmea),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: [],
      metaTitle: "",
      metaDescription: "",
      metaKeyword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PostSchmea>) => {
    const formData = {
      ...values,
      image: imagePreview,
      category: selectedCategories.map((cat) => cat.value),
    };
    console.log(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setImage(null);
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);

    postForm.setValue(
      "category",
      selectedOptions.map((option) => option.value) // Send only the values
    );

    selectedOptions.forEach((option) => {
      if (!categories.some((cat) => cat.value === option.value)) {
        setCategories((prevCategories) => [...prevCategories, option]);
      }
    });
  };

  return (
    <div className="min-h-screen pt-10 ">
      <main className="container mx-auto px-4 py-8 ">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-muted/50 shadow rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8 md:p-10">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Create New Post
              </h1>
              <Form {...postForm}>
                <form
                  className="space-y-6"
                  onSubmit={postForm.handleSubmit(onSubmit)}
                >
                  <div className="space-y-2">
                    <FormField
                      control={postForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Title{" "}
                            <span className="text-destructive text-lg">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter post title"
                              //   disabled={isLoading}
                              className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel>
                        Featured Image{" "}
                        <span className="text-destructive text-lg">*</span>
                      </FormLabel>
                      <div className="flex items-center space-x-4">
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("image")?.click()
                          }
                        >
                          <Upload className="mr-2 h-4 w-4" /> Upload Image
                        </Button>
                        {image && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {image.name}
                          </span>
                        )}
                      </div>
                      {imagePreview && (
                        <div className="mt-4 w-full">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={300}
                            height={300}
                            className="rounded-md w-full object-cover"
                          />
                        </div>
                      )}
                    </FormItem>
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={postForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Content{" "}
                            <span className="text-destructive text-lg">*</span>
                          </FormLabel>
                          <FormControl>
                            <Controller
                              name="content"
                              control={postForm.control}
                              render={({ field }) => (
                                <Editor
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={postForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Short Description{" "}
                            <span className="text-destructive text-lg">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="description"
                              placeholder="Enter a short description of your post"
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
                      control={postForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Category{" "}
                            <span className="text-destructive text-lg">*</span>
                          </FormLabel>
                          <FormControl>
                            <CreatableSelect
                              {...field}
                              id="category"
                              isMulti
                              value={selectedCategories} // Bind with selected categories state
                              onChange={handleCategoryChange}
                              options={categories}
                              placeholder="Select or create categories"
                              getOptionLabel={(e) => e.label}
                              getOptionValue={(e) => e.value}
                              isClearable
                              className="my-react-select-container"
                              classNamePrefix="my-react-select"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={postForm.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Meta Title{" "}
                            <span className=" text-gray-400">
                              (for better seo, optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="metaTitle"
                              placeholder="Enter meta title"
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
                      control={postForm.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Meta Description{" "}
                            <span className=" text-gray-400">
                              (for better seo, optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              id="metaDescription"
                              placeholder="Enter meta description"
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
                      control={postForm.control}
                      name="metaKeyword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Meta Keywords{" "}
                            <span className=" text-gray-400">
                              (for better seo, optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="metaKeywords"
                              placeholder="Enter meta keywords, separated by commas"
                              className="focus:border-fuchsia-600 focus:ring-fuchsia-600"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                    <Button
                      type="submit"
                      className="bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                    >
                      Publish Post
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
