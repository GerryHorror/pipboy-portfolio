import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "../../data/portfolio";

function useAnimatedMetric(rawValue: string): string {
  const [display, setDisplay] = useState("");
  const rafRef = useRef(0);

  useEffect(() => {
    const DURATION = 900;
    const m = rawValue.match(/^(\d+\.?\d*)(%?)$/);

    if (m) {
      const end = parseFloat(m[1]);
      const suffix = m[2];
      const isFloat = m[1].includes(".");
      const decimals = isFloat ? m[1].split(".")[1].length : 0;
      const leadZero = !isFloat && rawValue[0] === "0" && m[1].length > 1;
      const width = m[1].length;

      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / DURATION, 1);
        const v = end * (1 - Math.pow(1 - p, 3));
        let s: string;
        if (isFloat) {
          s = v.toFixed(decimals);
        } else if (leadZero) {
          s = String(Math.round(v)).padStart(width, "0");
        } else {
          s = String(Math.round(v));
        }
        setDisplay(s + suffix);
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      const chars = [...rawValue];
      const step = DURATION / chars.length;
      let i = 0;
      let t0 = performance.now();

      const tick = (now: number) => {
        while (now - t0 >= step && i < chars.length) {
          t0 += step;
          i++;
        }
        setDisplay(chars.slice(0, i).join(""));
        if (i < chars.length) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [rawValue]);

  return display;
}

function MetricValue({ value }: { value: string }) {
  const display = useAnimatedMetric(value);
  return <>{display || " "}</>;
}

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
          <img src="/vault_me.png" alt="Gerard illustrated as a Vault-Tec character" />
        </div>
        <div className="metric-grid">
          {profile.metrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong><MetricValue value={metric.value} /></strong>
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
