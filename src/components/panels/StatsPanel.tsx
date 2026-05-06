import { education, skills } from "../../data/portfolio";

export function StatsPanel() {
  return (
    <article className="panel-grid stats-grid" aria-labelledby="stats-title">
      <section className="dossier-card span-two">
        <p className="system-label">Stats</p>
        <h2 id="stats-title">Technical capability index</h2>
        <div className="skill-list">
          {skills.map((group, i) => (
            <div
              className="skill-row anim-stagger"
              key={group.label}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="skill-row-header">
                <strong>{group.label}</strong>
                <span>{group.level}%</span>
              </div>
              <div className="condition-bar" aria-hidden="true">
                <span style={{ width: `${group.level}%`, animationDelay: `${i * 70}ms` }} />
              </div>
              <div className="tag-cloud compact">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dossier-card">
        <p className="system-label">Education</p>
        <div className="timeline-list">
          {education.map((item) => (
            <div className="timeline-item" key={`${item.credential}-${item.duration}`}>
              <span>{item.duration}</span>
              <h3>{item.credential}</h3>
              <p>{item.institution}</p>
              {item.result ? <p className="muted-line">{item.result}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
