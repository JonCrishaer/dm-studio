import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Image as ImageIcon, Smile, Send, BadgeCheck } from 'lucide-react';

export default function DesktopTikTok({ account1, account2, visibleMessages, isPlaying }) {
  const otherAccount = account2;

  return (
    <div className="w-full max-w-5xl mx-auto bg-black rounded-lg shadow-2xl overflow-hidden" style={{ height: '700px' }}>
      <div className="flex h-full border border-zinc-800">
        {/* Sidebar */}
        <div className="w-80 border-r border-zinc-800 flex flex-col bg-black">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">Messages</h2>
          </div>
          <div className="p-3">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 bg-zinc-900 rounded-lg text-white placeholder:text-zinc-500 text-sm outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <a
              href={otherAccount?.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-zinc-900 cursor-pointer bg-zinc-900"
            >
              <img
                src={otherAccount?.avatar_url || 'https://via.placeholder.com/48'}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm flex items-center gap-1 truncate">
                  {otherAccount?.display_name || 'User'}
                  {otherAccount?.verified && (
                    <BadgeCheck className="w-4 h-4 text-cyan-400 fill-cyan-400 flex-shrink-0" />
                  )}
                </p>
                <p className="text-zinc-500 text-xs truncate">@{otherAccount?.username || 'username'}</p>
              </div>
            </a>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
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
                <p className="font-semibold text-white flex items-center gap-1">
                  {otherAccount?.display_name || 'User'}
                  {otherAccount?.verified && (
                    <BadgeCheck className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  )}
                </p>
                <p className="text-zinc-500 text-sm">@{otherAccount?.username || 'username'}</p>
              </div>
            </a>
            <MoreHorizontal className="w-5 h-5 text-white cursor-pointer hover:opacity-70" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
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
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                      </a>
                    )}
                    {message.type === 'image' ? (
                      <div className="max-w-md rounded-2xl overflow-hidden">
                        <img src={message.content} alt="" className="w-full h-auto" />
                      </div>
                    ) : (
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl ${
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
                <img
                  src={account2?.avatar_url || 'https://via.placeholder.com/32'}
                  alt=""
                  className="w-8 h-8 rounded-full mr-3"
                />
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
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center gap-3 bg-zinc-900 rounded-lg px-4 py-3">
              <ImageIcon className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-white" />
              <input
                type="text"
                placeholder="Send a message..."
                className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none"
              />
              <Smile className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-white" />
              <Send className="w-5 h-5 text-[#FE2C55] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}