import {
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

import { getContrastStatus } from "../utils/contrast";

export default function CustomizationPanel({
  settings,
  setSettings
}) {
  const update = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value
    }));
  };

  const contrast =
    getContrastStatus(
      settings.foreground,
      settings.background
    );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            02 / Customize
          </span>

          <h2>
            Make it yours
          </h2>
        </div>
      </div>

      <div className="color-row">
        <label className="color-control">
          <span>Foreground</span>

          <div>
            <input
              type="color"
              value={
                settings.foreground
              }
              onChange={(event) =>
                update(
                  "foreground",
                  event.target.value
                )
              }
            />

            <code>
              {settings.foreground}
            </code>
          </div>
        </label>

        <label className="color-control">
          <span>Background</span>

          <div>
            <input
              type="color"
              value={
                settings.background
              }
              onChange={(event) =>
                update(
                  "background",
                  event.target.value
                )
              }
            />

            <code>
              {settings.background}
            </code>
          </div>
        </label>
      </div>

      <div className="range-row">
        <div className="range-header">
          <span>Size</span>

          <strong>
            {settings.size}px
          </strong>
        </div>

        <input
          type="range"
          min="180"
          max="640"
          step="10"
          value={settings.size}
          onChange={(event) =>
            update(
              "size",
              Number(event.target.value)
            )
          }
        />
      </div>

      <div className="two-col">
        <label className="field">
          <span className="field-label">
            Error correction
          </span>

          <select
            value={
              settings.errorCorrection
            }
            onChange={(event) =>
              update(
                "errorCorrection",
                event.target.value
              )
            }
          >
            <option value="L">
              Low — 7%
            </option>

            <option value="M">
              Medium — 15%
            </option>

            <option value="Q">
              Quartile — 25%
            </option>

            <option value="H">
              High — 30%
            </option>
          </select>
        </label>

        <label className="field">
          <span className="field-label">
            Margin
          </span>

          <select
            value={settings.margin}
            onChange={(event) =>
              update(
                "margin",
                Number(
                  event.target.value
                )
              )
            }
          >
            <option value="1">
              1 module
            </option>

            <option value="2">
              2 modules
            </option>

            <option value="3">
              3 modules
            </option>

            <option value="4">
              4 modules
            </option>

            <option value="5">
              5 modules
            </option>

            <option value="6">
              6 modules
            </option>

            <option value="8">
              8 modules
            </option>
          </select>
        </label>
      </div>

      <div
        className={`contrast-status ${contrast.level}`}
      >
        {contrast.level === "good" ? (
          <CheckCircle2 size={17} />
        ) : (
          <AlertTriangle size={17} />
        )}

        <span>
          <strong>
            {contrast.label}
          </strong>

          {" · ratio "}

          {contrast.ratio.toFixed(2)}:1
        </span>
      </div>
    </section>
  );
}