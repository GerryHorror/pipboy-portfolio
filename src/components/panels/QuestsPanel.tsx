import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { experience, projects } from "../../data/portfolio";

export function QuestsPanel() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const detailBodyRef = useRef<HTMLDivElement>(null);
  const displayedProject = projects[displayIndex] ?? projects[0];
  const selectedTags = useMemo(
    () => [...new Set([...displayedProject.stack, ...displayedProject.tags])],
    [displayedProject],
  );

  useEffect(() => {
    if (selectedProjectIndex === displayIndex) return;
    setCollapsed(true);
    const t = window.setTimeout(() => {
      setDisplayIndex(selectedProjectIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setCollapsed(false));
      });
    }, 220);
    return () => window.clearTimeout(t);
  }, [selectedProjectIndex, displayIndex]);

  useEffect(() => {
    detailBodyRef.current?.scrollTo({ top: 0 });
  }, [displayIndex]);

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
              className={`anim-stagger${index === selectedProjectIndex ? " active" : ""}`}
              style={{ animationDelay: `${index * 60}ms` }}
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

      <section className={`dossier-card quest-detail${collapsed ? " crt-collapse" : ""}`} aria-live="polite">
        <div className="project-head">
          <div>
            <span className="quest-status">{displayedProject.status}</span>
            <h3>{displayedProject.title}</h3>
            <p>{displayedProject.signal}</p>
          </div>
          <div className="project-links">
            {displayedProject.links.map((link) => (
              <a
                key={`${displayedProject.title}-${link.label}`}
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

        <div className="quest-detail-body" ref={detailBodyRef}>
          <p className="project-summary">{displayedProject.summary}</p>

          <div className="quest-detail-section">
            <p className="system-label">Objectives</p>
            <ul>
              {displayedProject.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="quest-detail-section">
            <p className="system-label">Loadout</p>
            <div className="tag-cloud compact">
              {selectedTags.map((tag) => (
                <span key={`${displayedProject.title}-${tag}`}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
