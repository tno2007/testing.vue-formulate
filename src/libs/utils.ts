/**
 * Set a unique Symbol identifier on an object.
 * @param {object} o
 * @param {Symbol} id
 */
export function setId(o: any, id: any = null) {
  if (!has(o, "__id") || id) {
    return Object.defineProperty(
      o,
      "__id",
      Object.assign(Object.create(null), { value: id || token(9) })
    );
  }
  return o;
}

/**
 * Shorthand for Object.prototype.hasOwnProperty.call (space saving)
 */
export function has(ctx: any, prop: any) {
  return Object.prototype.hasOwnProperty.call(ctx, prop);
}

/**
 * Creates a unique id of a given length.
 * @param {number} length
 * @returns
 */
export function token(length = 13) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

/**
 * Shallow equal.
 * @param {} objA
 * @param {*} objB
 */
export function equals(objA: any, objB: any, deep = false) {
  if (objA === objB) {
    return true;
  }
  if (!objA || !objB) {
    return false;
  }
  if (typeof objA !== "object" && typeof objB !== "object") {
    // Compare scalar values
    return objA === objB;
  }
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    const key = aKeys[i];
    if (
      (!deep && objA[key] !== objB[key]) ||
      (deep && !equals(objA[key], objB[key], deep))
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Determines if a given value is considered "empty"
 * @param {any} value
 */
export function isEmpty(value: any): any {
  if (typeof value === "number") {
    return false;
  }
  return (
    value === undefined ||
    value === "" ||
    value === null ||
    value === false ||
    (Array.isArray(value) && !value.some((v) => !isEmpty(v))) ||
    (value &&
      !Array.isArray(value) &&
      typeof value === "object" &&
      isEmpty(Object.values(value)))
  );
}
