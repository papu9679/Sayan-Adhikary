/**
 * API Configuration and URL Helper
 *
 * Handles backend API endpoint resolution across local development and production deployments.
 *
 * - In Local Development:
 *   Leave VITE_API_URL empty in client/.env. Vite dev server proxies '/api' to http://localhost:5000.
 *
 * - In Production (e.g. Frontend on Vercel/Netlify, Backend on Render/Railway):
 *   Set VITE_API_URL in your hosting platform environment variables:
 *   VITE_API_URL=https://your-backend-api.onrender.com
 *   All frontend requests will automatically target your production backend.
 */

const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();

// Remove trailing slash to prevent double slashes in constructed URLs
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

/**
 * Resolves an API endpoint path to a full URL or relative proxy path.
 * @param {string} endpoint - API path, e.g. '/api/feedback' or '/api/admin/stats'
 * @returns {string} Fully qualified URL or proxy-compatible path
 */
export function getApiUrl(endpoint) {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (!API_BASE_URL) {
    return normalizedEndpoint;
  }

  // Prevent double '/api' if VITE_API_URL already contains the '/api' prefix
  if (API_BASE_URL.endsWith('/api') && normalizedEndpoint.startsWith('/api/')) {
    return `${API_BASE_URL}${normalizedEndpoint.slice(4)}`;
  }

  return `${API_BASE_URL}${normalizedEndpoint}`;
}
