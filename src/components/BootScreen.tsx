import { useEffect, useRef, useState } from "react";

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

// Lines spread across ~3.5s so they finish before the 5s audio ends
const LINE_INTERVAL_MS = 350;

const warnResults = new Set(["DETECTED", "LOADING"]);

export function BootScreen({ muted, onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(1);
  const isComplete = visibleLines >= bootLines.length;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Play audio; fire onComplete when it ends naturally
  useEffect(() => {
    if (muted) return;
    const audio = new Audio("/PipBoy_BootSequence.wav");
    audio.volume = 0.6;
    const handleEnded = () => onCompleteRef.current();
    audio.addEventListener("ended", handleEnded);
    audio.play().catch(() => {});
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [muted]);

  // Line reveal
  useEffect(() => {
    if (isComplete) return;
    const t = window.setTimeout(
      () => setVisibleLines((c) => c + 1),
      LINE_INTERVAL_MS,
    );
    return () => window.clearTimeout(t);
  }, [visibleLines, isComplete]);

  // When muted, complete shortly after all lines are shown
  useEffect(() => {
    if (!isComplete || !muted) return;
    const t = window.setTimeout(() => onCompleteRef.current(), 1200);
    return () => window.clearTimeout(t);
  }, [isComplete, muted]);

  // Safety fallback: complete even if audio never fires (autoplay blocked, etc.)
  useEffect(() => {
    const t = window.setTimeout(() => onCompleteRef.current(), 6500);
    return () => window.clearTimeout(t);
  }, []);

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
              const cursor =
                isLast && !isComplete ? (
                  <span className="boot-cursor" aria-hidden="true">
                    █
                  </span>
                ) : null;

              if (line.type === "check") {
                return (
                  <p key={line.text} className="boot-check-line">
                    <span className="boot-check-label">{line.text}</span>
                    {!isLast || isComplete ? (
                      <span
                        className={`boot-check-result${warnResults.has(line.result ?? "") ? " warn" : ""}`}
                      >
                        {line.result}
                      </span>
                    ) : (
                      cursor
                    )}
                  </p>
                );
              }

              return (
                <p key={line.text}>
                  <span>&gt;</span> {line.text}
                  {cursor}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <button className="primary-command boot-skip" type="button" onClick={onComplete}>
        Skip boot
      </button>
    </section>
  );
}
