import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InstagramDM from '@/components/simulator/dm/DesktopInstagram';
import TwitterDM from '@/components/simulator/dm/DesktopTwitter';
import FacebookDM from '@/components/simulator/dm/DesktopFacebook';
import TikTokDM from '@/components/simulator/dm/DesktopTikTok';

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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <DMComponent
        account1={config.account1}
        account2={config.account2}
        visibleMessages={config.visibleMessages}
        isPlaying={config.isPlaying}
        statusBar={config.statusBar}
      />
    </div>
  );
}