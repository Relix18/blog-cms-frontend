"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  TrendingUp,
  Clock,
  BookOpen,
  UserCircle,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Footer from "../Footer";
import {
  useFeaturedAuthorQuery,
  useFeaturedPostQuery,
  useLatestPostQuery,
  usePopularTagQuery,
} from "@/state/api/feature/featureApi";
import { IPost, Option, IAuthor } from "@/types/types";
import Link from "next/link";
import { FeaturedPostLoader, LatestPostLoader } from "../Loader/SkeletonLoader";
import useUIStore from "@/app/hooks/useUIStore";
import { useEffect } from "react";
import { formatDistanceStrict } from "date-fns";
import { useSelector } from "react-redux";
import { selectSettings } from "@/state/api/site/siteSlice";

const Hero = () => {
  const { data: featuredPost, isLoading: featureLoading } =
    useFeaturedPostQuery({});
  const { data: latestPost, isLoading } = useLatestPostQuery({});
  const { data: tag } = usePopularTagQuery({});
  const { data: featuredAuthor } = useFeaturedAuthorQuery({});
  const { setActiveTab } = useUIStore();
  const settings = useSelector(selectSettings);

  const author: IAuthor = featuredAuthor?.featuredAuthor;
  useEffect(() => {
    setActiveTab("posts");
  }, [setActiveTab]);

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-b ">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <div
            style={{
              background: settings?.heroImageUrl
                ? `linear-gradient(to right,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(${settings.heroImageUrl}) center/cover no-repeat`
                : `linear-gradient(to right, ${settings?.gradientStart}, ${settings?.gradientEnd})`,
            }}
            className=" rounded-lg shadow-xl p-8 md:p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                {settings?.heroTitle}
              </h1>
              <p className="text-lg md:text-xl mb-6 animate-fade-in-up animation-delay-200">
                {settings?.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                <Link href={"/filter"}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Start Reading
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <TrendingUp className="mr-2" /> Featured Posts
          </h2>
          {!featureLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPost?.featuredPost.map((post: IPost) => (
                <Card
                  key={post.id}
                  className="transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800 overflow-hidden"
                >
                  <Image
                    src={post.featuredImage}
                    width={300}
                    height={300}
                    alt={`Featured post ${post}`}
                    className="w-full h-48 object-cover"
                  />
                  <Link href={`post/view/${post.slug}`}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 dark:text-gray-300 mb-4">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Image
                            src={post.author.profile.avatar}
                            width={32}
                            height={32}
                            alt={post.author.name}
                            className="rounded-full  aspect-square mr-2 "
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {post.author.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {post.minRead} min read
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <FeaturedPostLoader />
          )}
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Newspaper className="mr-2" /> Latest Posts
          </h2>
          {!isLoading ? (
            <div className="space-y-8">
              {latestPost?.latestPost.map((post: IPost) => (
                <Card
                  key={post.id}
                  className="flex flex-col md:flex-row bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    width={300}
                    height={300}
                    className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                  />
                  <Link href={`post/view/${post.slug}`}>
                    <CardContent className="p-6 flex-1">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Image
                            src={post.author.profile.avatar}
                            width={32}
                            height={32}
                            alt={post.author.name}
                            className="rounded-full aspect-square mr-2"
                          />
                          <span className="text-sm mr-1 text-gray-500 dark:text-gray-400">
                            {post.author.name}
                          </span>

                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            •{" "}
                            {formatDistanceStrict(
                              post.publishedAt,
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {post.minRead} min read
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <LatestPostLoader />
          )}
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4 dark:text-white flex items-center">
                <UserCircle className="mr-2" /> Featured Author
              </h2>

              <div className="flex items-center mb-4">
                <Image
                  src={author?.profile.avatar}
                  alt="Featured Author"
                  width={100}
                  height={100}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">
                    {author?.name}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {author?.profile.bio}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {author?._count.posts} Articles
                  </span>
                </div>
                <Button
                  asChild
                  className="bg-accentColor hover:bg-accentColor/90"
                  size="sm"
                >
                  <Link href={`/profile/${author?.id}`}>View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">
                Popular Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {tag?.popularTags?.map((tag: Option) => (
                  <Link
                    key={tag.id}
                    href={`/filter?tags=${tag.label}`}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hero;
