function QRForm({
  type,
  data = {},
  onChange,
  validation = {},
}) {
  const errors = validation.errors || {};

  const updateField = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  if (type === "url") {
    return (
      <div className="form-fields">
        <div className="field">
          <label htmlFor="url">
            Website URL
          </label>

          <input
            id="url"
            type="url"
            value={data.url || ""}
            onChange={(e) =>
              updateField("url", e.target.value)
            }
            placeholder="https://example.com"
          />

          {errors.url && (
            <p className="field-error">
              {errors.url}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className="form-fields">
        <div className="field">
          <label htmlFor="text">
            Text
          </label>

          <textarea
            id="text"
            value={data.text || ""}
            onChange={(e) =>
              updateField("text", e.target.value)
            }
            placeholder="Enter your text..."
            rows={5}
          />

          <div className="character-count">
            {(data.text || "").length}/1000
          </div>

          {errors.text && (
            <p className="field-error">
              {errors.text}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (type === "email") {
    return (
      <div className="form-fields">
        <div className="field">
          <label htmlFor="email">
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={data.email || ""}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            placeholder="hello@example.com"
          />

          {errors.email && (
            <p className="field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="subject">
            Subject
          </label>

          <input
            id="subject"
            type="text"
            value={data.subject || ""}
            onChange={(e) =>
              updateField("subject", e.target.value)
            }
            placeholder="Email subject"
          />
        </div>

        <div className="field">
          <label htmlFor="body">
            Message
          </label>

          <textarea
            id="body"
            value={data.body || ""}
            onChange={(e) =>
              updateField("body", e.target.value)
            }
            placeholder="Email message"
            rows={4}
          />
        </div>
      </div>
    );
  }

  if (type === "phone") {
    return (
      <div className="form-fields">
        <div className="field">
          <label htmlFor="phone">
            Phone number
          </label>

          <input
            id="phone"
            type="tel"
            value={data.phone || ""}
            onChange={(e) =>
              updateField("phone", e.target.value)
            }
            placeholder="+91 98765 43210"
          />

          {errors.phone && (
            <p className="field-error">
              {errors.phone}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (type === "wifi") {
    return (
      <div className="form-fields">
        <div className="field">
          <label htmlFor="ssid">
            Network name
          </label>

          <input
            id="ssid"
            type="text"
            value={data.ssid || ""}
            onChange={(e) =>
              updateField("ssid", e.target.value)
            }
            placeholder="My Wi-Fi"
          />

          {errors.ssid && (
            <p className="field-error">
              {errors.ssid}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="security">
            Security
          </label>

          <select
            id="security"
            value={data.security || "WPA"}
            onChange={(e) =>
              updateField(
                "security",
                e.target.value
              )
            }
          >
            <option value="WPA">
              WPA / WPA2 / WPA3
            </option>

            <option value="WEP">
              WEP
            </option>

            <option value="nopass">
              No password
            </option>
          </select>
        </div>

        {data.security !== "nopass" && (
          <div className="field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={data.password || ""}
              onChange={(e) =>
                updateField(
                  "password",
                  e.target.value
                )
              }
              placeholder="Wi-Fi password"
            />

            {errors.password && (
              <p className="field-error">
                {errors.password}
              </p>
            )}
          </div>
        )}

        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={Boolean(data.hidden)}
            onChange={(e) =>
              updateField(
                "hidden",
                e.target.checked
              )
            }
          />

          <span>
            Hidden network
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="empty-form">
      Select a QR code type to begin.
    </div>
  );
}

export default QRForm;