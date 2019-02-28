const RType = /[a-z]+(?=])/i

export const typeofConstructor = function typeofConstructor(data) {
  return eval(Object.prototype.toString.call(data).match(RType)[0])
}
