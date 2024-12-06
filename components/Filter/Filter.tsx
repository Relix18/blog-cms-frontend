"use client";

import { useState } from "react";
import Image from "next/image";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Technology",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Blockchain",
  "Internet of Things",
  "Cloud Computing",
  "Virtual Reality",
  "Augmented Reality",
  "Robotics",
  "5G",
  "Quantum Computing",
  "Edge Computing",
  "DevOps",
  "Fintech",
];

const blogPosts = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence: Promises and Perils",
    excerpt:
      "As we stand on the brink of a new era, it's crucial to examine both the promises and perils that AI presents to our society.",
    author: "Jane Doe",
    date: "May 15, 2023",
    category: "Artificial Intelligence",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Blockchain Revolution: Beyond Cryptocurrency",
    excerpt:
      "Explore how blockchain technology is transforming industries beyond finance, from supply chain to healthcare.",
    author: "John Smith",
    date: "May 20, 2023",
    category: "Blockchain",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "The Rise of Edge Computing in IoT",
    excerpt:
      "Discover how edge computing is revolutionizing the Internet of Things landscape and enabling real-time data processing.",
    author: "Alice Johnson",
    date: "May 25, 2023",
    category: "Internet of Things",
    image: "/placeholder.svg?height=200&width=400",
  },
  // Add more blog posts here...
];

export default function Filter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(post.category)) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen pt-10">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Categories
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
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
          </aside>

          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Blog Posts
              </h1>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
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

            <div
              className={`grid gap-6 ${
                isGridView
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {currentPosts.map((post) => (
                <div
                  key={post.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
                    isGridView ? "" : "flex"
                  }`}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className={`object-cover ${
                      isGridView ? "w-full h-48" : "w-1/3 h-full"
                    }`}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="inline-flex">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({
                  length: Math.ceil(sortedPosts.length / postsPerPage),
                }).map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    onClick={() => paginate(index + 1)}
                    className="mx-1"
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(sortedPosts.length / postsPerPage)
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
