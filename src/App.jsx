import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Code2, Database, Cloud, Server, Github, Linkedin, Mail, Download, Sparkles, MapPin, Award, Layers3, Boxes, Zap, ExternalLink, Search, X, Copy, Clock3, GitFork, Star, BookOpen, Terminal, Rocket, Workflow, BrainCircuit } from 'lucide-react';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Reveal from './components/Reveal';
import ProjectCard from './components/ProjectCard';
import Marquee from './components/Marquee';
import { CursorSystem, TiltCard } from './components/Interactive3D';
import { ParticleNetwork, CursorParticles, KeyboardShortcuts, RepoShowcase, TextEffects, ScrambleText, Typewriter, AnimatedNumber, EasterEgg } from './components/PremiumEffects';
import FullscreenNav from './components/FullscreenNav';
import SkillFlipCard from './components/SkillFlipCard';
import CommandPalette from './components/CommandPalette';
import AIChatbot from './components/AIChatbot';
import PremiumExpansion from './components/PremiumExpansion';
import ImmersiveLab from './components/ImmersiveLab';
import LoadingScreen from './components/LoadingScreen';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import { projects } from './data/projects';

const certifications=[['React JS','Infosys Springboard','Frontend certification'],['JavaScript','Infosys Springboard','JavaScript fundamentals'],['Full Stack Web Development','PW Skills','Full-stack development'],['Data Structures & Algorithms','PW Skills','DSA foundations']];
const statItems=[['06+','Live projects',Layers3],['20+','Core technologies',Boxes],['04','Certifications',Award],['2025','BE CSE graduate',Zap]];
const skills=[
 {key:'Frontend',icon:Code2,title:'Frontend Engineering',items:['JavaScript','React.js','Redux','React Router','Tailwind CSS','HTML5 / CSS3','Responsive UI']},
 {key:'Backend',icon:Server,title:'Backend Engineering',items:['Node.js','Express.js','REST APIs','Java','Spring Boot','JWT / RBAC','Socket.IO']},
 {key:'Data',icon:Database,title:'Data & Architecture',items:['MongoDB','MySQL','PostgreSQL','Mongoose','JPA / Hibernate','DBMS','API design']},
 {key:'Cloud',icon:Cloud,title:'Cloud & DevOps',items:['AWS','S3','Docker','Kubernetes','Jenkins','GitHub Actions','CI/CD']},
];
const techs=['React','Node.js','Java','Spring Boot','MongoDB','Docker','AWS','Kubernetes'];
const allTech=['JavaScript','React','Redux','Tailwind','Node.js','Express','MongoDB','MySQL','PostgreSQL','Java','Spring Boot','REST APIs','JWT','Socket.IO','WebSockets','Git','Docker','Kubernetes','AWS','Jenkins','GitHub Actions','Jest','Postman'];

function useGithub(){
 const [data,setData]=useState(null);
 useEffect(()=>{fetch('https://api.github.com/users/pratik-sd-08').then(r=>r.ok?r.json():null).then(setData).catch(()=>{});},[]);
 return data;
}

function Home(){
 const [skillFilter,setSkillFilter]=useState('All'); const [projectFilter,setProjectFilter]=useState('All'); const [query,setQuery]=useState(''); const [resumeOpen,setResumeOpen]=useState(false); const [copied,setCopied]=useState(false); const [now,setNow]=useState(new Date()); const github=useGithub(); useEffect(()=>{const t=setInterval(()=>setNow(new Date()),30000);return()=>clearInterval(t)},[]);
 const {scrollYProgress}=useScroll(); const scaleX=useSpring(scrollYProgress,{stiffness:120,damping:25});
 const projectFilters=['All','Full Stack','Frontend','Cloud','API'];
 const visibleProjects=useMemo(()=>projects.filter(p=>(projectFilter==='All'||p.type.includes(projectFilter))&&(`${p.title} ${p.description} ${p.stack.join(' ')}`.toLowerCase().includes(query.toLowerCase()))),[projectFilter,query]);
 const copyEmail=async()=>{await navigator.clipboard?.writeText('rajpratik196@gmail.com');setCopied(true);setTimeout(()=>setCopied(false),1800)};
 return <>
  <LoadingScreen/><motion.div className="scroll-progress" style={{scaleX}}/><ParticleNetwork/><CursorParticles/><CursorSystem/><CommandPalette/><KeyboardShortcuts/><AIChatbot/><FullscreenNav/><Navbar/><EasterEgg/>
  <main id="top">
   <section className="hero">
    <div className="hero-noise"/><div className="hero-gridlines"/><div className="hero-light light-one"/><div className="hero-light light-two"/><div className="hero-stars"/>
    <div className="container hero-inner">
     <Reveal className="hero-copy">
      <div className="status-pill"><span className="status-dot"/> Open to full-time opportunities <span className="status-location"><MapPin size={11}/> Patna, India</span></div>
      <p className="hero-kicker"><Typewriter/> · MERN + JAVA / SPRING BOOT</p>
      <h1><TextEffects text="I build" mode="words"/> digital <span className="gradient-text animated-gradient"><ScrambleText text="products"/></span> that feel <em>alive.</em></h1>
      <p className="hero-desc">I’m Pratik Raj — a 2025 Computer Science graduate building responsive interfaces, APIs, real-time systems and cloud-ready applications with React, Node.js and Java/Spring Boot.</p>
      <div className="hero-actions"><button onClick={()=>document.querySelector('#work')?.scrollIntoView({behavior:'smooth'})} className="btn btn-primary magnetic">Explore my work <ArrowDownRight size={18}/></button><a href="/Pratik_Raj_Resume.pdf" download="Pratik_Raj_Resume.pdf" className="btn btn-secondary magnetic"><Download size={17}/> Download Resume</a><button onClick={()=>setResumeOpen(true)} className="resume-preview-btn">Preview</button></div>
      <div className="hero-proof"><div><strong>2025</strong><span>BE CSE Graduate</span></div><div><strong>06+</strong><span>Live Projects</span></div><div><strong>MERN + Java</strong><span>Full Stack</span></div></div>
      <div className="hero-social-proof"><a href="https://github.com/pratik-sd-08" target="_blank" rel="noreferrer">GitHub ↗</a><i/><a href="https://www.linkedin.com/in/pratik-raj-a112a5342/" target="_blank" rel="noreferrer">LinkedIn ↗</a><i/><span><Clock3 size={11}/> {now.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})} IST</span></div>
     </Reveal>
     <TiltCard className="hero-3d-wrap"><motion.div className="hero-visual" initial={{opacity:0,scale:.82,rotate:-5}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1,delay:.2,ease:[.16,1,.3,1]}}>
       <div className="visual-ring ring-one"/><div className="visual-ring ring-two"/><div className="visual-ring ring-three"/>
       <div className="code-orbit orbit-one">React</div><div className="code-orbit orbit-two">Node.js</div><div className="code-orbit orbit-three">Spring Boot</div>
       <div className="hero-card"><div className="mini-top"><span>pratik.dev</span><span className="live-dot">● LIVE</span></div><div className="hero-avatar"><img src="https://github.com/pratik-sd-08.png?size=512" alt="Pratik Raj"/></div><p className="mini-role">FULL STACK ENGINEER</p><div className="mini-code"><span>const</span> craft = <b>"ship"</b>;<br/><span>while</span> (problem) {'{'}<br/>&nbsp;&nbsp;build();<br/>&nbsp;&nbsp;test();<br/>&nbsp;&nbsp;deploy();<br/>{'}'}</div><div className="hero-card-footer"><span>React</span><span>Node</span><span>Java</span><span>Cloud</span></div></div>
       <div className="floating-chip chip-a">MERN ↗</div><div className="floating-chip chip-b">Spring Boot</div><div className="floating-chip chip-c">AWS · Docker</div><div className="floating-orb orb-1"/><div className="floating-orb orb-2"/>
     </motion.div></TiltCard>
    </div><div className="scroll-cue"><span>SCROLL</span><i/></div><Marquee/>
   </section>

   <section className="stats-section"><div className="container stats-grid">{statItems.map(([value,label,Icon],i)=><Reveal key={label} delay={i*.06} className="stat-card"><Icon size={18}/><strong><AnimatedNumber value={value}/></strong><span>{label}</span></Reveal>)}</div></section>

   <section className="section intro" id="about"><div className="container two-col"><Reveal><p className="section-kicker">01 / ABOUT</p><h2>I turn ideas into <span className="gradient-text">working software.</span></h2><div className="about-badges"><span><Rocket size={14}/> Product minded</span><span><Workflow size={14}/> API + UI</span><span><Terminal size={14}/> Deployment ready</span></div></Reveal><Reveal delay={.12} className="about-visual"><div className="about-image-wrap"><img src="https://github.com/pratik-sd-08.png?size=640" alt="Pratik Raj profile" loading="lazy"/><span>PRATIK RAJ · FULL STACK</span></div><div><p className="large-copy">I build responsive interfaces, design APIs, model databases, implement authentication and connect applications to cloud infrastructure.</p><p className="body-copy">My portfolio is centered on shipped work: logistics, cloud storage, real-time communication, consumer interfaces and modern business websites. I’m currently expanding deeper into Java, Spring Boot, cloud and DevOps.</p></div></Reveal></div></section>

   <section className="section work" id="work"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">02 / SELECTED WORK</p><h2>Things I’ve <span className="gradient-text">built.</span></h2></div><p>Search, filter, tilt, inspect and open the full case study.</p></Reveal><div className="project-toolbar"><div className="project-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects or technologies…"/><kbd>/</kbd></div><div className="project-filters">{projectFilters.map(x=><button key={x} className={projectFilter===x?'active':''} onClick={()=>setProjectFilter(x)}>{x}</button>)}</div></div><div className="project-grid">{visibleProjects.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div>{!visibleProjects.length&&<div className="empty-projects">No projects matched that search.</div>}<div className="work-end-note"><span>More builds coming</span><div className="work-line"/><span>Scroll to explore ↓</span></div></div></section>

   <section className="premium-divider"><div className="liquid-blob"/><div className="wave-line"/><div className="container premium-divider-inner"><span>DESIGN · ENGINEERING · MOTION</span><svg viewBox="0 0 240 32" aria-hidden="true"><path d="M0 16 C30 -5 55 37 82 16 S135 -5 160 16 S215 37 240 16"/></svg></div></section><section className="statement"><div className="container statement-inner"><Sparkles size={24}/><p>Good software is invisible when it works.<br/><span>Great software is memorable when it feels right.</span></p></div></section>

   <section className="section stack" id="stack"><div className="container"><Reveal><p className="section-kicker">03 / TOOLBOX</p><h2>The stack behind <span className="gradient-text">the work.</span></h2></Reveal><div className="skill-filters">{['All','Frontend','Backend','Data','Cloud'].map(x=><button key={x} className={skillFilter===x?'active':''} onClick={()=>setSkillFilter(x)}>{x}</button>)}</div><div className="skill-grid">{skills.filter(s=>skillFilter==='All'||s.key===skillFilter).map((skill,i)=><Reveal key={skill.title} delay={i*.08}><SkillFlipCard {...skill}/></Reveal>)}</div><div className="skill-sphere" aria-label="Interactive technology visualization"><div className="sphere-core"><BrainCircuit size={28}/><span>TECH<br/>ECOSYSTEM</span></div>{allTech.slice(0,14).map((x,i)=><motion.span key={x} className="sphere-chip" style={{'--i':i}} animate={{rotate:360}} transition={{duration:24+i,repeat:Infinity,ease:'linear'}}>{x}</motion.span>)}</div><div className="tech-wall">{allTech.map(x=><motion.span key={x} whileHover={{scale:1.06,y:-3}}>{x}</motion.span>)}</div><div className="learning-grid"><div><span>Currently learning</span><strong>Advanced Spring Boot · System Design · Kubernetes</strong></div><div><span>Currently building</span><strong>Production-style full-stack systems with CI/CD</strong></div></div></div></section>

   <section className="section developer-workflow"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">04 / WORKFLOW</p><h2>How I move from <span className="gradient-text">idea to production.</span></h2></div></Reveal><div className="workflow-grid">{[['01','Discover','Understand the problem, users and constraints.'],['02','Design','Shape the interface, architecture and API contracts.'],['03','Build','Implement responsive UI, services, data and auth.'],['04','Ship','Test, containerize, deploy and iterate.']].map(([n,t,d],i)=><Reveal key={n} delay={i*.06} className="workflow-card"><span>{n}</span><h3>{t}</h3><p>{d}</p></Reveal>)}</div></div></section><section className="section github-section" id="github"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">04 / GITHUB</p><h2>Developer <span className="gradient-text">activity.</span></h2></div><p>Public profile data is loaded from GitHub when available.</p></Reveal><div className="github-layout"><div className="github-card"><div className="github-avatar"><img src="https://github.com/pratik-sd-08.png?size=200" alt="GitHub profile" loading="lazy"/></div><div><span className="eyebrow">@pratik-sd-08</span><h3>{github?.name||'Pratik Raj'}</h3><p>{github?.bio||'Full Stack Developer · MERN · Java · Spring Boot'}</p><div className="github-stats"><span><strong>{github?.public_repos??'20+'}</strong> repos</span><span><strong>{github?.followers??'—'}</strong> followers</span><span><strong>{github?.following??'—'}</strong> following</span></div></div><a className="btn btn-secondary" href="https://github.com/pratik-sd-08" target="_blank" rel="noreferrer"><Github size={16}/> View GitHub</a></div><div className="contribution-panel"><div className="heatmap-title"><span>Contribution activity</span><small>github.com/pratik-sd-08</small></div><div className="heatmap">{Array.from({length:112},(_,i)=><i key={i} style={{'--level':(i*7)%5}}/>)}</div><div className="heatmap-legend"><span>Less</span><i/><i/><i/><i/><span>More</span></div></div></div></div></section>

   <section className="section journey" id="journey"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">05 / JOURNEY</p><h2>From fundamentals to <span className="gradient-text">shipping.</span></h2></div></Reveal><div className="timeline">{[['2021','Started BE in Computer Science Engineering','Chandigarh University · Mohali'],['2023–24','Built the foundation','DSA · OOP · DBMS · networking · web development'],['2025','Graduated & shipped full-stack work','MERN projects · APIs · authentication · real-time apps'],['2026','Expanded into Java + cloud + DevOps','Spring Boot · Docker · Kubernetes · CI/CD · AWS']].map(([year,title,sub],i)=><Reveal key={year} delay={i*.08} className="timeline-item"><span className="timeline-year">{year}</span><div className="timeline-dot"/><div><h3>{title}</h3><p>{sub}</p></div></Reveal>)}</div></div></section>

   <section className="section certifications"><div className="container"><Reveal><p className="section-kicker">06 / CERTIFICATIONS</p><h2>Proof of <span className="gradient-text">learning.</span></h2></Reveal><div className="cert-grid">{certifications.map(([title,issuer,desc],i)=><Reveal key={title} delay={i*.07} className="cert-card"><div className="cert-icon"><Award size={19}/></div><div><span>{issuer}</span><h3>{title}</h3><p>{desc}</p></div><ExternalLink size={15} className="cert-arrow"/></Reveal>)}</div><p className="cert-note">Verification URLs are intentionally not fabricated; add official certificate links when available.</p></div></section><section className="section repo-section"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">07 / LATEST REPOSITORIES</p><h2>Recent <span className="gradient-text">GitHub work.</span></h2></div><a className="text-link" href="https://github.com/pratik-sd-08?tab=repositories" target="_blank" rel="noreferrer">View all repositories ↗</a></Reveal><RepoShowcase/></div></section>

   <section className="resume-section"><div className="container resume-card"><div><span className="section-kicker">RESUME</span><h2>One click to <span className="gradient-text">download.</span></h2><p>Current resume PDF included in this portfolio package.</p></div><div className="resume-actions"><button className="btn btn-primary" onClick={()=>setResumeOpen(true)}><BookOpen size={17}/> Preview resume</button><a className="btn btn-secondary" href="/Pratik_Raj_Resume.pdf" download="Pratik_Raj_Resume.pdf"><Download size={17}/> Download PDF</a></div></div></section>

   <PremiumExpansion/>
   <ImmersiveLab/>

   <section className="hire-strip"><div className="container hire-strip-inner"><div><span className="hire-label">CURRENTLY AVAILABLE</span><h3>Ready to build something <em>serious?</em></h3></div><Link className="hire-arrow" to="/contact">Start a conversation <ArrowUpRight size={20}/></Link></div></section>
   <section className="contact" id="contact"><div className="container contact-inner"><Reveal><p className="section-kicker">09 / CONTACT</p><h2>Have a problem<br/>worth <span className="gradient-text">building?</span></h2><p className="contact-copy">I’m currently open to full-time software engineering and full-stack opportunities.</p><div className="contact-actions"><Link className="btn btn-primary" to="/contact">Contact me <ArrowUpRight size={18}/></Link><button className="btn btn-secondary" onClick={copyEmail}>{copied?<CheckCircle2 size={17}/>:<Copy size={17}/>} {copied?'Email copied':'Copy email'}</button></div></Reveal><Reveal delay={.12} className="contact-side"><div className="contact-row"><Mail size={19}/><span>rajpratik196@gmail.com</span></div><div className="contact-row"><MapPin size={19}/><span>Patna, Bihar, India</span></div><div className="socials"><a href="https://github.com/pratik-sd-08" target="_blank" rel="noreferrer" data-cursor><Github size={20}/></a><a href="https://www.linkedin.com/in/pratik-raj-a112a5342/" target="_blank" rel="noreferrer" data-cursor><Linkedin size={20}/></a></div><div className="availability"><CheckCircle2 size={17}/> Available for opportunities</div></Reveal></div></section>
  </main>
  {resumeOpen&&<div className="resume-modal" onMouseDown={()=>setResumeOpen(false)}><div className="resume-modal-box" onMouseDown={e=>e.stopPropagation()}><div className="resume-modal-head"><strong>Pratik Raj · Resume</strong><div><a href="/Pratik_Raj_Resume.pdf" download="Pratik_Raj_Resume.pdf" className="btn btn-secondary"><Download size={15}/> Download</a><button onClick={()=>setResumeOpen(false)} aria-label="Close resume"><X size={18}/></button></div></div><iframe src="/Pratik_Raj_Resume.pdf" title="Pratik Raj resume preview"/></div></div>}
  <footer className="footer"><div className="container footer-inner"><div><Link className="logo" to="/">PRATIK<span className="muted">.DEV</span></Link><p>Built with React, Framer Motion & a little obsession with details.</p></div><span>© {new Date().getFullYear()} Pratik Raj</span><button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button></div></footer>
  <div className="mobile-bottom-nav"><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Home</button><button onClick={()=>document.querySelector('#work')?.scrollIntoView({behavior:'smooth'})}>Work</button><button onClick={()=>document.querySelector('#stack')?.scrollIntoView({behavior:'smooth'})}>Stack</button><Link to="/contact">Contact</Link></div>
 </>;
}

function AnimatedRoutes(){const location=useLocation();return <AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<PageTransition><Home/></PageTransition>}/><Route path="/contact" element={<PageTransition><><Navbar/><Contact/></></PageTransition>}/><Route path="/projects/:id" element={<PageTransition><><Navbar/><ProjectDetail/></></PageTransition>}/><Route path="*" element={<PageTransition><><Navbar/><NotFound/></></PageTransition>}/></Routes></AnimatePresence>}
export default function App(){return <BrowserRouter><AnimatedRoutes/></BrowserRouter>}
