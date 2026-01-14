import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { MessageCircle, Sparkles, Play, Users } from 'lucide-react';

export default function Home() {
  const platforms = [
    { name: 'Instagram', color: 'from-purple-600 via-pink-500 to-orange-400' },
    { name: 'X (Twitter)', color: 'from-gray-800 to-black' },
    { name: 'Facebook', color: 'from-blue-600 to-blue-500' },
    { name: 'TikTok', color: 'from-cyan-400 via-black to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Create realistic DM simulations
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Social Media
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                DM Simulator
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Create authentic-looking direct message conversations for Instagram, Twitter, Facebook, and TikTok. Perfect for content creation, mockups, and presentations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Simulator')}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-xl"
                >
                  <Play className="w-5 h-5 mr-2 text-white" />
                  Start Creating
                </Button>
              </Link>
              <Link to={createPageUrl('SavedConversations')}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white text-lg px-8 py-6 rounded-xl"
                >
                  <MessageCircle className="w-5 h-5 mr-2 text-white" />
                  My Conversations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl`} />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center mb-4`}>
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{platform.name}</h3>
                <p className="text-white/50 text-sm">
                  Pixel-perfect DM interface that looks exactly like the real app
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Custom Profiles</h3>
            <p className="text-white/50">
              Set up any profile with custom avatars, usernames, and links to real accounts
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-500/20 flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Live Playback</h3>
            <p className="text-white/50">
              Watch messages flow in one by one with customizable timing for realistic effect
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Authentic Design</h3>
            <p className="text-white/50">
              Every detail matches the real apps — from colors to icons to animations
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}