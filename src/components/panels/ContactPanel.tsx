import {
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Radio,
} from "lucide-react";
import { useState } from "react";
import { contactLinks } from "../../data/portfolio";
import type { ContactLink } from "../../types";

const iconMap: Record<ContactLink["type"], typeof Mail> = {
  email: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
  cv: Download,
};

export function ContactPanel() {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (type: string, value: string) => {
    const finish = () => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 1500);
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).then(finish).catch(() => {});
      return;
    }

    // moose: execCommand is deprecated but covers HTTP and embedded WebViews (e.g. LinkedIn)
    const el = document.createElement("textarea");
    el.value = value;
    el.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(el);
    el.focus();
    el.select();
    try { document.execCommand("copy"); finish(); } catch { /* silent */ }
    document.body.removeChild(el);
  };

  return (
    <article className="panel-grid contact-grid" aria-labelledby="contact-title">
      <section className="dossier-card intro-card">
        <p className="system-label">Contact</p>
        <h2 id="contact-title">Open channels</h2>
        <p className="lead">
          Available for graduate software developer opportunities focused on
          .NET, ASP.NET Core MVC, Android, SQL-backed systems, and maintainable
          product work.
        </p>
        <div className="signal-card" aria-label="Contact readiness">
          <Radio aria-hidden="true" />
          <div>
            <span>Signal strength</span>
            <strong>Ready for interview</strong>
          </div>
        </div>
      </section>

      <section className="dossier-card contact-list" aria-live="polite">
        {contactLinks.map((link) => {
          const Icon = iconMap[link.type];
          const canCopy = link.type === "email" || link.type === "phone";
          const rawValue = canCopy
            ? link.href.replace(/^mailto:|^tel:/, "")
            : null;
          const isCopied = copiedType === link.type;

          return (
            <div key={link.type} className="contact-row">
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                download={link.type === "cv" ? true : undefined}
              >
                <Icon aria-hidden="true" />
                <span>{link.label}</span>
              </a>
              {canCopy && rawValue ? (
                <button
                  type="button"
                  className={`copy-btn${isCopied ? " copied" : ""}`}
                  aria-label={isCopied ? "Copied!" : `Copy ${link.label}`}
                  onClick={() => copyToClipboard(link.type, rawValue)}
                >
                  {isCopied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              ) : null}
            </div>
          );
        })}
      </section>
    </article>
  );
}
