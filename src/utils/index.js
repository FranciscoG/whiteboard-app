/**
 * function that takes any amount of strings and filters out anything falsy and
 * returns a single joined string to be used in className attributes
 * @param  {...string} classNames
 */
export function cn(...classNames) {
  return classNames
    .filter((cls) => {
      // we should only ever have non-empty strings in the array, everything
      // else is ignored
      return typeof cls === "string" && cls.trim() !== "";
    })
    .join(" ")
    .trim();
}

export function isEditable(el) {
  if (el.isContentEditable) return true;
  const tagName = el.tagName.toLowerCase();
  if (tagName === "textarea") return true;
  if (tagName !== "input") return false;
  if (el.disabled) return false;
  if (el.readonly) return false;

  const type = (el.getAttribute("type") || "text").toLowerCase();
  // if any of these input types is not supported by a browser, it will behave as input type text.
  const inputTypes = [
    "date",
    "datetime",
    "datetime-local",
    "email",
    "month",
    "number",
    "password",
    "search",
    "tel",
    "text",
    "url",
    "week",
  ];
  if (inputTypes.includes(type)) return true;
  
  return false;
}

/**
 * Searches for the deepest child node of a starting parent node and specifically
 * looking in a specific index
 */
export function getDeepestChildAtIndex(startingEl, index = 0) {
  const child = startingEl.children[index];
  if (!child) return startingEl;
  return getDeepestChildAtIndex(child, index);
}

/**
 * get a random number between min and max, inclusive
 * @param {number} min 
 * @param {number} max 
 */
export function ranB(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * round to the nearest hundredths decimal place
 * src: https://stackoverflow.com/a/11832950
 * @param {number} num 
 */
export const round100th = num => Math.round((num + Number.EPSILON) * 100) / 100