import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, Info, Heart, Image as ImageIcon, Smile, Send, BadgeCheck } from 'lucide-react';

export default function DesktopInstagram({ account1, account2, visibleMessages, isPlaying }) {
  const otherAccount = account2;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden" style={{ height: '700px' }}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Your Account</h2>
            <p className="text-gray-500 text-sm">Messages</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <a
              href={otherAccount?.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer bg-gray-50"
            >
              <div className="relative">
                <img
                  src={otherAccount?.avatar_url || 'https://via.placeholder.com/56'}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold flex items-center gap-1 text-sm">
                  {otherAccount?.display_name || 'User'}
                  {otherAccount?.verified && (
                    <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400" />
                  )}
                </p>
                <p className="text-gray-500 text-sm">Active now</p>
              </div>
            </a>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
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
                <p className="font-semibold flex items-center gap-1">
                  {otherAccount?.display_name || 'User'}
                  {otherAccount?.verified && (
                    <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400" />
                  )}
                </p>
                <p className="text-gray-500 text-sm">Active now</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-gray-700 cursor-pointer hover:text-black" />
              <Video className="w-5 h-5 text-gray-700 cursor-pointer hover:text-black" />
              <Info className="w-5 h-5 text-gray-700 cursor-pointer hover:text-black" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
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
                        className={`max-w-md px-4 py-3 rounded-3xl ${
                          isSender
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-gray-100 text-black'
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
                <div className="bg-gray-100 rounded-3xl px-4 py-3">
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
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-3 hover:border-gray-400 transition-colors">
              <Smile className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
              <span className="flex-1 text-gray-400">Message...</span>
              <ImageIcon className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
              <Heart className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}