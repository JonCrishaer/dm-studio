import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MoreHorizontal, Image, Smile, Send, BadgeCheck } from 'lucide-react';

export default function TikTokDM({ account1, account2, visibleMessages, isPlaying }) {
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
          <div className="flex items-center gap-3">
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
                <p className="text-white font-semibold flex items-center gap-1">
                  {otherAccount?.display_name || 'User'}
                  {otherAccount?.verified && (
                    <BadgeCheck className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  )}
                </p>
                <p className="text-zinc-500 text-sm">@{otherAccount?.username || 'username'}</p>
              </div>
            </a>
          </div>
          <MoreHorizontal className="w-5 h-5 text-white" />
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
                  {!isSender && (
                    <a href={account?.profile_url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={account?.avatar_url || 'https://via.placeholder.com/32'}
                        alt=""
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                    </a>
                  )}
                  {message.type === 'image' ? (
                    <div className="max-w-[70%] rounded-2xl overflow-hidden">
                      <img src={message.content} alt="" className="w-full h-auto" />
                    </div>
                  ) : (
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                        isSender
                          ? 'bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] text-white'
                          : 'bg-zinc-800 text-white'
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
              <div className="w-8" />
              <div className="bg-zinc-800 rounded-2xl px-4 py-3 ml-2">
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
            <Image className="w-5 h-5 text-zinc-400" />
            <span className="flex-1 text-zinc-500 text-sm">Send a message...</span>
            <Smile className="w-5 h-5 text-zinc-400" />
            <Send className="w-5 h-5 text-[#FE2C55]" />
          </div>
        </div>
      </div>
    </div>
  );
}