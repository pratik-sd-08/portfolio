import { useEffect, useMemo, useState } from 'react';
import { Search, Command, ArrowRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const actions = useMemo(() => [
    ['Go to Work', '#work'], ['Go to About', '#about'], ['Go to Skills', '#stack'], ['Go to Contact', '#contact'],
    ['Open GitHub', 'https://github.com/pratik-sd-08'], ['Open LinkedIn', 'https://www.linkedin.com/in/pratik-raj-a112a5342/'],
    ['Download Resume', '/Pratik_Raj_Resume.pdf'],
  ], []);
  useEffect(() => {
    const key = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(v => !v); }
      if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) { e.preventDefault(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, []);
  const filtered = actions.filter(([label]) => label.toLowerCase().includes(query.toLowerCase()));
  const run = value => {
    setOpen(false); setQuery('');
    if (value.startsWith('#')) { if (location.pathname !== '/') navigate('/'); setTimeout(() => document.querySelector(value)?.scrollIntoView({behavior:'smooth'}), 60); }
    else window.open(value, value.endsWith('.pdf') ? '_blank' : '_blank', 'noopener');
  };
  return <>{open && <div className="command-overlay" onMouseDown={() => setOpen(false)}><div className="command-box" onMouseDown={e => e.stopPropagation()}>
    <div className="command-input"><Search size={17}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search sections, links, resume…"/><kbd>ESC</kbd></div>
    <div className="command-list">{filtered.map(([label,value],i)=><button key={label} onClick={()=>run(value)}><span>{label}</span>{value.endsWith('.pdf')?<Download size={15}/>:<ArrowRight size={15}/>}</button>)}{!filtered.length&&<p>No result. Try Work, Skills, Contact or Resume.</p>}</div>
    <div className="command-footer"><span><Command size={12}/> K</span><span>/ to search</span><span>ESC to close</span></div>
  </div></div>}</>;
}
