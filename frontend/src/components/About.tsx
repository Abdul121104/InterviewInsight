import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt="Tech Interview"
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                InterviewInsight
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                InterviewInsight is a platform designed to help tech professionals prepare for their interviews through real experiences and AI-powered insights. Our community shares detailed interview experiences, including questions asked, technical challenges, and valuable feedback. Whether you're preparing for your first tech interview or looking to advance your career, InterviewInsight provides the resources and support you need to succeed.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
