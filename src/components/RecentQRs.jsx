import {
  Clock3,
  Trash2,
  RotateCcw,
  X
} from "lucide-react";

export default function RecentQRs({
  items,
  onReuse,
  onDelete,
  onClear,
  onClose
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section className="history-modal">
        <div className="modal-header">
          <div>
            <span className="eyebrow">
              Saved locally
            </span>

            <h2>
              Recent QR codes
            </h2>
          </div>

          <button
            className="icon-button"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="history-empty">
            <Clock3 size={30} />

            <strong>
              No recent QR codes
            </strong>

            <span>
              Your saved codes
              will appear here.
            </span>
          </div>
        ) : (
          <>
            <div className="history-list">
              {items.map((item) => (
                <article
                  className="history-item"
                  key={item.id}
                >
                  <div
                    className="history-thumb"
                    style={{
                      background:
                        item.settings
                          .background
                    }}
                  >
                    <span
                      style={{
                        color:
                          item.settings
                            .foreground
                      }}
                    >
                      QR
                    </span>
                  </div>

                  <div className="history-info">
                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      {item.type.toUpperCase()}
                      {" · "}
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="small-action"
                    onClick={() =>
                      onReuse(item)
                    }
                    title="Reuse"
                  >
                    <RotateCcw
                      size={16}
                    />
                  </button>

                  <button
                    className="small-action danger-action"
                    onClick={() =>
                      onDelete(item.id)
                    }
                    title="Delete"
                  >
                    <Trash2
                      size={16}
                    />
                  </button>
                </article>
              ))}
            </div>

            <button
              className="clear-button"
              onClick={onClear}
            >
              Clear history
            </button>
          </>
        )}
      </section>
    </div>
  );
}