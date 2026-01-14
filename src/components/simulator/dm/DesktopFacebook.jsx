import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, MoreHorizontal, Image as ImageIcon, Smile, ThumbsUp, Plus, Home, Users, Tv, Store, Menu } from 'lucide-react';

export default function DesktopFacebook({ account1, account2, visibleMessages, isPlaying }) {
  const otherAccount = account2;

  return (
    <div className="w-full mx-auto bg-white shadow-2xl overflow-hidden" style={{ height: '100vh' }}>
      {/* Top Navigation Bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-2">
        {/* Facebook Logo */}
        <div className="flex items-center gap-2">
          <svg className="w-10 h-10" viewBox="0 0 36 36" fill="#0866FF">
            <path d="M20.3 36V21.5h4.9l.7-5.6h-5.6v-3.6c0-1.6.4-2.7 2.8-2.7h3V4.4c-.5-.1-2.4-.2-4.6-.2-4.5 0-7.6 2.7-7.6 7.8v4.4H9v5.6h4.9V36h6.4z"/>
          </svg>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z"/>
            </svg>
            <input
              type="text"
              placeholder="Search Facebook"
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer">
            <Home className="w-5 h-5 text-[#0866FF]" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer">
            <Tv className="w-5 h-5 text-gray-600" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer">
            <Store className="w-5 h-5 text-gray-600" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer">
            <Menu className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
        {/* Chats Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-black">Chats</h2>
          </div>
          <div className="p-2">
            <input
              type="text"
              placeholder="Search Messenger"
              className="w-full px-3 py-2 bg-gray-100 rounded-full text-sm outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <a
              href={otherAccount?.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer bg-gray-100 rounded-lg mx-2"
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
                <p className="font-semibold text-black text-sm truncate">
                  {otherAccount?.display_name || 'User'}
                </p>
                <p className="text-gray-500 text-xs truncate">Active now</p>
              </div>
            </a>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
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
                <p className="font-semibold text-black">{otherAccount?.display_name || 'User'}</p>
                <p className="text-gray-500 text-xs">Active now</p>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#0084ff] cursor-pointer hover:opacity-70" />
              <Video className="w-5 h-5 text-[#0084ff] cursor-pointer hover:opacity-70" />
              <MoreHorizontal className="w-5 h-5 text-[#0084ff] cursor-pointer hover:opacity-70" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
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
                      <div className="max-w-sm rounded-2xl overflow-hidden">
                        <img src={message.content} alt="" className="w-full h-auto" />
                      </div>
                    ) : (
                      <div
                        className={`max-w-sm px-4 py-2.5 ${
                          isSender
                            ? 'bg-[#0084ff] text-white rounded-3xl'
                            : 'bg-gray-100 text-black rounded-3xl'
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
                <div className="w-7">
                  <img
                    src={account2?.avatar_url || 'https://via.placeholder.com/28'}
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                </div>
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
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <Plus className="w-6 h-6 text-[#0084ff] cursor-pointer" />
              <ImageIcon className="w-6 h-6 text-[#0084ff] cursor-pointer" />
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
                <input
                  type="text"
                  placeholder="Aa"
                  className="flex-1 bg-transparent outline-none text-gray-800"
                />
                <Smile className="w-5 h-5 text-[#0084ff] cursor-pointer" />
              </div>
              <ThumbsUp className="w-6 h-6 text-[#0084ff] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}