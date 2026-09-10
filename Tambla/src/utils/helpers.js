/**
 * Tambla — Utility Functions
 */

/**
 * Format a number as UGX currency.
 * @param {number} amount
 * @returns {string} e.g. "UGX 12,000"
 */
export function formatUGX(amount) {
  if (amount == null) return 'UGX 0';
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-UG');
  const prefix = amount < 0 ? '-' : '';
  return `${prefix}UGX ${formatted}`;
}

/**
 * Format a phone number for display.
 * @param {string} phone
 * @returns {string}
 */
export function formatPhone(phone) {
  if (!phone) return '';
  return phone;
}

/**
 * Get initials from a name.
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Format distance in km.
 * @param {number} km
 * @returns {string}
 */
export function formatDistance(km) {
  if (km == null) return '';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

/**
 * Format duration in minutes.
 * @param {number} minutes
 * @returns {string}
 */
export function formatDuration(minutes) {
  if (minutes == null) return '';
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}min` : `${hrs}h`;
}

/**
 * Get greeting based on time of day.
 * @returns {string}
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Format elapsed time as MM:SS.
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatElapsedTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Format a rating number.
 * @param {number} rating
 * @returns {string}
 */
export function formatRating(rating) {
  if (rating == null) return '—';
  return rating.toFixed(1);
}
