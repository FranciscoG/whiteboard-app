let letterWidths = {};
function calcLetterWidths() {
  let capsIndex = 65;
  let smallIndex = 97;
  const div = document.createElement("span");
  div.style.cssText = `
    position: absolute;
    visibility: hidden;
    height: auto;
    width: auto;
    white-space: nowrap;
    font-size: 128px;
    font-family: sans-serif;
  `;
  document.body.appendChild(div);

  function getW(char) {
    div.innerText = char;
    return parseFloat(window.getComputedStyle(div, null).getPropertyValue("width"));
  }

  for (let i = capsIndex; i < capsIndex + 26; i++) {
    const char = String.fromCharCode(i);
    const computedWidth = getW(char);
    letterWidths[char] = (computedWidth * 100) / 128;
  }

  for (let i = smallIndex; i < smallIndex + 26; i++) {
    const char = String.fromCharCode(i);
    const computedWidth = getW(char);
    letterWidths[char] = (computedWidth * 100) / 128;
  }

  const computedWidth = getW(String.fromCharCode(160));
  letterWidths[String.fromCharCode(160)] = (computedWidth * 100) / 128;

  document.body.removeChild(div);
}

/**
 * Calculate font size based on character count with a min and max size
 * @param {HTMLElement} el
 * @param {number} min
 * @param {number} max
 * @param {number} width
 * @param {number} height
 */
export function calcNoteFontSize(el, min, max, width, height) {
  const currentFontSize = el.style.fontSize ? parseFloat(el.style.fontSize) : max;
  const text = el.type ? el.value : el.textContent;
  if (!text) return max;

  const w = text.split('').reduce((acc, letter) => {
    const perc = letterWidths[letter] || 50;
    return acc + currentFontSize * (perc / 100);
  }, 0);
  console.log(w);

  if (w > width && currentFontSize > min) {
    return currentFontSize - min;
  }

  return currentFontSize;
}
