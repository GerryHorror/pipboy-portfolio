import { useCallback, useMemo, useState } from "react";
import { BootScreen } from "./components/BootScreen";
import { PipBoyShell } from "./components/PipBoyShell";
import { tabs } from "./data/tabs";
import type { TabId, Theme } from "./types";

const getStoredMute = () => {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem("pipboy-muted") === "true";
};

const getStoredTheme = (): Theme => {
  if (typeof localStorage === "undefined") return "amber";
  const v = localStorage.getItem("pipboy-theme");
  if (v === "green" || v === "pride") return v;
  return "amber";
};

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [muted, setMuted] = useState(getStoredMute);
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );

  const playTone = useCallback(() => {
    if (muted) return;

    const AudioContextConstructor =
      window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContextConstructor) return;

    const context = new AudioContextConstructor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 460;
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.08);
  }, [muted]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    playTone();
  };

  const toggleMuted = () => {
    setMuted((current) => {
      const next = !current;
      localStorage.setItem("pipboy-muted", String(next));
      return next;
    });
  };

  const handleThemeChange = (t: Theme) => {
    localStorage.setItem("pipboy-theme", t);
    setThemeState(t);
  };

  return (
    <main className="app-shell" data-theme={theme}>
      <div className="ambient-grid" aria-hidden="true" />
      {!bootComplete ? (
        <BootScreen onComplete={() => setBootComplete(true)} />
      ) : (
        <PipBoyShell
          activeTab={activeTab}
          muted={muted}
          theme={theme}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          onToggleMuted={toggleMuted}
          onThemeChange={handleThemeChange}
        />
      )}
    </main>
  );
}

export default App;
