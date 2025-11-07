import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { sendQuery } from "@/lib/api";

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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage: Message = {
      type: 'user',
      text: query,
      timestamp
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      // Call the API
      const response = await sendQuery(query);

      // Add AI response
      const aiMessage: Message = {
        type: 'ai',
        text: response.answer || "I received your question but couldn't generate a proper response. Please try rephrasing your question.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      
      // Add error message
      const errorMessage: Message = {
        type: 'ai',
        text: "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto animate-fade-in">
      <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
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
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
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
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="max-w-[80%] rounded-lg px-4 py-3 bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything about your team's productivity..."
              className="flex-1 bg-background"
              disabled={isLoading}
            />
            <Button type="submit" className="gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Thinking...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
