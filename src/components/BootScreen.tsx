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

// Last line lands at ~3.9s, just before the 4.3s audio ends
const LINE_INTERVAL_MS = 430;

const warnResults = new Set(["DETECTED", "LOADING"]);

const bootAudio = new Audio("/PipBoy_Boot.mp3");
bootAudio.volume = 0.6;
bootAudio.preload = "auto";

export function BootScreen({ muted, onComplete }: BootScreenProps) {
  const [started, setStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(1);
  const isComplete = visibleLines >= bootLines.length;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Browsers block sound until the visitor interacts, so the boot waits for a key or tap.
  // play() must run inside that handler, not an effect, or iOS Safari still blocks it.
  const start = () => {
    setStarted(true);
    if (!muted) bootAudio.play().catch(() => {});
  };

  useEffect(() => {
    if (started) return;
    const onKey = (e: KeyboardEvent) => {
      // Buttons handle their own Enter/Space; Tab and shortcuts shouldn't boot.
      if (e.target instanceof HTMLButtonElement || e.key === "Tab" || e.metaKey || e.ctrlKey || e.altKey) return;
      start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Fire onComplete when the audio ends naturally
  useEffect(() => {
    const handleEnded = () => onCompleteRef.current();
    bootAudio.addEventListener("ended", handleEnded);
    return () => {
      bootAudio.removeEventListener("ended", handleEnded);
      bootAudio.pause();
      bootAudio.currentTime = 0;
    };
  }, []);

  // Line reveal
  useEffect(() => {
    if (!started || isComplete) return;
    const t = window.setTimeout(
      () => setVisibleLines((c) => c + 1),
      LINE_INTERVAL_MS,
    );
    return () => window.clearTimeout(t);
  }, [started, visibleLines, isComplete]);

  // When muted, complete shortly after all lines are shown
  useEffect(() => {
    if (!isComplete || !muted) return;
    const t = window.setTimeout(() => onCompleteRef.current(), 1200);
    return () => window.clearTimeout(t);
  }, [isComplete, muted]);

  // Safety fallback: complete even if audio never fires (autoplay blocked, etc.)
  useEffect(() => {
    if (!started) return;
    const t = window.setTimeout(() => onCompleteRef.current(), 6500);
    return () => window.clearTimeout(t);
  }, [started]);

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
          {!started ? (
            <button className="primary-command boot-power" type="button" onClick={start}>
              Press any key to boot
              <span className="boot-cursor" aria-hidden="true">█</span>
            </button>
          ) : (
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
          )}
        </div>
      </div>
      <button className="primary-command boot-skip" type="button" onClick={onComplete}>
        Skip boot
      </button>
    </section>
  );
}
