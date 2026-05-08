import { useRef } from "react";
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
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;
    btnRefs.current[next]?.focus();
    onTabChange(tabs[next].id);
  };

  return (
    <nav className="tab-nav" aria-label="Portfolio sections">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          ref={(el) => { btnRefs.current[index] = el; }}
          type="button"
          className={activeTab === tab.id ? "active" : undefined}
          aria-current={activeTab === tab.id ? "page" : undefined}
          onClick={(e) => {
            spawnRipple(e);
            onTabChange(tab.id);
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          <span>{tab.label}</span>
        </button>
      ))}
      <div className="swipe-dots" aria-hidden="true">
        {tabs.map((tab) => (
          <span key={tab.id} className={activeTab === tab.id ? "active" : undefined} />
        ))}
      </div>
    </nav>
  );
}
