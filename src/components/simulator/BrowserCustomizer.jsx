import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

export default function BrowserCustomizer({ browserConfig, onChange }) {
  const addTab = () => {
    const newTabs = [...browserConfig.tabs, { title: 'New Tab', favicon: '' }];
    onChange({ ...browserConfig, tabs: newTabs });
  };

  const removeTab = (index) => {
    if (browserConfig.tabs.length === 1) return;
    const newTabs = browserConfig.tabs.filter((_, i) => i !== index);
    onChange({ ...browserConfig, tabs: newTabs, activeTab: Math.min(browserConfig.activeTab, newTabs.length - 1) });
  };

  const updateTab = (index, field, value) => {
    const newTabs = [...browserConfig.tabs];
    newTabs[index] = { ...newTabs[index], [field]: value };
    onChange({ ...browserConfig, tabs: newTabs });
  };

  const addBookmark = () => {
    const newBookmarks = [...browserConfig.bookmarks, { title: 'New Site', url: '' }];
    onChange({ ...browserConfig, bookmarks: newBookmarks });
  };

  const removeBookmark = (index) => {
    const newBookmarks = browserConfig.bookmarks.filter((_, i) => i !== index);
    onChange({ ...browserConfig, bookmarks: newBookmarks });
  };

  const updateBookmark = (index, field, value) => {
    const newBookmarks = [...browserConfig.bookmarks];
    newBookmarks[index] = { ...newBookmarks[index], [field]: value };
    onChange({ ...browserConfig, bookmarks: newBookmarks });
  };

  const addExtension = () => {
    const newExtensions = [...browserConfig.extensions, { name: 'Extension', icon: '🔧' }];
    onChange({ ...browserConfig, extensions: newExtensions });
  };

  const removeExtension = (index) => {
    const newExtensions = browserConfig.extensions.filter((_, i) => i !== index);
    onChange({ ...browserConfig, extensions: newExtensions });
  };

  const updateExtension = (index, field, value) => {
    const newExtensions = [...browserConfig.extensions];
    newExtensions[index] = { ...newExtensions[index], [field]: value };
    onChange({ ...browserConfig, extensions: newExtensions });
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Browser Customization</h3>
        <p className="text-white/50 text-sm mb-4">Make it look exactly like a real browser</p>
      </div>

      {/* URL */}
      <div>
        <label className="text-white/70 text-sm block mb-2">Address Bar URL</label>
        <Input
          value={browserConfig.url}
          onChange={(e) => onChange({ ...browserConfig, url: e.target.value })}
          placeholder="instagram.com/direct/inbox"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      {/* Tabs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-white/70 text-sm">Browser Tabs</label>
          <Button
            onClick={addTab}
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <Plus className="w-3 h-3 mr-1" /> Add Tab
          </Button>
        </div>
        <div className="space-y-2">
          {browserConfig.tabs.map((tab, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={tab.title}
                onChange={(e) => updateTab(index, 'title', e.target.value)}
                placeholder="Tab title"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Input
                value={tab.favicon}
                onChange={(e) => updateTab(index, 'favicon', e.target.value)}
                placeholder="Emoji or favicon URL"
                className="w-24 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Button
                onClick={() => removeTab(index)}
                size="icon"
                variant="ghost"
                className="text-white/50 hover:text-white hover:bg-white/10"
                disabled={browserConfig.tabs.length === 1}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Bookmarks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-white/70 text-sm">Bookmark Bar</label>
          <Button
            onClick={addBookmark}
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <Plus className="w-3 h-3 mr-1" /> Add Bookmark
          </Button>
        </div>
        <div className="space-y-2">
          {browserConfig.bookmarks.map((bookmark, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={bookmark.title}
                onChange={(e) => updateBookmark(index, 'title', e.target.value)}
                placeholder="Bookmark name"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Input
                value={bookmark.url}
                onChange={(e) => updateBookmark(index, 'url', e.target.value)}
                placeholder="URL"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Button
                onClick={() => removeBookmark(index)}
                size="icon"
                variant="ghost"
                className="text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Extensions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-white/70 text-sm">Browser Extensions</label>
          <Button
            onClick={addExtension}
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <Plus className="w-3 h-3 mr-1" /> Add Extension
          </Button>
        </div>
        <div className="space-y-2">
          {browserConfig.extensions.map((ext, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={ext.icon}
                onChange={(e) => updateExtension(index, 'icon', e.target.value)}
                placeholder="Icon (emoji)"
                className="w-20 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Input
                value={ext.name}
                onChange={(e) => updateExtension(index, 'name', e.target.value)}
                placeholder="Extension name"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Button
                onClick={() => removeExtension(index)}
                size="icon"
                variant="ghost"
                className="text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}