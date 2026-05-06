import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const humRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!bootComplete || muted) return;
    const hum = new Audio("/PipBoy_Hum.wav");
    hum.loop = true;
    hum.volume = 0.25;
    hum.play().catch(() => {});
    humRef.current = hum;
    return () => {
      hum.pause();
      hum.currentTime = 0;
      humRef.current = null;
    };
  }, [bootComplete, muted]);

  const playSelect = useCallback(() => {
    if (muted) return;
    const audio = new Audio("/Pipboy_Select.wav");
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }, [muted]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    playSelect();
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
        <BootScreen muted={muted} onComplete={() => setBootComplete(true)} />
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
