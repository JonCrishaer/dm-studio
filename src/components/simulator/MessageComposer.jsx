import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Plus, Trash2, GripVertical, Image, MessageCircle } from 'lucide-react';

export default function MessageComposer({ messages, onChange, account1, account2 }) {
  const [newMessage, setNewMessage] = useState({ sender: 'account_1', content: '', type: 'text' });

  const addMessage = () => {
    if (!newMessage.content.trim()) return;
    onChange([...messages, { ...newMessage, id: Date.now() }]);
    setNewMessage({ sender: newMessage.sender, content: '', type: 'text' });
  };

  const removeMessage = (index) => {
    onChange(messages.filter((_, i) => i !== index));
  };

  const updateMessage = (index, updates) => {
    const updated = [...messages];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Compose Messages
        </h3>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setNewMessage({ ...newMessage, sender: 'account_1' })}
              className={`flex-1 p-3 rounded-xl border transition-all ${
                newMessage.sender === 'account_1'
                  ? 'border-purple-500 bg-purple-500/20 text-white'
                  : 'border-white/10 text-white/50 hover:border-white/20'
              }`}
            >
              <p className="font-medium truncate">{account1?.display_name || 'Account 1'}</p>
              <p className="text-xs opacity-60 truncate">@{account1?.username || 'user1'}</p>
            </button>
            <button
              onClick={() => setNewMessage({ ...newMessage, sender: 'account_2' })}
              className={`flex-1 p-3 rounded-xl border transition-all ${
                newMessage.sender === 'account_2'
                  ? 'border-blue-500 bg-blue-500/20 text-white'
                  : 'border-white/10 text-white/50 hover:border-white/20'
              }`}
            >
              <p className="font-medium truncate">{account2?.display_name || 'Account 2'}</p>
              <p className="text-xs opacity-60 truncate">@{account2?.username || 'user2'}</p>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setNewMessage({ ...newMessage, type: 'text' })}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                newMessage.type === 'text'
                  ? 'bg-white/20 text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setNewMessage({ ...newMessage, type: 'image' })}
              className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-1 ${
                newMessage.type === 'image'
                  ? 'bg-white/20 text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" /> Image
            </button>
          </div>

          {newMessage.type === 'text' ? (
            <Textarea
              value={newMessage.content}
              onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              placeholder="Type your message..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[80px]"
            />
          ) : (
            <Input
              value={newMessage.content}
              onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              placeholder="Image URL..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          )}

          <Button
            onClick={addMessage}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Message
          </Button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">
          Message Queue ({messages.length})
        </h3>

        {messages.length === 0 ? (
          <p className="text-white/40 text-center py-8">No messages yet. Add some above!</p>
        ) : (
          <Reorder.Group axis="y" values={messages} onReorder={onChange} className="space-y-2">
            <AnimatePresence>
              {messages.map((message, index) => (
                <Reorder.Item
                  key={message.id || index}
                  value={message}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="w-4 h-4 text-white/30" />
                  <div className={`w-2 h-2 rounded-full ${
                    message.sender === 'account_1' ? 'bg-purple-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/50 text-xs mb-1">
                      {message.sender === 'account_1' 
                        ? (account1?.display_name || 'Account 1')
                        : (account2?.display_name || 'Account 2')
                      }
                    </p>
                    {message.type === 'image' ? (
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Image className="w-4 h-4" />
                        <span className="truncate">{message.content}</span>
                      </div>
                    ) : (
                      <p className="text-white text-sm truncate">{message.content}</p>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeMessage(index)}
                    className="text-white/30 hover:text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </div>
    </div>
  );
}