'use client';

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, User } from "lucide-react";
import { useDictionary } from "@/components/providers/translation-provider";
import { useMotionPreferences } from "@/lib/motion-preferences";

export function ContactSection() {
  const { contact } = useDictionary();
  const { allowMotion, shouldReduceMotion } = useMotionPreferences();
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState(() => contact.defaultMessage);

  const handleContact = () => {
    const encodedMessage = encodeURIComponent(
      `${message}${clientName ? `\nNombre o negocio: ${clientName}` : ""}`
    );
    const whatsappUrl = `https://wa.me/5491171139469?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 scroll-mt-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E1C26] via-[#111418] to-[#0E1C26]" />

      {!shouldReduceMotion && (
        <>
          <div
            className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-[#4FD4E4] opacity-15"
            style={{ filter: `blur(${allowMotion ? 120 : 72}px)` }}
          />
          <div
            className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-[#D55FA3] opacity-15"
            style={{ filter: `blur(${allowMotion ? 120 : 72}px)` }}
          />
        </>
      )}

      {!shouldReduceMotion && (
        <svg
          className="absolute inset-0 h-full w-full opacity-10"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="contact-mesh"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 100 0 L 0 100 M 0 0 L 100 100"
                stroke="#4FD4E4"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-mesh)" />
        </svg>
      )}

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="mb-6 text-4xl text-white md:text-6xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {contact.titleBeforeHighlight}{" "}
            <span className="bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] bg-clip-text text-transparent">
              {contact.titleHighlight}
            </span>
            {contact.titleAfterHighlight ? ` ${contact.titleAfterHighlight}` : ""}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#AAB7C4]">
            {contact.description}
          </p>
        </motion.div>

        <motion.div
          className={`relative overflow-hidden rounded-2xl border border-[#4FD4E4]/30 bg-[#0E1C26]/50 p-12 ${shouldReduceMotion ? "" : "backdrop-blur-sm"}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {!shouldReduceMotion && (
            <div className="absolute inset-0 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4FD4E4]/20 to-[#D55FA3]/20 blur-sm" />
            </div>
          )}

          <div className="relative space-y-8">
            <div className="space-y-4">
              <label
                className="block text-sm tracking-wide text-[#AAB7C4]"
                style={{ fontFamily: "Geist Mono, monospace" }}
              >
                {contact.nameLabel}
              </label>
              <div className="group relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4FD4E4] opacity-70" />
                <input
                  type="text"
                  placeholder={contact.namePlaceholder}
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  className="w-full rounded-lg border border-[#AAB7C4]/20 bg-[#111418] py-4 pl-12 pr-4 text-white placeholder:text-[#AAB7C4]/50 transition-all duration-300 focus:outline-none focus:border-[#4FD4E4] focus:shadow-[0_0_20px_rgba(79,212,228,0.2)]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label
                className="block text-sm tracking-wide text-[#AAB7C4]"
                style={{ fontFamily: "Geist Mono, monospace" }}
              >
                {contact.messageLabel}
              </label>
              <div className="group relative">
                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-[#D55FA3] opacity-70" />
                <textarea
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full resize-none rounded-lg border border-[#AAB7C4]/20 bg-[#111418] py-4 pl-12 pr-4 text-white placeholder:text-[#AAB7C4]/50 transition-all duration-300 focus:outline-none focus:border-[#D55FA3] focus:shadow-[0_0_20px_rgba(213,95,163,0.2)]"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleContact}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] px-10 py-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,212,228,0.6)]"
              >
                <span
                  className="relative z-10 flex items-center gap-2 text-[#111418]"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {contact.buttonLabel}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 space-y-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p
            className="text-[#AAB7C4]"
            style={{ fontFamily: "Geist Mono, monospace" }}
          >
            {contact.contactLine}
          </p>
          <div className="flex items-center justify-center gap-8 pt-4">
            {contact.socials.map((social, index) => (
              <Fragment key={social.label}>
                <a
                  href={social.href}
                  className="text-[#AAB7C4] transition-colors duration-300 hover:text-[#4FD4E4]"
                >
                  {social.label}
                </a>
                {index < contact.socials.length - 1 ? (
                  <span className="text-[#AAB7C4]/30">•</span>
                ) : null}
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 mx-auto mt-20 max-w-6xl border-t border-[#AAB7C4]/10 pt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex flex-col items-center gap-4 text-sm text-[#AAB7C4]/70 md:flex-row md:justify-between">
          <p style={{ fontFamily: "Geist Mono, monospace" }}>
            {contact.footerNote.replace("{year}", `${new Date().getFullYear()}`)}
          </p>
          <p className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full bg-[#4FD4E4] ${allowMotion ? "animate-pulse" : ""}`}
            />
            {contact.systemStatus}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
