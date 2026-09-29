import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { Activity, ArrowUpRight, ChevronLeft, ChevronRight, Copy, Download, ExternalLink, Github, Globe2, Image as ImageIcon, Layers3, Laptop, Maximize2, MessageCircle, Mic, Monitor, MousePointer2, Network, Phone, Play, Search, Server, Smartphone, Sparkles, Volume2, VolumeX, X, Zap } from 'lucide-react';
import { projects } from '../data/projects';
import Reveal from './Reveal';

const visualShots = [
  ['Smart Logistics', projects[0].gallery[0], 'Dashboard / tracking view'],
  ['Cloud Storage', projects[1].gallery[1], 'Workspace / cloud architecture'],
  ['Grilli', projects[2].gallery[0], 'Responsive consumer UI'],
  ['Cling InfoTech', projects[3].gallery[1], 'Agency analytics presentation'],
  ['Foodie', projects[4].gallery[0], 'Product discovery interface'],
  ['Weather', projects[5].gallery[1], 'API-driven weather experience'],
];

function Lightbox({items, index, onClose, setIndex}){
  const item=items[index];
  useEffect(()=>{const key=e=>{if(e.key==='Escape')onClose();if(e.key==='ArrowRight')setIndex((index+1)%items.length);if(e.key==='ArrowLeft')setIndex((index-1+items.length)%items.length)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[index,items.length,onClose,setIndex]);
  if(!item)return null;
  return <motion.div className="premium-lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={onClose}>
    <button className="lightbox-close" onClick={onClose}><X/></button>
    <button className="lightbox-nav left" onClick={e=>{e.stopPropagation();setIndex((index-1+items.length)%items.length)}}><ChevronLeft/></button>
    <motion.div className="lightbox-frame" initial={{scale:.92,y:18}} animate={{scale:1,y:0}} onMouseDown={e=>e.stopPropagation()}>
      <img src={item[1]} alt={item[0]} />
      <div><span>{item[0]}</span><strong>{item[2]}</strong><small>{index+1} / {items.length}</small></div>
    </motion.div>
    <button className="lightbox-nav right" onClick={e=>{e.stopPropagation();setIndex((index+1)%items.length)}}><ChevronRight/></button>
  </motion.div>
}

function BeforeAfter(){
  const [pos,setPos]=useState(52); const ref=useRef(null);
  const move=e=>{if(!ref.current)return;const r=ref.current.getBoundingClientRect();const x=e.touches?e.touches[0].clientX:e.clientX;setPos(Math.max(4,Math.min(96,((x-r.left)/r.width)*100)))};
  return <div ref={ref} className="before-after" onPointerMove={move} onTouchMove={move}>
    <img src={projects[3].gallery[0]} alt="Modern project visual"/>
    <div className="after-layer" style={{width:`${pos}%`}}><img src={projects[2].gallery[0]} alt="Alternative project visual"/></div>
    <div className="compare-handle" style={{left:`${pos}%`}}><span>↔</span></div>
    <div className="compare-label before">A</div><div className="compare-label after">B</div>
  </div>;
}

function DeviceMockups(){
  return <div className="device-stage">
    <motion.div className="device laptop" animate={{y:[0,-8,0],rotateX:[4,7,4],rotateY:[-4,3,-4]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}>
      <div className="device-top"><span/><span/><span/></div><img src={projects[0].image} alt="Smart Logistics browser preview"/><div className="device-base"/>
    </motion.div>
    <motion.div className="device phone" animate={{y:[0,10,0],rotate:[-4,2,-4]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut',delay:.4}}><div className="phone-speaker"/><img src={projects[2].gallery[1]} alt="Grilli mobile preview"/></motion.div>
    <div className="device-glow"/>
  </div>
}

function GlobeCanvas(){
  const ref=useRef(null); const [pos,setPos]=useState({x:0,y:0});
  useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext('2d');let raf;let t=0;const resize=()=>{const d=Math.min(devicePixelRatio||1,1.5),w=c.clientWidth,h=c.clientHeight;c.width=w*d;c.height=h*d;ctx.setTransform(d,0,0,d,0,0)};resize();addEventListener('resize',resize);const tick=()=>{t+=.004;const w=c.clientWidth,h=c.clientHeight,cx=w/2+pos.x*.035,cy=h/2+pos.y*.035,r=Math.min(w,h)*.32;ctx.clearRect(0,0,w,h);const grd=ctx.createRadialGradient(cx-r*.3,cy-r*.4,2,cx,cy,r*1.1);grd.addColorStop(0,'rgba(34,211,238,.25)');grd.addColorStop(.55,'rgba(139,92,246,.12)');grd.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,r*1.15,0,Math.PI*2);ctx.fill();for(let i=0;i<20;i++){const a=(i/20)*Math.PI*2+t*(i%2?-.4:.3),x=cx+Math.cos(a)*r*.92,y=cy+Math.sin(a)*r*.45;ctx.fillStyle=i%3===0?'#22d3ee':'#8b5cf6';ctx.globalAlpha=.5;ctx.beginPath();ctx.arc(x,y,2.2,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1}for(let i=-3;i<=3;i++){ctx.strokeStyle='rgba(255,255,255,.09)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(cx,cy,r,Math.max(12,r*.16*(4-Math.abs(i))),i*.2,0,Math.PI*2);ctx.stroke()}for(let i=-4;i<=4;i++){ctx.strokeStyle='rgba(34,211,238,.10)';ctx.beginPath();ctx.ellipse(cx,cy,r*.98,r*(Math.abs(i)/5+.12),i*.16,0,Math.PI*2);ctx.stroke()}ctx.strokeStyle='rgba(255,255,255,.12)';ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();raf=requestAnimationFrame(tick)};tick();return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize)}},[pos]);
  return <canvas ref={ref} className="globe-canvas" onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();setPos({x:e.clientX-r.left-r.width/2,y:e.clientY-r.top-r.height/2})}} aria-label="Interactive wireframe globe"/>;
}

function ParticleConstellation(){
  const ref=useRef(null);useEffect(()=>{const c=ref.current,ctx=c.getContext('2d');let raf,pts=[];const resize=()=>{const d=Math.min(devicePixelRatio||1,1.4);c.width=innerWidth*d;c.height=innerHeight*d;c.style.width='100%';c.style.height='100%';ctx.setTransform(d,0,0,d,0,0);pts=Array.from({length:38},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}))};resize();addEventListener('resize',resize);const tick=()=>{ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle='rgba(139,92,246,.4)';ctx.beginPath();ctx.arc(p.x,p.y,1.7,0,Math.PI*2);ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<150){ctx.strokeStyle=`rgba(34,211,238,${.11*(1-d/150)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}raf=requestAnimationFrame(tick)};tick();return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize)}},[]);return <canvas ref={ref} className="expansion-particles" aria-hidden="true"/>;
}

function PerformancePanel(){
 const [online,setOnline]=useState(navigator.onLine);const [perf,setPerf]=useState({load:'—',dom:'—',fps:'60'});
 useEffect(()=>{const sync=()=>setOnline(navigator.onLine);addEventListener('online',sync);addEventListener('offline',sync);const nav=performance.getEntriesByType('navigation')[0];if(nav)setPerf({load:Math.round(nav.loadEventEnd-nav.startTime)+'ms',dom:Math.round(nav.domContentLoadedEventEnd-nav.startTime)+'ms',fps:'60'});return()=>{removeEventListener('online',sync);removeEventListener('offline',sync)}},[]);
 return <div className="performance-panel"><div><span>LIVE SYSTEM</span><strong><i className={online?'online':''}/>{online?'Online':'Offline fallback'}</strong></div><div><span>DOM READY</span><strong>{perf.dom}</strong></div><div><span>PAGE LOAD</span><strong>{perf.load}</strong></div><div><span>ANIMATION TARGET</span><strong>{perf.fps} FPS</strong></div></div>
}

function SmartAssistant(){
 const [open,setOpen]=useState(false);const [mode,setMode]=useState('Recruiter');const [q,setQ]=useState('');const [listening,setListening]=useState(false);
 const answers=useMemo(()=>({Recruiter:'Pratik is a 2025 BE CSE graduate focused on MERN, Java/Spring Boot, cloud and DevOps. Start with Smart Logistics, Cloud Media Storage and the resume.',Developer:'Ask about architecture, APIs, authentication, real-time Socket.IO workflows, databases, Docker, AWS or Spring Boot.',Visitor:'Explore the projects, use the live demos, or open the contact page to start a conversation.'}),[]);
 const answer=q?`Try: “show React projects”, “explain the stack”, “open resume”, or “how to contact Pratik”.`:answers[mode];
 const voice=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;const r=new SR();setListening(true);r.onresult=e=>setQ(e.results[0][0].transcript);r.onend=()=>setListening(false);r.start()};
 return <><button className="assistant-fab" onClick={()=>setOpen(true)}><MessageCircle size={18}/> AI</button><AnimatePresence>{open&&<motion.div className="assistant-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="assistant-panel" initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}}><div className="assistant-head"><div><Sparkles size={17}/><strong>Portfolio Assistant</strong></div><button onClick={()=>setOpen(false)}><X size={16}/></button></div><div className="assistant-modes">{['Recruiter','Developer','Visitor'].map(x=><button className={mode===x?'active':''} onClick={()=>setMode(x)} key={x}>{x}</button>)}</div><p className="assistant-answer">{answer}</p><div className="assistant-input"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about projects, skills or resume…"/><button onClick={voice} title="Voice search"><Mic size={15}/></button></div><small>Demo assistant · no external AI key required</small></motion.div></motion.div>}</AnimatePresence></>;
}

function PremiumExpansion(){
 const [lightbox,setLightbox]=useState(-1); const [sound,setSound]=useState(false); const [activeShot,setActiveShot]=useState(0); const [filter,setFilter]=useState('All');
 const filtered=projects.filter(p=>filter==='All'||p.stack.includes(filter));
 const chips=['All','React','Node.js','MongoDB','Java','Spring Boot','Docker','AWS'];
 const beep=()=>{if(!sound)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const a=new AC(),o=a.createOscillator(),g=a.createGain();o.frequency.value=520;g.gain.value=.025;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.045)};
 return <>
  <section className="expansion-visuals" id="visual-lab"><ParticleConstellation/><div className="container">
   <Reveal className="section-head"><div><p className="section-kicker">10 / VISUAL LAB</p><h2>See the work from <span className="gradient-text">every angle.</span></h2></div><p>Gallery, device previews, architecture visuals and fullscreen inspection.</p></Reveal>
   <div className="visual-hero"><div className="visual-hero-copy"><span className="visual-badge"><ImageIcon size={13}/> VISUAL STORY</span><h3>Interfaces designed for <em>screens, motion and depth.</em></h3><p>Project imagery is paired with responsive mockups and an interactive lightbox so recruiters can inspect the work without leaving the portfolio.</p><div className="visual-actions"><a className="btn btn-primary" href="#visual-gallery">Explore gallery <ArrowUpRight size={16}/></a><button className="btn btn-secondary" onClick={()=>{setSound(v=>!v);beep()}}>{sound?<Volume2 size={16}/>:<VolumeX size={16}/>} Sound {sound?'on':'off'}</button></div></div><DeviceMockups/></div>
   <div className="visual-grid" id="visual-gallery">{visualShots.map((s,i)=><motion.button key={s[0]} className="visual-tile" onClick={()=>setLightbox(i)} onMouseEnter={()=>setActiveShot(i)} whileHover={{y:-8,rotateX:2,rotateY:i%2?2:-2}}><img src={s[1]} alt={s[0]} loading="lazy"/><span>{s[0]}</span><small>{s[2]}</small><Maximize2 size={14}/></motion.button>)}</div>
   <div className="compare-wrap"><div><p className="section-kicker">INTERACTIVE COMPARISON</p><h3>Before / after visual exploration.</h3><p>Drag across the image to compare two project directions.</p></div><BeforeAfter/></div>
  </div></section>

  <section className="expansion-3d" id="3d-lab"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">11 / 3D LAB</p><h2>A lightweight <span className="gradient-text">developer universe.</span></h2></div><p>WebGL-style visual language without forcing a heavy 3D engine on every device.</p></Reveal><div className="three-lab-grid"><div className="globe-card"><div className="globe-label"><Globe2 size={15}/> INTERACTIVE WIREFRAME GLOBE</div><GlobeCanvas/><div className="orbit-tags"><span>React</span><span>Node</span><span>Java</span><span>AWS</span></div></div><div className="object-stack"><motion.div className="floating-object laptop-object" animate={{y:[0,-14,0],rotateX:[4,10,4],rotateY:[-8,8,-8]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}><Laptop size={34}/><span>FULL STACK</span></motion.div><motion.div className="floating-object phone-object" animate={{y:[0,16,0],rotateZ:[-5,5,-5]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut',delay:.5}}><Smartphone size={28}/><span>RESPONSIVE</span></motion.div><motion.div className="floating-object server-object" animate={{y:[0,-9,0],rotateY:[0,360]}} transition={{duration:10,repeat:Infinity,ease:'linear'}}><Server size={30}/><span>API + CLOUD</span></motion.div><div className="network-lines"><i/><i/><i/><i/></div></div></div><div className="constellation-grid">{['Frontend','Backend','Database','Cloud','DevOps','Realtime','Security','Testing','System Design'].map((x,i)=><motion.div key={x} whileHover={{scale:1.05,y:-5}} style={{'--n':i}}><Zap size={15}/><span>{x}</span><small>{['React · CSS','Node · Spring','Mongo · SQL','AWS · S3','Docker · K8s','Socket.IO','JWT · RBAC','Jest · Postman','APIs · Architecture'][i]}</small></motion.div>)}</div></div></section>

  <section className="expansion-story" id="story"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">12 / SCROLL STORY</p><h2>From problem to <span className="gradient-text">production.</span></h2></div><p>Horizontal project rail + sticky chapters for a recruiter-friendly case-study rhythm.</p></Reveal><div className="horizontal-rail">{projects.map((p,i)=><motion.a key={p.id} href={`/projects/${p.id}`} className="story-card" whileHover={{y:-10,scale:1.01}}><div><span>{p.number} / {p.type}</span><h3>{p.title}</h3><p>{p.description}</p></div><img src={p.image} alt={p.title} loading="lazy"/><small>Problem → Solution → Result ↗</small></motion.a>)}</div></div></section>

  <section className="expansion-interactive" id="interactive"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">13 / INTERACTIVE INDEX</p><h2>Explore by <span className="gradient-text">technology.</span></h2></div><p>Filter, search and jump directly into the relevant project.</p></Reveal><div className="tech-filter-row">{chips.map(x=><button className={filter===x?'active':''} key={x} onClick={()=>{setFilter(x);beep()}}>{x}</button>)}</div><div className="filtered-projects">{filtered.map(p=><motion.a layout key={p.id} href={`/projects/${p.id}`} className="filtered-card"><img src={p.image} alt={p.title} loading="lazy"/><div><span>{p.type}</span><h3>{p.title}</h3><p>{p.metric}</p><div>{p.stack.slice(0,4).map(s=><i key={s}>{s}</i>)}</div></div><ArrowUpRight size={17}/></motion.a>)}</div></div></section>

  <section className="expansion-recruiter" id="recruiter"><div className="container"><div className="recruiter-grid"><Reveal><p className="section-kicker">14 / RECRUITER MODE</p><h2>30 seconds to understand <span className="gradient-text">the fit.</span></h2><p className="large-copy">Pratik Raj is a 2025 BE CSE graduate focused on full-stack product development with MERN, Java/Spring Boot, APIs, databases, cloud and DevOps.</p><div className="recruiter-actions"><a className="btn btn-primary" href="/Pratik_Raj_Resume.pdf" download="Pratik_Raj_Resume.pdf"><Download size={16}/> One-click resume</a><a className="btn btn-secondary" href="https://www.linkedin.com/in/pratik-raj-a112a5342/" target="_blank" rel="noreferrer"><ExternalLink size={16}/> LinkedIn</a><a className="btn btn-secondary" href="https://github.com/pratik-sd-08" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a></div></Reveal><Reveal delay={.1} className="impact-dashboard"><div><span>Preferred role</span><strong>Full Stack Developer</strong></div><div><span>Core stack</span><strong>MERN · Java · Spring Boot</strong></div><div><span>Delivery</span><strong>UI · API · DB · Cloud</strong></div><div><span>Status</span><strong className="live-text"><i/> Open to opportunities</strong></div></Reveal></div><PerformancePanel/></div></section>

  <section className="expansion-media" id="media"><div className="container"><Reveal className="section-head"><div><p className="section-kicker">15 / MEDIA</p><h2>Demo-ready <span className="gradient-text">storytelling.</span></h2></div><p>Video slots, animated previews and Lottie/Rive/WebGL-ready containers can be connected to real assets later.</p></Reveal><div className="media-grid"><div className="media-card video-slot"><div className="play-orb"><Play size={20}/></div><span>PROJECT DEMO VIDEO</span><strong>Add a real walkthrough when available.</strong><small>Fullscreen-ready video container</small></div><div className="media-card architecture-card"><Network size={25}/><span>ARCHITECTURE VISUAL</span><div className="flow"><i>UI</i><b>→</b><i>API</i><b>→</b><i>DB</i><b>→</b><i>Cloud</i></div><small>Client → service → data → deployment</small></div><div className="media-card mock-card"><Monitor size={24}/><span>RESPONSIVE DEVICE SHOWCASE</span><div className="mini-devices"><span/><i/><b/></div></div></div></div></section>

  <section className="expansion-access" id="accessibility"><div className="container"><div className="access-grid"><div><p className="section-kicker">16 / ACCESSIBILITY + RESILIENCE</p><h2>Premium without <span className="gradient-text">locking anyone out.</span></h2><p>Motion reduction, keyboard navigation, offline awareness, high-contrast-friendly surfaces and touch fallbacks are treated as product features.</p></div><div className="access-cards"><div><MousePointer2 size={17}/><strong>Keyboard + pointer</strong><span>Tab, Enter, Escape and visible focus states.</span></div><div><Activity size={17}/><strong>Performance-aware</strong><span>Animation layers are CSS/canvas-first and reduced on constrained devices.</span></div><div><Sparkles size={17}/><strong>Motion safe</strong><span>Respects the browser's reduced-motion preference.</span></div><div><Globe2 size={17}/><strong>Offline aware</strong><span>Shows a live network state and keeps core navigation local.</span></div></div></div></div></section>

  <SmartAssistant/>
  <AnimatePresence>{lightbox>=0&&<Lightbox items={visualShots} index={lightbox} setIndex={setLightbox} onClose={()=>setLightbox(-1)}/>}</AnimatePresence>
 </>;
}

export default PremiumExpansion;
