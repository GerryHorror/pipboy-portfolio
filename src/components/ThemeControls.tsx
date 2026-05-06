import { Volume2, VolumeX } from "lucide-react";
import type { Theme } from "../types";

interface ThemeControlsProps {
  muted: boolean;
  theme: Theme;
  onToggleMuted: () => void;
  onThemeChange: (t: Theme) => void;
}

const THEMES: { id: Theme; label: string }[] = [
  { id: "amber", label: "Amber" },
  { id: "green", label: "Green" },
  { id: "pride", label: "Pride" },
];

export function ThemeControls({ muted, theme, onToggleMuted, onThemeChange }: ThemeControlsProps) {
  return (
    <footer className="theme-controls">
      <div className="theme-chips" aria-label="Colour theme">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`theme-chip-btn${theme === t.id ? " active" : ""}${t.id === "pride" ? " pride" : ""}`}
            aria-pressed={theme === t.id}
            onClick={() => onThemeChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <button
        className="icon-command"
        type="button"
        onClick={onToggleMuted}
        aria-pressed={muted}
        aria-label={muted ? "Enable interface sound" : "Mute interface sound"}
        title={muted ? "Enable sound" : "Mute sound"}
      >
        {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
      </button>
    </footer>
  );
}
