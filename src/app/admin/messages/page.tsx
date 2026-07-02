'use client';

import { useCallback, useState, useEffect } from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  status: 'new' | 'read' | 'replied' | 'archived';
  ipAddress: string;
  userAgent: string;
}

interface MessageStats {
  totalMessages: number;
  newMessages: number;
  readMessages: number;
  repliedMessages: number;
  archivedMessages: number;
}

const MessagesPage = () => {
  const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<MessageStats>({
    totalMessages: 0,
    newMessages: 0,
    readMessages: 0,
    repliedMessages: 0,
    archivedMessages: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/messages?status=${filter}`);
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.data.messages);
        setStats(data.data.statistics);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (isStaticExport) {
      setLoading(false);
      return;
    }

    fetchMessages();
  }, [fetchMessages, isStaticExport]);

  if (isStaticExport) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
        <div className="max-w-lg text-center">
          <h1 className="mb-4 text-3xl font-bold">Message Management Unavailable</h1>
          <p className="leading-7 text-gray-400">
            The message database is only available on the server deployment.
          </p>
        </div>
      </div>
    );
  }

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      });

      if (response.ok) {
        fetchMessages();
        if (selectedMessage?._id === messageId) {
          setSelectedMessage({ ...selectedMessage, status: 'read', isRead: true });
        }
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchMessages();
        if (selectedMessage?._id === messageId) {
          setSelectedMessage({ ...selectedMessage, status: status as "new" | "read" | "replied" | "archived" });
        }
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-green-400 bg-green-400/20';
      case 'read': return 'text-blue-400 bg-blue-400/20';
      case 'replied': return 'text-purple-400 bg-purple-400/20';
      case 'archived': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Message Management</h1>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="glass rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400">Total</h3>
            <p className="text-2xl font-bold">{stats.totalMessages}</p>
          </div>
          <div className="glass rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400">New</h3>
            <p className="text-2xl font-bold">{stats.newMessages}</p>
          </div>
          <div className="glass rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-400">Read</h3>
            <p className="text-2xl font-bold">{stats.readMessages}</p>
          </div>
          <div className="glass rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-400">Replied</h3>
            <p className="text-2xl font-bold">{stats.repliedMessages}</p>
          </div>
          <div className="glass rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-400">Archived</h3>
            <p className="text-2xl font-bold">{stats.archivedMessages}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "new" | "read" | "replied" | "archived")}
            className="px-4 py-2 bg-gray-800 border border-green-400/30 rounded-lg text-white"
          >
            <option value="all">All Messages</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message List */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedMessage?._id === message._id
                        ? 'border-green-400 bg-green-400/10'
                        : 'border-gray-600 hover:border-green-400/50'
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-white">{message.subject}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-1">From: {message.name} ({message.email})</p>
                    <p className="text-gray-400 text-xs">{formatDate(message.timestamp)}</p>
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="glass rounded-lg p-6">
            {selectedMessage ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">Message Details</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => markAsRead(selectedMessage._id)}
                      disabled={selectedMessage.isRead}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                    >
                      Mark as Read
                    </button>
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => updateMessageStatus(selectedMessage._id, e.target.value)}
                      className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-sm"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-green-400">Subject</h3>
                    <p className="text-white">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-400">From</h3>
                    <p className="text-white">{selectedMessage.name} ({selectedMessage.email})</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-400">Date</h3>
                    <p className="text-white">{formatDate(selectedMessage.timestamp)}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-400">Message</h3>
                    <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-400">Technical Info</h3>
                    <p className="text-gray-300 text-sm">IP: {selectedMessage.ipAddress}</p>
                    <p className="text-gray-300 text-sm">User Agent: {selectedMessage.userAgent}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Select a message to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
