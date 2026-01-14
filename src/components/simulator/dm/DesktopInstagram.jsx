import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, Info, Heart, Image as ImageIcon, Smile, Send, BadgeCheck, Home, Search, Compass, Film, MessageCircle, PlusSquare } from 'lucide-react';

export default function DesktopInstagram({ account1, account2, visibleMessages, isPlaying }) {
  const otherAccount = account2;

  return (
    <div className="w-full mx-auto bg-white shadow-2xl overflow-hidden flex" style={{ height: '100vh' }}>
      {/* Left Navigation Sidebar */}
      <div className="w-60 border-r border-gray-200 flex flex-col p-3 bg-white">
        {/* Instagram Logo */}
        <div className="p-3 mb-4">
          <svg className="w-24 h-8" viewBox="0 0 175 50" fill="black">
            <path d="M57.47 11.24h7.91v26.8h-7.91v-2.8c-1.95 2.24-4.66 3.36-7.91 3.36-6.44 0-11.66-5.22-11.66-11.66s5.22-11.66 11.66-11.66c3.25 0 5.96 1.12 7.91 3.36v-7zm-7 19.04c3.1 0 5.6-2.5 5.6-5.6s-2.5-5.6-5.6-5.6-5.6 2.5-5.6 5.6 2.5 5.6 5.6 5.6zm22.45-11.2h-3.64v-3.64h3.64v-3.92c0-4.76 2.8-7.84 7.84-7.84h5.04v6.72h-3.36c-1.12 0-1.68.56-1.68 1.68v3.36h5.04l-.84 6.72h-4.2v13.44h-7.84V23.08zm-38.36 0h-7.84v-6.72h7.84v6.72zm0 2.8v13.44h-7.84V21.88h7.84zM16.8 8.96c4.76 0 8.68 3.92 8.68 8.68v14.56c0 4.76-3.92 8.68-8.68 8.68H2.24C-2.52 40.88-6.44 36.96-6.44 32.2V17.64c0-4.76 3.92-8.68 8.68-8.68H16.8zm-8.4 6.72c-1.96 0-3.64 1.68-3.64 3.64v12.88c0 1.96 1.68 3.64 3.64 3.64h10.08c1.96 0 3.64-1.68 3.64-3.64V19.32c0-1.96-1.68-3.64-3.64-3.64H8.4zm6.16 9.8c0 3.36-2.8 6.16-6.16 6.16s-6.16-2.8-6.16-6.16 2.8-6.16 6.16-6.16 6.16 2.8 6.16 6.16zm-2.8 0c0-1.96-1.68-3.36-3.36-3.36s-3.36 1.4-3.36 3.36 1.68 3.36 3.36 3.36 3.36-1.4 3.36-3.36zm9.52-7.28c0 .84-.56 1.4-1.4 1.4s-1.4-.56-1.4-1.4.56-1.4 1.4-1.4 1.4.56 1.4 1.4z"/>
          </svg>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Home className="w-6 h-6" />
            <span className="text-base">Home</span>
          </div>
          <div className="flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Search className="w-6 h-6" />
            <span className="text-base">Search</span>
          </div>
          <div className="flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Compass className="w-6 h-6" />
            <span className="text-base">Explore</span>
          </div>
          <div className="flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Film className="w-6 h-6" />
            <span className="text-base">Reels</span>
          </div>
          <div className="flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer bg-gray-50">
            <MessageCircle className="w-6 h-6 font-bold" />
            <span className="text-base font-semibold">Messages</span>
          </div>
          <div className="flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Heart className="w-6 h-6" />
            <span className="text-base">Notifications</span>
          </div>
          <div className="flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <PlusSquare className="w-6 h-6" />
            <span className="text-base">Create</span>
          </div>
        </div>

        {/* Profile at bottom */}
        <div className="flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer mt-auto">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          <span className="text-base">Profile</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{account1?.username || 'Your Account'}</h2>
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