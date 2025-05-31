import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Image as ImageIcon, Underline as UnderlineIcon, Highlighter } from "lucide-react";

const experienceLevels = [
  "intern",
  "0-2 years",
  "2-5 years",
  "5-7 years",
  "7-10 years",
  "10+ years",
];
const locations = ["remote", "onsite", "hybrid"];
const difficulties = ["easy", "medium", "hard"];
const modes = ["online", "offline", "telephonic"];

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-2 bg-background">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-muted" : ""}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-muted" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-muted" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = window.prompt("Enter the URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={editor.isActive("link") ? "bg-muted" : ""}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = window.prompt("Enter the image URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "bg-muted" : ""}
      >
        <Highlighter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function SubmitInterview() {
<<<<<<< HEAD
  const { token } = useAuth();
=======
  const { isAuthenticated, token } = useAuth();
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

<<<<<<< HEAD
=======
  // Redirect if not logged in
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
  const [form, setForm] = useState({
    companyName: "",
    jobRole: "",
    experienceLevel: "",
    techStack: "",
    tags: "",
    contactLinkedin: "",
    contactEmail: "",
    dateOfInterview: "",
    location: "",
    interviewRoundsCount: "",
    interviewDifficulty: "",
    interviewMode: "",
    wasOfferExtended: false,
    ctcOrStipend: "",
    anonymous: false,
  });

  const qaEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      Highlight,
      Placeholder.configure({
        placeholder: "Describe the interview Q&A...",
      }),
    ],
    content: "",
  });
  const prepEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      Highlight,
      Placeholder.configure({
        placeholder: "Preparation suggestions (use bullet points, etc.)...",
      }),
    ],
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelect = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!form.jobRole.trim()) {
      newErrors.jobRole = "Job role is required";
    }
    if (!form.experienceLevel) {
      newErrors.experienceLevel = "Experience level is required";
    }
    if (!form.techStack.trim()) {
      newErrors.techStack = "Tech stack is required";
    }
    if (!form.interviewRoundsCount) {
      newErrors.interviewRoundsCount = "Number of interview rounds is required";
    }
    if (!form.interviewDifficulty) {
      newErrors.interviewDifficulty = "Interview difficulty is required";
    }
    if (!form.interviewMode) {
      newErrors.interviewMode = "Interview mode is required";
    }
    if (!qaEditor?.getText().trim()) {
      newErrors.interviewQA = "Interview Q&A is required";
    }
    if (!prepEditor?.getText().trim()) {
      newErrors.preparationSuggestions = "Preparation suggestions are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaEditor || !prepEditor) return;

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
<<<<<<< HEAD
      interviewQA: qaEditor.getText(),
      preparationSuggestions: prepEditor.getText(),
=======
      interviewQA: qaEditor.getHTML(),
      preparationSuggestions: prepEditor.getHTML(),
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
      contactDetails: {
        linkedin: form.contactLinkedin,
        email: form.contactEmail,
      },
      interviewRoundsCount: form.interviewRoundsCount ? Number(form.interviewRoundsCount) : undefined,
      dateOfInterview: form.dateOfInterview ? new Date(form.dateOfInterview) : undefined,
    };

    try {
<<<<<<< HEAD
      const base = import.meta.env.VITE_Base_api || process.env.Base_api;
      const res = await fetch(`${base}/api/interviews`, {
=======
      const res = await fetch("http://localhost:4000/api/interviews", {
>>>>>>> 4f7cb7cc16ec613363ab8ee727449f0a90683ae8
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit interview experience");
      }

      toast({ title: "Success!", description: "Interview experience submitted." });
      navigate("/");
    } catch (err) {
      toast({ 
        title: "Error", 
        description: err instanceof Error ? err.message : "Something went wrong", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Submit Interview Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input 
                    name="companyName" 
                    value={form.companyName} 
                    onChange={handleChange} 
                    required 
                    className={errors.companyName ? "border-red-500" : ""}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-red-500">{errors.companyName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Job Role</Label>
                  <Input 
                    name="jobRole" 
                    value={form.jobRole} 
                    onChange={handleChange} 
                    required 
                    className={errors.jobRole ? "border-red-500" : ""}
                  />
                  {errors.jobRole && (
                    <p className="text-sm text-red-500">{errors.jobRole}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select 
                    onValueChange={(v) => handleSelect("experienceLevel", v)} 
                    value={form.experienceLevel}
                  >
                    <SelectTrigger className={errors.experienceLevel ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experienceLevel && (
                    <p className="text-sm text-red-500">{errors.experienceLevel}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tech Stack (comma separated)</Label>
                  <Input 
                    name="techStack" 
                    value={form.techStack} 
                    onChange={handleChange} 
                    required 
                    className={errors.techStack ? "border-red-500" : ""}
                  />
                  {errors.techStack && (
                    <p className="text-sm text-red-500">{errors.techStack}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tags (comma separated)</Label>
                  <Input name="tags" value={form.tags} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn (optional)</Label>
                  <Input name="contactLinkedin" value={form.contactLinkedin} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Email (optional)</Label>
                  <Input name="contactEmail" value={form.contactEmail} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Date of Interview</Label>
                  <Input name="dateOfInterview" type="date" value={form.dateOfInterview} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select 
                    onValueChange={(v) => handleSelect("location", v)} 
                    value={form.location}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Interview Rounds Count</Label>
                  <Input 
                    name="interviewRoundsCount" 
                    type="number" 
                    value={form.interviewRoundsCount} 
                    onChange={handleChange} 
                    min={1} 
                    required
                    className={errors.interviewRoundsCount ? "border-red-500" : ""}
                  />
                  {errors.interviewRoundsCount && (
                    <p className="text-sm text-red-500">{errors.interviewRoundsCount}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Interview Difficulty</Label>
                  <Select 
                    onValueChange={(v) => handleSelect("interviewDifficulty", v)} 
                    value={form.interviewDifficulty}
                  >
                    <SelectTrigger className={errors.interviewDifficulty ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.interviewDifficulty && (
                    <p className="text-sm text-red-500">{errors.interviewDifficulty}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Interview Mode</Label>
                  <Select 
                    onValueChange={(v) => handleSelect("interviewMode", v)} 
                    value={form.interviewMode}
                  >
                    <SelectTrigger className={errors.interviewMode ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {modes.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.interviewMode && (
                    <p className="text-sm text-red-500">{errors.interviewMode}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="wasOfferExtended" 
                    name="wasOfferExtended" 
                    checked={form.wasOfferExtended} 
                    onCheckedChange={(v: boolean) => setForm(f => ({ ...f, wasOfferExtended: !!v }))} 
                  />
                  <Label htmlFor="wasOfferExtended">Offer Extended?</Label>
                </div>
                <div className="space-y-2">
                  <Label>CTC or Stipend</Label>
                  <Input name="ctcOrStipend" value={form.ctcOrStipend} onChange={handleChange} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="anonymous" 
                    name="anonymous" 
                    checked={form.anonymous} 
                    onCheckedChange={(v: boolean) => setForm(f => ({ ...f, anonymous: !!v }))} 
                  />
                  <Label htmlFor="anonymous">Submit as Anonymous?</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Interview Q&amp;A</Label>
                  <div className={`border rounded-lg overflow-hidden bg-background ${errors.interviewQA ? "border-red-500" : ""}`}>
                    <MenuBar editor={qaEditor} />
                    <div className="p-4">
                      <EditorContent editor={qaEditor} className="prose dark:prose-invert max-w-none" />
                    </div>
                  </div>
                  {errors.interviewQA && (
                    <p className="text-sm text-red-500">{errors.interviewQA}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Preparation Suggestions</Label>
                  <div className={`border rounded-lg overflow-hidden bg-background ${errors.preparationSuggestions ? "border-red-500" : ""}`}>
                    <MenuBar editor={prepEditor} />
                    <div className="p-4">
                      <EditorContent editor={prepEditor} className="prose dark:prose-invert max-w-none" />
                    </div>
                  </div>
                  {errors.preparationSuggestions && (
                    <p className="text-sm text-red-500">{errors.preparationSuggestions}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Interview Experience"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 