export function validateQRData(type, data) {
  const errors = {};

  switch (type) {
    case "url": {
      const value = data.url?.trim();

      if (!value) {
        errors.url = "Please enter a URL.";
      } else {
        try {
          const url = new URL(value);

          if (!["http:", "https:"].includes(url.protocol)) {
            errors.url = "URL must start with http:// or https://";
          }
        } catch {
          errors.url = "Please enter a valid URL.";
        }
      }

      break;
    }

    case "text": {
      const value = data.text?.trim();

      if (!value) {
        errors.text = "Please enter some text.";
      } else if (value.length > 1000) {
        errors.text = "Text must be 1000 characters or less.";
      }

      break;
    }

    case "email": {
      const email = data.email?.trim();

      if (!email) {
        errors.email = "Please enter an email address.";
      } else {
        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          errors.email = "Please enter a valid email address.";
        }
      }

      break;
    }

    case "phone": {
      const phone = data.phone?.trim();

      if (!phone) {
        errors.phone = "Please enter a phone number.";
      } else {
        const phoneRegex =
          /^[+]?[\d\s().-]{7,20}$/;

        if (!phoneRegex.test(phone)) {
          errors.phone = "Please enter a valid phone number.";
        }
      }

      break;
    }

    case "wifi": {
      const ssid = data.ssid?.trim();
      const password = data.password || "";
      const security = data.security || "WPA";

      if (!ssid) {
        errors.ssid = "Please enter the Wi-Fi network name.";
      }

      if (
        security !== "nopass" &&
        !password.trim()
      ) {
        errors.password =
          "Please enter the Wi-Fi password.";
      }

      break;
    }

    default:
      errors.general = "Please select a QR code type.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}