import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Copy, Save, Check, AlertTriangle } from "lucide-react";

import { squareBurst } from "../utils/squareBurst";

/*
 * Trigger a browser download for a URL (data URL or object URL).
 * The link is added to the page briefly so every browser honours it.
 */
function triggerDownload(href, filename) {
  const link = document.createElement("a");

  link.href = href;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();
}

function QRPreview({
  payload,
  settings,
  isValid,
  validation,
  contrast,
  onSaveHistory,
}) {
  const canvasRef = useRef(null);
  const timers = useRef([]);

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generating, setGenerating] = useState(false);

  /*
   * Show a short "done" state on a button, then reset it.
   */
  const flash = (setter) => {
    setter(true);

    const id = setTimeout(() => setter(false), 1500);
    timers.current.push(id);
  };

  /*
   * Clear pending timers when the component unmounts.
   */
  useEffect(() => {
    const pending = timers.current;

    return () => pending.forEach(clearTimeout);
  }, []);

  /*
   * Draw the QR code on the canvas whenever anything changes.
   */
  useEffect(() => {
    if (!canvasRef.current || !isValid || !payload) {
      return;
    }

    const generateQR = async () => {
      try {
        setGenerating(true);

        await QRCode.toCanvas(canvasRef.current, payload, {
          width: settings.size,
          margin: settings.margin,
          errorCorrectionLevel: settings.errorCorrectionLevel,
          color: {
            dark: settings.foreground,
            light: settings.background,
          },
        });
      } catch (error) {
        console.error("QR generation failed:", error);
      } finally {
        setGenerating(false);
      }
    };

    generateQR();
  }, [payload, settings, isValid]);

  /*
   * PNG download: exported straight from the preview canvas,
   * so the file always matches what the user sees.
   */
  const handleDownloadPNG = (event) => {
    const button = event.currentTarget;

    if (!canvasRef.current || !isValid) {
      return;
    }

    triggerDownload(
      canvasRef.current.toDataURL("image/png"),
      "qrious-code.png"
    );

    squareBurst(button);
  };

  /*
   * SVG download (optional extra).
   */
  const handleDownloadSVG = async (event) => {
    const button = event.currentTarget;

    if (!isValid || !payload) {
      return;
    }

    try {
      const svg = await QRCode.toString(payload, {
        type: "svg",
        width: settings.size,
        margin: settings.margin,
        errorCorrectionLevel: settings.errorCorrectionLevel,
        color: {
          dark: settings.foreground,
          light: settings.background,
        },
      });

      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      triggerDownload(url, "qrious-code.svg");

      // give the browser a moment to start the download first
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      squareBurst(button);
    } catch (error) {
      console.error("SVG download failed:", error);
    }
  };

  /*
   * Copy the encoded text/link to the clipboard.
   */
  const handleCopy = async () => {
    if (!isValid || !payload) {
      return;
    }

    try {
      await navigator.clipboard.writeText(payload);

      flash(setCopied);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  /*
   * Save to Recents, with a short "Saved" confirmation.
   */
  const handleSave = () => {
    if (!isValid) {
      return;
    }

    onSaveHistory();

    flash(setSaved);
  };

  const firstError = validation?.errors
    ? Object.values(validation.errors)[0]
    : null;

  return (
    <div className="card preview-card">
      <div className="card-header">
        <div>
          <p className="section-label">04</p>

          <h2>Preview</h2>
        </div>

        {generating && (
          <span className="preview-status">Generating...</span>
        )}
      </div>

      <div className="qr-preview-area">
        {isValid ? (
          <div className="qr-canvas-wrapper">
            <canvas ref={canvasRef} aria-label="Generated QR code" />
          </div>
        ) : (
          <div className="qr-empty-state">
            <div className="qr-empty-icon">
              <span>QR</span>
            </div>

            <h3>Your QR code will appear here</h3>

            <p>
              Enter valid information on the left to generate your QR
              code.
            </p>
          </div>
        )}
      </div>

      {firstError && (
        <div className="validation-message" role="alert">
          <AlertTriangle size={16} />

          <span>{firstError}</span>
        </div>
      )}

      {isValid && (
        <>
          <div className="scan-status">
            {contrast?.status === "good" ? (
              <>
                <Check size={16} />
                <span>Good contrast for reliable scanning</span>
              </>
            ) : (
              <>
                <AlertTriangle size={16} />
                <span>
                  Consider increasing the contrast for better scanning
                </span>
              </>
            )}
          </div>

          <div className="preview-actions">
            <button
              type="button"
              className="primary-button"
              onClick={handleDownloadPNG}
            >
              <Download size={18} />
              PNG
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={handleDownloadSVG}
            >
              <Download size={18} />
              SVG
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={handleCopy}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}

              {copied ? "Copied" : "Copy"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={handleSave}
            >
              {saved ? <Check size={18} /> : <Save size={18} />}

              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default QRPreview;