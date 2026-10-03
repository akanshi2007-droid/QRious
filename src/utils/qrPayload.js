function escapeWifi(value = "") {
  return String(value).replace(/([\\;,":])/g, "\\$1");
}

export function buildPayload(type, data) {
  switch (type) {
    case "url":
      return data.url.trim();

    case "text":
      return data.text;

    case "email": {
      const email = data.email.trim();

      const subject = encodeURIComponent(data.subject || "");
      const body = encodeURIComponent(data.body || "");

      if (subject || body) {
        return `mailto:${email}?subject=${subject}&body=${body}`;
      }

      return `mailto:${email}`;
    }

    case "phone":
      return `tel:${data.phone.trim()}`;

    case "wifi": {
      const security = data.security || "WPA";

      const hidden = data.hidden ? "true" : "false";

      return `WIFI:T:${security};S:${escapeWifi(
        data.ssid
      )};P:${escapeWifi(data.password)};H:${hidden};;`;
    }

    default:
      return "";
  }
}