import type { TabConfig, TabId } from "../types";

interface TabNavProps {
  tabs: TabConfig[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

function spawnRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 520);
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
          onClick={(e) => {
            spawnRipple(e);
            onTabChange(tab.id);
          }}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
