import { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';

const replies = {
  skills: 'Pratik works across React, JavaScript, Node.js, Express, MongoDB, Java, Spring Boot, Docker, Kubernetes, AWS and CI/CD.',
  projects: 'The portfolio highlights Smart Logistics, Cloud Media Storage, Grilli Restaurant, Cling InfoTech, Foodie and Weather Forecast.',
  contact: 'You can reach Pratik at rajpratik196@gmail.com or through LinkedIn from the Contact section.',
  resume: 'Use the Resume button in the navbar or hero to download the PDF directly.',
};
function answer(q){ const s=q.toLowerCase(); if(s.includes('skill')||s.includes('tech')) return replies.skills; if(s.includes('project')||s.includes('work')) return replies.projects; if(s.includes('contact')||s.includes('email')) return replies.contact; if(s.includes('resume')) return replies.resume; return 'Ask me about Pratik’s skills, projects, resume, or contact details.'; }
export default function AIChatbot(){
 const [open,setOpen]=useState(false),[input,setInput]=useState(''),[messages,setMessages]=useState([{from:'bot',text:'Hi! I’m Pratik’s portfolio assistant. Ask about skills, projects, resume or contact.'}]);
 const send=()=>{if(!input.trim())return;const q=input.trim();setMessages(m=>[...m,{from:'user',text:q},{from:'bot',text:answer(q)}]);setInput('')};
 return <><button className="ai-fab" data-cursor onClick={()=>setOpen(v=>!v)} aria-label="Open portfolio assistant">{open?<X size={19}/>:<Bot size={20}/>}<span>AI</span></button>{open&&<div className="ai-panel"><div className="ai-head"><div><strong>Portfolio Assistant</strong><small><span/> Online</small></div><Sparkles size={17}/></div><div className="ai-messages">{messages.map((m,i)=><div key={i} className={`ai-msg ${m.from}`}>{m.text}</div>)}</div><div className="ai-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask something…"/><button onClick={send}><Send size={15}/></button></div></div>}</>;
}
