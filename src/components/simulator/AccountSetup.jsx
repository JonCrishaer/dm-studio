import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { User, Link, BadgeCheck } from 'lucide-react';

export default function AccountSetup({ account, onChange, label, platform }) {
  const handleChange = (field, value) => {
    onChange({ ...account, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
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
          <Label className="text-white/70 text-sm">Avatar URL</Label>
          <Input
            value={account.avatar_url || ''}
            onChange={(e) => handleChange('avatar_url', e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
          />
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