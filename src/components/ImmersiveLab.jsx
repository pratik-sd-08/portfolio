import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, BriefcaseBusiness, Camera, ChevronLeft, ChevronRight, Code2, Database, Download, ExternalLink, Github, Layers3, Laptop, Mail, Maximize2, MessageCircle, Mic, Moon, Network, Play, Search, Server, Smartphone, Sparkles, Sun, Terminal, Volume2, VolumeX, Workflow, X, Zap } from 'lucide-react';

const gallery = [
  { title:'Smart Logistics · Dashboard', src:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80' },
  { title:'Cloud Storage · Workspace', src:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80' },
  { title:'Realtime Chat · Interface', src:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80' },
  { title:'Modern Web · Product UI', src:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80' },
];

const techs=['React','Node.js','Spring Boot','MongoDB','Docker','AWS','Kubernetes','Socket.IO'];
const repos=[
  ['Smart Logistics Tracking System','React · Node · MongoDB · Socket.IO','https://github.com/pratik-sd-08'],
  ['Cloud-based Media Storage','React · Node · AWS S3 · MongoDB','https://github.com/pratik-sd-08'],
  ['Realtime Chat Application','React · Node · Socket.IO · MongoDB','https://github.com/pratik-sd-08'],
];

function usePointer(ref){
  useEffect(()=>{const el=ref.current;if(!el)return;const move=e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',`${((e.clientX-r.left)/r.width)*100}%`);el.style.setProperty('--my',`${((e.clientY-r.top)/r.height)*100}%`)};el.addEventListener('pointermove',move,{passive:true});return()=>el.removeEventListener('pointermove',move)},[ref]);
}

function Scene(){
 const ref=useRef(null);usePointer(ref);const [mode,setMode]=useState('laptop');
 const scenes={
  laptop:<div className="lab-laptop"><div className="lab-screen"><div className="lab-browser"><i/><i/><i/><span>pratik.dev</span></div><div className="lab-code"><b>const</b> system = {'{'}<br/> &nbsp; ui: <em>React</em>,<br/> &nbsp; api: <em>SpringBoot</em>,<br/> &nbsp; data: <em>MongoDB</em><br/>{'}'}</div><div className="lab-terminal">$ docker compose up<br/><strong>services ready ✓</strong></div></div><div className="lab-base"/></div>,
  phone:<div className="lab-phone"><div className="lab-phone-screen"><span>09:41</span><div className="phone-orb"/><strong>BUILD<br/>SOMETHING<br/><em>USEFUL.</em></strong><small>React · Node · Java</small></div></div>,
  server:<div className="lab-server"><span/><span/><span/><span/></div>,
  globe:<div className="lab-globe"><div className="globe-lat"/><div className="globe-lon"/>{Array.from({length:10},(_,i)=><i key={i} style={{'--i':i}}/>)}</div>
 };
 return <div ref={ref} className="immersive-scene" onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--rx',`${((e.clientY-r.top)/r.height-.5)*-8}deg`);e.currentTarget.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*10}deg`)}}>
   <div className="scene-light"/><div className="scene-grid"/><div className="scene-particles">{Array.from({length:22},(_,i)=><i key={i} style={{'--i':i}}/>)}</div>
   <div className="scene-object">{scenes[mode]}</div>
   <div className="scene-orbits">{techs.map((t,i)=><span key={t} style={{'--i':i}}>{t}</span>)}</div>
   <div className="scene-controls">{Object.keys(scenes).map(x=><button key={x} className={mode===x?'active':''} onClick={()=>setMode(x)}>{x}</button>)}</div>
   <div className="scene-label"><span>INTERACTIVE 3D ENVIRONMENT</span><b>REAL-TIME LIGHT · DEPTH · ORBIT</b></div>
 </div>
}

function Lightbox({index,setIndex,onClose}){const item=gallery[index];return <div className="lab-lightbox" onMouseDown={onClose}><div className="lab-lightbox-box" onMouseDown={e=>e.stopPropagation()}><button className="lab-close" onClick={onClose}><X/></button><button className="lab-nav prev" onClick={()=>setIndex((index-1+gallery.length)%gallery.length)}><ChevronLeft/></button><img src={item.src} alt={item.title}/><button className="lab-nav next" onClick={()=>setIndex((index+1)%gallery.length)}><ChevronRight/></button><div className="lab-caption"><span>{item.title}</span><small>{index+1} / {gallery.length}</small></div></div></div>}

function ImmersiveLab(){
 const [image,setImage]=useState(null); const [mode,setMode]=useState('recruiter'); const [sound,setSound]=useState(false); const [voice,setVoice]=useState(false); const [faq,setFaq]=useState(null); const [query,setQuery]=useState('');
 const railRef=useRef(null); const {scrollYProgress}=useScroll({target:railRef,offset:['start end','end start']}); const railX=useTransform(scrollYProgress,[0,1],['8%','-28%']);
 const filtered=useMemo(()=>repos.filter(x=>x.join(' ').toLowerCase().includes(query.toLowerCase())),[query]);
 const startVoice=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){setVoice(true);return}const r=new SR();r.lang='en-IN';r.onresult=e=>{setQuery(e.results[0][0].transcript)};r.onend=()=>setVoice(false);setVoice(true);r.start()};
 const speak=txt=>{if('speechSynthesis'in window){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(txt))}};
 return <>
  <section className="immersive-lab-section" id="immersive-lab"><div className="container"><div className="lab-head"><div><p className="section-kicker">10 / IMMERSIVE LAB</p><h2>Explore the <span className="gradient-text">engineering world.</span></h2><p>3D depth, scroll storytelling, project intelligence and recruiter-ready views—added without replacing the existing V9 experience.</p></div><div className="lab-mode"><button className={mode==='recruiter'?'active':''} onClick={()=>setMode('recruiter')}><BriefcaseBusiness size={14}/> Recruiter</button><button className={mode==='developer'?'active':''} onClick={()=>setMode('developer')}><Code2 size={14}/> Developer</button></div></div>
   <Scene/>
   <div className="lab-chapters"><a href="#visuals">01 Visuals</a><a href="#story">02 Story</a><a href="#systems">03 Systems</a><a href="#recruiter">04 Recruiter</a></div>
  </div></section>

  <section className="lab-visuals" id="visuals"><div className="container"><div className="lab-section-title"><span>VISUAL ARCHIVE</span><h3>Projects, screens & <em>systems.</em></h3></div><div className="lab-gallery">{gallery.map((g,i)=><button key={g.title} className="lab-gallery-card" onClick={()=>setImage(i)}><img src={g.src} alt={g.title} loading="lazy"/><span>{g.title}</span><Maximize2 size={15}/></button>)}</div><div className="lab-device-row"><div className="device laptop-device"><div className="device-screen"><img src={gallery[0].src} alt="Laptop project preview" loading="lazy"/></div><div className="device-base"/></div><div className="device phone-device"><div className="device-screen"><img src={gallery[2].src} alt="Phone project preview" loading="lazy"/></div></div><div className="architecture-card"><Network size={22}/><span>DEPLOYMENT ARCHITECTURE</span><strong>Client → API → Services → Database → Cloud</strong><div className="arch-flow"><i>React</i><b>→</b><i>Node / Spring</i><b>→</b><i>MongoDB</i><b>→</b><i>AWS</i></div></div></div></div></section>

  <section className="lab-story" id="story"><div className="container"><div className="lab-section-title"><span>SCROLL STORY</span><h3>From idea to <em>production.</em></h3></div><div ref={railRef} className="story-pin"><motion.div className="story-rail" style={{x:railX}}>{[['01','DISCOVER','Problem, users, constraints'],['02','DESIGN','UI, API contracts, architecture'],['03','BUILD','Components, services, auth, data'],['04','TEST','Edge cases, APIs, reliability'],['05','SHIP','Docker, CI/CD, cloud deployment']].map(([n,t,d],i)=><article key={n} className="story-card"><span>{n}</span><Workflow size={18}/><h4>{t}</h4><p>{d}</p><div className="story-line"/></article>)}</motion.div></div><div className="scroll-story-note"><span>SCROLL →</span><strong>Explore my work as a journey, not a list.</strong></div></div></section>

  <section className="lab-systems" id="systems"><div className="container"><div className="lab-section-title"><span>INTERACTIVE SYSTEMS</span><h3>Technical depth, <em>visually.</em></h3></div><div className="systems-grid"><div className="neural-card"><div className="neural-lines">{Array.from({length:16},(_,i)=><i key={i} style={{'--i':i}}/>)}{Array.from({length:18},(_,i)=><b key={i} style={{'--i':i}}/> )}</div><div className="neural-center"><Zap/><span>DATA FLOW</span></div><h4>Neural-style network visualization</h4><p>Animated nodes represent UI → API → data → cloud relationships.</p></div><div className="skill-constellation"><div className="constellation-core"><Layers3 size={22}/><span>FULL STACK</span></div>{techs.map((t,i)=><span key={t} style={{'--i':i}}>{t}</span>)}</div><div className="system-console"><div className="console-top"><Terminal size={15}/> pratik@dev:~ <span>●</span></div><pre>{`$ git status\nOn branch main\n✓ API healthy\n✓ Database connected\n✓ CI pipeline ready\n✓ Cloud deployment online`}</pre><div className="console-pulse"/></div></div></div></section>

  <section className="lab-recruiter" id="recruiter"><div className="container"><div className="lab-section-title"><span>RECRUITER HUB</span><h3>{mode==='recruiter'?'30 seconds to understand my profile.':'Developer mode: inspect the stack.'}</h3></div><div className="recruiter-grid"><div className="recruiter-summary"><div className="summary-top"><span className="status-dot"/> AVAILABLE</div><h4>Full Stack Developer</h4><p>2025 BE CSE graduate building production-style web applications with React, Node.js, Java/Spring Boot, MongoDB and cloud/DevOps tooling.</p><div className="summary-tags">{['MERN','Java','Spring Boot','Docker','AWS','REST APIs'].map(x=><span key={x}>{x}</span>)}</div><div className="summary-actions"><a className="btn btn-primary" href="/Pratik_Raj_Resume.pdf" download="Pratik_Raj_Resume.pdf"><Download size={15}/> Resume</a><a className="btn btn-secondary" href="https://www.linkedin.com/in/pratik-raj-a112a5342/" target="_blank" rel="noreferrer"><ExternalLink size={15}/> LinkedIn</a></div></div><div className="recruiter-metrics"><div><strong>06+</strong><span>Live projects</span></div><div><strong>20+</strong><span>Technologies</span></div><div><strong>04</strong><span>Certifications</span></div><div><strong>2025</strong><span>Graduate</span></div></div><div className="repo-intel"><div className="repo-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find projects using React…"/><button onClick={startVoice}><Mic size={15}/>{voice?'Listening':'Voice'}</button></div>{filtered.map(([t,d,u])=><a href={u} target="_blank" rel="noreferrer" className="repo-row" key={t}><Github size={16}/><div><strong>{t}</strong><span>{d}</span></div><ArrowUpRight size={15}/></a>)}</div></div></div></section>

  <section className="lab-media"><div className="container media-card"><div><span>MEDIA LAB</span><h3>Sound, video & <em>motion.</em></h3><p>Optional media controls are kept off by default so the portfolio stays recruiter-friendly and respects user preference.</p></div><div className="media-actions"><button onClick={()=>setSound(!sound)}>{sound?<Volume2/>:<VolumeX/>}{sound?'Sound on':'Sound off'}</button><button onClick={()=>speak('Pratik Raj is a Full Stack Developer working with React, Node.js, Java and Spring Boot.') }><MessageCircle/> Text to speech</button><button onClick={()=>setImage(0)}><Play/> Project preview</button></div></div></section>

  <section className="lab-faq"><div className="container"><div className="lab-section-title"><span>SMART FAQ</span><h3>Quick answers, <em>no digging.</em></h3></div>{[['What roles are you targeting?','Full Stack Developer, Frontend Developer, Backend Developer and Java/Spring Boot roles.'],['What is your strongest stack?','MERN is the primary full-stack foundation, with Java/Spring Boot as an expanding backend specialization.'],['Can I download your resume?','Yes. The Resume buttons point to the included Pratik_Raj_Resume.pdf file.'],['Can I inspect your projects?','Yes. Use the project cards, Live Demo/GitHub links and case-study routes already present in V9.']].map(([q,a],i)=><div className="faq-row" key={q}><button onClick={()=>setFaq(faq===i?null:i)}><span>{q}</span><b>{faq===i?'−':'+'}</b></button><AnimatePresence>{faq===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>{a}</motion.p>}</AnimatePresence></div>)}</div></section>
  {image!==null&&<Lightbox index={image} setIndex={setImage} onClose={()=>setImage(null)}/>} 
 </>
}
export default ImmersiveLab;
