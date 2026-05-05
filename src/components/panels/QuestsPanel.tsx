import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { experience, projects } from "../../data/portfolio";

export function QuestsPanel() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const selectedProject = projects[selectedProjectIndex] ?? projects[0];
  const selectedTags = useMemo(
    () => [...new Set([...selectedProject.stack, ...selectedProject.tags])],
    [selectedProject],
  );

  return (
    <article className="quest-layout" aria-labelledby="quests-title">
      <section className="dossier-card quest-index">
        <p className="system-label">Quests</p>
        <h2 id="quests-title">Active project log</h2>

        <div className="quest-list" role="listbox" aria-label="Project quests">
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              className={index === selectedProjectIndex ? "active" : undefined}
              aria-selected={index === selectedProjectIndex}
              role="option"
              onClick={() => setSelectedProjectIndex(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{project.title}</strong>
              <small>{project.signal}</small>
            </button>
          ))}
        </div>

        <aside className="background-archive" aria-label="Background archive">
          <p className="system-label">Background archive</p>
          {experience.map((item) => (
            <section className="experience-card" key={item.organisation}>
              <span>{item.duration}</span>
              <h3>{item.role}</h3>
              <p>
                {item.organisation} | {item.location}
              </p>
            </section>
          ))}
        </aside>
      </section>

      <section className="dossier-card quest-detail" aria-live="polite">
        <div className="project-head">
          <div>
            <span className="quest-status">{selectedProject.status}</span>
            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.signal}</p>
          </div>
          <div className="project-links">
            {selectedProject.links.map((link) => (
              <a
                key={`${selectedProject.title}-${link.label}`}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span>{link.label}</span>
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <p className="project-summary">{selectedProject.summary}</p>

        <div className="quest-detail-section">
          <p className="system-label">Objectives</p>
          <ul>
            {selectedProject.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="quest-detail-section">
          <p className="system-label">Loadout</p>
          <div className="tag-cloud compact">
            {selectedTags.map((tag) => (
              <span key={`${selectedProject.title}-${tag}`}>{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
