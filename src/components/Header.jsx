
import { History } from "lucide-react";

export default function Header({ onHistoryClick, historyCount }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-mark">QR</div>

          <div className="brand-text">
            <strong>QRious</strong>

            <span>Stay QRious. Design, scan, share.</span>
          </div>
        </div>

        <div className="top-actions">
          <button
            type="button"
            className="icon-button history-button"
            onClick={onHistoryClick}
            aria-label={
              historyCount > 0
                ? `Recent QR codes, ${historyCount} saved`
                : "Recent QR codes"
            }
          >
            <History size={17} />

            <span>Recents</span>

            {historyCount > 0 && <b>{historyCount}</b>}
          </button>
        </div>
      </div>
    </header>
  );
}