export const capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export const toString = function toString(obj) {
  if (Object(obj) === obj) {
    return Object.prototype.toString.call(obj)
  }
  return obj == null ? '' : obj.toString()
}
