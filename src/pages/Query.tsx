import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";

const exampleQuestions = [
  "What's our team's average completion rate this week?",
  "Show me the blocked tasks",
  "Which team member is most productive?",
  "What's the trend for task creation?",
  "Are we on track to meet our sprint goals?",
];

export default function Query() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<Array<{ question: string; answer: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Mock AI response - in production, this would call an API
    const mockResponse = {
      question: query,
      answer: "This is a demonstration of the conversational query interface. In production, this would connect to your backend API with AI-powered natural language processing to answer questions about your team's productivity metrics.",
    };

    setResponses([...responses, mockResponse]);
    setQuery("");
  };

  const handleExampleClick = (question: string) => {
    setQuery(question);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Conversational Query</h1>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Ask questions about your team's productivity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Example Questions */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Try questions like:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Response History */}
          {responses.length > 0 && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {responses.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm font-semibold text-primary">You asked:</p>
                    <p className="text-sm mt-1">{item.question}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-foreground">AI Response:</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Query Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about your team's productivity..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {responses.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Start by asking a question about your team's productivity
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
