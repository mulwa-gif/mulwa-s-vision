import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SubjectAssistantProps {
  subject: "chemistry" | "physics";
  isOpen: boolean;
  onClose: () => void;
}

export const SubjectAssistant = ({ subject, isOpen, onClose }: SubjectAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hello! I'm your ${subject === "chemistry" ? "Chemistry" : "Physics"} tutor. Ask me any question about ${subject === "chemistry" ? "chemistry concepts, reactions, elements, or experiments" : "physics concepts, formulas, experiments, or problem solving"}. I'm here to help you understand the KLB Kenya syllabus better!`
        }
      ]);
    }
  }, [isOpen, subject]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke("subject-assistant", {
        body: { 
          message: userMessage, 
          subject,
          history: messages.slice(-10)
        }
      });

      if (response.error) throw response.error;

      const assistantMessage = response.data?.response || "I apologize, but I couldn't process your question. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I encountered an error. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[600px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`p-4 flex items-center justify-between ${subject === "chemistry" ? "bg-emerald-500/10" : "bg-blue-500/10"}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${subject === "chemistry" ? "bg-emerald-500/20" : "bg-blue-500/20"}`}>
              <Sparkles className={`w-5 h-5 ${subject === "chemistry" ? "text-emerald-400" : "text-blue-400"}`} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">
                {subject === "chemistry" ? "Chemistry" : "Physics"} AI Tutor
              </h3>
              <p className="text-xs text-muted-foreground">KLB Kenya Syllabus Expert</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${subject === "chemistry" ? "bg-emerald-500/20" : "bg-blue-500/20"}`}>
                  <Bot className={`w-4 h-4 ${subject === "chemistry" ? "text-emerald-400" : "text-blue-400"}`} />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-accent text-primary rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-accent" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${subject === "chemistry" ? "bg-emerald-500/20" : "bg-blue-500/20"}`}>
                <Bot className={`w-4 h-4 ${subject === "chemistry" ? "text-emerald-400" : "text-blue-400"}`} />
              </div>
              <div className="bg-secondary p-3 rounded-2xl rounded-bl-sm">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Ask about ${subject}...`}
              className="flex-1 px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={`${subject === "chemistry" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
