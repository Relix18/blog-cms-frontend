"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { PostSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Editor from "../NewPost/QuillEditor";
import imageCompression from "browser-image-compression";
import {
  useGetPostByIdQuery,
  useGetCategoryQuery,
  useUpdatePostMutation,
} from "@/state/api/post/postApi";
import Loader from "@/components/Loader/Loader";
import { useToast } from "@/hooks/use-toast";
import { isApiResponse } from "@/types/types";
import { useRouter } from "next/navigation";

interface Props {
  slug: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

interface ICategory {
  category: CategoryOption;
}

export default function EditPost({ slug }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOption[]
  >([]);

  const { data: category } = useGetCategoryQuery({ skip: false });
  const { data: postData, isLoading } = useGetPostByIdQuery(slug);
  const [updatePost, { isSuccess, isLoading: isUpdating, error }] =
    useUpdatePostMutation();
  const { toast } = useToast();
  const router = useRouter();

  const postForm = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      categories: [],
    },
  });

  useEffect(() => {
    setCategories(category?.categories || []);
    if (postData?.post) {
      const post = postData.post;
      postForm.reset({
        title: post.title,
        description: post.description,
        content: post.content,
        categories: post.categories.map((cat: ICategory) => ({
          value: cat.category.value || "",
          label: cat.category.label || "",
        })),
      });
      setSelectedCategories(
        post.categories.map((cat: ICategory) => ({
          value: cat.category.value,
          label: cat.category.label,
        }))
      );
      setImagePreview(post.featuredImage);
    }
  }, [postData, category, postForm]);

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Post updated successfully." });
      router.back();
    }
    if (isApiResponse(error)) {
      toast({ title: error?.data.message });
    }
  }, [isSuccess, error, toast]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const options = { maxWidthOrHeight: 800, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);
        const base64 = await imageCompression.getDataUrlFromFile(
          compressedFile
        );
        setImage(compressedFile);
        setImagePreview(base64);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleCategoryChange = (selectedOptions: CategoryOption[]) => {
    setSelectedCategories(selectedOptions);
    postForm.setValue(
      "categories",
      selectedOptions.map((option) => option.value)
    );

    selectedOptions.forEach((option) => {
      if (!categories.some((cat) => cat.value === option.value)) {
        setCategories((prevCategories) => [...prevCategories, option]);
      }
    });
  };

  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
    const formData = {
      ...values,
      slug: generateSlug(values.title),
      metaTitle: values.title,
      metaDescription: values.description,
      metaKeyword: selectedCategories.map((cat) => cat.label).join(", "),
      featuredImage: imagePreview,
      categories: selectedCategories.map((cat) => cat.value),
    };
    const data = {
      post: formData,
      id: postData.post.id,
    };

    await updatePost(data);
    console.log("Updated Post Data:", formData);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-background pt-10">
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white dark:bg-muted/50 shadow rounded-lg">
                <div className="p-6 sm:p-8 md:p-10">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Edit Post
                  </h1>
                  <Form {...postForm}>
                    <form
                      className="space-y-6"
                      onSubmit={postForm.handleSubmit(onSubmit)}
                    >
                      {/* Title Field */}
                      <FormField
                        control={postForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Title{" "}
                              <span className="text-destructive text-lg">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter post title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Featured Image */}
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
                            <span className="text-sm text-gray-500">
                              {image.name}
                            </span>
                          )}
                        </div>
                        {imagePreview && (
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={300}
                            height={300}
                            className="mt-4 rounded-md w-full object-fill"
                          />
                        )}
                      </FormItem>

                      {/* Content */}
                      <FormField
                        control={postForm.control}
                        name="content"
                        render={() => (
                          <FormItem>
                            <FormLabel>
                              Content{" "}
                              <span className="text-destructive text-lg">
                                *
                              </span>
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

                      {/* Description */}
                      <FormField
                        control={postForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Short Description{" "}
                              <span className="text-destructive text-lg">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter a short description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Categories */}
                      <FormField
                        control={postForm.control}
                        name="categories"
                        render={() => (
                          <FormItem>
                            <FormLabel>
                              Categories{" "}
                              <span className="text-destructive text-lg">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <CreatableSelect
                                isMulti
                                value={selectedCategories}
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

                      <div className="flex justify-end space-x-4">
                        <Button
                          type="submit"
                          disabled={isUpdating}
                          className="bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                        >
                          Update Post {isUpdating && <Loader isButton={true} />}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
