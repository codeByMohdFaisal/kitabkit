"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

/**
 * INTEGRATION POINT — lead capture.
 * For v1 this builds a mailto: link client-side so the form works with zero
 * backend. To capture leads properly, replace handleSubmit with a POST to an
 * app/api/contact route (or a service like Formspree) that stores/forwards
 * the message — the field names below are already shaped for that.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    `Website enquiry from ${name || "a visitor"}`
  )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoHref;
      }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-forest-900">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-forest-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-forest-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-forest-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700 sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
