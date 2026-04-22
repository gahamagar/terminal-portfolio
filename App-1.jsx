import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Award, Terminal, Activity, ChevronRight, Cpu, Wifi, Globe, Lock, Server } from 'lucide-react';

// DATA ARRAYS - Edit these to your liking
const myCerts = [
  { name: "Cisco CCNA", issuer: "Cisco Systems", color: "text-blue-400" },
  { name: "CompTIA Security+", issuer: "CompTIA", color: "text-emerald-400" },
  { name: "CompTIA Network+", issuer: "CompTIA", color: "text-amber-400" },
  { name: "Ethical Hacker", issuer: "EC-Council", color: "text-red-500" },
];

const projects = [
  { title: "Net-Guard VPN", desc: "Site-to-site IPsec VPN with zero-trust architecture.", icon: <Lock size={20} /> },
  { title: "IDS/IPS Node", desc: "Real-time threat detection system using Snort/Suricata.", icon: <Shield size={20} /> },
  { title: "Cloud Automation", desc: "Automated network provisioning via Terraform.", icon: <Server size={20} /> },
];

export default function GaneshFullStack() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { cmd: 'system_init', out: 'Ganesh.SYS-OPS v1.2.0 Loaded. Type "help" for commands.' }
  ]);
  const [activeView, setActiveView] = useState('terminal'); // terminal, certs, projects
  const [ping, setPing] = useState(24);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setPing(Math.floor(Math.random() * (30 - 18) + 18)), 3000);
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    return () => clearInterval(timer);
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      let out = '';
      const cmd = input.toLowerCase().trim();

      if (cmd === 'help') out = 'AVAILABLE_COMMANDS: [about] [certs] [projects] [skills] [status] [clear]';
      else if (cmd === 'about') out = 'Ganesh | Network & System Engineer | Cybersecurity Enthusiast. Expert in Cisco R&S and secure cloud architecture.';
      else if (cmd === 'certs') { out = 'LOADING_CREDENTIALS... (Slider initialized below)'; setActiveView('certs'); }
      else if (cmd === 'projects') { out = 'FETCHING_PROJECT_DATABASE...'; setActiveView('projects'); }
      else if (cmd === 'skills') out = 'STACK: Cisco IOS, Python (NetDevOps), Wireshark, Linux Admin, Cloudflare, React.';
      else if (cmd === 'status') out = `Uptime: 99.9% | Latency: ${ping}ms | Connection: Secure (AES-256)`;
      else if (cmd === 'clear') { setHistory([]); setActiveView('terminal'); setInput(''); return; }
      else out = `ERR: '${cmd}' is not a recognized internal or external command.`;

      setHistory([...history, { cmd: input, out }]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-12 text-emerald-500 selection:bg-emerald-500/20">

      {/* 1. TOP NAV HUD */}
      <header className="flex justify-between items-center border-b border-emerald-900/30 pb-6 mb-8 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Cpu className="text-emerald-400 animate-pulse" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-white">GANESH_NODE_01</h1>
            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] text-emerald-600 uppercase tracking-widest font-mono">System Live</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono">
          <div className="text-right">
            <p className="text-gray-500">PING</p>
            <p className="text-emerald-400 font-bold">{ping}ms</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">PROTOCOL</p>
            <p className="text-blue-400 font-bold">CCNA_SEC_v3</p>
          </div>
        </div>
      </header>

      {/* 2. TERMINAL CONSOLE */}
      <section className="max-w-5xl mx-auto bg-black/40 border border-emerald-900/20 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
        <div className="h-[300px] overflow-y-auto mb-6 pr-4 space-y-3 font-mono text-sm scrollbar-hide" ref={scrollRef}>
          {history.map((h, i) => (
            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={i}>
              <div className="flex items-center gap-2 text-gray-600">
                <ChevronRight size={14} /> <span>{h.cmd}</span>
              </div>
              <p className="text-emerald-100/90 ml-5 py-1">{h.out}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
          <Terminal size={18} className="text-emerald-400" />
          <input
            className="bg-transparent border-none outline-none text-emerald-400 w-full font-mono placeholder:text-emerald-900"
            placeholder="System waiting for command (try 'help')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
          />
        </div>
      </section>

      {/* 3. DYNAMIC CONTENT INJECTION */}
      <div className="max-w-5xl mx-auto mt-12 space-y-12 pb-20">

        {/* CERTIFICATION SLIDER (Antigravity Mode) */}
        <AnimatePresence>
          {activeView === 'certs' && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-2 mb-6">
                <Award size={18} className="text-gray-500" />
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-gray-500">Verified Credentials</h2>
              </div>
              <div className="flex overflow-hidden group">
                <motion.div
                  className="flex gap-6 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {[...myCerts, ...myCerts].map((cert, i) => (
                    <div key={i} className="min-w-[300px] p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-emerald-500/50 transition-all group/card">
                      <Shield className={`${cert.color} mb-4 group-hover/card:scale-110 transition-transform`} size={32} />
                      <h3 className="text-white text-xl font-bold">{cert.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">{cert.issuer}</p>
                      <div className="h-1 w-12 bg-emerald-500/30 rounded-full" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* PROJECTS GRID */}
          {activeView === 'projects' && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500/5 transition-all cursor-pointer">
                  <div className="text-emerald-400 mb-4">{p.icon}</div>
                  <h3 className="text-white font-bold mb-2 uppercase tracking-tighter">{p.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-mono">{p.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER STATUS BAR */}
      <footer className="fixed bottom-0 left-0 w-full p-4 bg-black/80 backdrop-blur-md border-t border-emerald-900/30 flex justify-between items-center px-8 text-[10px] tracking-widest font-mono text-gray-600">
        <div className="flex gap-6">
          <span className="flex items-center gap-1"><Wifi size={10} /> SOCKET_STABLE</span>
          <span className="flex items-center gap-1"><Globe size={10} /> EDGE_LOCATION: BUTWAL</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-500/50">GITHUB_PUSH: SUCCESS</span>
          <span className="text-blue-500/50">BUILD_READY: 200_OK</span>
        </div>
      </footer>
    </div>
  );
}