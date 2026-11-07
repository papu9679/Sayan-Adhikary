import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Bot, 
  X, 
  Send
} from 'lucide-react';

export default function AssistantModal() {
  const { isDaylight } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hi! I can help you explore Sayan's portfolio. Ask about his projects, skills, education, or contact details.`,
    },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    "What projects has Sayan built?",
    "What is Sayan's tech stack?",
    "Where did Sayan study?",
    "How can I contact Sayan?",
  ];

  const handleSend = (questionText = input) => {
    if (!questionText.trim()) return;

    const userMsg = { sender: 'user', text: questionText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const lower = questionText.toLowerCase();
      let botReply = '';

      if (lower.includes('project') || lower.includes('built') || lower.includes('work') || lower.includes('app')) {
        botReply = `Sayan has built several full-stack projects:
1. Full-Stack Portfolio: React, Tailwind CSS, Express, and MongoDB with visitor feedback moderation.
2. Assessly: Online assessment platform with automated quizzes via the Gemini API and timed test sessions.
3. Retrieva AI: RAG application that extracts text from PDFs and performs vector search with Pinecone.
4. SlackBridge: Model Context Protocol (MCP) server that connects LLMs to the Slack API.

You can find code links and live demos in the Projects section.`;
      } else if (lower.includes('tech') || lower.includes('skill') || lower.includes('stack') || lower.includes('language')) {
        botReply = `Sayan works primarily with JavaScript and TypeScript:
• Frontend: React, Tailwind CSS, HTML5, Responsive UI.
• Backend: Node.js, Express.js, RESTful APIs, JWT authentication.
• Databases & Cloud: MongoDB, PostgreSQL, Pinecone Vector DB.
• Tools & Integrations: Git, Vite, Gemini API, Model Context Protocol (MCP).`;
      } else if (lower.includes('education') || lower.includes('study') || lower.includes('degree') || lower.includes('college')) {
        botReply = `Sayan completed his B.Tech in Computer Science and Engineering at Sathyabama Institute of Science and Technology (2021-2025). He led web development in his student chapter and was a national finalist in the Smart India Hackathon.`;
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('github') || lower.includes('reach')) {
        botReply = `You can reach Sayan here:
• Email: sayanadhikary.dev@gmail.com
• GitHub: https://github.com/papu9679
• LinkedIn: https://linkedin.com/in/papu9679

You can also leave a note directly on the Feedback Wall below.`;
      } else {
        botReply = `I'm a portfolio assistant focused on Sayan's work. I can answer questions about his projects (Assessly, Retrieva AI, SlackBridge), skills, education, or contact info. Which would you like to know?`;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 350);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all"
        aria-label="Open Portfolio AI Assistant"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline font-bold">Ask Assistant</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
      </button>

      {/* Assistant Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] max-h-[580px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden animate-fadeIn backdrop-blur-xl bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-black/40">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black leading-tight flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <span>Portfolio Assistant</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                    PRD §7
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Instant portfolio guidance
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed max-h-[340px]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm font-medium'
                      : isDaylight
                        ? 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200 font-medium'
                        : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700 font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Question Chips */}
          <div className="px-3 py-2 border-t border-slate-100 dark:border-white/5 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="shrink-0 px-2.5 py-1 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Sayan..."
              className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs font-medium outline-none border focus:ring-1 focus:ring-blue-500 ${
                isDaylight
                  ? 'bg-slate-50 border-slate-300 text-slate-900'
                  : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500'
              }`}
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
