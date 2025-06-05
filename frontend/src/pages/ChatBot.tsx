import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Interview {
  companyName: string;
  jobRole: string;
  techStack: string[];
  interviewQA: string;
  preparationSuggestions: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Interview Prep Assistant 🤖.\nPlease enter the *company name* and *job role* you're interested in.\n\nFor example: `Google, Software Engineer Intern`",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchInterviews = async (companyName: string) => {
    try {
      const base =
        import.meta.env.VITE_Base_api ||
        process.env.Base_api ||
        "http://localhost:4000";
      const response = await fetch(`${base}/api/interviews`);
      const data = await response.json();
      const filteredInterviews = data.filter((interview: Interview) =>
        interview.companyName.toLowerCase().includes(companyName.toLowerCase())
      );
      setInterviews(filteredInterviews);
      return filteredInterviews;
    } catch (error) {
      console.error("Error fetching interviews:", error);
      return [];
    }
  };

  const sanitizeGeminiText = (text: string) => {
    return text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/\"/g, "");
  };

  const getGeminiResponse = async (prompt: string, context: Interview[]) => {
    prompt;
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Based on these interview experiences: ${JSON.stringify(
                    context
                  )}, please generate a structured interview prep guide in the following format:

            1. Role Overview
            2. Preparation Tips (as bullet points)
            3. Common Interview Questions (as numbered list) and DSA or anyother question search it from web for that role
            4. Suggested Resources

              Do not use markdown formatting such as ** or * or quotation marks. Output plain clean text.`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      return sanitizeGeminiText(
        data.candidates?.[0]?.content?.parts?.[0]?.text || ""
      );
    } catch (error) {
      console.error("Error getting Gemini response:", error);
      return "I apologize, but I'm having trouble processing your request right now.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      if (messages.length === 1) {
        const [companyNameRaw, jobRoleRaw] = userMessage.split(",");
        const companyName = companyNameRaw?.trim() || "";
        const jobRole = jobRoleRaw?.trim() || "";

        if (!companyName || !jobRole) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Please enter both the *company name* and *job role* separated by a comma. Example: `Google, Software Engineer Intern`",
            },
          ]);
          setLoading(false);
          return;
        }

        const companyInterviews = await fetchInterviews(companyName);
        if (companyInterviews.length > 0) {
          const prompt = `I'm preparing for the role of ${jobRole} at ${companyName}.`;
          const response = await getGeminiResponse(prompt, companyInterviews);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: response },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "I couldn't find any interview experiences for that company. Could you try another company name?",
            },
          ]);
        }
      } else {
        // Follow-up queries
        const response = await getGeminiResponse(userMessage, interviews);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response },
        ]);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble processing your request right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            Interview Prep Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[650px] overflow-y-auto mb-3 space-y-4 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 text-xl whitespace-pre-wrap ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
