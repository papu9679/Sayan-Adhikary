import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getApiUrl } from '../config/api';
import { 
  MessageSquare, 
  Send, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Heart, 
  AlertCircle,
  RefreshCw,
  Lock,
  Filter,
  Search
} from 'lucide-react';

export default function FeedbackWall({ onOpenAdmin }) {
  const { isDaylight } = useTheme();

  // Submission Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
    publicConsent: true,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');
  const [submitErrorMsg, setSubmitErrorMsg] = useState('');

  // Public Feedback Wall State
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [likedMap, setLikedMap] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [ratingFilter, setRatingFilter] = useState('all');
  const [wallSearch, setWallSearch] = useState('');

  // Fetch approved published feedback
  const fetchPublishedFeedback = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(getApiUrl('/api/feedback'));
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.data || []);
      } else {
        setFetchError(data.message || 'Unable to load feedback at this time.');
      }
    } catch (err) {
      console.warn('API error fetching feedback:', err);
      setFetchError('Backend server is synchronizing. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedFeedback();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccessMsg('');
    setSubmitErrorMsg('');

    if (!formData.message.trim()) {
      setSubmitErrorMsg('Please enter a feedback message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(getApiUrl('/api/feedback'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccessMsg(data.message || 'Thanks for your feedback! It will appear here after review.');
        setFormData({
          name: '',
          email: '',
          rating: 5,
          message: '',
          publicConsent: true,
        });
      } else {
        setSubmitErrorMsg(data.message || 'Submission failed. Please check your inputs.');
      }
    } catch (err) {
      setSubmitErrorMsg('Network error. Could not connect to API server.');
    } finally {
      setSubmitting(false);
    }
  };

  // Interactive like / helpful reaction
  const toggleLike = (id) => {
    const isCurrentlyLiked = !!likedMap[id];
    setLikedMap((prev) => ({
      ...prev,
      [id]: !isCurrentlyLiked,
    }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (isCurrentlyLiked ? -1 : 1),
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  // Filter feedback on the wall
  const filteredFeedbacks = feedbacks.filter((item) => {
    const matchesRating = ratingFilter === 'all' 
      ? true 
      : ratingFilter === '5'
        ? item.rating === 5
        : item.rating >= 4;

    const matchesSearch = !wallSearch.trim() ||
      item.message.toLowerCase().includes(wallSearch.toLowerCase()) ||
      (item.name && item.name.toLowerCase().includes(wallSearch.toLowerCase()));

    return matchesRating && matchesSearch;
  });

  return (
    <section id="feedback" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Voice & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Feedback <span className="braided-text">& Testimonials</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200">
            Leave your thoughts, feedback, or project inquiries. All submissions are moderated to maintain a constructive and supportive space.
          </p>
        </div>

        {/* Two-Column Grid: Left is Form, Right is Published Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Submission Form Column */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 shadow-xl ${
              isDaylight
                ? 'bg-white border-slate-200 shadow-slate-200/60'
                : 'bg-[#111827] border-slate-800 shadow-xl shadow-black/40'
            }`}>
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                      Leave Feedback
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Share your experience or suggestion
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Moderated
                </span>
              </div>

              {/* Status Alerts */}
              {submitSuccessMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-sm flex items-start gap-3 animate-fadeIn font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Submission Received!</strong>
                    <span>{submitSuccessMsg}</span>
                  </div>
                </div>
              )}

              {submitErrorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 text-sm flex items-start gap-3 animate-fadeIn font-medium">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{submitErrorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
                    Your Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Alex Johnson (or blank for Anonymous)"
                    maxLength={60}
                    className={`w-full px-4 py-3 rounded-xl text-sm border font-medium transition-colors outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDaylight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                        : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-900 focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* Email (Optional, private) */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
                    Email <span className="text-slate-400 font-normal lowercase">(optional, kept confidential)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={`w-full px-4 py-3 rounded-xl text-sm border font-medium transition-colors outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDaylight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                        : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-900 focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                        aria-label={`Select ${star} stars`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            (hoverRating || formData.rating) >= star
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                      {formData.rating} of 5 Stars
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Feedback Message <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-bold">
                      {formData.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    maxLength={1000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Great projects! One suggestion for the next release..."
                    className={`w-full px-4 py-3 rounded-xl text-sm border font-medium transition-colors outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      isDaylight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                        : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-900 focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* Permission Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="publicConsent"
                    checked={formData.publicConsent}
                    onChange={(e) => setFormData({ ...formData, publicConsent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="publicConsent" className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-normal cursor-pointer">
                    I grant permission to publicly showcase this feedback on Sayan's portfolio wall once approved by the administrator.
                  </label>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting Feedback...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit for Review</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

          {/* Published Feedback Wall Column */}
          <div className="lg:col-span-7">
            
            {/* Wall Header with Interactive Filters */}
            <div className="pb-4 mb-6 border-b border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Approved Feedback Wall</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700">
                      {feedbacks.length} Published
                    </span>
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                    Verified reviews approved by Sayan
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchPublishedFeedback}
                    title="Refresh wall"
                    className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={onOpenAdmin}
                    title="Open Admin Moderation Panel"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </button>
                </div>
              </div>

              {/* Interactive Wall Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 font-bold flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter:</span>
                  </span>
                  {[
                    { id: 'all', label: 'All' },
                    { id: '5', label: '5 Stars ★' },
                    { id: '4', label: '4+ Stars' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setRatingFilter(f.id)}
                      className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                        ratingFilter === f.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : isDaylight
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Filter search input */}
                <div className="relative">
                  <input
                    type="text"
                    value={wallSearch}
                    onChange={(e) => setWallSearch(e.target.value)}
                    placeholder="Search reviews..."
                    className={`pl-7 pr-3 py-1 rounded-xl text-xs font-medium border outline-none ${
                      isDaylight 
                        ? 'bg-slate-50 border-slate-200 text-slate-800' 
                        : 'bg-slate-900 border-slate-700 text-white focus:border-blue-500'
                    }`}
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
                </div>
              </div>

            </div>

            {/* Error Message */}
            {fetchError && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs font-medium">
                {fetchError}
              </div>
            )}

            {/* Loading Indicator */}
            {loading && feedbacks.length === 0 && (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-28 rounded-3xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filteredFeedbacks.length === 0 && (
              <div className={`text-center py-12 px-6 rounded-3xl border ${
                isDaylight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <MessageSquare className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                  No matching reviews found
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto mb-4 font-medium">
                  {feedbacks.length === 0 
                    ? "Be the first visitor to share your review! Submitted feedback appears here right after admin approval." 
                    : "Try resetting your filter to view all published reviews."}
                </p>
                {(ratingFilter !== 'all' || wallSearch) && (
                  <button
                    onClick={() => { setRatingFilter('all'); setWallSearch(''); }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            )}

            {/* Feedback Cards List */}
            <div className="space-y-4">
              {filteredFeedbacks.map((item) => {
                const totalLikes = (item.rating >= 5 ? 4 : 2) + (likeCounts[item._id] || 0);
                const isLiked = !!likedMap[item._id];
                return (
                  <div
                    key={item._id}
                    className={`p-6 rounded-3xl border transition-all duration-150 hover:shadow-lg ${
                      isDaylight
                        ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                        : 'bg-[#111827] border-slate-800 shadow-md shadow-black/30 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar initial */}
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                          {item.name ? item.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {item.name || 'Anonymous Visitor'}
                            </h4>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          </div>
                          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(item.createdAt)}</span>
                          </span>
                        </div>
                      </div>

                      {/* Star rating */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= (item.rating || 5)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Message body */}
                    <p className="text-sm font-normal text-slate-800 dark:text-slate-100 leading-relaxed mb-4">
                      "{item.message}"
                    </p>

                    {/* Footer metadata & Helpful reaction */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/10 text-xs">
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Review</span>
                      </span>

                      <button
                        onClick={() => toggleLike(item._id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all font-bold cursor-pointer ${
                          isLiked
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-200 border border-rose-300 dark:border-rose-800 scale-105'
                            : isDaylight
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                        title={isLiked ? "Unlike review" : "Mark as helpful"}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-transform ${
                            isLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
                          }`}
                        />
                        <span className="text-[11px]">
                          {isLiked ? 'Helpful' : 'Helpful'} ({totalLikes})
                        </span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
