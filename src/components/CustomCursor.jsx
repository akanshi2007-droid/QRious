import { useEffect, useRef } from 'react'

const INTERACTIVE =
  'button, a, select, label, [role="button"], input[type="range"], input[type="color"], input[type="checkbox"]'
const TEXTFIELD =
  'input:not([type="range"]):not([type="color"]):not([type="checkbox"]), textarea'

export default function CustomCursor() {
  const root = useRef(null)
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    // only on devices with a real mouse
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const html = document.documentElement
    html.classList.add('custom-cursor')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduce ? 1 : 0.18

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      root.current.dataset.hidden = 'false'
    }

    const loop = () => {
      rx += (x - rx) * ease
      ry += (y - ry) * ease
      ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      const state = e.target.closest(TEXTFIELD)
        ? 'text'
        : e.target.closest(INTERACTIVE)
        ? 'hover'
        : 'idle'
      root.current.dataset.state = state
    }

    const onDown = () => (root.current.dataset.down = 'true')
    const onUp = () => (root.current.dataset.down = 'false')
    const onLeave = () => (root.current.dataset.hidden = 'true')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      html.classList.remove('custom-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="cursor-root" ref={root} data-state="idle" data-down="false" data-hidden="true" aria-hidden="true">
      <div className="cursor-pos" ref={ring}><div className="cursor-ring" /></div>
      <div className="cursor-pos" ref={dot}><div className="cursor-dot" /></div>
    </div>
  )
}