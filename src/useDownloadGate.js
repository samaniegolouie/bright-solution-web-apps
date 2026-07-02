import { useState } from "react";
import { logDownloadClick } from "./downloadLogger";
import {
  getStoredDownloadEmail,
  hasAcceptedDownloadTerms,
  saveDownloadEmail,
  saveDownloadTermsAccepted,
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
    const acceptedTerms = hasAcceptedDownloadTerms();

    if (import.meta.env.DEV) {
      console.log("[downloadGate] localStorage gate values", {
        email: savedEmail,
        acceptedTerms,
      });
    }

    if (savedEmail && acceptedTerms) {
      if (import.meta.env.DEV) {
        console.log("[downloadGate] saved email and terms found", savedEmail);
      }

      continueDownload(download, savedEmail);
      return;
    }

    if (import.meta.env.DEV) {
      console.log("[downloadGate] showing email and terms modal");
    }

    setPendingDownload(download);
  };

  const submitDownloadEmail = (email, acceptedTerms) => {
    if (!acceptedTerms) return;

    const savedEmail = saveDownloadEmail(email);
    const savedTerms = saveDownloadTermsAccepted();

    if (import.meta.env.DEV) {
      console.log("[downloadGate] modal submitted email", {
        email: savedEmail,
        acceptedTerms: savedTerms,
        hasPendingDownload: Boolean(pendingDownload),
        pendingDownloadObject: pendingDownload,
      });
    }

    if (!savedEmail || !savedTerms || !pendingDownload) return;

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
