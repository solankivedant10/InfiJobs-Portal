import React, { useState, useRef, useEffect } from "react";
import { sendSupportEmail } from "../services/emailService";

const recipients = {
  tech: { label: "Tech Team Head", email: "nandkishor@infijobs.pro" },
  sales: { label: "Sales Team Manager", email: "parv@infijobs.pro" },
  marketing: { label: "Marketing Team Manager", email: "sarvesh@infijobs.pro" },
  founder: { label: "Founder", email: "sagar@infijobs.pro" },
  general: { label: "General Query", email: "darshan@infijobs.pro" }
} as const;

// 👇 TypeScript knows the only allowed values here
type RecipientKey = keyof typeof recipients;

const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [recipient, setRecipient] = useState<RecipientKey>("general");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSuccess("");
      setError("");
      emailRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const targetRecipient = recipients[recipient];

    try {
      await sendSupportEmail({
        to: targetRecipient.email,
        toName: targetRecipient.label,
        from: email,
        message: query,
        department: targetRecipient.label
      });

      setSuccess("Your query has been sent successfully!");
      setEmail("");
      setQuery("");
    } catch (err) {
      console.error("Failed to send email:", err);
      setError("Failed to send your query. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">

      {/* Widget Box */}
      <div
        className={`
          bg-white dark:bg-gray-800 w-80 mb-4 p-4 rounded-xl shadow-2xl
          border border-gray-200 dark:border-gray-700 transition-all duration-300 origin-bottom-right
          ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-3">
          <h4 className="font-bold text-gray-800 dark:text-white">Support</h4>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-red-500"
          >
            <i className="fa-solid fa-times text-lg" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Team selector */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Select Team
            </label>

            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value as RecipientKey)}
              className="support-select w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {Object.entries(recipients).map(([id, info]) => (
                <option key={id} value={id}>
                  {info.label}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Your Email
            </label>
            <input
              ref={emailRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="support-select w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Query */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Your Message
            </label>
            <textarea
              required
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Write your message for ${recipients[recipient].label}...`}
              className="support-select w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Success Message */}
          {success && (
            <p className="text-sm text-green-400 text-center font-medium">{success}</p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-400 text-center font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="support-select w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow-md 
                       transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Query"}
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`support-select p-4 rounded-full shadow-xl transition-all duration-300
          ${isOpen ? "bg-red-500 rotate-45" : "bg-blue-600"}
          text-white hover:scale-110
        `}
      >
        <i className="fa-solid fa-message" />
      </button>

    </div>
  );
};

export default SupportWidget;
