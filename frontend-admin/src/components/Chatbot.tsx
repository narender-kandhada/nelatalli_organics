import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API (using the key from environment)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: "Hello! I'm your Nelatalli AI assistant. I can help you with inventory insights, order summaries, or any questions about the portal. How can I assist you today?", 
      timestamp: new Date() 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // System prompt for context
      const systemContext = `You are the Nelatalli Organics Admin Assistant. 
      The user is an administrator of an organic products portal. 
      You have access to simulated insights:
      - Total Revenue: ₹1.2M (+12% this month)
      - Top Product: Wild Forest Honey (840 units sold)
      - Low Stock Alert: Organic Neem Honey (3 units left)
      - Pending Orders: 42
      Be professional, helpful, and use a sophisticated botanical tone. Keep responses concise.`;

      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map(h => ({ role: h.role, parts: h.parts })),
          { role: 'user', parts: [{ text: `${systemContext}\n\nUser: ${input}` }] }
        ],
        config: {
          maxOutputTokens: 500,
        },
      });

      const text = response.text || "I'm sorry, I couldn't generate a response.";

      const botMessage: Message = {
        role: 'bot',
        content: text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "I'm sorry, I encountered an error. Please try again later.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '64px' : '500px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "bg-surface-container-lowest border border-outline-variant/20 shadow-2xl rounded-2xl overflow-hidden mb-4 flex flex-col transition-all duration-300",
              isMinimized ? "w-64" : "w-[380px]"
            )}
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Bot size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">Nelatalli AI</p>
                  <p className="text-[10px] text-stone-400 font-medium">Always active</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-outline-variant/20">
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                        msg.role === 'user' ? "bg-secondary text-primary" : "bg-primary text-white"
                      )}>
                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-sm",
                        msg.role === 'user' 
                          ? "bg-secondary-container text-on-secondary-container rounded-tr-none" 
                          : "bg-surface-container-low text-primary rounded-tl-none border border-outline-variant/10"
                      )}>
                        {msg.content}
                        <p className="text-[9px] mt-1 opacity-50 text-right">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center animate-pulse">
                        <Bot size={14} />
                      </div>
                      <div className="bg-surface-container-low p-3 rounded-2xl rounded-tl-none border border-outline-variant/10 flex gap-1">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-outline-variant/10 bg-surface-container-lowest">
                  <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-4 py-2 ring-1 ring-outline-variant/15 focus-within:ring-secondary transition-all">
                    <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about inventory..."
                      className="flex-1 bg-transparent border-none text-sm focus:ring-0"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="text-secondary hover:scale-110 active:scale-95 transition-all disabled:opacity-30"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {['Revenue insights', 'Low stock items', 'Top products'].map((hint) => (
                      <button 
                        key={hint}
                        onClick={() => setInput(hint)}
                        className="text-[10px] font-bold text-secondary bg-secondary-container/50 px-2 py-1 rounded-full whitespace-nowrap hover:bg-secondary-container transition-colors"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative",
          isOpen ? "bg-secondary text-primary rotate-90" : "bg-primary text-white"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-primary text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-background">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}
