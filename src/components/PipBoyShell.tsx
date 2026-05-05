import { tabs } from "../data/tabs";
import type { TabConfig, TabId } from "../types";
import { ContactPanel } from "./panels/ContactPanel";
import { ProfilePanel } from "./panels/ProfilePanel";
import { QuestsPanel } from "./panels/QuestsPanel";
import { StatsPanel } from "./panels/StatsPanel";
import { TabNav } from "./TabNav";
import { ThemeControls } from "./ThemeControls";

interface PipBoyShellProps {
  activeTab: TabId;
  muted: boolean;
  selectedTab: TabConfig;
  onTabChange: (tab: TabId) => void;
  onToggleMuted: () => void;
}

export function PipBoyShell({
  activeTab,
  muted,
  selectedTab,
  onTabChange,
  onToggleMuted,
}: PipBoyShellProps) {
  return (
    <section className="device-wrap" aria-label="Gerard Blankenberg portfolio">
      <div className="device-frame">
        <div className="screen">
          <div className="screen-chrome">
            <p>PORTFOLIO_OS</p>
            <p>{selectedTab.status}</p>
          </div>

          <div className="pipboy">
            <header className="pip-header">
              <div>
                <p className="system-label">Candidate dossier</p>
                <h1>Gerard Blankenberg</h1>
              </div>
              <div className="status-cluster" aria-label="Candidate status">
                <span>LVL 01 DEV</span>
                <span>HP 89/100</span>
                <span>AP READY</span>
              </div>
            </header>

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

            <div className="panel-window">
              {activeTab === "profile" ? <ProfilePanel /> : null}
              {activeTab === "stats" ? <StatsPanel /> : null}
              {activeTab === "quests" ? <QuestsPanel /> : null}
              {activeTab === "contact" ? <ContactPanel /> : null}
            </div>

            <ThemeControls muted={muted} onToggleMuted={onToggleMuted} />
          </div>

          <div className="scanlines" aria-hidden="true" />
          <div className="glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
