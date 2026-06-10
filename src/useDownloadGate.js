import { useState } from "react";
import { logDownloadClick } from "./downloadLogger";
import {
  getStoredDownloadEmail,
  saveDownloadEmail,
} from "./downloadEmailStorage";

function openDownload(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function useDownloadGate() {
  const [pendingDownload, setPendingDownload] = useState(null);

  const continueDownload = (download, email) => {
    if (import.meta.env.DEV) {
      console.log("[downloadGate] continuing download", {
        filename: download?.filename,
        email,
        source: download?.source,
        url: download?.url,
      });
    }

    if (import.meta.env.DEV) {
      console.log("[downloadGate] calling logDownloadClick", {
        filename: download?.filename,
        email,
        source: download?.source,
      });
    }

    logDownloadClick({
      filename: download.filename,
      email,
      source: download.source,
    });

    if (import.meta.env.DEV) {
      console.log("[downloadGate] logDownloadClick triggered before opening URL");
    }

    openDownload(download.url);
  };

  const requestDownload = (download) => {
    if (import.meta.env.DEV) {
      console.log("[downloadGate] download gate click received", download);
    }

    const savedEmail = getStoredDownloadEmail();

    if (import.meta.env.DEV) {
      console.log("[downloadGate] email from localStorage", savedEmail);
    }

    if (savedEmail) {
      if (import.meta.env.DEV) {
        console.log("[downloadGate] saved email found", savedEmail);
      }

      continueDownload(download, savedEmail);
      return;
    }

    if (import.meta.env.DEV) {
      console.log("[downloadGate] saved email missing, showing modal");
    }

    setPendingDownload(download);
  };

  const submitDownloadEmail = (email) => {
    const savedEmail = saveDownloadEmail(email);

    if (import.meta.env.DEV) {
      console.log("[downloadGate] modal submitted email", {
        email: savedEmail,
        hasPendingDownload: Boolean(pendingDownload),
        pendingDownloadObject: pendingDownload,
      });
    }

    if (!savedEmail || !pendingDownload) return;

    const download = pendingDownload;
    setPendingDownload(null);
    continueDownload(download, savedEmail);
  };

  return {
    hasPendingDownload: Boolean(pendingDownload),
    requestDownload,
    submitDownloadEmail,
  };
}
