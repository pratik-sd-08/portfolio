import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import Reveal from "../components/Reveal";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <main className="inner-page"><div className="container not-found"><h1>Project not found.</h1><Link className="btn btn-primary" to="/#work">Back to work</Link></div></main>;
  }

  return (
    <main className={`inner-page project-detail ${project.accent}`}>
      <div className="container"><div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/#work">Work</Link><span>/</span><strong>{project.title}</strong></div>
        <Link className="back-link" to="/#work"><ArrowLeft size={16}/> Back to selected work</Link>
        <Reveal className="detail-hero">
          <p className="section-kicker">{project.number} / {project.type}</p>
          <h1 className="page-title">{project.title}</h1>
          <p className="page-intro">{project.longDescription}</p>
          <div className="detail-actions">
            <a className="btn btn-primary" href={project.url} target="_blank" rel="noreferrer">Open live project <ArrowUpRight size={17}/></a>
            <a className="btn btn-secondary" href={project.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>
          </div>
        </Reveal>

        <motion.div className="detail-showcase" initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} transition={{duration:.8}}>
          <div className="showcase-glow"/><div className="showcase-particle p1"/><div className="showcase-particle p2"/><div className="showcase-particle p3"/>
          <img className="detail-project-image" src={project.image} alt={`${project.title} interface preview`} />
          <div className="detail-image-overlay" />
          <div className="showcase-window">
            <div className="showcase-nav"><i/><i/><i/><span>{project.title.toLowerCase().replaceAll(" ","-")}.app</span></div>
            <div className="showcase-content"><b>{project.metric}</b><div className="showcase-title">{project.title}</div><div className="showcase-bars"><span/><span/><span/></div></div>
          </div>
        </motion.div>

        <Reveal className="detail-gallery"><motion.img className="gallery-image gallery-main" src={project.gallery?.[0] || project.image} alt={`${project.title} interface view 1`} loading="lazy" whileHover={{scale:1.02}}/><div className="gallery-side"><motion.img className="gallery-image" src={project.gallery?.[1] || project.image} alt={`${project.title} interface view 2`} loading="lazy" whileHover={{scale:1.02}}/><motion.img className="gallery-image" src={project.gallery?.[2] || project.image} alt={`${project.title} interface view 3`} loading="lazy" whileHover={{scale:1.02}}/></div></Reveal>

        <div className="detail-grid">
          <Reveal>
            <p className="section-kicker">FEATURES</p>
            <div className="feature-list">{project.features.map(x=><div key={x}><CheckCircle2 size={16}/>{x}</div>)}</div>
          </Reveal>
          <Reveal delay={.1}>
            <p className="section-kicker">TECHNOLOGY</p>
            <div className="detail-tags">{project.stack.map(x=><span key={x}>{x}</span>)}</div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}