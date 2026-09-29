import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TiltCard } from "./Interactive3D";

export default function ProjectCard({ project, index }) {
  const [preview,setPreview]=useState(false);
  return (
    <>
    <TiltCard className="project-tilt"><motion.article
      className={`project-card ${project.accent}`}
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: .65, delay: index * .06 }}
      whileHover={{ y: -8 }}
    >
      <div className="project-hover-label">OPEN CASE STUDY ↗</div>
      <div className="project-top">
        <span className="project-no">{project.number}</span>
        <span className="project-type">{project.type}</span>
      </div>

      <div className="project-art">
        <img className="project-image" src={project.image} alt={`${project.title} preview`} loading="lazy" />
        <div className="project-image-overlay"/><button className="project-preview-btn" data-cursor onClick={()=>setPreview(true)}>Preview</button><div className="project-image-strip">{project.gallery?.map((img,i)=><img key={img} src={img} alt="" loading="lazy" />)}</div>
        <div className="art-grid"/>
        <div className="browser-window">
          <div className="browser-bar"><i/><i/><i/></div>
          <div className="browser-body">
            <div className="art-line long"/>
            <div className="art-line"/>
            <div className="art-cards">
              <span/><span/><span/>
            </div>
          </div>
        </div>
        <div className="orb orb-a"/>
        <div className="orb orb-b"/>
      </div>

      <div className="project-content">
        <div className="project-heading">
          <div>
            <p className="eyebrow">{project.metric}</p>
            <h3>{project.title}</h3>
          </div>
          <ArrowUpRight className="project-arrow" size={25}/>
        </div>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.stack.map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-actions">
          <Link data-cursor to={`/projects/${project.id}`}>
            View case study <ArrowRight size={15}/>
          </Link>
          <a data-cursor href={project.url} target="_blank" rel="noreferrer">
            Live project <ExternalLink size={15}/>
          </a>
          <a data-cursor href={project.github} target="_blank" rel="noreferrer" className="ghost-link">
            <Github size={15}/> GitHub
          </a>
        </div>
      </div>
    </motion.article></TiltCard>
    <AnimatePresence>{preview&&<motion.div className="project-modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={()=>setPreview(false)}><motion.div className="project-modal-box" initial={{scale:.92,y:20}} animate={{scale:1,y:0}} exit={{scale:.92,y:20}} onMouseDown={e=>e.stopPropagation()}><button className="project-modal-close" onClick={()=>setPreview(false)}>Close ×</button><img src={project.image} alt={`${project.title} preview`}/><div><span>{project.type}</span><h3>{project.title}</h3><p>{project.longDescription}</p></div></motion.div></motion.div>}</AnimatePresence>
    </>
  );
}