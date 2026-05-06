import { useEffect, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

const bootLines = [
  "INITIALIZING PORTFOLIO_OS v1.0",
  "CHECKING CANDIDATE DOSSIER",
  "INDEXING .NET / ANDROID / SQL SIGNALS",
  "LOADING PROJECT QUEST LOG",
  "CONTACT CHANNELS READY",
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    if (visibleLines >= bootLines.length) return;
    const timeout = window.setTimeout(() => {
      setVisibleLines((current) => current + 1);
    }, 360);

    return () => window.clearTimeout(timeout);
  }, [visibleLines]);

  useEffect(() => {
    if (visibleLines < bootLines.length) return;
    const timeout = window.setTimeout(onComplete, 780);
    return () => window.clearTimeout(timeout);
  }, [onComplete, visibleLines]);

  return (
    <section className="boot-screen" aria-label="Portfolio boot sequence">
      <div className="boot-panel">
        <div className="boot-identity">
          <div>
            <p className="system-label">Retro personal terminal</p>
            <h1>Gerard Blankenberg</h1>
          </div>
          <figure className="boot-gif-frame">
            <img
              src="/well-rested.gif"
              alt="Animated well-rested boot mascot"
              width="200"
              height="200"
            />
          </figure>
        </div>
        <div className="boot-content">
          <div className="boot-lines" aria-live="polite">
            {bootLines.slice(0, visibleLines).map((line) => (
              <p key={line}>
                <span>&gt;</span> {line}
              </p>
            ))}
          </div>
        </div>
        <button className="primary-command" type="button" onClick={onComplete}>
          Skip boot
        </button>
      </div>
    </section>
  );
}
