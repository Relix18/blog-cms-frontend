"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white mt-10 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 rounded-lg shadow-xl p-8 md:p-12 text-white">
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
              <article
                key={post}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={`/placeholder.svg?height=200&width=400&text=Featured+Image+${post}`}
                  alt={`Featured post ${post}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
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
                    <Button variant="link" className="dark:text-indigo-400">
                      Read More
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((post) => (
              <article
                key={post}
                className="flex flex-col md:flex-row bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`/placeholder.svg?height=250&width=400&text=Post+Image+${post}`}
                  alt={`Post ${post}`}
                  className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                />
                <div className="p-6 md:w-2/3">
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
                    <Button variant="link" className="dark:text-indigo-400">
                      Continue Reading
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 mb-16">
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
            <Button type="submit" className="md:w-1/3">
              Subscribe
            </Button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                OrbitBlog is your go-to source for insightful articles, expert
                opinions, and the latest trends in technology, lifestyle, and
                more.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-twitter"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-instagram"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2023 OrbitBlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
