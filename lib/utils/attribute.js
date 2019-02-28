export const coerceBooleanProperty = function coerceBooleanProperty(value) {
  return value != null && `${value}` !== 'false'
}
