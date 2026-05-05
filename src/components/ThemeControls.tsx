import { Volume2, VolumeX } from "lucide-react";

interface ThemeControlsProps {
  muted: boolean;
  onToggleMuted: () => void;
}

export function ThemeControls({ muted, onToggleMuted }: ThemeControlsProps) {
  return (
    <footer className="theme-controls">
      <div className="theme-chip" aria-label="Active colour theme">
        Amber HUD
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
