import type { TabConfig, TabId } from "../types";

interface TabNavProps {
  tabs: TabConfig[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="tab-nav" aria-label="Portfolio sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={activeTab === tab.id ? "active" : undefined}
          aria-current={activeTab === tab.id ? "page" : undefined}
          onClick={() => onTabChange(tab.id)}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
