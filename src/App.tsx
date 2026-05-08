import { useCallback, useEffect, useMemo, useState } from "react";
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

// Pre-instantiate at module load so the browser fetches and caches audio
// assets immediately — eliminates the new Audio() decode overhead on first click.
const selectAudio = new Audio("/Pipboy_Select.wav");
selectAudio.volume = 0.7;
selectAudio.preload = "auto";

const humAudio = new Audio("/PipBoy_Hum.wav");
humAudio.loop = true;
humAudio.volume = 0.25;
humAudio.preload = "auto";

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [muted, setMuted] = useState(getStoredMute);
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );

  useEffect(() => {
    if (!bootComplete) return;
    if (!muted) humAudio.play().catch(() => {});
    return () => {
      humAudio.pause();
      humAudio.currentTime = 0;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootComplete]);

  const playSelect = useCallback(() => {
    if (muted) return;
    selectAudio.currentTime = 0;
    selectAudio.play().catch(() => {});
  }, [muted]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    playSelect();
  };

  const handleSkillClick = useCallback((skill: string) => {
    setActiveSkillFilter(skill);
    setActiveTab("quests");
    playSelect();
  }, [playSelect]);

  const handleSkillFilter = useCallback((skill: string | null) => {
    setActiveSkillFilter(skill);
  }, []);

  const toggleMuted = () => {
    setMuted((current) => {
      const next = !current;
      localStorage.setItem("pipboy-muted", String(next));
      if (next) humAudio.pause();
      else humAudio.play().catch(() => {});
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
      <section className="device-wrap" aria-label="Gerard Blankenberg portfolio">
        <div className="device-frame">
          <div className="device-bolts" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="device-controls" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className={`device-led${muted ? " muted" : ""}`} aria-hidden="true" />
          <div className="screen">
            <div className="screen-chrome">
              <p>PORTFOLIO_OS</p>
              <p>{bootComplete ? selectedTab.status : "BOOT SEQUENCE"}</p>
            </div>
            {!bootComplete ? (
              <BootScreen muted={muted} onComplete={() => setBootComplete(true)} />
            ) : (
              <PipBoyShell
                activeTab={activeTab}
                muted={muted}
                theme={theme}
                onTabChange={handleTabChange}
                onToggleMuted={toggleMuted}
                onThemeChange={handleThemeChange}
                activeSkillFilter={activeSkillFilter}
                onSkillClick={handleSkillClick}
                onSkillFilter={handleSkillFilter}
              />
            )}
            <div className="scanlines" aria-hidden="true" />
            <div className="scanline-beam" aria-hidden="true" />
            <div className="screen-vignette" aria-hidden="true" />
            <div className="glow" aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
