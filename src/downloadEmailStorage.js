export const DOWNLOAD_USER_EMAIL_KEY = "download_user_email";
export const DOWNLOAD_TERMS_ACCEPTED_KEY = "download_terms_accepted";

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

export function hasAcceptedDownloadTerms() {
  try {
    return localStorage.getItem(DOWNLOAD_TERMS_ACCEPTED_KEY) === "true";
  } catch {
    return false;
  }
}

export function saveDownloadTermsAccepted() {
  try {
    localStorage.setItem(DOWNLOAD_TERMS_ACCEPTED_KEY, "true");
    return true;
  } catch {
    return false;
  }
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
