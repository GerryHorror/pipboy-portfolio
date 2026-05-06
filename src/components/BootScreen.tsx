import { useEffect, useState } from "react";

interface BootScreenProps {
  muted: boolean;
  onComplete: () => void;
}

interface BootLine {
  text: string;
  type: "check" | "portfolio";
  result?: string;
}

const bootLines: BootLine[] = [
  { type: "check", text: "VAULT-TEC BIOS v3.2.1", result: "READY" },
  { type: "check", text: "MEMORY: 640K", result: "OK" },
  { type: "check", text: "SIGNAL STRENGTH: 89%", result: "OK" },
  { type: "check", text: "CPU: PATRIOT-4000", result: "DETECTED" },
  { type: "check", text: "CANDIDATE DATABASE", result: "LOADING" },
  { type: "portfolio", text: "INITIALIZING PORTFOLIO_OS v1.0" },
  { type: "portfolio", text: "CHECKING CANDIDATE DOSSIER" },
  { type: "portfolio", text: "INDEXING .NET / ANDROID / SQL SIGNALS" },
  { type: "portfolio", text: "LOADING PROJECT QUEST LOG" },
  { type: "portfolio", text: "CONTACT CHANNELS READY" },
];

const warnResults = new Set(["DETECTED", "LOADING"]);

export function BootScreen({ muted, onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(1);
  const isComplete = visibleLines >= bootLines.length;

  useEffect(() => {
    if (muted) return;
    const audio = new Audio("/PipBoy_BootSequence.wav");
    audio.volume = 0.6;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [muted]);

  useEffect(() => {
    if (isComplete) return;
    const timeout = window.setTimeout(() => {
      setVisibleLines((current) => current + 1);
    }, 260);
    return () => window.clearTimeout(timeout);
  }, [visibleLines, isComplete]);

  useEffect(() => {
    if (!isComplete) return;
    const timeout = window.setTimeout(onComplete, 1780);
    return () => window.clearTimeout(timeout);
  }, [onComplete, isComplete]);

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
            {bootLines.slice(0, visibleLines).map((line, i) => {
              const isLast = i === visibleLines - 1;
              const cursor = isLast && !isComplete
                ? <span className="boot-cursor" aria-hidden="true">█</span>
                : null;

              if (line.type === "check") {
                return (
                  <p key={line.text} className="boot-check-line">
                    <span className="boot-check-label">{line.text}</span>
                    {!isLast || isComplete ? (
                      <span className={`boot-check-result${warnResults.has(line.result ?? "") ? " warn" : ""}`}>
                        {line.result}
                      </span>
                    ) : cursor}
                  </p>
                );
              }

              return (
                <p key={line.text}>
                  <span>&gt;</span> {line.text}{cursor}
                </p>
              );
            })}
          </div>
        </div>
        <button className="primary-command" type="button" onClick={onComplete}>
          Skip boot
        </button>
      </div>
    </section>
  );
}
