"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Send } from "lucide-react";
import { type ServiceId } from "@/lib/i18n/dictionaries";
import { useDictionary } from "./providers/translation-provider";

const WHATSAPP_NUMBER = "5491171139469";
const CONTACT_EMAIL = "info.cosmicst@gmail.com";

export function ContactMessageCard() {
  const { contact } = useDictionary();
  const gpuFlags = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const noContactFx = gpuFlags?.has("nocontactfx") ?? false;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messageAuto, setMessageAuto] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedServicesText = contact.interestOptions
    .filter(option => selectedServices.includes(option.id))
    .map(option => option.label)
    .join(", ");

  const interestMessage = `${contact.interestIntro} ${selectedServicesText || contact.interestFallback}.`;

  const buildOutboundText = () => {
    const trimmedName = name.trim();
    const trimmedMessage = message.trim() || interestMessage;
    const lines: string[] = [];

    if (trimmedName) {
      lines.push(`${contact.nameLabel}: ${trimmedName}`);
    }

    lines.push(`${contact.messageLabel}: ${trimmedMessage}`);
    return lines.join("\n");
  };

  const handleSend = () => {
    if (!name.trim() && !message.trim() && !selectedServices.length) return;

    const text = buildOutboundText();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank");
  };

  const handleEmail = () => {
    if (!name.trim() && !message.trim() && !selectedServices.length) return;

    const text = buildOutboundText();
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(contact.emailSubject)}&body=${encodeURIComponent(text)}`;

    window.location.href = mailto;
  };

  const toggleService = (id: ServiceId) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(serviceId => serviceId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!messageAuto) return;
    setMessage(interestMessage);
  }, [interestMessage, messageAuto]);

  const selectedLabels = contact.interestOptions
    .filter(option => selectedServices.includes(option.id))
    .map(option => option.label);

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <div
        className={`w-full rounded-3xl border border-slate-100 bg-white/90 ${noContactFx ? "" : "shadow-xl"}`}
      >
        <div className="space-y-4 px-6 pt-6 pb-3">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={contact.namePlaceholder}
            suppressHydrationWarning
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <span>{contact.interestLabel}</span>
              <span className="font-medium text-slate-400 normal-case">{contact.interestHelper}</span>
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen(open => !open)}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-sm text-slate-800 shadow-inner outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                aria-haspopup="listbox"
                aria-expanded={servicesOpen}
              >
                <span className="line-clamp-1">
                  {selectedLabels.length ? selectedLabels.join(", ") : contact.interestPlaceholder}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {servicesOpen ? (
                <div
                  className={`absolute z-10 mt-2 w-full rounded-2xl border border-slate-200 bg-white/98 ${noContactFx ? "" : "shadow-lg"}`}
                >
                  <ul
                    className="max-h-56 overflow-auto py-2"
                    role="listbox"
                    aria-label={contact.interestLabel}
                    aria-multiselectable="true"
                  >
                    {contact.interestOptions.map(option => {
                      const isSelected = selectedServices.includes(option.id);
                      return (
                        <li key={option.id}>
                          <button
                            type="button"
                            onClick={() => toggleService(option.id)}
                            className={`flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-800 transition hover:bg-slate-50 ${isSelected ? "bg-slate-50" : ""}`}
                            aria-pressed={isSelected}
                          >
                            <span
                              className={`grid h-5 w-5 place-items-center rounded-md border ${isSelected ? "border-sky-500 bg-sky-500 text-white" : "border-slate-300 bg-white text-transparent"}`}
                              aria-hidden="true"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-left">{option.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <textarea
            value={message}
            onChange={e => {
              setMessageAuto(false);
              setMessage(e.target.value);
            }}
            rows={3}
            placeholder={contact.messagePlaceholder}
            suppressHydrationWarning
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div className="flex items-center justify-between rounded-b-3xl border-t border-slate-100 bg-slate-50 px-4 py-3">
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
            {contact.directMessageLabel}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEmail}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100"
            >
              {contact.sendEmailLabel}
            </button>

            <button
              onClick={handleSend}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-slate-800"
            >
              {contact.sendWhatsappLabel}
              <Send className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
