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
import { format } from "date-fns";
import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  useCommentReplyMutation,
  useGetCommentQuery,
  useLikePostMutation,
  usePostCommentMutation,
} from "@/state/api/post/postApi";
import Loader from "@/components/Loader/Loader";
import { useToast } from "@/hooks/use-toast";
import { format as ago } from "timeago.js";
import { useSelector } from "react-redux";
import { getLoggedUser } from "@/state/api/auth/authSlice";

interface Props {
  data: IPost;
}

export default function SingleBlogPost({ data }: Props) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const { data: getComment } = useGetCommentQuery(data.slug);
  const [postComment, { isLoading, isSuccess }] = usePostCommentMutation();
  const [commentReply] = useCommentReplyMutation();
  const [likePost] = useLikePostMutation();
  const user = useSelector(getLoggedUser);
  console.log(data);
  const url = window.location.href;
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

  const post = {
    title: "The Future of Artificial Intelligence: Promises and Perils",
    author: "Jane Doe",
    date: "May 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=800",
    content: `Artificial Intelligence (AI) has become an integral part of our daily lives, revolutionizing industries and reshaping the way we interact with technology. As we stand on the brink of a new era, it's crucial to examine both the promises and perils that AI presents to our society.

    The Promises of AI:
    
    1. Enhanced Efficiency: AI has the potential to automate repetitive tasks, freeing up human resources for more creative and complex problem-solving.
    
    2. Medical Breakthroughs: AI-powered systems can analyze vast amounts of medical data, potentially leading to faster diagnoses and more effective treatments.
    
    3. Environmental Conservation: AI can help optimize resource usage, predict natural disasters, and contribute to sustainable practices.
    
    4. Personalized Experiences: From content recommendations to customized learning paths, AI can tailor experiences to individual preferences and needs.
    
    The Perils of AI:
    
    1. Job Displacement: As AI becomes more advanced, there's a risk of widespread job losses in certain sectors.
    
    2. Privacy Concerns: The vast amount of data required to train AI systems raises questions about data privacy and security.
    
    3. Algorithmic Bias: AI systems can perpetuate and amplify existing biases if not carefully designed and monitored.
    
    4. Ethical Dilemmas: As AI becomes more autonomous, we face complex ethical questions about decision-making and accountability.
    
    Conclusion:
    
    The future of AI is both exciting and challenging. As we continue to develop and implement AI technologies, it's crucial that we do so with careful consideration of their impact on society. By addressing the potential perils proactively and harnessing the promises responsibly, we can work towards a future where AI truly benefits humanity as a whole.`,
    tags: ["Artificial Intelligence", "Technology", "Ethics", "Future"],
    comments: [
      {
        id: 1,
        author: "John Smith",
        content:
          "Great article! I'm particularly interested in the ethical implications of AI decision-making.",
        avatar: "/placeholder.svg?height=40&width=40",
        replies: [
          {
            id: 2,
            author: "Jane Doe",
            content:
              "Thank you, John! The ethical implications are indeed a crucial aspect to consider. We need to ensure that AI systems are designed with strong ethical guidelines.",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 3,
            author: "Alex Johnson",
            content:
              "I agree with both of you. Perhaps we could establish an international ethics board for AI development?",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        id: 4,
        author: "Emily Brown",
        content:
          "I'd love to see more discussion on how we can mitigate job displacement as AI advances.",
        avatar: "/placeholder.svg?height=40&width=40",
        replies: [
          {
            id: 5,
            author: "Michael Lee",
            content:
              "Great point, Emily. We should focus on reskilling programs and creating new job categories that complement AI rather than compete with it.",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 6,
            author: "Sarah Parker",
            content:
              "Education systems need to adapt quickly to prepare the workforce for an AI-driven future.",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
    ],
    relatedPosts: [
      {
        title: "Machine Learning: A Beginner's Guide",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        title: "The Role of AI in Climate Change Mitigation",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        title: "Ethical Considerations in AI Development",
        image: "/placeholder.svg?height=100&width=200",
      },
    ],
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Thanks for the comment." });
    }
  }, [isSuccess, toast]);

  useEffect(() => {
    const isPostLiked = data.likes.find((like) => like.userId === user.id);
    setIsLiked(isPostLiked ? true : false);
  }, [data, user]);

  const handleAddComment = async (slug: string) => {
    const data = {
      slug,
      comment,
    };
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
    await commentReply(data);
    setReplyingTo(null);
    setReplyContent("");
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleLike = async (postId: number) => {
    setIsLiked(!isLiked);
    await likePost({ postId });
    console.log(`Post ${isLiked ? "unliked" : "liked"}`);
  };

  return (
    <div className="min-h-screen pt-10 ">
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold  mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <User className="h-5 w-5 mr-2" />
              <span>{data.author.name}</span>
            </div>
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
            {data.categories.map((cat) => (
              <Badge key={cat.category.id} variant="secondary">
                {cat.category.label}
              </Badge>
            ))}
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
              className={isLiked ? "bg-fuchsia-600 hover:bg-fuchsia-700" : ""}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {data.likes.length} likes
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
                className="w-full"
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
                        {ago(comment.createdAt, "en_US")}
                      </h3>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-fuchsia-600 dark:text-fuchsia-400"
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
                        <Button onClick={() => submitReply(comment.id)}>
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
                              {ago(reply.createdAt, "en_US")}
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

        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {post.relatedPosts.map((relatedPost, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    width={200}
                    height={100}
                    className="rounded-lg mb-2 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {relatedPost.title}
                  </h3>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-fuchsia-600 dark:text-fuchsia-400"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
