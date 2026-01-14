import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, Link, BadgeCheck, Upload, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ProfileSelector from './ProfileSelector';

export default function AccountSetup({ account, onChange, label, platform }) {
  const [uploading, setUploading] = useState(false);

  const handleChange = (field, value) => {
    onChange({ ...account, [field]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      handleChange('avatar_url', file_url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{label}</h3>
        </div>
        <ProfileSelector onSelect={onChange} currentAccount={account} />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Username</Label>
            <Input
              value={account.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder={platform === 'twitter' ? '@username' : 'username'}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Display Name</Label>
            <Input
              value={account.display_name || ''}
              onChange={(e) => handleChange('display_name', e.target.value)}
              placeholder="John Doe"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-white/70 text-sm">Avatar Image</Label>
          <div className="flex gap-2">
            <Input
              value={account.avatar_url || ''}
              onChange={(e) => handleChange('avatar_url', e.target.value)}
              placeholder="Or paste image URL..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 flex-1"
            />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                id={`avatar-upload-${label}`}
              />
              <Button
                type="button"
                disabled={uploading}
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20 whitespace-nowrap"
                asChild
              >
                <label htmlFor={`avatar-upload-${label}`} className="cursor-pointer flex items-center gap-2">
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {uploading ? 'Uploading...' : 'Upload'}
                </label>
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-white/70 text-sm flex items-center gap-2">
            <Link className="w-4 h-4" />
            Real Profile URL (clickable)
          </Label>
          <Input
            value={account.profile_url || ''}
            onChange={(e) => handleChange('profile_url', e.target.value)}
            placeholder="https://instagram.com/username"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Label className="text-white/70 text-sm flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-blue-400" />
            Verified Badge
          </Label>
          <Switch
            checked={account.verified || false}
            onCheckedChange={(checked) => handleChange('verified', checked)}
          />
        </div>

        {account.avatar_url && (
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <img
              src={account.avatar_url}
              alt="Preview"
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
            <div>
              <p className="text-white font-medium flex items-center gap-1">
                {account.display_name || 'Display Name'}
                {account.verified && <BadgeCheck className="w-4 h-4 text-blue-400" />}
              </p>
              <p className="text-white/50 text-sm">@{account.username || 'username'}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}