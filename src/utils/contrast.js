/**
 * Color contrast checker of text on background color
 *
 * started from: https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
 */

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function luminance(r, g, b) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// large is considered >=18pt
export const passAA_largeText = (ratio) => ratio < 1/3;

// small is (<18pt or >=14pt bold)
export const passAA_smallText = (ratio) => ratio < 1/4.5;

// large is considered >=18pt
export const passAAA_largeText = (ratio) => ratio < 1/4.5;

// (<18pt or >=14pt bold)
export const passAAA_smallText = (ratio) => ratio < 1/7;

/**
 * ratio results:
 * 0.14285 (7.0:1) for small text in AAA-level
 * 0.22222 (4.5:1) for small text in AA-level, or large text in AAA-level
 * 0.33333 (3.0:1) for large text in AA-level
 */
export function getContrast(hex1, hex2) {
  const color1rgb = hexToRgb(hex1);
  const color2rgb = hexToRgb(hex2);

  const color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
  const color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);

  // calculate the color contrast ratio
  const ratio =
    color1luminance > color2luminance
      ? (color2luminance + 0.05) / (color1luminance + 0.05)
      : (color1luminance + 0.05) / (color2luminance + 0.05);
  
  return {
    'AA_small': passAA_smallText(ratio),
    'AA_large': passAA_largeText(ratio),
    'AAA_small': passAAA_smallText(ratio),
    'AAA_large': passAAA_largeText(ratio),
  };
}