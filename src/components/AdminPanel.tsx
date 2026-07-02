'use client';

import { useState, useEffect } from 'react';
import { Database, Users, Monitor, Smartphone, Trash2, RefreshCw } from 'lucide-react';

interface User {
  _id: string;
  email: string;
  name: string;
  loginTime: string;
  ipAddress: string;
  deviceType: string;
  browser: string;
  os: string;
  referrer: string;
  sessionId: string;
  isActive: boolean;
  lastSeen: string;
}

interface Stats {
  totalUsers: number;
  uniqueEmailCount: number;
  deviceTypeStats: Record<string, number>;
  browserStats: Record<string, number>;
  osStats: Record<string, number>;
}

interface AdminData {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  statistics: Stats;
}

const AdminPanel = () => {
  const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users?page=${page}&limit=10`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}?`)) return;
    
    try {
      const response = await fetch(`/api/users?email=${email}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        fetchData(currentPage);
      } else {
        alert(result.error || 'Failed to delete user');
      }
    } catch {
      alert('Network error');
    }
  };

  useEffect(() => {
    if (isStaticExport) {
      setLoading(false);
      return;
    }

    fetchData(currentPage);
  }, [currentPage, isStaticExport]);

  if (isStaticExport) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-6">
        <div className="max-w-lg text-center">
          <h1 className="terminal-text mb-4 text-3xl font-bold text-white">&gt; ADMIN_UNAVAILABLE</h1>
          <p className="leading-7 text-gray-400">
            The admin database panel is only available on the server deployment.
          </p>
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-400 terminal-text">LOADING_ADMIN_PANEL...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 terminal-text mb-4">ERROR: {error}</p>
          <button
            onClick={() => fetchData(currentPage)}
            className="px-4 py-2 bg-green-600 text-black rounded-lg terminal-text hover:bg-green-500"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white terminal-text">
              &gt; ADMIN_PANEL
            </h1>
            <button
              onClick={() => fetchData(currentPage)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-black rounded-lg terminal-text hover:bg-green-500"
            >
              <RefreshCw size={16} />
              <span>REFRESH</span>
            </button>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-lg p-6 hacker-glow">
            <div className="flex items-center space-x-3">
              <Users className="text-green-400" size={24} />
              <div>
                <p className="text-cyan-400 terminal-text text-sm">TOTAL_USERS</p>
                <p className="text-2xl font-bold text-white terminal-text">
                  {data.statistics.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg p-6 hacker-glow">
            <div className="flex items-center space-x-3">
              <Database className="text-cyan-400" size={24} />
              <div>
                <p className="text-cyan-400 terminal-text text-sm">UNIQUE_EMAILS</p>
                <p className="text-2xl font-bold text-white terminal-text">
                  {data.statistics.uniqueEmailCount}
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg p-6 hacker-glow">
            <div className="flex items-center space-x-3">
              <Monitor className="text-purple-400" size={24} />
              <div>
                <p className="text-cyan-400 terminal-text text-sm">DESKTOP_USERS</p>
                <p className="text-2xl font-bold text-white terminal-text">
                  {data.statistics.deviceTypeStats.Desktop || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg p-6 hacker-glow">
            <div className="flex items-center space-x-3">
              <Smartphone className="text-yellow-400" size={24} />
              <div>
                <p className="text-cyan-400 terminal-text text-sm">MOBILE_USERS</p>
                <p className="text-2xl font-bold text-white terminal-text">
                  {data.statistics.deviceTypeStats.Mobile || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Device & Browser Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-lg p-6 hacker-glow">
            <h3 className="text-lg font-bold text-white terminal-text mb-4">
              &gt; DEVICE_TYPES
            </h3>
            <div className="space-y-2">
              {Object.entries(data.statistics.deviceTypeStats).map(([device, count]) => (
                <div key={device} className="flex justify-between items-center">
                  <span className="text-cyan-400 terminal-text">{device}</span>
                  <span className="text-green-400 terminal-text">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-lg p-6 hacker-glow">
            <h3 className="text-lg font-bold text-white terminal-text mb-4">
              &gt; BROWSERS
            </h3>
            <div className="space-y-2">
              {Object.entries(data.statistics.browserStats).map(([browser, count]) => (
                <div key={browser} className="flex justify-between items-center">
                  <span className="text-cyan-400 terminal-text">{browser}</span>
                  <span className="text-green-400 terminal-text">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-lg p-6 hacker-glow">
            <h3 className="text-lg font-bold text-white terminal-text mb-4">
              &gt; OPERATING_SYSTEMS
            </h3>
            <div className="space-y-2">
              {Object.entries(data.statistics.osStats).map(([os, count]) => (
                <div key={os} className="flex justify-between items-center">
                  <span className="text-cyan-400 terminal-text">{os}</span>
                  <span className="text-green-400 terminal-text">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass rounded-lg p-6 hacker-glow">
          <h3 className="text-lg font-bold text-white terminal-text mb-4">
            &gt; USER_DATABASE
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-green-400/30">
                  <th className="text-left py-3 text-cyan-400 terminal-text">NAME</th>
                  <th className="text-left py-3 text-cyan-400 terminal-text">EMAIL</th>
                  <th className="text-left py-3 text-cyan-400 terminal-text">DEVICE</th>
                  <th className="text-left py-3 text-cyan-400 terminal-text">BROWSER</th>
                  <th className="text-left py-3 text-cyan-400 terminal-text">OS</th>
                  <th className="text-left py-3 text-cyan-400 terminal-text">LOGIN_TIME</th>
                  <th className="text-left py-3 text-cyan-400 terminal-text">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-800">
                    <td className="py-3 text-white terminal-text">{user.name}</td>
                    <td className="py-3 text-cyan-400 terminal-text">{user.email}</td>
                    <td className="py-3 text-green-400 terminal-text">{user.deviceType}</td>
                    <td className="py-3 text-green-400 terminal-text">{user.browser}</td>
                    <td className="py-3 text-green-400 terminal-text">{user.os}</td>
                    <td className="py-3 text-gray-400 terminal-text">
                      {new Date(user.loginTime).toLocaleString()}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => deleteUser(user.email)}
                        className="text-red-400 hover:text-red-300 terminal-text"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-gray-400 terminal-text">
              Page {data.pagination.page} of {data.pagination.pages} 
              ({data.pagination.total} total users)
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 terminal-text"
              >
                PREV
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(data.pagination.pages, currentPage + 1))}
                disabled={currentPage === data.pagination.pages}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 terminal-text"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
