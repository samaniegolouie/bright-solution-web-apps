import { useState } from "react";
import Button from "./button";
import { isValidEmail } from "../downloadEmailStorage";

export default function EmailGateModal({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    if (import.meta.env.DEV) {
      console.log("[downloadGate] email modal submit value", email);
    }

    onSubmit(email);
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-xl w-full text-gray-700"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-email-title"
    >
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
