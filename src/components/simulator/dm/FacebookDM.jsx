import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Phone, Video, Image, Smile, ThumbsUp, Plus, Mic } from 'lucide-react';

export default function FacebookDM({ account1, account2, visibleMessages, isPlaying }) {
  const otherAccount = account2;

  return (
    <div className="w-full max-w-[375px] mx-auto bg-black rounded-[3rem] p-3 shadow-2xl">
      <div className="bg-white rounded-[2.5rem] overflow-hidden h-[700px] flex flex-col">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 py-2 text-black text-xs bg-white">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-3 border border-black rounded-sm relative">
              <div className="absolute inset-0.5 bg-black rounded-sm" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-6 h-6 text-[#0084ff]" />
            <a 
              href={otherAccount?.profile_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <img
                  src={otherAccount?.avatar_url || 'https://via.placeholder.com/36'}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-black font-semibold text-sm">{otherAccount?.display_name || 'User'}</p>
                <p className="text-gray-500 text-xs">Active now</p>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-[#0084ff]" />
            <Video className="w-5 h-5 text-[#0084ff]" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 bg-white">
          <AnimatePresence mode="popLayout">
            {visibleMessages.map((message, index) => {
              const isSender = message.sender === 'account_1';
              const account = isSender ? account1 : account2;
              const showAvatar = !isSender && (
                index === visibleMessages.length - 1 || 
                visibleMessages[index + 1]?.sender !== message.sender
              );

              return (
                <motion.div
                  key={message.id || index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className={`flex items-end gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}
                >
                  {!isSender && (
                    <div className="w-7 h-7">
                      {showAvatar && (
                        <a href={account?.profile_url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={account?.avatar_url || 'https://via.placeholder.com/28'}
                            alt=""
                            className="w-7 h-7 rounded-full object-cover"
                          />
                        </a>
                      )}
                    </div>
                  )}
                  {message.type === 'image' ? (
                    <div className="max-w-[65%] rounded-2xl overflow-hidden">
                      <img src={message.content} alt="" className="w-full h-auto" />
                    </div>
                  ) : (
                    <div
                      className={`max-w-[65%] px-3 py-2 ${
                        isSender
                          ? 'bg-[#0084ff] text-white rounded-full'
                          : 'bg-gray-100 text-black rounded-full'
                      }`}
                    >
                      <p className="text-[15px]">{message.content}</p>
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
              className="flex items-end gap-2 justify-start"
            >
              <div className="w-7" />
              <div className="bg-gray-100 rounded-full px-4 py-2">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="px-3 py-2 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Plus className="w-6 h-6 text-[#0084ff]" />
            <Image className="w-6 h-6 text-[#0084ff]" />
            <Mic className="w-6 h-6 text-[#0084ff]" />
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
              <span className="text-gray-400 text-sm">Aa</span>
              <Smile className="w-5 h-5 text-[#0084ff] ml-auto" />
            </div>
            <ThumbsUp className="w-6 h-6 text-[#0084ff]" />
          </div>
        </div>
      </div>
    </div>
  );
}