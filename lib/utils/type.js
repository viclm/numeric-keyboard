const RType = /[a-z]+(?=])/i

export const typeofConstructor = function typeofConstructor(data) {
  return eval(Object.prototype.toString.call(data).match(RType)[0])
}

export const isPlainObject = function isPlainObject(obj) {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return false
  }
  const proto = Object.getPrototypeOf(obj)
  return proto == null || proto.hasOwnProperty('constructor') && proto.constructor === Object.prototype.constructor
}

export const isEmptyObject = function isEmptyObject(obj) {
  for (let name in obj) {
    return false
  }
  return true
}
