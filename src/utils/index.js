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
      return typeof cls === 'string' && cls.trim() !== '';
    })
    .join(" ")
    .trim();
}
