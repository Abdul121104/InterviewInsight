import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// Types
interface Interview {
  _id: string;
  companyName: string;
  jobRole: string;
  techStack: string[];
  experienceLevel: string;
  interviewDifficulty: 'easy' | 'medium' | 'hard';
  interviewMode: string;
  interviewRoundsCount: number;
  wasOfferExtended: boolean;
  ctcOrStipend?: string;
  createdAt: string;
  viewCount: number;
  interviewQA: string;
  preparationSuggestions: string;
  anonymous: boolean;
  contactDetails?: {
    linkedin?: string;
    email?: string;
  };
}

interface Filters {
  company: string;
  role: string;
  experienceLevel: string;
  difficulty: string;
  offerExtended: string;
  sortBy: string;
}

// Modal (shadcn style, simple implementation)
const Modal = ({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold"></button>
        {children}
      </div>
    </div>
  );
};

// Sidebar Filters
const SidebarFilters = ({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) => (
  <aside className="w-full md:w-64 bg-muted/50 p-4 rounded-lg mb-6 md:mb-0 md:mr-6 self-start">
    <h3 className="font-bold text-lg mb-4">Filters</h3>
    
    <div className="mb-4">
      <label className="block text-sm mb-1">Sort By</label>
      <Select
        value={filters.sortBy}
        onValueChange={(value: string) => setFilters((f) => ({ ...f, sortBy: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mostRecent">Most Recent</SelectItem>
          <SelectItem value="mostViews">Most Views</SelectItem>
          <SelectItem value="mostDifficult">Most Difficult</SelectItem>
          <SelectItem value="easiest">Easiest</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="mb-4">
      <label className="block text-sm mb-1">Company</label>
      <Input
        placeholder="e.g. Google"
        value={filters.company}
        onChange={e => setFilters((f: any) => ({ ...f, company: e.target.value }))}
      />
    </div>
    
    <div className="mb-4">
      <label className="block text-sm mb-1">Job Role</label>
      <Input
        placeholder="e.g. Frontend Developer"
        value={filters.role}
        onChange={e => setFilters((f: any) => ({ ...f, role: e.target.value }))}
      />
    </div>
    
    <div className="mb-4">
      <label className="block text-sm mb-1">Experience Level</label>
      <Select
        value={filters.experienceLevel}
        onValueChange={(value: string) => setFilters((f) => ({ ...f, experienceLevel: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="All levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-2 years">0-2 years</SelectItem>
          <SelectItem value="2-5 years">2-5 years</SelectItem>
          <SelectItem value="5+ years">5+ years</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    <div className="mb-4">
      <label className="block text-sm mb-1">Interview Difficulty</label>
      <Select
        value={filters.difficulty}
        onValueChange={(value: string) => setFilters((f) => ({ ...f, difficulty: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="All difficulties" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    <div className="mb-4">
      <label className="block text-sm mb-1">Offer Extended</label>
      <Select
        value={filters.offerExtended}
        onValueChange={(value: string) => setFilters((f) => ({ ...f, offerExtended: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Button className="w-full" variant="secondary" onClick={() => setFilters({
      company: '',
      role: '',
      experienceLevel: '',
      difficulty: '',
      offerExtended: '',
      sortBy: ''
    })}>
      Clear Filters
    </Button>
  </aside>
);

// Interview Card
const InterviewCard = ({ interview, onClick }: { interview: Interview; onClick: () => void }) => (
  <Card className="hover:shadow-lg transition cursor-pointer" onClick={onClick}>
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>{interview.companyName}</span>
        <Badge variant="secondary">{interview.jobRole}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-3">
        {interview.techStack?.slice(0, 3).map((tech: string, idx: number) => (
          <Badge key={idx} variant="outline">{tech}</Badge>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        <div>Experience: {interview.experienceLevel}</div>
        <div>Difficulty: {interview.interviewDifficulty}</div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <span className="text-xs text-muted-foreground">
        {new Date(interview.createdAt).toLocaleDateString()}
      </span>
      <span className="text-xs text-muted-foreground">
        {interview.viewCount} views
      </span>
    </CardFooter>
  </Card>
);

// Main Page
const ViewInterviews: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<Filters>({
    company: '',
    role: '',
    experienceLevel: '',
    difficulty: '',
    offerExtended: '',
    sortBy: ''
  });
  const [selected, setSelected] = useState<Interview | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const base = import.meta.env.VITE_Base_api || process.env.Base_api || "http://localhost:4000";
        const res = await fetch(`${base}/api/interviews`);
        if (!res.ok) throw new Error("Failed to fetch interviews");
        const data = await res.json();
        setInterviews(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = async (interview: Interview) => {
    try {
      const base = import.meta.env.VITE_Base_api || process.env.Base_api || "http://localhost:4000";
      // Call the endpoint to increment views
      await fetch(`${base}/api/interviews/${interview._id}`, {
        method: 'GET'
      });
      
      // Update the local state to reflect the view count increment
      setInterviews(prev => prev.map(i => 
        i._id === interview._id ? { ...i, viewCount: i.viewCount + 1 } : i
      ));
      
      setSelected(interview);
    } catch (err) {
      console.error("Failed to increment view count", err);
      setSelected(interview);
    }
  };

  const filtered = interviews.filter(i =>
    (!filters.company || i.companyName?.toLowerCase().includes(filters.company.toLowerCase())) &&
    (!filters.role || i.jobRole?.toLowerCase().includes(filters.role.toLowerCase())) &&
    (!filters.experienceLevel || i.experienceLevel === filters.experienceLevel) &&
    (!filters.difficulty || i.interviewDifficulty === filters.difficulty) &&
    (filters.offerExtended === '' || 
      (filters.offerExtended === 'yes' && i.wasOfferExtended) || 
      (filters.offerExtended === 'no' && !i.wasOfferExtended))
  );

  // Apply sorting
  const sorted = [...filtered].sort((a, b) => {
    if (filters.sortBy === 'mostRecent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (filters.sortBy === 'mostViews') {
      return b.viewCount - a.viewCount;
    } else if (filters.sortBy === 'mostDifficult') {
      const difficultyOrder: Record<string, number> = { 'hard': 3, 'medium': 2, 'easy': 1 };
      return difficultyOrder[b.interviewDifficulty] - difficultyOrder[a.interviewDifficulty];
    } else if (filters.sortBy === 'easiest') {
      const difficultyOrder: Record<string, number> = { 'hard': 3, 'medium': 2, 'easy': 1 };
      return difficultyOrder[a.interviewDifficulty] - difficultyOrder[b.interviewDifficulty];
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto flex flex-col md:flex-row gap-6 pt-8">
        <SidebarFilters filters={filters} setFilters={setFilters} />
        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-6">View Interviews</h1>
          {loading && <div>Loading interviews...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.length === 0 && <div>No interviews found.</div>}
              {sorted.map((interview, idx) => (
                <InterviewCard 
                  key={interview._id || idx} 
                  interview={interview} 
                  onClick={() => handleCardClick(interview)} 
                />
              ))}
            </div>
          )}
        </main>
      </div>
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{selected.companyName} - {selected.jobRole}</h2>
            <div className="text-muted-foreground text-sm">
              Posted on: {new Date(selected.createdAt).toLocaleString()} | {selected.viewCount} views
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Experience Level</h3>
                <p>{selected.experienceLevel}</p>
              </div>
              <div>
                <h3 className="font-semibold">Interview Difficulty</h3>
                <p>{selected.interviewDifficulty}</p>
              </div>
              <div>
                <h3 className="font-semibold">Interview Mode</h3>
                <p>{selected.interviewMode}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rounds</h3>
                <p>{selected.interviewRoundsCount}</p>
              </div>
              <div>
                <h3 className="font-semibold">Offer Extended</h3>
                <p>{selected.wasOfferExtended ? 'Yes' : 'No'}</p>
              </div>
              {selected.wasOfferExtended && (
                <div>
                  <h3 className="font-semibold">CTC/Stipend</h3>
                  <p>{selected.ctcOrStipend}</p>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {selected.techStack?.map((tech: string, idx: number) => (
                  <Badge key={idx} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold">Interview Questions & Answers</h3>
              <div className="whitespace-pre-line bg-muted/50 p-4 rounded">
                {selected.interviewQA}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold">Preparation Suggestions</h3>
              <div className="whitespace-pre-line bg-muted/50 p-4 rounded">
                {selected.preparationSuggestions}
              </div>
            </div>
            
            {!selected.anonymous && selected.contactDetails && (
              <div>
                <h3 className="font-semibold">Contact Details</h3>
                <div className="flex gap-4">
                  {selected.contactDetails.linkedin && (
                    <a href={selected.contactDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      LinkedIn
                    </a>
                  )}
                  {selected.contactDetails.email && (
                    <a href={`mailto:${selected.contactDetails.email}`} className="text-blue-500 hover:underline">
                      Email
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewInterviews;