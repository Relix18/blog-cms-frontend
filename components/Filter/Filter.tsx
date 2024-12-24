"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useGetCategoryQuery,
  useGetPostsQuery,
  useGetTagsQuery,
} from "@/state/api/post/postApi";
import { Option, IPost } from "@/types/types";
import Link from "next/link";
import { FilterPostLoader } from "../Loader/SkeletonLoader";
import { formatDistanceStrict } from "date-fns";

export default function BlogFilterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string | null>("");

  const { data: currentPosts, isLoading } = useGetPostsQuery({});
  const { data: categoriesList } = useGetCategoryQuery({});
  const { data: tagsList } = useGetTagsQuery({});

  const categories =
    categoriesList?.categories?.map((category: Option) => category.label) || [];

  const tags = tagsList?.tags?.map((tag: Option) => tag.label) || [];

  useEffect(() => {
    const categoriesFromParams = searchParams.get("categories");
    const tagsFromParams = searchParams.get("tags");
    const sortByFromParams = searchParams.get("sortBy");
    const searchQueryFromParams = searchParams.get("search");

    if (categoriesFromParams) {
      setSelectedCategories(categoriesFromParams.split(","));
    }
    if (tagsFromParams) {
      setSelectedTags(tagsFromParams.split(","));
    }
    if (sortByFromParams) {
      setSortBy(sortByFromParams);
    }
    if (searchQueryFromParams) {
      setSearchQuery(searchQueryFromParams);
    }
  }, [searchParams]);

  const updateQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }
    if (sortBy) {
      params.set("sortBy", sortBy);
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    updateQueryParams();
  }, [selectedCategories, selectedTags, sortBy, searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleTags = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const sortPosts = (posts: IPost[]) => {
    switch (sortBy) {
      case "date":
        return posts.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
      case "title":
        return posts.sort((a, b) => a.title.localeCompare(b.title));
      case "views":
        return posts.sort((a, b) => b.views - a.views);
      default:
        return posts;
    }
  };

  const filteredPosts = currentPosts?.posts
    ?.filter((post: IPost) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          post.category.label.includes(category)
        );
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some((tag) =>
          post.tags.map((tag) => tag.tag.label).includes(tag)
        );
      const matchesSearchQuery =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearchQuery && matchesTag;
    })
    ?.sort((a, b) => (sortPosts([a, b])[0] === a ? -1 : 1));

  return (
    <div className="min-h-screen pt-10">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 hidden md:block">
            <div className="md:sticky md:top-20 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Categories
              </h2>

              <div className="space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto">
                {categories.map((category: string) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={category}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:sticky md:top-20 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Tags
              </h2>

              <div className="space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto">
                {tags.map((tag: string) => (
                  <div key={tag} className="flex items-center">
                    <Checkbox
                      id={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTags(tag)}
                    />
                    <label
                      htmlFor={tag}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="w-full md:w-3/4">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-wrap items-center justify-between md:justify-end gap-2">
                <div className="md:hidden block w-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full md:w-auto">
                        Filter by Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Filter by Category</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                        {categories.map((category: string) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={`mobile-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label
                              htmlFor={`mobile-${category}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex w-full gap-2 md:justify-end justify-between">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="views">Views</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsGridView(!isGridView)}
                  >
                    {isGridView ? (
                      <List className="h-4 w-4" />
                    ) : (
                      <Grid className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Blog Posts
              </h1>
            </div>

            {isLoading ? (
              <FilterPostLoader />
            ) : (
              <div
                className={`grid gap-6 ${
                  isGridView
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredPosts?.map((post: IPost) => (
                  <div
                    key={post.id}
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
                      isGridView ? "" : "flex"
                    }`}
                  >
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={400}
                      height={200}
                      className={`object-cover ${
                        isGridView ? "w-full h-48" : "w-1/3 h-full"
                      }`}
                    />
                    <Link href={`post/view/${post.slug}`}>
                      <div className="p-4">
                        <h2 className="text-xl line-clamp-2 font-semibold mb-2 text-gray-900 dark:text-white">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 line-clamp-4 dark:text-gray-400 mb-4">
                          {post.description}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-bold">{post.author.name}</span>
                          <span>
                            {formatDistanceStrict(
                              post.publishedAt,
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
