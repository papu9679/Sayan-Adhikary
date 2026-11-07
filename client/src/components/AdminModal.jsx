import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getApiUrl } from '../config/api';
import { 
  ShieldCheck, 
  X, 
  Lock, 
  Check, 
  Trash2, 
  Ban, 
  RefreshCw, 
  AlertCircle,
  Star,
  Mail
} from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onFeedbackUpdated }) {
  const { isDaylight } = useTheme();

  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('sayan-admin-token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Data states
  const [feedbackList, setFeedbackList] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, published: 0, rejected: 0 });
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // Auto-verify if token already exists in localStorage
  useEffect(() => {
    if (isOpen && authToken) {
      verifyToken(authToken);
    }
  }, [isOpen]);

  const verifyToken = async (token) => {
    setVerifying(true);
    setLoginError('');
    try {
      const res = await fetch(getApiUrl('/api/admin/stats'), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('sayan-admin-token', token);
        loadAdminData(token);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('sayan-admin-token');
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setLoginError('');
    try {
      const res = await fetch(getApiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const token = data.token || password;
        setAuthToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('sayan-admin-token', token);
        setPassword('');
        loadAdminData(token);
      } else {
        setLoginError(data.message || 'Invalid password. (Default is admin123)');
      }
    } catch {
      setLoginError('Could not reach backend server.');
    } finally {
      setVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken('');
    localStorage.removeItem('sayan-admin-token');
  };

  const loadAdminData = async (token = authToken, tab = activeTab) => {
    setLoading(true);
    setActionMessage('');
    try {
      const statsRes = await fetch(getApiUrl('/api/admin/stats'), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      const statusParam = tab === 'all' ? 'all' : tab;
      const listRes = await fetch(getApiUrl(`/api/admin/feedback?status=${statusParam}`), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const listData = await listRes.json();
      if (listData.success) {
        setFeedbackList(listData.data || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    setActionMessage('');
    try {
      const res = await fetch(getApiUrl(`/api/admin/feedback/${id}`), {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage(`Feedback marked as "${newStatus}".`);
        loadAdminData(authToken, activeTab);
        if (onFeedbackUpdated) onFeedbackUpdated();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback permanently?')) return;
    try {
      const res = await fetch(getApiUrl(`/api/admin/feedback/${id}`), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage('Feedback entry deleted.');
        loadAdminData(authToken, activeTab);
        if (onFeedbackUpdated) onFeedbackUpdated();
      }
    } catch (err) {
      console.error('Error deleting feedback:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-4xl rounded-3xl p-6 sm:p-8 border shadow-2xl max-h-[90vh] flex flex-col ${
          isDaylight
            ? 'bg-white text-slate-900 border-slate-200 shadow-slate-300'
            : 'bg-[#111827] text-white border-slate-800 shadow-black'
        }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black leading-tight text-slate-900 dark:text-white">
                Feedback Moderation Portal
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Private administrator controls (PRD §4 & §5)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-rose-500 transition-colors"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate Screen */}
        {!isAuthenticated ? (
          <div className="py-12 px-4 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-3xl mx-auto mb-4 bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">Admin Authentication</h4>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-6">
              Enter master administrator password to moderate visitor feedback submissions.
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password (default: admin123)"
                  className={`w-full px-4 py-3.5 rounded-2xl text-sm font-bold border outline-none focus:ring-2 focus:ring-blue-500 text-center ${
                    isDaylight 
                      ? 'bg-slate-50 border-slate-300 text-slate-900' 
                      : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {verifying ? 'Authenticating...' : 'Unlock Admin Panel'}
              </button>
            </form>

            <p className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              💡 Tip: Default password in `.env` is <code className="font-mono font-bold text-blue-600 dark:text-blue-400">admin123</code>.
            </p>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Stats summary banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-center">
                <span className="block text-2xl font-black text-amber-500">{stats.pending}</span>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Pending Review</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center">
                <span className="block text-2xl font-black text-emerald-500">{stats.published}</span>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Published on Wall</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-center">
                <span className="block text-2xl font-black text-rose-500">{stats.rejected}</span>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Rejected / Hidden</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-center">
                <span className="block text-2xl font-black text-blue-500">{stats.total}</span>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">Total Submissions</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'pending', label: `Pending (${stats.pending})` },
                  { id: 'published', label: `Published (${stats.published})` },
                  { id: 'rejected', label: `Rejected (${stats.rejected})` },
                  { id: 'all', label: `All (${stats.total})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      loadAdminData(authToken, tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isDaylight
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => loadAdminData(authToken, activeTab)}
                className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-blue-500"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {actionMessage && (
              <div className="my-2 p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-bold border border-emerald-300 dark:border-emerald-700">
                ✓ {actionMessage}
              </div>
            )}

            {/* Submissions List */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 mt-3">
              {loading && feedbackList.length === 0 && (
                <div className="py-12 text-center text-xs font-bold text-slate-400">Loading submissions...</div>
              )}

              {!loading && feedbackList.length === 0 && (
                <div className="py-12 text-center text-xs font-bold text-slate-400">
                  No submissions under "{activeTab}" status.
                </div>
              )}

              {feedbackList.map((item) => (
                <div
                  key={item._id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isDaylight 
                      ? 'bg-slate-50 border-slate-200' 
                      : 'bg-slate-800/80 border-slate-700 text-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {item.name || 'Anonymous Visitor'}
                      </span>
                      {item.email && (
                        <span className="text-xs text-slate-500 dark:text-slate-300 flex items-center gap-1 font-mono font-medium">
                          <Mail className="w-3 h-3" />
                          <span>{item.email}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        item.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/90 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700'
                          : item.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/90 dark:text-amber-200 border border-amber-200 dark:border-amber-700'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/90 dark:text-rose-200 border border-rose-200 dark:border-rose-700'
                      }`}>
                        {item.status}
                      </span>
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-xs font-black ml-1">{item.rating || 5}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 mb-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
                    "{item.message}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="text-[11px] font-medium">
                      Submitted: {new Date(item.createdAt).toLocaleString()}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      {item.status !== 'published' && (
                        <button
                          onClick={() => updateStatus(item._id, 'published')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Publish</span>
                        </button>
                      )}

                      {item.status !== 'rejected' && (
                        <button
                          onClick={() => updateStatus(item._id, 'rejected')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        onClick={() => deleteItem(item._id)}
                        className="p-1.5 rounded-xl hover:bg-rose-500/20 text-rose-500"
                        title="Delete permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
