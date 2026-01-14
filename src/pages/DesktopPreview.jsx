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

  const defaultUrls = {
    instagram: 'instagram.com/direct/inbox',
    twitter: 'x.com/messages',
    facebook: 'messenger.com',
    tiktok: 'tiktok.com/messages'
  };

  const browserConfig = config.browserConfig || {
    url: '',
    tabs: [{ title: 'Messages', favicon: '' }],
    activeTab: 0,
    bookmarks: [],
    extensions: [],
    showBookmarks: false,
    showExtensions: false
  };

  const displayUrl = browserConfig.url || defaultUrls[config.platform];
  const activeTabs = browserConfig.tabs.length > 0 ? browserConfig.tabs : [{ title: 'Messages', favicon: '' }];

  return (
    <div className="h-screen flex flex-col bg-zinc-100 overflow-hidden">
      {/* Browser Chrome */}
      <div className="bg-white border-b border-zinc-200 shadow-sm flex-shrink-0">
        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-2 pt-2 bg-zinc-100">
          {activeTabs.map((tab, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg border-t border-x min-w-[180px] max-w-[240px] ${
                index === browserConfig.activeTab 
                  ? 'bg-white border-zinc-200' 
                  : 'bg-zinc-50 border-zinc-300'
              }`}
            >
              {tab.favicon ? (
                tab.favicon.startsWith('http') ? (
                  <img src={tab.favicon} alt="" className="w-4 h-4" />
                ) : (
                  <span className="text-base">{tab.favicon}</span>
                )
              ) : (
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${displayUrl}&sz=32`}
                  alt=""
                  className="w-4 h-4"
                />
              )}
              <span className="text-sm text-zinc-700 truncate flex-1">{tab.title}</span>
            </div>
          ))}
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
            <span className="text-sm text-zinc-700">{displayUrl}</span>
          </div>

          {browserConfig.showExtensions && browserConfig.extensions.length > 0 && (
            <div className="flex items-center gap-1">
              {browserConfig.extensions.map((ext, index) => (
                <button 
                  key={index}
                  className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-lg"
                  title={ext.name}
                >
                  <span className="text-lg">{ext.icon}</span>
                </button>
              ))}
            </div>
          )}

          <button className="p-1.5 hover:bg-zinc-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-zinc-600" />
          </button>
        </div>

        {/* Bookmark Bar */}
        {browserConfig.showBookmarks && browserConfig.bookmarks.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border-t border-zinc-200">
            {browserConfig.bookmarks.map((bookmark, index) => (
              <button
                key={index}
                className="flex items-center gap-2 px-3 py-1 hover:bg-zinc-200 rounded text-sm text-zinc-700"
              >
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=32`}
                  alt=""
                  className="w-4 h-4"
                />
                <span className="truncate max-w-[120px]">{bookmark.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Page Content - Full Height */}
      <div className={`flex-1 overflow-hidden ${backgrounds[config.platform]}`}>
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