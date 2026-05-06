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
}

export function PipBoyShell({
  activeTab,
  muted,
  theme,
  onTabChange,
  onToggleMuted,
  onThemeChange,
}: PipBoyShellProps) {
  return (
    <div className="pipboy">
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
          {activeTab === "stats" ? <StatsPanel /> : null}
          {activeTab === "quests" ? <QuestsPanel /> : null}
          {activeTab === "contact" ? <ContactPanel /> : null}
        </div>
      </div>

      <ThemeControls muted={muted} theme={theme} onToggleMuted={onToggleMuted} onThemeChange={onThemeChange} />
    </div>
  );
}
