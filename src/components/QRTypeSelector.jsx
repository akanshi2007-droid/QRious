import { qrTypes } from "../data/qrTypes";

function QRTypeSelector({ activeType, onTypeChange }) {
  return (
    <div className="qr-type-grid">
      {qrTypes.map((type) => {
        const Icon = type.icon;
        const isActive = activeType === type.id;
        return (
          <button
            key={type.id}
            type="button"
            className={`qr-type-card ${
              isActive ? "active" : ""
            }`}
            onClick={() => onTypeChange(type.id)}
          >
            <div className="qr-type-icon">
              <Icon size={22} />
            </div>

            <div className="qr-type-content">
              <strong>{type.label}</strong>
              <span>{type.description}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default QRTypeSelector;