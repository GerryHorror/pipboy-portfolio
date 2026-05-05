import { MapPin, Terminal } from "lucide-react";
import { profile } from "../../data/portfolio";

export function ProfilePanel() {
  return (
    <article className="panel-grid profile-grid" aria-labelledby="profile-title">
      <section className="dossier-card intro-card">
        <p className="system-label">Profile</p>
        <h2 id="profile-title">{profile.role}</h2>
        <p className="lead">{profile.summary}</p>
        <div className="location-line">
          <MapPin aria-hidden="true" />
          <span>{profile.location}</span>
        </div>
      </section>

      <section className="dossier-card avatar-card" aria-label="Candidate snapshot">
        <div className="avatar-ring">
          <Terminal aria-hidden="true" />
        </div>
        <div className="metric-grid">
          {profile.metrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="dossier-card span-two">
        <p className="system-label">Primary loadout</p>
        <div className="tag-cloud">
          {profile.headlineStack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </article>
  );
}
