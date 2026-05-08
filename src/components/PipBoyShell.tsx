import { useRef } from "react";
import { tabs } from "../data/tabs";
import type { TabId, Theme } from "../types";
import { ContactPanel } from "./panels/ContactPanel";
import { ProfilePanel } from "./panels/ProfilePanel";
import { QuestsPanel } from "./panels/QuestsPanel";
import { StatsPanel } from "./panels/StatsPanel";
import { TabNav } from "./TabNav";
import { ThemeControls } from "./ThemeControls";

interface PipBoyShellProps {
  activeTab: TabId;
  muted: boolean;
  theme: Theme;
  onTabChange: (tab: TabId) => void;
  onToggleMuted: () => void;
  onThemeChange: (t: Theme) => void;
  activeSkillFilter: string | null;
  onSkillClick: (skill: string) => void;
  onSkillFilter: (skill: string | null) => void;
}

export function PipBoyShell({
  activeTab,
  muted,
  theme,
  onTabChange,
  onToggleMuted,
  onThemeChange,
  activeSkillFilter,
  onSkillClick,
  onSkillFilter,
}: PipBoyShellProps) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) < 100 || Math.abs(dy) > 40) return;
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (dx < 0 && currentIndex < tabs.length - 1) {
      onTabChange(tabs[currentIndex + 1].id);
    } else if (dx > 0 && currentIndex > 0) {
      onTabChange(tabs[currentIndex - 1].id);
    }
  };

  return (
    <div
      className="pipboy"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <header className="pip-header">
        <div>
          <p className="system-label">Candidate dossier</p>
          <h1 data-text="Gerard Blankenberg">Gerard Blankenberg</h1>
        </div>
        <div className="status-cluster" aria-label="Candidate status">
          <span>LVL 01 DEV</span>
          <span>HP 89/100</span>
          <span>AP READY</span>
        </div>
      </header>

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

      <div className="panel-window">
        <div key={activeTab} className="panel-enter">
          {activeTab === "profile" ? <ProfilePanel /> : null}
          {activeTab === "stats" ? <StatsPanel onSkillClick={onSkillClick} /> : null}
          {activeTab === "quests" ? (
            <QuestsPanel skillFilter={activeSkillFilter} onSkillFilter={onSkillFilter} />
          ) : null}
          {activeTab === "contact" ? <ContactPanel /> : null}
        </div>
      </div>

      <ThemeControls muted={muted} theme={theme} onToggleMuted={onToggleMuted} onThemeChange={onThemeChange} />
    </div>
  );
}
