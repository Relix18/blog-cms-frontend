"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Footer from "../Footer";

export default function Hero() {
  return (
    <div className="min-h-screen pt-10">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 dark:from-fuchsia-600 dark:to-pink-600 rounded-lg shadow-xl p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to OrbitBlog
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Discover insightful articles, expert opinions, and the latest
              trends.
            </p>
            <Button variant="secondary" size="lg">
              Start Reading
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <Card
                key={post}
                className="transition-transform hover:scale-105 bg-muted/25"
              >
                <Image
                  src={``}
                  alt={`Featured post ${post}`}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">
                    Exciting Blog Post Title {post}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      5 min read
                    </span>
                    <Button
                      variant="link"
                      className="text-fuchsia-600 dark:text-fuchsia-400"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((post) => (
              <Card
                key={post}
                className="flex flex-col md:flex-row bg-muted/25"
              >
                <Image
                  src={``}
                  alt={`Post ${post}`}
                  className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                />

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">
                    Interesting Article Title {post}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      3 days ago • 8 min read
                    </span>
                    <Button
                      variant="link"
                      className="text-fuchsia-600 dark:text-fuchsia-400"
                    >
                      Continue Reading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="bg-muted/25">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Stay Updated
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to our newsletter for the latest blog posts and updates.
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="md:w-2/3"
              />
              <Button
                type="submit"
                className="md:w-1/3 bg-fuchsia-600 text-white hover:bg-fuchsia-700 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-600"
              >
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
