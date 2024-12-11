"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";
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
import Editor from "./QuillEditor";
import imageCompression from "browser-image-compression";
import {
  useCreatePostMutation,
  useGetCategoryQuery,
  useGetTagsQuery,
  usePublishPostMutation,
} from "@/state/api/post/postApi";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { isApiResponse } from "@/types/types";

interface Option {
  value: string;
  label: string;
}

interface TagResponse {
  tags: Option[];
}

export default function CreateNewPost() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data: category } = useGetCategoryQuery(undefined, {
    skip: false,
  });
  const { data: tag } = useGetTagsQuery(undefined, {
    skip: false,
  }) as { data: TagResponse };
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [tags, setTags] = useState<Option[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [submitAction, setSubmitAction] = useState<"Draft" | "Publish">(
    "Draft"
  );
  const [creatPost, { isLoading, isSuccess, error }] = useCreatePostMutation();
  const [
    publishPost,
    { isLoading: publishLoading, isSuccess: isPublished, error: publishError },
  ] = usePublishPostMutation();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (isPublished) {
      toast({ title: "Post published successfully." });
    }
    if (isApiResponse(publishError)) {
      toast({ title: publishError?.data?.message });
    }
  }, [isPublished, publishError, toast]);

  const postForm = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      categories: [],
      tags: [],
    },
  });

  useEffect(() => {
    if (category) setCategories(category.categories as Option[]);
    if (tag) setTags(tag.tags);

    if (isSuccess) {
      toast({ title: "Post created and saved as draft." });
      postForm.reset();
      router.back();
    }

    if (isApiResponse(error)) {
      toast({ title: error?.data?.message || "An error occurred." });
    }
  }, [isSuccess, error, toast, category, router, postForm, tag]);

  const slug = (title: string) => {
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

  const handleCategoryChange = (selectedOption: Option | null) => {
    setSelectedCategory(selectedOption);
    postForm.setValue(
      "categories",
      selectedOption ? [selectedOption.value] : []
    );
  };

  const handleTagsChange = (selectedOptions: MultiValue<Option>) => {
    const selected = selectedOptions as Option[];
    setSelectedTags(selected);

    postForm.setValue(
      "tags",
      selected.map((option) => option.value)
    );

    selected.forEach((option) => {
      if (!tags.some((tag) => tag.value === tag.value)) {
        setTags((prevTags) => [...prevTags, option]);
      }
    });
  };

  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
    const formData = {
      ...values,
      slug: slug(values.title),
      metaTitle: values.title,
      metaDescription: values.description,
      metaKeyword: selectedTags.map((tag) => tag.value).join(", "),
      featuredImage: imagePreview,
      category: selectedCategory ? selectedCategory.value : "",
      tags: selectedTags.map((tag) => tag.value),
    };

    console.log(formData);
    const { data } = await creatPost(formData);

    if (submitAction === "Publish" && data?.post?.id) {
      await publishPost(data.post.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pt-10 ">
      <main className="container mx-auto px-4 py-8 ">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-muted/50 shadow rounded-lg ">
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
                    <FormItem>
                      <FormLabel>
                        Featured Image{" "}
                        <span className="text-destructive text-lg">*</span>
                      </FormLabel>
                      <div className="flex items-center space-x-4">
                        <input
                          id="image"
                          type="file"
                          disabled={isLoading}
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
                            className="rounded-md w-full  object-fill"
                          />
                        </div>
                      )}
                    </FormItem>
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={postForm.control}
                      name="content"
                      render={() => (
                        <FormItem>
                          <FormLabel>
                            Content{" "}
                            <span className="text-destructive text-lg">*</span>
                          </FormLabel>
                          <FormControl>
                            <Controller
                              name="content"
                              disabled={isLoading}
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
                              disabled={isLoading}
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
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Category{" "}
                            <span className="text-destructive text-lg">*</span>
                          </FormLabel>
                          <FormControl>
                            <CreatableSelect
                              {...field}
                              id="categories"
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                              options={categories}
                              placeholder="Select or create a category"
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
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Tags{" "}
                            <span className="text-destructive text-lg">*</span>
                          </FormLabel>
                          <FormControl>
                            <CreatableSelect
                              {...field}
                              id="tags"
                              isMulti
                              value={selectedTags}
                              onChange={handleTagsChange}
                              options={tags}
                              placeholder="Select or create tags"
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

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="submit"
                      onClick={() => {
                        setSubmitAction("Draft");
                        postForm.handleSubmit(onSubmit)();
                      }}
                      name="action"
                      variant="outline"
                    >
                      Save as Draft {isLoading && <Loader isButton={true} />}
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => {
                        setSubmitAction("Publish");
                        postForm.handleSubmit(onSubmit)();
                      }}
                      name="action"
                      className="bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                    >
                      Publish Post{" "}
                      {isLoading ||
                        (publishLoading && <Loader isButton={true} />)}
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
