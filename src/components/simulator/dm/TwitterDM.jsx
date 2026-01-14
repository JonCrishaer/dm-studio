import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Image, Smile, Send, BadgeCheck } from 'lucide-react';

export default function TwitterDM({ account1, account2, visibleMessages, isPlaying }) {
  const otherAccount = account2;

  return (
    <div className="w-full max-w-[375px] mx-auto bg-black rounded-[3rem] p-3 shadow-2xl">
      <div className="bg-black rounded-[2.5rem] overflow-hidden h-[700px] flex flex-col">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 py-2 text-white text-xs">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-3 border border-white rounded-sm relative">
              <div className="absolute inset-0.5 bg-white rounded-sm" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <ChevronLeft className="w-6 h-6 text-white" />
            <a 
              href={otherAccount?.profile_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src={otherAccount?.avatar_url || 'https://via.placeholder.com/40'}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-bold flex items-center gap-1">
                  {otherAccount?.display_name || 'User'}
                  {otherAccount?.verified && (
                    <svg className="w-5 h-5 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                    </svg>
                  )}
                </p>
                <p className="text-zinc-500 text-sm">@{otherAccount?.username || 'username'}</p>
              </div>
            </a>
          </div>
          <Info className="w-5 h-5 text-white" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {visibleMessages.map((message, index) => {
              const isSender = message.sender === 'account_1';
              const account = isSender ? account1 : account2;

              return (
                <motion.div
                  key={message.id || index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'image' ? (
                    <div className="max-w-[70%] rounded-2xl overflow-hidden">
                      <img src={message.content} alt="" className="w-full h-auto" />
                    </div>
                  ) : (
                    <div
                      className={`max-w-[70%] px-4 py-3 ${
                        isSender
                          ? 'bg-[#1d9bf0] text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm'
                          : 'bg-zinc-800 text-white rounded-t-2xl rounded-br-2xl rounded-bl-sm'
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">{message.content}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-zinc-800 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-zinc-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-zinc-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-zinc-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-zinc-800">
          <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-4 py-2.5">
            <Image className="w-5 h-5 text-[#1d9bf0]" />
            <Smile className="w-5 h-5 text-[#1d9bf0]" />
            <span className="flex-1 text-zinc-500 text-sm">Start a message</span>
            <Send className="w-5 h-5 text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}