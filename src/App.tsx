import { useEffect, useState } from "react";
import { BootScreen } from "./components/BootScreen";
import { PipBoyShell } from "./components/PipBoyShell";
import { tabs } from "./data/tabs";
import type { TabId, Theme } from "./types";

// Storage access throws when blocked (private mode, in-app browsers), so prefs just don't persist there.
type Store = "localStorage" | "sessionStorage";

const readPref = (key: string, store: Store = "localStorage") => {
  try { return window[store].getItem(key); } catch { return null; }
};

const savePref = (key: string, value: string, store: Store = "localStorage") => {
  try { window[store].setItem(key, value); } catch { /* silent */ }
};

const getStoredMute = () => readPref("pipboy-muted") === "true";

const getStoredTheme = (): Theme => {
  const v = readPref("pipboy-theme");
  if (v === "green" || v === "pride") return v;
  return "amber";
};

// Pre-instantiate at module load so the browser fetches and caches audio
// assets immediately — eliminates the new Audio() decode overhead on first click.
const selectAudio = new Audio("/Pipboy_Select.mp3");
selectAudio.volume = 0.7;
selectAudio.preload = "auto";

const humAudio = new Audio("/PipBoy_Hum.wav");
humAudio.loop = true;
humAudio.volume = 0.65;
humAudio.preload = "auto";

const getHashTab = (): TabId => {
  const h = window.location.hash.slice(1);
  return tabs.some((t) => t.id === h) ? (h as TabId) : "profile";
};

const fmtClock = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

function App() {
  // Boot plays once per browser session; reloads go straight to the dossier.
  const [bootComplete, setBootComplete] = useState(() => readPref("pipboy-booted", "sessionStorage") === "1");
  const [activeTab, setActiveTab] = useState<TabId>(getHashTab);
  const [muted, setMuted] = useState(getStoredMute);
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);
  const [clock, setClock] = useState(fmtClock);

  useEffect(() => {
    const id = setInterval(() => setClock(fmtClock()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onHashChange = () => setActiveTab(getHashTab());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selectedTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  useEffect(() => {
    if (!bootComplete) return;
    // Autoplay is blocked without a prior gesture (e.g. boot skipped on reload), so retry on first tap.
    if (!muted) humAudio.play().catch(() =>
      document.addEventListener("pointerdown", () => humAudio.play().catch(() => {}), { once: true }),
    );
    return () => {
      humAudio.pause();
      humAudio.currentTime = 0;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootComplete]);

  const playSelect = () => {
    if (muted) return;
    selectAudio.currentTime = 0;
    selectAudio.play().catch(() => {});
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = tab;
    playSelect();
  };

  const handleSkillClick = (skill: string) => {
    setActiveSkillFilter(skill);
    setActiveTab("quests");
    window.location.hash = "quests";
    playSelect();
  };

  const toggleMuted = () => {
    setMuted((current) => {
      const next = !current;
      savePref("pipboy-muted", String(next));
      if (next) humAudio.pause();
      else humAudio.play().catch(() => {});
      return next;
    });
  };

  const handleThemeChange = (t: Theme) => {
    savePref("pipboy-theme", t);
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
              <p aria-hidden="true">{clock}</p>
              <p>{bootComplete ? selectedTab.status : "BOOT SEQUENCE"}</p>
            </div>
            {!bootComplete ? (
              <BootScreen
                muted={muted}
                onComplete={() => {
                  savePref("pipboy-booted", "1", "sessionStorage");
                  setBootComplete(true);
                }}
              />
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
                onSkillFilter={setActiveSkillFilter}
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
