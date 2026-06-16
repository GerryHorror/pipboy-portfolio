import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { experience, projects } from "../../data/portfolio";
import type { Project } from "../../types";

interface QuestsPanelProps {
  skillFilter: string | null;
  onSkillFilter: (skill: string | null) => void;
}

function projectMatchesFilter(project: Project, filter: string): boolean {
  const needle = filter.toLowerCase();
  return [...project.stack, ...project.tags].some((t) => {
    const tag = t.toLowerCase();
    if (tag.includes(needle)) return true;
    // Check if the tag appears as a whole word inside the skill name
    // (e.g. "android" in "android studio") but not as a prefix of a longer word
    // (e.g. "java" must NOT match inside "javascript")
    const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?<![a-zA-Z])${escaped}(?![a-zA-Z])`).test(needle);
  });
}

export function QuestsPanel({ skillFilter, onSkillFilter }: QuestsPanelProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const detailBodyRef = useRef<HTMLDivElement>(null);
  const questIndexRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (!skillFilter) return;
    questIndexRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    const firstMatch = projects.findIndex((p) => projectMatchesFilter(p, skillFilter));
    if (firstMatch !== -1) {
      setSelectedProjectIndex(firstMatch);
      setDisplayIndex(firstMatch);
      setMobileDetailOpen(true);
    }
  }, [skillFilter]);

  return (
    <article
      className="quest-layout"
      aria-labelledby="quests-title"
      data-mobile-detail={mobileDetailOpen ? "" : undefined}
    >
      <section className="dossier-card quest-index" ref={questIndexRef}>
        <p className="system-label">Quests</p>
        <h2 id="quests-title">Active project log</h2>

        {skillFilter ? (
          <div className="quest-filter-banner">
            <span>Filter: {skillFilter}</span>
            <button
              type="button"
              aria-label="Clear skill filter"
              onClick={() => onSkillFilter(null)}
            >
              ×
            </button>
          </div>
        ) : null}

        <ul className="quest-list" aria-label="Project quests">
          {projects.map((project, index) => {
            const isActive = index === selectedProjectIndex;
            const filtered = skillFilter ? projectMatchesFilter(project, skillFilter) : null;
            return (
              <li key={project.title}>
                <button
                  type="button"
                  className={`anim-stagger${isActive ? " active" : ""}`}
                  style={{ animationDelay: `${index * 60}ms` }}
                  aria-current={isActive ? "true" : undefined}
                  data-filtered={filtered === null ? undefined : String(filtered)}
                  onClick={() => {
                    setSelectedProjectIndex(index);
                    setMobileDetailOpen(true);
                    if (skillFilter) onSkillFilter(null);
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{project.title}</strong>
                  <small>{project.signal}</small>
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="background-archive" aria-label="Background archive">
          <p className="system-label">Background archive</p>
          {experience.map((item) => (
            <section className="experience-card" key={item.organisation}>
              <span>{item.duration}</span>
              <h3>{item.role}</h3>
              <p>
                {item.organisation} | {item.location}
              </p>
              {item.highlights.length > 0 && (
                <ul>
                  {item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </aside>
      </section>

      <section className={`dossier-card quest-detail${collapsed ? " crt-collapse" : ""}`} aria-live="polite">
        <button
          type="button"
          className="quest-back-btn"
          onClick={() => setMobileDetailOpen(false)}
          aria-label="Back to quest list"
        >
          ← Back
        </button>
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
