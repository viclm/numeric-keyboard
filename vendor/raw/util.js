export const createdom = function (tree) {
  let el = document.createElement(tree.tag)
  if (tree.attrs) {
    for (let name in tree.attrs) {
      el.setAttribute(name, tree.attrs[name])
    }
  }
  if (tree.children) {
    for (let i = 0 ; i < tree.children.length ; i++) {
      el.appendChild(createdom(tree.children[i]))
    }
  }
  return el
}

export const capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}