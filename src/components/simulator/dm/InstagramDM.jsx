import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, Info, Heart, Image, Mic, ChevronLeft, BadgeCheck } from 'lucide-react';

export default function InstagramDM({ account1, account2, visibleMessages, isPlaying, statusBar = { time: '9:41', signal: 4, battery: 80 } }) {
  const otherAccount = account2;

  return (
    <div className="w-full max-w-[375px] mx-auto bg-black rounded-[3rem] p-3 shadow-2xl">
      <div className="bg-black rounded-[2.5rem] overflow-hidden h-[700px] flex flex-col">
        {/* Status Bar */}
        <StatusBar time={statusBar.time} signal={statusBar.signal} battery={statusBar.battery} />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-6 h-6 text-white" />
            <a 
              href={otherAccount?.profile_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <img
                  src={otherAccount?.avatar_url || 'https://via.placeholder.com/44'}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm flex items-center gap-1">
                  {otherAccount?.display_name || 'User'}
                  {otherAccount?.verified && (
                    <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400" />
                  )}
                </p>
                <p className="text-white/50 text-xs">Active now</p>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <Phone className="w-5 h-5 text-white" />
            <Video className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
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
                        className="w-7 h-7 rounded-full mr-2 object-cover"
                      />
                    </a>
                  )}
                  {message.type === 'image' ? (
                    <div className="max-w-[70%] rounded-2xl overflow-hidden">
                      <img src={message.content} alt="" className="w-full h-auto" />
                    </div>
                  ) : (
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-3xl ${
                        isSender
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
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
              <div className="bg-zinc-800 rounded-3xl px-4 py-3">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-white/50 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-white/50 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-white/50 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <span className="flex-1 text-white/40 text-sm">Message...</span>
            <Mic className="w-5 h-5 text-white/70" />
            <Image className="w-5 h-5 text-white/70" />
            <Heart className="w-5 h-5 text-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}