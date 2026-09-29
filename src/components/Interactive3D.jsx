import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CursorSystem() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 900, damping: 55, mass: 0.16 });
  const ringY = useSpring(y, { stiffness: 900, damping: 55, mass: 0.16 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const raf = useRef(0);
  const pending = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)").matches;
    if (!fine) return;
    const move = (e) => {
      pending.current = e;
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const event = pending.current;
        if (event) {
          x.set(event.clientX); y.set(event.clientY);
          document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
          document.documentElement.style.setProperty("--my", `${event.clientY}px`);
          setVisible(true);
        }
        raf.current = 0;
      });
    };
    const over = (e) => {
      const target = e.target?.closest?.("a,button,[data-cursor]");
      setActive(Boolean(target));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerleave", leave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  const scale = useSpring(active ? 1.65 : 1, { stiffness: 900, damping: 35, mass: .15 });
  const rotate = useTransform(ringX, [0, 1200], [-4, 4]);
  return <motion.div className={`cursor-system ${visible ? "is-visible" : ""} ${active ? "is-active" : ""}`} style={{ x: ringX, y: ringY, scale, rotate }} aria-hidden="true"><span/><i/></motion.div>;
}

export function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0), gx = useMotionValue(50), gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 360, damping: 28, mass: .2 });
  const sry = useSpring(ry, { stiffness: 360, damping: 28, mass: .2 });
  const sgx = useSpring(gx, { stiffness: 300, damping: 30, mass: .2 });
  const sgy = useSpring(gy, { stiffness: 300, damping: 30, mass: .2 });
  const onMove = (e) => {
    if (!ref.current || !window.matchMedia("(pointer:fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    ry.set((px - .5) * 9); rx.set((.5 - py) * 7); gx.set(px * 100); gy.set(py * 100);
  };
  const reset = () => { rx.set(0); ry.set(0); gx.set(50); gy.set(50); };
  const glow = useTransform([sgx, sgy], ([a, b]) => `radial-gradient(circle at ${a}% ${b}%, rgba(255,255,255,.20), rgba(34,211,238,.05) 14%, transparent 34%)`);
  return <motion.div ref={ref} className={`tilt-shell ${className}`} style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }} onPointerMove={onMove} onPointerLeave={reset}>{children}<motion.div className="tilt-spot" style={{ background: glow }} /></motion.div>;
}
