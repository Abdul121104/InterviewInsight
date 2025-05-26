import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Real Interview Experiences",
    description:
      "Access a vast collection of real interview experiences from tech professionals. Learn from others' successes and challenges to better prepare for your interviews.",
    image: image4,
  },
  {
    title: "AI-Powered Chatbot",
    description:
      "Get instant answers to your interview questions and receive personalized feedback through our advanced AI chatbot. Practice your responses and improve your interview skills.",
    image: image3,
  },
  {
    title: "Community Insights",
    description:
      "Join a community of tech professionals sharing their interview experiences. Get valuable insights, tips, and strategies to help you succeed in your tech career.",
    image: image,
  },
];

const featureList: string[] = [
  "Interview Experiences",
  "AI Chatbot",
  "Community Support",
  "Real-time Feedback",
  "Interview Tips",
  "Company Insights",
  "Career Growth",
  "Success Stories",
  "Expert Advice",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Powerful{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt={title}
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
