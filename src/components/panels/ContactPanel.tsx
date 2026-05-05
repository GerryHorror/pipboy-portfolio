import {
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Radio,
} from "lucide-react";
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

      <section className="dossier-card contact-list">
        {contactLinks.map((link) => {
          const Icon = iconMap[link.type];
          return (
            <a
              key={link.type}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              download={link.type === "cv" ? true : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{link.label}</span>
            </a>
          );
        })}
      </section>
    </article>
  );
}
