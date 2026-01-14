import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';

import PlatformSelector from '@/components/simulator/PlatformSelector';
import AccountSetup from '@/components/simulator/AccountSetup';
import MessageComposer from '@/components/simulator/MessageComposer';
import PlaybackControls from '@/components/simulator/PlaybackControls';
import InstagramDM from '@/components/simulator/dm/InstagramDM';
import TwitterDM from '@/components/simulator/dm/TwitterDM';
import FacebookDM from '@/components/simulator/dm/FacebookDM';
import TikTokDM from '@/components/simulator/dm/TikTokDM';
import DesktopInstagram from '@/components/simulator/dm/DesktopInstagram';
import DesktopTwitter from '@/components/simulator/dm/DesktopTwitter';
import DesktopFacebook from '@/components/simulator/dm/DesktopFacebook';
import DesktopTikTok from '@/components/simulator/dm/DesktopTikTok';
import StatusBarControls from '@/components/simulator/StatusBarControls';
import ViewModeSelector from '@/components/simulator/ViewModeSelector';

import { Save, ChevronRight, ChevronLeft, Smartphone, ExternalLink } from 'lucide-react';

export default function Simulator() {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('id');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [account1, setAccount1] = useState({
    username: '',
    display_name: '',
    avatar_url: '',
    profile_url: '',
    verified: false
  });
  const [account2, setAccount2] = useState({
    username: '',
    display_name: '',
    avatar_url: '',
    profile_url: '',
    verified: false
  });
  const [messages, setMessages] = useState([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [statusBar, setStatusBar] = useState({ time: '9:41', signal: 4, battery: 80 });
  const [viewMode, setViewMode] = useState('mobile');
  const playbackRef = useRef(null);
  const previewWindowRef = useRef(null);

  // Load existing conversation
  const { data: existingConversation } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      if (!conversationId) return null;
      const convs = await base44.entities.Conversation.filter({ id: conversationId });
      return convs[0] || null;
    },
    enabled: !!conversationId
  });

  useEffect(() => {
    if (existingConversation) {
      setTitle(existingConversation.title || '');
      setPlatform(existingConversation.platform || 'instagram');
      setAccount1(existingConversation.account_1 || account1);
      setAccount2(existingConversation.account_2 || account2);
      setMessages(existingConversation.messages || []);
      setStep(4);
    }
  }, [existingConversation]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (conversationId) {
        return base44.entities.Conversation.update(conversationId, data);
      }
      return base44.entities.Conversation.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      navigate(createPageUrl('SavedConversations'));
    }
  });

  const handleSave = async () => {
    await saveMutation.mutateAsync({
      title: title || `${platform} conversation`,
      platform,
      account_1: account1,
      account_2: account2,
      messages
    });
  };

  // Playback logic
  useEffect(() => {
    if (isPlaying && currentIndex < messages.length) {
      playbackRef.current = setTimeout(() => {
        setVisibleMessages(prev => [...prev, messages[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, speed * 1000);
    } else if (currentIndex >= messages.length) {
      setIsPlaying(false);
    }

    return () => {
      if (playbackRef.current) clearTimeout(playbackRef.current);
    };
  }, [isPlaying, currentIndex, messages, speed]);

  const handlePlayPause = () => {
    if (currentIndex >= messages.length) {
      handleReset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setVisibleMessages([]);
    setCurrentIndex(0);
  };

  const handleSkip = () => {
    if (currentIndex < messages.length) {
      setVisibleMessages(prev => [...prev, messages[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const openDesktopPreview = () => {
    const previewUrl = createPageUrl('DesktopPreview');
    previewWindowRef.current = window.open(previewUrl, 'DesktopPreview', 'width=1400,height=900');
    
    // Send initial config
    setTimeout(() => {
      if (previewWindowRef.current) {
        previewWindowRef.current.postMessage({
          type: 'UPDATE_PREVIEW',
          config: {
            platform,
            account1,
            account2,
            visibleMessages,
            isPlaying: isPlaying && currentIndex < messages.length,
            statusBar
          }
        }, '*');
      }
    }, 500);
  };

  // Listen for config requests from preview window
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'REQUEST_CONFIG' && previewWindowRef.current) {
        previewWindowRef.current.postMessage({
          type: 'UPDATE_PREVIEW',
          config: {
            platform,
            account1,
            account2,
            visibleMessages,
            isPlaying: isPlaying && currentIndex < messages.length,
            statusBar
          }
        }, '*');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [platform, account1, account2, visibleMessages, isPlaying, currentIndex, statusBar]);

  // Update preview window when state changes
  useEffect(() => {
    if (previewWindowRef.current && !previewWindowRef.current.closed) {
      previewWindowRef.current.postMessage({
        type: 'UPDATE_PREVIEW',
        config: {
          platform,
          account1,
          account2,
          visibleMessages,
          isPlaying: isPlaying && currentIndex < messages.length,
          statusBar
        }
      }, '*');
    }
  }, [platform, account1, account2, visibleMessages, isPlaying, currentIndex, statusBar]);

  const DMComponent = viewMode === 'mobile' ? {
    instagram: InstagramDM,
    twitter: TwitterDM,
    facebook: FacebookDM,
    tiktok: TikTokDM
  }[platform] : {
    instagram: DesktopInstagram,
    twitter: DesktopTwitter,
    facebook: DesktopFacebook,
    tiktok: DesktopTikTok
  }[platform];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">DM Simulator</h1>
            <p className="text-white/50 mt-1">Create realistic social media conversations</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span className={step >= 1 ? 'text-purple-400' : ''}>Platform</span>
              <ChevronRight className="w-4 h-4" />
              <span className={step >= 2 ? 'text-purple-400' : ''}>Accounts</span>
              <ChevronRight className="w-4 h-4" />
              <span className={step >= 3 ? 'text-purple-400' : ''}>Messages</span>
              <ChevronRight className="w-4 h-4" />
              <span className={step >= 4 ? 'text-purple-400' : ''}>Preview</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Setup */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-2">Choose Platform</h2>
                    <p className="text-white/50 text-sm">Select which social media platform to simulate</p>
                  </div>
                  <PlatformSelector selected={platform} onSelect={setPlatform} />
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-2 text-white" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-white mb-2">Setup Accounts</h2>
                    <p className="text-white/50 text-sm">Configure the two accounts in this conversation</p>
                  </div>
                  <AccountSetup
                    label="Your Account (Sender)"
                    account={account1}
                    onChange={setAccount1}
                    platform={platform}
                  />
                  <AccountSetup
                    label="Other Account (Receiver)"
                    account={account2}
                    onChange={setAccount2}
                    platform={platform}
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2 text-white" /> Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Continue <ChevronRight className="w-4 h-4 ml-2 text-white" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-2">Compose Messages</h2>
                    <p className="text-white/50 text-sm">Write out the conversation - messages will play in order</p>
                  </div>
                  <MessageComposer
                    messages={messages}
                    onChange={setMessages}
                    account1={account1}
                    account2={account2}
                  />
                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2 text-white" /> Back
                    </Button>
                    <Button
                      onClick={() => { setStep(4); handleReset(); }}
                      disabled={messages.length === 0}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50"
                    >
                      <Smartphone className="w-4 h-4 mr-2 text-white" /> Preview
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-white mb-2">Live Preview</h2>
                    <p className="text-white/50 text-sm">Watch your conversation play out in real-time</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <label className="text-white/70 text-sm block mb-2">Conversation Title</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="My awesome conversation..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <ViewModeSelector mode={viewMode} onChange={setViewMode} />

                  {viewMode === 'desktop' && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-3">Open in New Tab</h3>
                      <p className="text-white/50 text-sm mb-4">Open the desktop view in a separate window for a more realistic experience</p>
                      <Button
                        onClick={openDesktopPreview}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 text-white" />
                        Open Desktop View in New Tab
                      </Button>
                    </div>
                  )}

                  <StatusBarControls statusBar={statusBar} onChange={setStatusBar} />

                  <PlaybackControls
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    onReset={handleReset}
                    onSkip={handleSkip}
                    speed={speed}
                    onSpeedChange={setSpeed}
                    currentIndex={currentIndex}
                    totalMessages={messages.length}
                    disabled={messages.length === 0}
                  />

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2 text-white" /> Edit Messages
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={saveMutation.isPending}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2 text-white" />
                      {saveMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex items-center justify-center py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${platform}-${viewMode}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <DMComponent
                  account1={account1}
                  account2={account2}
                  visibleMessages={isPlaying ? visibleMessages : messages}
                  isPlaying={isPlaying && currentIndex < messages.length}
                  statusBar={statusBar}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}