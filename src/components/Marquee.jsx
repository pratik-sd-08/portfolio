import { motion } from "framer-motion";

export default function Marquee() {
  const words = ["REACT", "NODE.JS", "SPRING BOOT", "MONGODB", "AWS", "DOCKER", "KUBERNETES", "JAVASCRIPT"];
  return (
    <div className="marquee">
      <motion.div
        className="marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...words, ...words].map((word, i) => (
          <span key={i}>{word}<b>✦</b></span>
        ))}
      </motion.div>
    </div>
  );
}