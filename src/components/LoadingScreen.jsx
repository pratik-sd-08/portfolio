import { motion } from 'framer-motion';
export default function LoadingScreen(){return <motion.div className="loading-screen" initial={{opacity:1}} animate={{opacity:0}} transition={{duration:.7,delay:.55}}><div className="loader-core"><span>PR</span><div className="loader-bar"><i/></div><small>LOADING EXPERIENCE</small></div></motion.div>}
