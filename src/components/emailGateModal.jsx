import { useState } from "react";
import Button from "./button";
import { getStoredDownloadEmail, isValidEmail } from "../downloadEmailStorage";

export default function EmailGateModal({ onClose, onSubmit }) {
  const [email, setEmail] = useState(() => getStoredDownloadEmail());
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms and Conditions to continue.");
      return;
    }

    setError("");

    if (import.meta.env.DEV) {
      console.log("[downloadGate] email modal submit value", email);
    }

    onSubmit(email, acceptedTerms);
  };

  return (
    <div
      className="relative bg-white p-6 rounded-xl shadow-xl w-full text-gray-700"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-email-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-2xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-900/20"
        aria-label="Close email download modal"
      >
        &times;
      </button>

      <h2 id="download-email-title" className="text-lg font-bold text-red-900">
        Enter your email to download
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        We will ask only once on this browser.
      </p>

      <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-semibold text-gray-800">
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 rounded-lg border border-gray-300 px-4 text-gray-800 outline-none focus:border-red-900 focus:ring-2 focus:ring-red-900/20"
            placeholder="you@example.com"
            autoFocus
            required
          />
        </label>

        <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-red-900 focus:ring-red-900"
            required
          />
          <span>
            I accept the Terms and Conditions and agree to continue with this
            download.
          </span>
        </label>

        {error && (
          <p className="text-sm font-medium text-red-700" role="alert">
            {error}
          </p>
        )}

        <Button className="h-12 text-white mt-2" color="crimson" type="submit">
          Continue download
        </Button>
      </form>
    </div>
  );
}
