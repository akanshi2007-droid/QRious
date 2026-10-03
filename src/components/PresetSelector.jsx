import { Check } from "lucide-react";

function PresetSelector({ presets, settings, onPresetChange }) {
  return (
    <div className="preset-section">
      <div className="preset-header">
        <div>
          <h3>Quick presets</h3>
          <p>Choose a ready-made style</p>
        </div>
      </div>

      <div className="preset-grid">
        {presets.map((preset) => {
          const isActive =
            settings.foreground === preset.foreground &&
            settings.background === preset.background &&
            settings.errorCorrectionLevel ===
              preset.errorCorrectionLevel &&
            settings.margin === preset.margin;

          return (
            <button
              key={preset.id}
              type="button"
              className={`preset-card ${
                isActive ? "active" : ""
              }`}
              onClick={() => onPresetChange(preset.id)}
            >
              <div
                className="preset-preview"
                style={{
                  backgroundColor: preset.background,
                  color: preset.foreground,
                }}
              >
                <div className="preset-qr-pattern">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="preset-info">
                <strong>{preset.name}</strong>

                <small>{preset.description}</small>
              </div>

              {isActive && (
                <div className="preset-check">
                  <Check size={14} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PresetSelector;