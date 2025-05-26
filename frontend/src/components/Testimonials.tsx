import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "Sarah Chen",
    userName: "Software Engineer @ Google",
    comment: "InterviewInsight helped me prepare for my Google interview. The real experiences shared by others gave me valuable insights into what to expect. The AI chatbot was particularly helpful for practicing my responses!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Michael Rodriguez",
    userName: "Senior Developer @ Amazon",
    comment: "As someone who interviews candidates regularly, I appreciate the platform's focus on real experiences. It's helped me improve my interviewing skills from both sides of the table.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Priya Patel",
    userName: "Frontend Developer @ Microsoft",
    comment: "The community aspect of InterviewInsight is amazing. I've connected with other developers, shared my experiences, and learned so much from others' interview journeys. The AI feedback is incredibly detailed and helpful.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "David Kim",
    userName: "Tech Lead @ Meta",
    comment: "What sets InterviewInsight apart is the combination of real experiences and AI-powered practice. It's like having a personal interview coach available 24/7. Highly recommended for anyone in tech!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Emma Wilson",
    userName: "Full Stack Developer @ Stripe",
    comment: "I used InterviewInsight to prepare for my Stripe interview. The platform's insights about company-specific interview processes were spot on. The AI chatbot helped me refine my answers significantly.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Alex Thompson",
    userName: "Backend Engineer @ Uber",
    comment: "The detailed interview experiences and the AI practice sessions were invaluable for my interview preparation. I landed my dream job at Uber thanks to the insights and practice I got from this platform.",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        Success Stories from
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Tech Professionals{" "}
        </span>
        Who Used InterviewInsight
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Join thousands of tech professionals who have successfully prepared for their interviews and advanced their careers with InterviewInsight.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt={name}
                    src={image}
                  />
                  <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
