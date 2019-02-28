const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout

export const animate = function animate(iterable, done = () => {}, frames = 60) {
  let running = true
  let frame = 0

  const closure = timestamp => {
    if (!running) { return }
    iterable(timestamp, ++frame, frames)
    if (frame < frames) {
      requestAnimationFrame(closure, 0)
    }
    else {
      done()
    }
  }

  requestAnimationFrame(closure, 0)

  return () => { running = false }
}
