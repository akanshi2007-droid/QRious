function hexToRgb(hex) {
  const clean = hex.replace("#", "");

  const value =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const number = parseInt(value, 16);

  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255
  };
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);

  const values = [r, g, b].map((value) => {
    const channel = value / 255;

    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return (
    0.2126 * values[0] +
    0.7152 * values[1] +
    0.0722 * values[2]
  );
}

export function contrastRatio(
  foreground,
  background
) {
  const foregroundLuminance =
    luminance(foreground);

  const backgroundLuminance =
    luminance(background);

  const lighter = Math.max(
    foregroundLuminance,
    backgroundLuminance
  );

  const darker = Math.min(
    foregroundLuminance,
    backgroundLuminance
  );

  return (
    (lighter + 0.05) /
    (darker + 0.05)
  );
}

export function getContrastStatus(
  foreground,
  background
) {
  const ratio = contrastRatio(
    foreground,
    background
  );

  if (ratio < 3) {
    return {
      level: "danger",
      label: "Low contrast",
      ratio
    };
  }

  if (ratio < 4.5) {
    return {
      level: "warning",
      label: "Moderate contrast",
      ratio
    };
  }

  return {
    level: "good",
    label: "Good contrast",
    ratio
  };
}