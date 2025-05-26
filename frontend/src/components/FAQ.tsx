import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How can InterviewInsight help me prepare for interviews?",
    answer: "InterviewInsight provides real interview experiences from tech professionals, an AI-powered chatbot for practice, and a supportive community where you can learn from others' experiences. You can read detailed interview stories, get instant feedback on your responses, and connect with other professionals in your field.",
    value: "item-1",
  },
  {
    question: "Is the AI chatbot available 24/7?",
    answer: "Yes, our AI chatbot is available 24/7 to help you practice interview questions and receive instant feedback. You can use it to simulate interview scenarios, get suggestions for improving your answers, and learn from its responses.",
    value: "item-2",
  },
  {
    question: "How do I share my interview experience?",
    answer: "You can share your interview experience by clicking on the 'Post Interview' button in the navigation bar. You'll be guided through a simple form where you can provide details about the company, role, interview process, questions asked, and your overall experience. Your contribution helps others in the community prepare better.",
    value: "item-3",
  },
  {
    question: "Is my personal information kept private?",
    answer: "Yes, we take privacy seriously. When sharing interview experiences, you can choose to remain anonymous. We never share your personal information with third parties, and you have full control over what information you want to make public.",
    value: "item-4",
  },
  {
    question: "Can I get personalized interview preparation advice?",
    answer: "Yes, our AI chatbot can provide personalized advice based on your specific situation, target role, and experience level. Additionally, you can connect with other community members who have experience in your target companies or roles for more specific guidance.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="/contact"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
