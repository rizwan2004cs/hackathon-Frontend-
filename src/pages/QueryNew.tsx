import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";

interface Message {
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function QueryNew() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      text: "Hello! I'm your AI assistant. Ask me anything about your team's productivity, tasks, or performance metrics.\n\nTry questions like:",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage: Message = {
      type: 'user',
      text: query,
      timestamp
    };

    // Mock AI response
    const aiMessage: Message = {
      type: 'ai',
      text: query.toLowerCase().includes('bug') 
        ? "Currently tracking 15 bugs total. 5 have been closed this week, and 10 are still open."
        : "This is a demonstration of the conversational query interface. In production, this would connect to your backend API with AI-powered natural language processing to answer questions about your team's productivity metrics.",
      timestamp
    };

    setMessages([...messages, userMessage, aiMessage]);
    setQuery("");
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <Card className="shadow-card bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Conversational Query Interface</h3>
              <p className="text-sm text-muted-foreground">Ask questions about your team's productivity in natural language</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-[500px] overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs mt-2 opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything about your team's productivity..."
              className="flex-1 bg-background"
            />
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
