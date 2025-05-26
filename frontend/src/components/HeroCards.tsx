import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin, MessageSquare, Users, Brain } from "lucide-react";
import profilePic from "../assets/pic.png";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 w-full justify-center items-stretch">
      {/* Testimonial */}

      {/* Team */}
      <Card className="w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src={profilePic}
            alt="Abdul Rahman"
            className="grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
            style={{ marginTop: '-48px' }}
          />
          <CardTitle className="text-center">Abdul Rahman</CardTitle>
          <CardDescription className="font-normal text-primary">
            Head Of Development
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            Leading the development of our AI-powered interview preparation system to help tech professionals succeed in their careers.
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/abdul-rahman-0a7191234/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Features */}
      <Card className="w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10 flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Key Features
            <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              Popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">AI-Powered</span>
            <span className="text-muted-foreground"> Practice</span>
          </div>

          <CardDescription>
            Get personalized interview preparation with our advanced AI system.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Try Now</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {[
              "Real-time Feedback",
              "Company-specific Prep",
              "24/7 Availability"
            ].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="w-[350px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 flex flex-col justify-between">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <CardTitle>Smart Interview Prep</CardTitle>
            <CardDescription className="text-md mt-2">
              Our AI analyzes thousands of real interview experiences to provide you with the most relevant preparation materials and feedback.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
