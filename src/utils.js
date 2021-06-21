/**
 * A helper function to wait for given ms
 *
 * @param {number} ms
 * @returns {Promise.<unknown>}
 */
export const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

/**
 * @param {...React.CSSProperties} args
 * @returns {React.CSSProperties}
 */
export const stylex = (...args) => {
  return args
    .filter(Boolean)
    .reduce((acc, style) => Object.assign(acc, style), {});
};
