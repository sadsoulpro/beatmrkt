import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Mic, CheckCheck, ChevronLeft } from 'lucide-react';

const MOCK_CHATS = [
  {
    id: 1,
    user: 'CyberSound',
    avatar: 'https://picsum.photos/seed/producer_avatar/100/100',
    lastMessage: 'Yo, just sent over the stems for Neon Nights.',
    time: '2m ago',
    unread: 2,
    online: true,
    role: 'Producer'
  },
  {
    id: 2,
    user: 'Drake Fan 22',
    avatar: 'https://picsum.photos/seed/artist2/100/100',
    lastMessage: 'Can you do a custom deal for 3 beats?',
    time: '1h ago',
    unread: 0,
    online: false,
    role: 'Artist'
  },
  {
    id: 3,
    user: 'HeavyHitter',
    avatar: 'https://picsum.photos/seed/producer2/100/100',
    lastMessage: 'Collab on the next pack?',
    time: '1d ago',
    unread: 0,
    online: true,
    role: 'Producer'
  }
];

const MOCK_MESSAGES = [
  { id: 1, sender: 'them', text: 'Hey, I really dig your latest upload.', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Appreciate that! Which one specifically?', time: '10:32 AM' },
  { id: 3, sender: 'them', text: 'Neon Nights. The bassline is crazy.', time: '10:33 AM' },
  { id: 4, sender: 'them', text: 'Yo, just sent over the stems for Neon Nights.', time: '10:35 AM' }
];

export const Messages: React.FC = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  // Initialize with the first chat on desktop only if needed, but for better mobile UX default to null
  // or handle initial state with useEffect to check screen size (skipping for this MVP)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-[#0A0A0B] border border-white/5 rounded-2xl overflow-hidden animate-in fade-in duration-500 relative">
      
      {/* Sidebar List - Hidden on mobile if chat is active */}
      <div className={`w-full md:w-80 border-r border-white/5 flex flex-col bg-[#0F0F11] ${activeChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-white/5">
          <h2 className="text-lg font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-neon outline-none" 
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
          {MOCK_CHATS.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5 ${activeChat === chat.id ? 'bg-white/5 border-l-2 border-l-neon' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <img src={chat.avatar} alt={chat.user} className="w-12 h-12 rounded-full object-cover bg-gray-800" />
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0F0F11] rounded-full"></div>}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-bold text-sm truncate ${activeChat === chat.id ? 'text-white' : 'text-gray-300'}`}>{chat.user}</h4>
                  <span className="text-[10px] text-gray-500">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-neon rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area - Visible on mobile if chat is active, otherwise hidden on mobile */}
      <div className={`flex-col flex-grow bg-[#0A0A0B] relative ${activeChat ? 'flex' : 'hidden md:flex'}`}>
        {activeChat ? (
          <>
           {/* Decorative BG */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

           {/* Header */}
           <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0F0F11]/50 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                 <button onClick={() => setActiveChat(null)} className="md:hidden text-gray-400 hover:text-white mr-1">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <div className="relative">
                    <img src={MOCK_CHATS.find(c => c.id === activeChat)?.avatar} alt="User" className="w-10 h-10 rounded-full" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0F0F11] rounded-full"></div>
                 </div>
                 <div>
                    <h3 className="font-bold text-white">{MOCK_CHATS.find(c => c.id === activeChat)?.user}</h3>
                    <p className="text-[10px] text-neon font-mono uppercase tracking-wider">
                       {MOCK_CHATS.find(c => c.id === activeChat)?.role}
                    </p>
                 </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                 <button className="hover:text-white transition-colors hidden sm:block"><Phone className="w-5 h-5" /></button>
                 <button className="hover:text-white transition-colors hidden sm:block"><Video className="w-5 h-5" /></button>
                 <button className="hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
              </div>
           </div>

           {/* Messages */}
           <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 z-10">
              {messages.map((msg) => (
                 <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 ${
                       msg.sender === 'me' 
                       ? 'bg-neon text-black rounded-tr-sm' 
                       : 'bg-white/10 text-white rounded-tl-sm'
                    }`}>
                       <p className="text-sm font-medium">{msg.text}</p>
                       <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${msg.sender === 'me' ? 'text-black/60' : 'text-gray-400'}`}>
                          {msg.time}
                          {msg.sender === 'me' && <CheckCheck className="w-3 h-3" />}
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           {/* Input */}
           <div className="p-4 border-t border-white/5 bg-[#0F0F11] z-10">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                 <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Mic className="w-5 h-5" />
                 </button>
                 <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type message..." 
                    className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon outline-none"
                 />
                 <button 
                    type="submit" 
                    className="p-3 bg-neon text-black rounded-xl hover:bg-white transition-colors shadow-[0_0_15px_rgba(118,100,221,0.3)]"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </form>
           </div>
          </>
        ) : (
          <div className="hidden md:flex flex-grow items-center justify-center text-gray-500 font-mono text-sm">
             Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};