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
  useGetPostBySlugQuery,
  useGetCategoryQuery,
  useUpdatePostMutation,
  useGetTagsQuery,
} from "@/state/api/post/postApi";
import Loader from "@/components/Loader/Loader";
import { useToast } from "@/hooks/use-toast";
import { IPost, isApiResponse } from "@/types/types";
import { useRouter } from "next/navigation";
import { MultiValue } from "react-select";

interface Props {
  slug: string;
}

interface Option {
  value: string;
  label: string;
}

export default function EditPost({ slug }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [tags, setTags] = useState<Option[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  const { data: categoryData } = useGetCategoryQuery({ skip: false });
  const { data: tagData } = useGetTagsQuery({ skip: false });
  const { data: postData, isLoading } = useGetPostBySlugQuery(slug);
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
      tags: [],
    },
  });

  useEffect(() => {
    if (categoryData) {
      setCategories(
        categoryData.categories.map((cat: Option) => ({
          value: cat.value,
          label: cat.label,
        }))
      );
    }

    if (tagData) {
      setTags(
        tagData.tags.map((tag: Option) => ({
          value: tag.value,
          label: tag.label,
        }))
      );
    }
  }, [categoryData, tagData]);

  useEffect(() => {
    if (postData?.post) {
      const post: IPost = postData.post;
      postForm.reset({
        title: post.title,
        description: post.description,
        content: post.content,
        categories: [post.category.value],
        tags: post.tags.map((tag) => tag.tag.value),
      });

      setSelectedCategory({
        value: post.category.value,
        label: post.category.label,
      });

      setSelectedTags(
        post.tags.map((tag) => ({
          value: tag.tag.value,
          label: tag.tag.label,
        }))
      );

      setImagePreview(post.featuredImage);
    }
  }, [postData, postForm]);

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Post updated successfully." });
      router.back();
    }
    if (isApiResponse(error)) {
      toast({ variant: "destructive", title: error?.data.message });
    }
  }, [isSuccess, error, toast, router]);

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

  const handleCategoryChange = (selectedOption: Option | null) => {
    setSelectedCategory(selectedOption);
    postForm.setValue(
      "categories",
      selectedOption ? [selectedOption.value] : []
    );
  };

  const handleTagsChange = (selectedOptions: MultiValue<Option>) => {
    setSelectedTags(selectedOptions as Option[]);
    postForm.setValue(
      "tags",
      selectedOptions.map((option) => option.value)
    );

    selectedOptions.forEach((option) => {
      if (!tags.some((tag) => tag.value === option.value)) {
        setTags((prevTags) => [...prevTags, option]);
      }
    });
  };

  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
    const formData = {
      ...values,
      slug: generateSlug(values.title),
      metaTitle: values.title,
      metaDescription: values.description,
      metaKeyword: selectedTags.map((tag) => tag.value).join(", "),
      featuredImage: imagePreview,
      category: selectedCategory ? selectedCategory.value : "",
      tags: selectedTags.map((tag) => tag.value),
    };

    const data = {
      post: formData,
      id: postData?.post.id,
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
                      <FormField
                        control={postForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Title
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

                      <FormItem>
                        <FormLabel>
                          Featured Image
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

                      <FormField
                        control={postForm.control}
                        name="content"
                        render={() => (
                          <FormItem>
                            <FormLabel>
                              Content
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

                      <FormField
                        control={postForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Short Description
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

                      <FormField
                        control={postForm.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Category
                              <span className="text-destructive text-lg">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <CreatableSelect
                                {...field}
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                options={categories}
                                placeholder="Select or create a category"
                                isClearable
                                className="my-react-select-container"
                                classNamePrefix="my-react-select"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={postForm.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Tags
                              <span className="text-destructive text-lg">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <CreatableSelect
                                {...field}
                                isMulti
                                value={selectedTags}
                                onChange={handleTagsChange}
                                options={tags}
                                placeholder="Select or create tags"
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
                          Update Post {isUpdating && <Loader isButton />}
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
