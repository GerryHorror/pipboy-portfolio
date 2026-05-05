import { ExternalLink } from "lucide-react";
import { experience, projects } from "../../data/portfolio";

export function QuestsPanel() {
  return (
    <article className="quest-layout" aria-labelledby="quests-title">
      <section className="dossier-card">
        <p className="system-label">Quests</p>
        <h2 id="quests-title">Active project log</h2>
        <div className="project-list">
          {projects.map((project) => (
            <section className="project-card" key={project.title}>
              <div className="project-head">
                <div>
                  <span className="quest-status">{project.status}</span>
                  <h3>{project.title}</h3>
                  <p>{project.signal}</p>
                </div>
                <div className="project-links">
                  {project.links.map((link) => (
                    <a
                      key={`${project.title}-${link.label}`}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {link.label}
                      <ExternalLink aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
              <p className="project-summary">{project.summary}</p>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="tag-cloud compact">
                {[...new Set([...project.stack, ...project.tags])].map((tag) => (
                  <span key={`${project.title}-${tag}`}>{tag}</span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <aside className="dossier-card">
        <p className="system-label">Background quest</p>
        {experience.map((item) => (
          <section className="experience-card" key={item.organisation}>
            <span>{item.duration}</span>
            <h3>{item.role}</h3>
            <p>
              {item.organisation} | {item.location}
            </p>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        ))}
      </aside>
    </article>
  );
}
