"use client";
import Image from "next/image";
import {
  Calendar,
  User,
  Facebook,
  Twitter,
  Linkedin,
  ChevronUp,
  ChevronDown,
  Heart,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IComment, IPost } from "@/types/types";
import { format, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import {
  useCommentReplyMutation,
  useGetCommentQuery,
  useLikePostMutation,
  usePostCommentMutation,
  useViewUpdateMutation,
} from "@/state/api/post/postApi";
import Loader from "@/components/Loader/Loader";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { getLoggedUser } from "@/state/api/auth/authSlice";
import Pusher from "pusher-js";
import { useRelatedPostMutation } from "@/state/api/feature/featureApi";
import ScrollProgressBar from "@/utils/ScrollProgressBar";
import { formatLikes } from "@/utils/NumberFormat";

interface Props {
  data: IPost;
}

interface RelatedPost {
  post: IPost;
}

export default function SingleBlogPost({ data }: Props) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState<number>(0);
  const { data: getComment } = useGetCommentQuery(data.slug);
  const [postComment, { isLoading, isSuccess }] = usePostCommentMutation();
  const [commentReply] = useCommentReplyMutation();
  const [viewUpdate] = useViewUpdateMutation();
  const [likePost] = useLikePostMutation();
  const [relatedPost, { data: relatedPosts }] = useRelatedPostMutation();
  const user = useSelector(getLoggedUser);
  const url = window.location.href;
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);
  let ticking = false;
  const { toast } = useToast();

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url
  )}&title=${encodeURIComponent(data.title)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(data.title)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    data.title
  )}%20${encodeURIComponent(url)}`;

  useEffect(() => {
    const updateViewCount = async () => {
      const viewedPosts = JSON.parse(
        localStorage.getItem("viewedPosts") || "{}"
      );

      const now = Date.now();
      const postLastViewed = viewedPosts[data.id];

      if (!postLastViewed || now - postLastViewed > 900000) {
        viewUpdate(data.slug);
        localStorage.setItem(
          "viewedPosts",
          JSON.stringify({
            ...viewedPosts,
            [data.id]: now,
          })
        );
      }
    };

    updateViewCount();
  }, [data, viewUpdate]);

  const cleanUpExpiredViews = () => {
    const viewedPosts = JSON.parse(localStorage.getItem("viewedPosts") || "{}");
    const now = Date.now();

    const validEntries = Object.fromEntries(
      Object.entries(viewedPosts).filter(
        ([_, timestamp]) => now - timestamp <= 900000
      )
    );

    localStorage.setItem("viewedPosts", JSON.stringify(validEntries));
  };

  useEffect(() => {
    const relPost = {
      currentId: data.id,
      value: data.category.value,
    };
    relatedPost(relPost);
    cleanUpExpiredViews();
  }, [relatedPost, data]);

  useEffect(() => {
    setLikeCount(data?.likes.length);
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("post-channel");

    channel.bind(
      "like-updated",
      (eventData: { postId: number; likeCount: number }) => {
        if (eventData.postId === data.id) {
          setLikeCount(eventData.likeCount);
        }
      }
    );
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Thanks for the comment." });
    }
  }, [isSuccess, toast]);

  useEffect(() => {
    const isPostLiked = data.likes.find((like) => like.userId === user?.id);
    setIsLiked(isPostLiked ? true : false);
  }, [data, user]);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPercentage =
          (scrollPosition / (documentHeight - windowHeight)) * 100;

        setScrollProgress(scrollPercentage);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddComment = async (slug: string) => {
    const data = {
      slug,
      comment,
    };
    if (!user) {
      return toast({
        title: "You must be logged in to leave a comment.",
      });
    }
    await postComment(data);
    setComment("");
  };

  const handleReply = (commentId: number) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyContent("");
    } else {
      setReplyingTo(commentId);
      setReplyContent("");
    }
  };

  const submitReply = async (commentId: number) => {
    const data = {
      commentId,
      reply: replyContent,
    };

    if (!user) {
      return toast({
        title: "You must be logged in to reply.",
      });
    }
    await commentReply(data);
    setReplyingTo(null);
    setReplyContent("");
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleLike = async (postId: number) => {
    if (!user) {
      return toast({ title: "You must be logged in to leave a like." });
    }
    setIsLiked(!isLiked);

    await likePost({ postId });
  };

  return (
    <div className="min-h-screen pt-10 ">
      <ScrollProgressBar progress={scrollProgress} />
      <div ref={contentRef} className="container  mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold  mb-4">{data.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href={`/profile/${data.author.id}`}
              className="flex items-center text-gray-600 dark:text-gray-400"
            >
              <User className="h-5 w-5 mr-2" />
              <span className="font-bold">{data.author.name}</span>
            </Link>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{format(data.publishedAt, "MMMM dd, yyyy")}</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {data.minRead} min read
            </div>
          </div>
          <Image
            src={data.featuredImage}
            alt="Blog post featured image"
            width={900}
            height={400}
            className="rounded-lg mb-6 object-cover"
          />
          <div className="prose dark:prose-invert max-w-none mb-6">
            <div
              className="quillContent leading-7"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{data.category.label}</Badge>
          </div>
          <div className="flex items-center space-x-4 mb-8">
            <span className="text-gray-600 dark:text-gray-400">Share:</span>
            <Button asChild variant="outline" size="icon">
              <Link href={facebookShareUrl} target="_blank">
                <Facebook className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href={twitterShareUrl} target="_blank">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href={whatsappShareUrl} target="_blank">
                <MdWhatsapp className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href={linkedInShareUrl} target="_blank">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center space-x-2 mb-8">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={() => handleLike(data.id)}
              className={
                isLiked ? "bg-accentColor hover:bg-accentColor/90" : ""
              }
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatLikes(likeCount)} likes
            </span>
          </div>
        </article>

        <Separator className="my-8" />

        <section className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Comments
          </h2>
          <Card className="mb-4">
            <CardContent className="p-4">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="mb-2"
              />
              <Button
                onClick={() => handleAddComment(data.slug)}
                className="bg-accentColor hover:bg-accentColor/90 w-full"
                disabled={!comment}
              >
                <Send className="h-4 w-4 mr-2" />
                Add Comment {isLoading && <Loader isButton={true} />}
              </Button>
            </CardContent>
          </Card>
          {getComment?.comments?.length === 0 && (
            <div className="flex justify-center items-center h-[50px] text-lg text-gray-400">
              No comments yet.
            </div>
          )}
          {getComment?.comments?.map((comment: IComment) => (
            <Card key={comment.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={comment.user.profile?.avatar || "/male.png"}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {comment.user.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {comment.content}
                    </p>
                    <div className="flex text-sm items-center mt-2 space-x-4">
                      <h3 className="text-gray-600 dark:text-gray-400">
                        {formatDistanceStrict(comment.createdAt, new Date(), {
                          addSuffix: true,
                        })}
                      </h3>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-accentColor "
                        onClick={() => handleReply(comment.id)}
                      >
                        Reply
                      </Button>
                      {comment.replies && comment.replies.length > 0 && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-gray-600 dark:text-gray-400"
                          onClick={() => toggleReplies(comment.id)}
                        >
                          {showReplies[comment.id] ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Hide Replies
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              Show Replies ({comment.replies.length})
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                    {replyingTo === comment.id && (
                      <div className="mt-2">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write your reply..."
                          className="mb-2"
                        />
                        <Button
                          className="bg-accentColor hover:bg-accentColor/90"
                          disabled={!replyContent}
                          onClick={() => submitReply(comment.id)}
                        >
                          Submit Reply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {showReplies[comment.id] &&
                  comment.replies &&
                  comment.replies.length > 0 && (
                    <div className="mt-4 ml-12">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="flex items-start space-x-4 mt-2"
                        >
                          <Avatar>
                            <AvatarImage
                              src={comment.user.profile?.avatar || "/male.png"}
                              alt={reply.user.name}
                            />
                            <AvatarFallback>
                              {reply.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {reply.user.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {reply.content}
                            </p>
                            <h3 className="text-gray-600 text-sm pt-2 dark:text-gray-400">
                              {formatDistanceStrict(
                                reply.createdAt,
                                new Date(),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </section>

        <Separator className="my-8" />

        {relatedPosts?.post[0].post.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts?.post[0].posts.map((relatedPost: RelatedPost) => (
                <Card key={relatedPost.post.id}>
                  <Link href={`/post/view/${relatedPost.post.slug}`}>
                    <CardContent className="p-4">
                      <Image
                        src={relatedPost.post.featuredImage}
                        alt={relatedPost.post.title}
                        width={200}
                        height={100}
                        className="rounded-lg mb-2 w-full object-cover"
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {relatedPost.post.title}
                      </h3>
                      <div className="flex items-center mt-2 text-[14px]">
                        <div className="flex font-bold items-center text-gray-600 dark:text-gray-400">
                          {relatedPost.post.author.name}
                        </div>
                        <Separator
                          orientation="vertical"
                          className="mx-2 h-4"
                        />
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          {format(
                            relatedPost.post.publishedAt,
                            "MMMM dd, yyyy"
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
