import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Award, Terminal, Activity, ChevronRight, Cpu, Wifi, Server, BookOpen, Briefcase, GraduationCap, Globe, Mail, Zap, Target } from 'lucide-react';

// --- DATA FROM CV [cite: 22-28, 36-37, 51, 73-88] ---
const eduData = [
  { degree: "Master in IT (Cyber Security)", school: "Nepal Open University", year: "Ongoing" },
  { degree: "Bachelor in Computer Applications (BCA)", school: "Butwal Kalika Campus (TU)", year: "2023" }
];

const expData = [
  { role: "IT Assistant", company: "Butwal Kalika Campus", period: "2022 - Present", desc: "Managing infrastructure for 4000+ users. Multi-vendor wireless specialist." },
  { role: "Network Engineer", company: "Nagarik Cable Link (ISP)", period: "2016 - 2022", desc: "Core Network Operations (BGP, OSPF) and FTTH design." }
];

const myCerts = [
  { name: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", year: "2025", color: "text-blue-400" },
  { name: "NSE 1 – Network Security Associate", issuer: "Fortinet", year: "2021", color: "text-red-500" },
  { name: "Certified Cybersecurity Educator (CCEP)", issuer: "2025", color: "text-purple-400" }
];

const myTrainings = [
  { name: "120Hours RHCSA BootCamp", issuer: "Jiwan Bhattarai (CCIE #60261)", type: "Linux Admin" },
  { name: "CompTIA N+ Training", issuer: "Jiwan Bhattarai", type: "Networking" }
];

const myProjects = [
  { title: "Campus IT Overhaul", desc: "Inter-VLAN routing & ACLs for 4000+ nodes.", icon: <Server size={20} /> },
  { title: "FTTH ISP Deployment", desc: "Lead engineer for GPON architecture for local ISP.", icon: <Globe size={20} /> },
  { title: "Dream International Hotel", desc: "Enterprise network security implementation.", icon: <Shield size={20} /> }
];

export default function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [activeView, setActiveView] = useState('terminal');
  const [showHero, setShowHero] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      if (cmd !== '') setShowHero(false);

      let out = '';
      if (cmd === 'help') {
        out = 'CMDS: [whoami] [edu] [exp] [certs] [training] [projects] [contact] [clear]';
        setActiveView('terminal');
      }
      else if (cmd === 'whoami') {
        out = 'Ganesh Gaha: Network Engineer. Specialist in ISP Core & Campus Infrastructure.';
        setActiveView('terminal');
      }
      else if (cmd === 'edu') {
        out = 'Reading Academic Records...';
        setActiveView('edu');
      }
      else if (cmd === 'exp') {
        out = 'Fetching Work History...';
        setActiveView('exp');
      }
      else if (cmd === 'certs') {
        out = 'Verifying Certifications...';
        setActiveView('certs');
      }
      else if (cmd === 'training') {
        out = 'Accessing Training Logs...';
        setActiveView('training');
      }
      else if (cmd === 'projects') {
        out = 'Mounting Projects...';
        setActiveView('projects');
      }
      else if (cmd === 'contact') {
        out = 'Secure Comms Link Active.';
        setActiveView('contact');
      }
      else if (cmd === 'clear') {
        setHistory([]);
        setActiveView('terminal');
        setShowHero(true);
        setInput('');
        return;
      }
      else if (cmd !== '') {
        out = `ERR: Command '${cmd}' not recognized.`;
        setActiveView('terminal');
      }

      if (cmd !== '') {
        setHistory([...history, { cmd: input, out }]);
      }
      setInput('');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-12 relative overflow-hidden bg-[#050505] selection:bg-emerald-500/20">
      {/* 3D Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `perspective(1000px) rotateX(60deg) translateY(${mousePos.y}px) translateX(${mousePos.x}px) translateZ(-100px)`
        }}
      />

      <header className="relative z-10 flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-500/20 rounded-full border border-emerald-500/50">
            <Cpu className="text-emerald-400" size={24} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">Ganesh.SYS_ARCH</h1>
        </div>
      </header>

      {/* TERMINAL SECTION */}
      <section
        className="max-w-6xl mx-auto glass-3d scanlines p-8 mb-16 relative z-20 h-[450px] flex flex-col justify-between"
        style={{ transform: `perspective(1000px) rotateY(${mousePos.x * 0.1}deg) rotateX(${-mousePos.y * 0.1}deg)` }}
      >
        <div className="overflow-y-auto mb-6 font-mono text-sm flex-1 pr-2" ref={scrollRef}>
          <AnimatePresence>
            {showHero && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-4"
              >
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center p-4 border border-emerald-500/20 rounded-lg bg-emerald-500/5 hover:border-emerald-500/50 transition-all">
                    <Shield className="text-emerald-400 mb-2" size={30} />
                    <span className="text-[10px] text-gray-500 uppercase">Secure_Node</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-blue-500/20 rounded-lg bg-blue-500/5 hover:border-blue-500/50 transition-all">
                    <Activity className="text-blue-400 mb-2" size={30} />
                    <span className="text-[10px] text-gray-500 uppercase">Live_Traffic</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-purple-500/20 rounded-lg bg-purple-500/5 hover:border-purple-500/50 transition-all">
                    <Zap className="text-purple-400 mb-2" size={30} />
                    <span className="text-[10px] text-gray-500 uppercase">Performance</span>
                  </div>
                </div>
                <h2 className="text-4xl font-black text-white tracking-[0.2em] italic uppercase">System Online</h2>
                <p className="text-emerald-500/60 max-w-md text-xs leading-relaxed uppercase tracking-widest">
                  Network Architecture // Cyber Security // ISP Core Operations
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase animate-pulse">
                  <Target size={12} /> Initializing Command Interface... Type 'help' to begin
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showHero && history.map((h, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-2 text-emerald-800">
                <ChevronRight size={14} /> <span className="font-bold">{h.cmd}</span>
              </div>
              <p className="text-emerald-100 ml-6 border-l border-emerald-900/50 pl-4 py-1">{h.out}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-4 bg-black/40 border border-emerald-500/30 rounded-lg focus-within:ring-2 ring-emerald-500/50 transition-all">
          <Terminal size={20} className="text-emerald-400" />
          <input
            className="bg-transparent border-none outline-none text-emerald-400 w-full font-bold placeholder:text-emerald-900 uppercase"
            placeholder="ENTER_NODE_COMMAND_HERE"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
          />
        </div>
      </section>

      {/* DYNAMIC CONTENT AREA */}
      <div className="max-w-6xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          {activeView === 'certs' && <SliderView key="certs" title="Verified Credentials" items={myCerts} variant="badge" />}
          {activeView === 'training' && <SliderView key="training" title="Technical Bootcamps" items={myTrainings} variant="training" />}
          {activeView === 'projects' && <SliderView key="projects" title="Core Infrastructure Projects" items={myProjects} variant="project" />}
          {activeView === 'contact' && <ContactView key="contact" />}
          {(activeView === 'exp' || activeView === 'edu') && <InfoView key="info" activeView={activeView} />}
        </AnimatePresence>
      </div>

      <footer className="fixed bottom-0 left-0 w-full p-4 bg-black/80 backdrop-blur-md border-t border-emerald-500/20 text-[9px] flex justify-between px-10 tracking-[0.3em] font-bold text-emerald-900">
        <div>NODE_STATUS: ONLINE_SECURE</div>
        <div className="animate-pulse">BUTWAL_NP // 2026_V5_STABLE</div>
      </footer>
    </div>
  );
}

// --- SUPPORTING COMPONENTS ---
function SliderView({ title, items, variant }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
      <h2 className="text-xs uppercase tracking-[0.5em] text-gray-500 border-b border-gray-900 pb-2">{title}</h2>
      <div className="flex overflow-hidden group">
        <motion.div className="flex gap-8 py-4" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
          {[...items, ...items].map((item, i) => (
            <div key={i} className="min-w-[320px] p-8 glass-3d border-t-2 border-emerald-500/30 overflow-hidden">
              {variant === 'project' ? (
                <>
                  <div className="text-emerald-400 mb-4">{item.icon}</div>
                  <h3 className="text-white font-black text-xl italic">{item.title}</h3>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed whitespace-normal">{item.desc}</p>
                </>
              ) : (
                <div className="flex flex-col h-full justify-between">
                  <Shield className={`${item.color || 'text-emerald-400'} mb-4`} size={32} />
                  <div className="whitespace-normal">
                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                    <p className="text-emerald-600 text-[10px] uppercase">{item.issuer} | {item.year || item.type}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// function ContactView() {
//   return (
//     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
//       <ContactCard icon={<Mail />} label="EMAIL" val="ganeshgaha@hotmail.com" />
//       <a href="https://linkedin.com/in/ganeshgaha" target="_blank"><ContactCard icon={<Globe />} label="LINKEDIN" val="ganeshgaha" /></a>
//       <ContactCard icon={<Wifi />} label="LOCATION" val="Butwal, Nepal" />
//       <ContactCard icon={<Award />} label="MOBILE" val="+977-9867143432" />
//     </motion.div>
//   );
// }

// 1. Reusable monochrome social button with official SVG paths
const SocialIconLink = ({ href, label, svgPath }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-6 glass-3d flex flex-col items-center justify-center hover:border-emerald-500/50 transition-all group"
  >
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 fill-white group-hover:fill-emerald-400 transition-colors mb-3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={svgPath} />
    </svg>
    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 group-hover:text-white">
      {label}
    </span>
  </a>
);

// 2. The Main Contact View with All Requested Channels
function ContactView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Primary Comms (Email & Phone) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="mailto:ganeshgaha@hotmail.com" className="p-8 glass-3d flex items-center gap-6 group">
          <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-emerald-500/20 transition-all">
            <Mail className="text-white group-hover:text-emerald-400" size={28} />
          </div>
          <div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Primary_Node</p>
            <p className="text-white font-black text-lg tracking-tight">ganeshgaha@hotmail.com</p>
          </div>
        </a>
        <a href="tel:+9779845085669" className="p-8 glass-3d flex items-center gap-6 group">
          <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-emerald-500/20 transition-all">
            <Activity className="text-white group-hover:text-emerald-400" size={28} />
          </div>
          <div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Secure_Voice</p>
            <p className="text-white font-black text-lg tracking-tight">+977 984-5085669</p>
          </div>
        </a>
      </div>

      {/* Official Black & White Social Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* LinkedIn */}
        <SocialIconLink
          href="https://linkedin.com/in/ganeshgaha"
          label="LinkedIn"
          svgPath="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        />
        {/* GitHub */}
        <SocialIconLink
          href="https://github.com/ganeshgaha"
          label="GitHub"
          svgPath="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
        {/* Facebook */}
        <SocialIconLink
          href="https://facebook.com/ganeshgaha"
          label="Facebook"
          svgPath="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
        {/* Instagram */}
        <SocialIconLink
          href="https://instagram.com/ganeshgaha"
          label="Instagram"
          svgPath="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
        {/* YouTube */}
        <SocialIconLink
          href="https://youtube.com/@ganeshgaha"
          label="YouTube"
          svgPath="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </div>
    </motion.div>
  );
}

function ContactCard({ icon, label, val }) {
  return (
    <div className="glass-3d p-6 text-center group cursor-pointer h-full">
      <div className="text-emerald-400 mb-2 group-hover:scale-125 transition-transform">{icon}</div>
      <p className="text-[9px] text-gray-500 mb-1">{label}</p>
      <p className="text-white font-bold text-[10px] truncate">{val}</p>
    </div>
  );
}

function InfoView({ activeView }) {
  const data = activeView === 'exp' ? expData : eduData;
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-8">
      {data.map((item, i) => (
        <div key={i} className="glass-3d p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-50 transition-opacity">
            {activeView === 'exp' ? <Briefcase size={60} /> : <GraduationCap size={60} />}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{item.role || item.degree}</h3>
          <p className="text-emerald-500 text-xs mb-4 font-bold tracking-widest">{item.company || item.school} | {item.period || item.year}</p>
          <p className="text-gray-400 text-sm italic">{item.desc || ""}</p>
        </div>
      ))}
    </motion.div>
  );
}