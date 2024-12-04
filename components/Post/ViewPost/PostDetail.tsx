"use client";
import Image from "next/image";
import {
  Calendar,
  User,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IPost } from "@/types/types";
import { format } from "date-fns";
import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Props {
  data: IPost;
}

export default function SingleBlogPost({ data }: Props) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );
  console.log(data);
  const url = window.location.href;
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

  const handleReply = (commentId: number) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyContent("");
    } else {
      setReplyingTo(commentId);
      setReplyContent("");
    }
  };

  const submitReply = (commentId: number) => {
    console.log(`Submitting reply to comment ${commentId}: ${replyContent}`);
    setReplyingTo(null);
    setReplyContent("");
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
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
        </article>

        <Separator className="my-8" />

        <section className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Comments
          </h2>
          {post.comments.map((comment) => (
            <Card key={comment.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {comment.author}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {comment.content}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
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
                              src={reply.avatar}
                              alt={reply.author}
                            />
                            <AvatarFallback>{reply.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {reply.author}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
          <Button className="mt-4">
            <MessageCircle className="mr-2 h-4 w-4" /> Add Comment
          </Button>
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
