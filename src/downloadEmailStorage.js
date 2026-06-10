export const DOWNLOAD_USER_EMAIL_KEY = "download_user_email";

export function getStoredDownloadEmail() {
  try {
    return localStorage.getItem(DOWNLOAD_USER_EMAIL_KEY) || "";
  } catch {
    return "";
  }
}

export function saveDownloadEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    localStorage.setItem(DOWNLOAD_USER_EMAIL_KEY, normalizedEmail);
  } catch {
    return "";
  }

  return normalizedEmail;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
