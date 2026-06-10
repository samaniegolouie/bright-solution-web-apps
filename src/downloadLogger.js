// Local testing fallback only. Move this URL to VITE_DOWNLOAD_LOG_WEB_APP_URL in .env later.
const LOCAL_TEST_DOWNLOAD_LOG_WEB_APP_URL = "";

const envDownloadLogUrl = import.meta.env.VITE_DOWNLOAD_LOG_WEB_APP_URL || "";
const DOWNLOAD_LOG_WEB_APP_URL =
  envDownloadLogUrl || LOCAL_TEST_DOWNLOAD_LOG_WEB_APP_URL;

if (import.meta.env.DEV) {
  console.log("[downloadLogger] URL resolved", {
    hasUrl: Boolean(DOWNLOAD_LOG_WEB_APP_URL),
    source: envDownloadLogUrl ? "env" : "fallback",
    envKey: "VITE_DOWNLOAD_LOG_WEB_APP_URL",
    url: DOWNLOAD_LOG_WEB_APP_URL,
  });
}

// Fire-and-forget download logging. This must never block or prevent downloads.
export function logDownloadClick({ filename, email = "", ip = "", source = "" }) {
  if (import.meta.env.DEV) {
    console.log("[downloadLogger] logDownloadClick called", {
      filename,
      email,
      ip,
      source,
      fetchUrlExists: Boolean(DOWNLOAD_LOG_WEB_APP_URL),
    });
  }

  if (!DOWNLOAD_LOG_WEB_APP_URL) {
    if (import.meta.env.DEV) {
      console.warn(
        "[downloadLogger] fetch skipped: missing VITE_DOWNLOAD_LOG_WEB_APP_URL"
      );
    }
    return;
  }

  const now = new Date().toISOString();
  const payload = {
    filename: filename || "",
    data_logs: now,
    timestamp: now,
    email,
    ip,
    device: navigator.userAgent,
    source,
  };

  if (import.meta.env.DEV) {
    console.log(
      "[downloadLogger] fetch URL exists",
      Boolean(DOWNLOAD_LOG_WEB_APP_URL)
    );
    console.log("[downloadLogger] payload includes email", {
      email: payload.email,
      payload,
    });
    console.log(
      "[downloadLogger] fetch attempted to VITE_DOWNLOAD_LOG_WEB_APP_URL",
      DOWNLOAD_LOG_WEB_APP_URL
    );
  }

  fetch(DOWNLOAD_LOG_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Ignore logging failures so the original download/open flow continues.
  });
}
