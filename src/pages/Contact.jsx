import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:rajpratik196@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main className="inner-page contact-page">
      <div className="container">
        <Reveal>
          <p className="section-kicker">CONTACT / LET'S BUILD</p>
          <h1 className="page-title">Let's make something <span className="gradient-text">worth shipping.</span></h1>
          <p className="page-intro">Have a product idea, internship opportunity, freelance project, or full-time role? Send the details. No complicated form maze.</p>
        </Reveal>

        <div className="contact-layout">
          <Reveal className="contact-info">
            <div className="contact-card">
              <Mail/><div><span>Email</span><a href="mailto:rajpratik196@gmail.com">rajpratik196@gmail.com</a></div>
            </div>
            <div className="contact-card">
              <Phone/><div><span>Phone</span><a href="tel:+917633816783">+91 76338 16783</a></div>
            </div>
            <div className="contact-card">
              <MapPin/><div><span>Based in</span><strong>Patna, Bihar, India</strong></div>
            </div>
            <div className="contact-socials">
              <a href="https://github.com/pratik-sd-08" target="_blank" rel="noreferrer"><Github size={19}/></a>
              <a href="https://www.linkedin.com/in/pratik-raj-a112a5342/" target="_blank" rel="noreferrer"><Linkedin size={19}/></a>
            </div>
          </Reveal>

          <Reveal delay={.12}>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-heading">
                <span>01</span><h2>Tell me about it.</h2>
              </div>
              <label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label>
              <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
              <label>Message<textarea required rows="7" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="What are you building?"/></label>
              <button className="btn btn-primary" type="submit">Send enquiry <Send size={16}/></button>
              {sent && <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="form-success"><CheckCircle2 size={17}/> Your email client should open with the enquiry ready to send.</motion.div>}
            </form>
          </Reveal>
        </div>
      </div>
    </main>
  );
}