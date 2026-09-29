import { motion } from "framer-motion";
export default function PageTransition({ children }) {
  return <motion.div className="page-transition" initial={{ opacity:0, y:18, filter:"blur(10px)" }} animate={{ opacity:1, y:0, filter:"blur(0px)" }} exit={{ opacity:0, y:-14, filter:"blur(8px)" }} transition={{ duration:.42, ease:[.16,1,.3,1] }}>{children}</motion.div>;
}
