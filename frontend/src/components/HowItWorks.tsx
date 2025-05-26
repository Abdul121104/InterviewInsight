import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Create Your Profile",
    description:
      "Sign up and create your professional profile. Add your experience level, target roles, and areas of interest to get personalized interview preparation content.",
  },
  {
    icon: <MapIcon />,
    title: "Explore Experiences",
    description:
      "Browse through real interview experiences shared by tech professionals. Filter by company, role, or experience level to find relevant insights for your preparation.",
  },
  {
    icon: <PlaneIcon />,
    title: "Practice with AI",
    description:
      "Use our AI chatbot to practice interview questions, get instant feedback, and improve your responses. The AI adapts to your experience level and target role.",
  },
  {
    icon: <GiftIcon />,
    title: "Share & Learn",
    description:
      "Share your own interview experiences to help others and build your professional network. Earn recognition and contribute to the tech community's growth.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Get started with InterviewInsight in four simple steps and begin your journey to interview success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
