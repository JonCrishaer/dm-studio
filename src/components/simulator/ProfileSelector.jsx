import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BadgeCheck, Save, Trash2, UserPlus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ProfileSelector({ onSelect, currentAccount }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    username: '',
    display_name: '',
    avatar_url: '',
    profile_url: '',
    verified: false
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => base44.entities.Profile.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Profile.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      setNewProfile({ name: '', username: '', display_name: '', avatar_url: '', profile_url: '', verified: false });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Profile.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    }
  });

  const handleSaveCurrentAsProfile = () => {
    if (!currentAccount?.username && !currentAccount?.display_name) return;
    
    setNewProfile({
      name: currentAccount.display_name || currentAccount.username || '',
      username: currentAccount.username || '',
      display_name: currentAccount.display_name || '',
      avatar_url: currentAccount.avatar_url || '',
      profile_url: currentAccount.profile_url || '',
      verified: currentAccount.verified || false
    });
  };

  const handleSaveProfile = () => {
    if (!newProfile.name) return;
    createMutation.mutate(newProfile);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="bg-purple-600/20 border-purple-500/30 text-purple-300 hover:bg-purple-600/30"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Use Saved Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Saved Profiles</DialogTitle>
        </DialogHeader>

        {/* Saved Profiles List */}
        <div className="space-y-3 mb-6">
          {profiles.length === 0 ? (
            <p className="text-white/50 text-sm text-center py-8">No saved profiles yet</p>
          ) : (
            profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                {profile.avatar_url && (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white truncate">{profile.name}</p>
                    {profile.verified && (
                      <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-white/50 text-sm truncate">@{profile.username}</p>
                </div>
                <Button
                  onClick={() => {
                    onSelect({
                      username: profile.username,
                      display_name: profile.display_name,
                      avatar_url: profile.avatar_url,
                      profile_url: profile.profile_url,
                      verified: profile.verified
                    });
                    setIsOpen(false);
                  }}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Use
                </Button>
                <Button
                  onClick={() => deleteMutation.mutate(profile.id)}
                  size="icon"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Save Current as Profile */}
        {currentAccount && (currentAccount.username || currentAccount.display_name) && (
          <div className="mb-6 p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300 mb-2">Quick save current account as profile</p>
            <Button
              onClick={handleSaveCurrentAsProfile}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Use Current Account
            </Button>
          </div>
        )}

        {/* Create New Profile */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-white font-semibold mb-4">Create New Profile</h3>
          <div className="space-y-3">
            <Input
              placeholder="Profile name (e.g., 'My Business Account')"
              value={newProfile.name}
              onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <Input
              placeholder="Username"
              value={newProfile.username}
              onChange={(e) => setNewProfile({ ...newProfile, username: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <Input
              placeholder="Display name"
              value={newProfile.display_name}
              onChange={(e) => setNewProfile({ ...newProfile, display_name: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <Input
              placeholder="Avatar URL"
              value={newProfile.avatar_url}
              onChange={(e) => setNewProfile({ ...newProfile, avatar_url: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <Input
              placeholder="Profile URL"
              value={newProfile.profile_url}
              onChange={(e) => setNewProfile({ ...newProfile, profile_url: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={newProfile.verified}
                onCheckedChange={(checked) => setNewProfile({ ...newProfile, verified: checked })}
              />
              <label className="text-white/70 text-sm">Verified badge</label>
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={!newProfile.name || createMutation.isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {createMutation.isPending ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}