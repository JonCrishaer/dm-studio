import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InstagramDM from '@/components/simulator/dm/DesktopInstagram';
import TwitterDM from '@/components/simulator/dm/DesktopTwitter';
import FacebookDM from '@/components/simulator/dm/DesktopFacebook';
import TikTokDM from '@/components/simulator/dm/DesktopTikTok';
import { Lock, RefreshCw, Plus, MoreHorizontal } from 'lucide-react';

export default function DesktopPreview() {
  const [searchParams] = useSearchParams();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Listen for config updates from parent window
    const handleMessage = (event) => {
      if (event.data.type === 'UPDATE_PREVIEW') {
        setConfig(event.data.config);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Request initial config
    if (window.opener) {
      window.opener.postMessage({ type: 'REQUEST_CONFIG' }, '*');
    }

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4" />
          <p>Loading preview...</p>
        </div>
      </div>
    );
  }

  const DMComponent = {
    instagram: InstagramDM,
    twitter: TwitterDM,
    facebook: FacebookDM,
    tiktok: TikTokDM
  }[config.platform];

  const backgrounds = {
    instagram: 'bg-white',
    twitter: 'bg-black',
    facebook: 'bg-white',
    tiktok: 'bg-black'
  };

  const urls = {
    instagram: 'instagram.com/direct/inbox',
    twitter: 'x.com/messages',
    facebook: 'messenger.com',
    tiktok: 'tiktok.com/messages'
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Browser Chrome */}
      <div className="bg-white border-b border-zinc-200 shadow-sm">
        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-2 pt-2 bg-zinc-100">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-t-lg border-t border-x border-zinc-200 min-w-[200px]">
            <img 
              src={`https://www.google.com/s2/favicons?domain=${urls[config.platform]}&sz=32`}
              alt=""
              className="w-4 h-4"
            />
            <span className="text-sm text-zinc-700 truncate flex-1">
              {config.platform === 'instagram' && 'Instagram • Chats'}
              {config.platform === 'twitter' && 'Messages / X'}
              {config.platform === 'facebook' && 'Messenger'}
              {config.platform === 'tiktok' && 'Messages | TikTok'}
            </span>
          </div>
          <button className="p-2 hover:bg-zinc-200 rounded-lg">
            <Plus className="w-4 h-4 text-zinc-600" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-zinc-100 rounded-lg disabled:opacity-30" disabled>
              <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-zinc-100 rounded-lg disabled:opacity-30" disabled>
              <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-zinc-100 rounded-lg">
              <RefreshCw className="w-4 h-4 text-zinc-600" />
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2 bg-zinc-50 hover:bg-zinc-100 rounded-lg px-4 py-2 border border-zinc-200">
            <Lock className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-700">{urls[config.platform]}</span>
          </div>

          <button className="p-1.5 hover:bg-zinc-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-zinc-600" />
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className={backgrounds[config.platform]}>
        <DMComponent
          account1={config.account1}
          account2={config.account2}
          visibleMessages={config.visibleMessages}
          isPlaying={config.isPlaying}
          statusBar={config.statusBar}
        />
      </div>
    </div>
  );
}