/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Menu, X, Instagram, MessageCircle, MapPin, Phone, Clock, Star, 
  ChevronRight, CheckCircle2, ShieldCheck, Sparkles, User, 
  ArrowRight, Heart, Award, Zap, Microscope, TrendingUp, Calendar, ChevronDown, Quote
} from 'lucide-react';

// --- Types ---
interface Procedure {
  title: string;
  description: string;
  benefits: string[];
  image: string;
  isPopular?: boolean;
}

interface Testimonial {
  name: string;
  photo: string;
  text: string;
  procedure: string;
  stars: number;
}

interface TeamMember {
  name: string;
  specialty: string;
  photo: string;
  bio: string;
}

// --- Components ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-rose to-gold origin-[0%] z-[100]"
      style={{ scaleX }}
    />
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Procedimentos', href: '#procedimentos' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Clínica', href: '#clinica' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gold/10 py-3 shadow-lg shadow-gold/5' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="group flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-[0.2em] text-luxury-black group-hover:text-gold transition-colors duration-500">VIVENCE</span>
          <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-300 relative group ${isScrolled ? 'text-luxury-black/70' : 'text-luxury-black'}`}
            >
              <span className="relative z-10 group-hover:text-gold transition-colors duration-300">{link.name}</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a 
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer" 
            className="hidden sm:inline-flex items-center px-8 py-3 bg-gold text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-luxury-black transition-all duration-500 premium-shadow group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Agendar agora</span>
          </a>
          <button 
            className="lg:hidden p-2 text-luxury-black group"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} className="group-hover:text-gold transition-colors" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-nude-50 lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl font-bold tracking-widest">VIVENCE</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-luxury-black border-b border-luxury-black/5 pb-2"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-luxury-black/10 flex flex-col gap-4">
              <a href="https://wa.me/5500000000000" target="_blank" className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold">
                <MessageCircle size={20} />
                Falar pelo WhatsApp
              </a>
              <p className="text-center text-sm text-luxury-black/50">Vivence Clinic © 2024</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Cinematic Noise Texture Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Soft Background Text - Giant Style */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-serif font-black tracking-tighter whitespace-nowrap select-none text-gray-400"
        >
          VICENCE
        </motion.div>

        {/* Dynamic Light Orbs - Enhanced */}
        <div className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(197,160,89,0.12)_0%,transparent_70%)] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(216,180,180,0.1)_0%,transparent_70%)] rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-[radial-gradient(circle,rgba(197,160,89,0.05)_0%,transparent_60%)] rounded-full blur-[80px]" />
        
        {/* Animated Geometry & Abstract Lines - More Layers */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-gold/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-gold/3 rounded-full opacity-30"
        />
        <motion.div 
          animate={{ rotate: 180 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-gold/2 rounded-full opacity-20"
        />

        {/* Technical Anchor Points (+) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[15%] left-[20%] text-gold text-xl font-light">+</div>
          <div className="absolute top-[35%] right-[25%] text-gold text-xl font-light">+</div>
          <div className="absolute bottom-[20%] left-[40%] text-gold text-xl font-light">+</div>
          <div className="absolute bottom-[40%] right-[15%] text-gold text-xl font-light">+</div>
          
          {/* Coordinates Labels */}
          <div className="absolute top-32 right-32 text-[8px] font-mono tracking-widest text-gold rotate-90 origin-right">LAT 23.5881 / LONG 46.6816</div>
          <div className="absolute bottom-32 left-32 text-[8px] font-mono tracking-widest text-gold -rotate-90 origin-left">VERIFICATION COMPLETED</div>
        </div>

        {/* Diagonal Decorative Lines */}
        <div className="absolute top-0 right-0 w-1/2 h-full py-20 px-10 opacity-10">
          <div className="w-full h-full border-l border-t border-gold rounded-tl-[10rem]" />
        </div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 py-20 px-10 opacity-10">
          <div className="w-full h-full border-r border-b border-gold rounded-br-[10rem]" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.2, 0]
              }}
              transition={{ 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity, 
                delay: i * 2,
                ease: "easeInOut" 
              }}
              className="absolute w-1 h-1 bg-gold rounded-full"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%` 
              }}
            />
          ))}
        </div>

        {/* Vertical Rail Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col items-center gap-24 opacity-30">
          <div className="w-px h-32 bg-linear-to-b from-transparent via-gold to-transparent" />
          <span className="text-[9px] uppercase font-black text-gold tracking-[1.5em] [writing-mode:vertical-lr] rotate-180">Luxury Standard</span>
        </div>

        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col items-center gap-24 opacity-30">
          <span className="text-[9px] uppercase font-black text-gold tracking-[1.5em] [writing-mode:vertical-lr]">Boutique Clinic</span>
          <div className="w-px h-32 bg-linear-to-b from-transparent via-gold to-transparent" />
        </div>

        {/* Subtle Luxury Polka Dots */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#c5a059 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-4 mb-10">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-4 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gold/10 py-3 px-8 rounded-full w-fit"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-black text-gold">Vivence Experience VIP</span>
                </motion.div>
              </div>
              
              <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-serif leading-[0.9] mb-12 text-luxury-black tracking-tight">
                <motion.span 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block"
                >
                  A Arte da
                </motion.span>
                <div className="flex items-baseline gap-2 whitespace-nowrap">
                  <motion.span 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gradient-gold italic font-medium relative"
                  >
                    Perfeição
                    <svg className="absolute -bottom-4 left-0 w-full h-3 text-gold/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 0, 100 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-[#d8b4b4] italic font-light lg:text-[6rem]"
                  >
                    Natural
                  </motion.span>
                </div>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xl md:text-2xl text-luxury-black/40 mb-16 max-w-xl leading-relaxed font-light"
              >
                Onde a <span className="text-luxury-black font-semibold">ciência de ponta</span> encontra a estética artística. Protocolos autorais desenhados para revelar sua essência mais radiante.
              </motion.p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-24">
                <motion.a 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto px-16 py-8 bg-gold text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_30px_60px_-12px_rgba(197,160,89,0.3)] hover:bg-luxury-black transition-all duration-500 flex items-center justify-center gap-5 group overflow-hidden relative"
                >
                  <span className="relative z-10 transition-transform duration-500">Agendar Consulta</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.02, y: -5 }}
                  href="#procedimentos" 
                  className="w-full sm:w-auto px-16 py-8 border border-gold/30 text-luxury-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:border-gold hover:bg-gold/5 transition-all duration-500 flex items-center justify-center backdrop-blur-md bg-white/10 group"
                >
                  Procedimentos
                  <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap items-center gap-x-16 gap-y-10"
              >
                <div className="flex flex-col gap-4 relative pl-10">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold/30" />
                  <div className="flex gap-1.5 text-gold">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" stroke="none" />)}
                  </div>
                  <div>
                    <p className="font-serif italic text-luxury-black text-2xl">"Excelência em cada detalhe"</p>
                    <span className="text-[10px] uppercase font-bold text-luxury-black/30 tracking-[0.4em] mt-2 block">+5.000 avaliações no Google</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -8, zIndex: 10 }}
                        className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-nude-100 shadow-xl"
                      >
                        <img src={`https://i.pravatar.cc/150?u=${i+12}`} alt="Paciente" className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-luxury-black tracking-[0.25em]">Padrão Ouro</p>
                    <p className="text-sm font-medium text-luxury-black/40">Confiança máxima confirmada</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 group">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-60px] border border-gold/10 rounded-full -z-10"
              />
              
              <div className="relative rounded-[5rem] overflow-hidden aspect-[4/5.5] shadow-[0_60px_120px_-20px_rgba(197,160,89,0.2)] border-[15px] border-white backdrop-blur-3xl">
                <motion.img 
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.5 }}
                  referrerPolicy="no-referrer"
                  src="https://i.postimg.cc/G2RG6TKR/hero-1.png" 
                  alt="Vivence Clinic" 
                  className="w-full h-full object-cover grayscale-[0.05] group-hover:scale-105 transition-transform duration-[4000ms]"
                />
                
                <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                  <div className="text-white text-[8px] font-black tracking-widest text-center">
                    BELEZA<br/>REAL<br/>EST. 2017
                  </div>
                </div>

                <div className="absolute bottom-12 left-8 right-8 p-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3.5rem] shadow-2xl">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gold/20 rounded-3xl flex items-center justify-center text-gold border border-gold/20">
                      <Sparkles size={32} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/80 mb-1">Tecnologia 2024</p>
                      <p className="font-serif text-2xl text-white font-medium">Inovação Estética</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -right-16 z-20"
            >
              <div className="bg-white/95 backdrop-blur-xl shadow-2xl px-12 py-10 rounded-[3.5rem] border border-gold/10 flex flex-col items-center">
                <div className="w-16 h-16 bg-gold/10 rounded-3xl flex items-center justify-center text-gold mb-4">
                  <ShieldCheck size={36} />
                </div>
                <p className="text-[9px] uppercase font-black tracking-[0.5em] text-luxury-black/30 mb-1">Certificação</p>
                <p className="font-serif font-black text-2xl text-luxury-black">ISO 9001</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-12 -left-16 z-20"
            >
              <div className="bg-luxury-black shadow-[0_40px_80px_rgba(0,0,0,0.4)] px-12 py-8 rounded-[3.5rem] border border-white/10 flex items-center gap-6 group">
                <div className="flex gap-1 text-gold">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                </div>
                <div className="h-10 w-px bg-white/20" />
                <p className="text-white text-sm font-bold tracking-tight">Elite Patient <br/><span className="text-white/40 text-[9px] font-normal uppercase tracking-[0.2em] mt-1 inline-block">Experience</span></p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { icon: <User size={28} />, value: '+5.000', label: 'Clientes Atendidos' },
    { icon: <TrendingUp size={28} />, value: '98%', label: 'Satisfação' },
    { icon: <Award size={28} />, value: '+12', label: 'Especialistas' },
    { icon: <Calendar size={28} />, value: '7 Anos', label: 'Experiência' },
  ];

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gold/5 rounded-full scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 bg-nude-50 rounded-2xl flex items-center justify-center text-gold border border-gold/10 premium-shadow group-hover:bg-gold group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  {stat.icon}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl md:text-5xl font-serif font-black text-luxury-black tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-gold/60 group-hover:text-gold transition-colors duration-500">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProceduresSection = () => {
  const procedures = [
    { 
      title: 'Limpeza de Pele Deep', 
      description: 'Protocolo revitalizante profundo que remove impurezas e devolve o brilho espelhado que sua pele merece.', 
      benefits: ['Remoção de cravos', 'Controle da oleosidade', 'Pele luminosa'],
      image: 'https://deeplasersp.com.br/wp-content/uploads/2024/06/Limpeza-de-Pele3-scaled.jpg',
      isPopular: true,
      tag: 'Cuidado Essencial'
    },
    { 
      title: 'Harmonização Facial', 
      description: 'A arte de equilibrar traços e realçar a beleza natural através de um mapeamento facial artístico e técnico.', 
      benefits: ['Equilíbrio estético', 'Rejuvenescimento', 'Traços definidos'],
      image: 'https://thiesen.b-cdn.net/wp-content/uploads/2023/07/harmonizacao-facial.jpg',
      tag: 'Exclusivo',
      featured: true
    },
    { 
      title: 'Botox Premium Gold', 
      description: 'Minimização de linhas de expressão com foco em um olhar descansado, elegante e absolutamente natural.', 
      benefits: ['Prevenção de rugas', 'Aplicação segura', 'Efeito natural'],
      image: 'https://leticiasawada.com.br/wp-content/uploads/2023/01/botox-tratamentos-faciais.jpg',
      isPopular: true,
      tag: 'Mais Vendido'
    },
    { 
      title: 'Preenchimento Labial', 
      description: 'Volume, contorno e hidratação labial desenhados para uma boca sofisticada, hidratada e marcante.', 
      benefits: ['Volume sob medida', 'Contorno definido', 'Hidratação profunda'],
      image: 'https://www.lemanth.com.br/img/1627578891.1-foto-N.png',
      tag: 'Best Seller'
    },
    { 
      title: 'Bioestimulador de Colágeno', 
      description: 'Tratamento de alta performance para firmeza profunda e renovação da estrutura dermal de dentro para fora.', 
      benefits: ['Combate flacidez', 'Melhora textural', 'Resultado progressivo'],
      image: 'https://megaclinicesthetic.com.br/wp-content/uploads/2023/03/dermatologia_SBDRJ_blog.png',
      tag: 'Tecnologia'
    },
    { 
      title: 'Peeling de Diamante', 
      description: 'Renovação celular completa e clareamento para uma pele com textura de seda e poros minimizados.', 
      benefits: ['Textura macia', 'Uniformização do tom', 'Ação renovadora'],
      image: 'https://www.dermaclub.com.br/on/demandware.static/-/Sites-dermaclub-br-Library/pt_BR/dw9b42face/peeling-diamante.jpg',
      tag: 'Renovação'
    },
    { 
      title: 'Drenagem Linfática VIP', 
      description: 'Experiência sensorial e terapêutica para eliminação de toxinas e sensação de leveza imediata.', 
      benefits: ['Desintoxicação', 'Redução de medidas', 'Bem-estar'],
      image: 'https://www.sbd.org.br/wp-content/uploads/2022/06/Drenagem-linfatica-e-benefica-para-a-saude-shutterstock-1.webp',
      tag: 'Relax'
    },
    { 
      title: 'Luz Pulsada Ultra', 
      description: 'Tecnologia de ponta para tratamento de manchas, vasos e rejuvenescimento global da face.', 
      benefits: ['Pele uniforme', 'Zero manchas', 'Brilho intenso'],
      image: 'https://magote-images.s3-sa-east-1.amazonaws.com/20190130-01-luz_intensa_pulsada.jpg',
      isPopular: true,
      tag: 'Alta Tecnologia'
    },
    
    { 
      title: 'Microagulhamento', 
      description: 'Indução percutânea de colágeno de alta precisão para tratar cicatrizes e poros dilatados.', 
      benefits: ['Trata cicatrizes', 'Fecha poros', 'Firmeza'],
      image: 'https://tiagosilveira.med.br/wp-content/uploads/2017/01/microagulhamento-com-dermaroller-rj.jpg',
      tag: 'Regeneração'
    },
    { 
      title: 'Clareamento Facial', 
      description: 'Protocolos exclusivos para tratamento de melasmas e hiperqueratoses persistentes.', 
      benefits: ['Uniformidade', 'Luminosidade', 'Segurança'],
      image: 'https://justcosmeticos.com.br/philos/wp-content/uploads/2019/06/peeling-para-clareamento.jpg',
      tag: 'Uniformização'
    },
    
  ];

  return (
    <section id="procedimentos" className="py-32 bg-nude-50 relative overflow-hidden">
      {/* Enhanced Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#c5a059 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-gold/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-rose/5 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] border border-gold/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />
      
      {/* Floating Keywords Content */}
      <div className="absolute top-1/4 right-10 flex flex-col gap-2 items-end opacity-[0.1] hidden xl:flex uppercase tracking-[0.2em] font-black">
        <span className="text-4xl font-serif text-gold">CIÊNCIA</span>
        <div className="w-24 h-px bg-gold" />
      </div>
      <div className="absolute bottom-1/4 left-10 flex flex-col gap-2 items-start opacity-[0.1] hidden xl:flex uppercase tracking-[0.2em] font-black">
        <div className="w-24 h-px bg-gold" />
        <span className="text-4xl font-serif text-gold">ARTE</span>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 text-balance">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-12 h-px bg-gold/30" />
              <span className="text-xs uppercase tracking-[0.5em] font-bold text-gold">Portfolio Vivence</span>
              <span className="w-12 h-px bg-gold/30" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mt-4 mb-8 leading-none tracking-tighter text-luxury-black">
              Tratamentos que <br /> <span className="text-gradient-gold italic">Elevam Seu Padrão</span>
            </h2>
            <p className="text-luxury-black/60 max-w-3xl mx-auto text-lg leading-relaxed">
              Descubra uma curadoria exclusiva de procedimentos estéticos que fundem ciência, arte e as mais avançadas tecnologias mundiais para resultados impecáveis.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {procedures.map((proc: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`group relative bg-linear-to-b from-white to-nude-100/30 rounded-[2.5rem] overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,160,89,0.15)] flex flex-col h-full ${proc.featured ? 'lg:scale-[1.03] border-gold/30' : ''}`}
            >
              {/* Image Area */}
              <div className="h-72 relative overflow-hidden shrink-0">
                <img 
                  referrerPolicy="no-referrer"
                  src={proc.image} 
                  alt={proc.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-luxury-black/90 via-luxury-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="px-5 py-2 bg-white/90 backdrop-blur-md border border-white/30 text-luxury-black text-[9px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                    {proc.tag}
                  </div>
                </div>

                  <div className="absolute top-6 right-6 px-4 py-2 bg-gold/90 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm">
                    Signature
                  </div>

                <div className="absolute bottom-6 left-6 right-6">
                   <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-gold transition-colors leading-tight">{proc.title}</h3>
                   <div className="w-12 h-px bg-gold/60 group-hover:w-full transition-all duration-500" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-sm font-medium text-luxury-black/70 mb-8 leading-relaxed line-clamp-3">
                  {proc.description}
                </p>
                
                <div className="grid grid-cols-1 gap-3 mb-10 mt-auto">
                  {proc.benefits.map((benefit: string, j: number) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-luxury-black/50">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button className="relative w-full py-5 overflow-hidden group/btn bg-transparent border border-gold/20 text-gold rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:border-gold hover:bg-gold/5">
                  <span className="relative z-10 text-[10px] uppercase font-bold tracking-[0.3em]">Solicitar Protocolo</span>
                  <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="mt-24 text-center">
            <div className="inline-flex flex-col md:flex-row items-center gap-6 p-4 md:p-2 md:pr-8 bg-white/60 rounded-[2rem] md:rounded-full border border-gold/10 backdrop-blur-sm premium-shadow">
                <div className="w-14 h-14 bg-luxury-black rounded-full flex items-center justify-center text-gold shadow-lg">
                    <Sparkles size={24} />
                </div>
                <p className="text-sm font-medium text-luxury-black/70">
                    Não sabe qual o melhor para você? <span className="text-luxury-black font-bold">Faça nossa curadoria guiada.</span>
                </p>
                <a href="#contato" className="md:ml-4 px-6 py-3 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold hover:text-white transition-all">Baixar Guia PDF</a>
            </div>
        </div>
      </div>
    </section>
  );
};

const PremiumHighlight = () => {
  return (
    <section className="py-24 bg-luxury-black text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_rgba(197,160,89,0.3)_0%,_transparent_50%)]" />
      </div>
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Exclusividade Vivence</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mt-6 mb-8 leading-tight text-white">
            Tecnologia, segurança e <br /> estética em uma <span className="text-gradient-gold">experiência única</span>.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 text-white">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold border border-white/10">
                <Zap size={24} />
              </div>
              <h4 className="font-serif text-xl">Laser Ultra-rápido</h4>
              <p className="text-sm text-white/50 leading-relaxed">Equipamentos de última geração que garantem menor desconforto e resultados 3x mais rápidos.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold border border-white/10">
                <Microscope size={24} />
              </div>
              <h4 className="font-serif text-xl">Análise Digital</h4>
              <p className="text-sm text-white/50 leading-relaxed">Mapeamento computadorizado da face para planejar cada aplicação com precisão milimétrica.</p>
            </div>
          </div>
          <button className="px-10 py-5 bg-gold text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-luxury-black transition-all duration-300 premium-shadow">
            Conhecer tecnologia
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden aspect-video border border-white/10 premium-shadow">
            <img 
              referrerPolicy="no-referrer"
              src="https://i.postimg.cc/NMyvqL0c/foto-3.png" 
              alt="Tecnologia Clínica" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating decorative elements */}
          <div className="absolute -bottom-6 -right-6 bg-gold/20 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
             <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse text-gold" />
                <span className="text-xs font-bold uppercase tracking-widest">Sistemas Ativos</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BeforeAfterSection = () => {
  const images = [
    { title: 'Harmonização', label: 'Mandíbula e Queixo', before: 'https://i.postimg.cc/jdW8nC2V/antes-harmo.jpg', after: 'https://i.postimg.cc/BQ8hPtb0/depois-harmo.jpg' },
    { title: 'Lábios', label: 'Volume e Contorno', before: 'https://i.postimg.cc/cJnSgrQZ/antes-labil.jpg', after: 'https://i.postimg.cc/439g7mzX/depois-labil.jpg' },
    { title: 'Rinomodelação', label: 'Efeito Natural', before: 'https://i.postimg.cc/Wb3xqdvB/rino-antes.jpg', after: 'https://i.postimg.cc/jdFmHRq7/rino-depois.jpg' },
  ];

  return (
    <section id="resultados" className="py-24 bg-nude-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-rose">Evidências de Sucesso</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4">Resultados que inspiram <span className="text-rose">confiança</span></h2>
          </div>
          <button className="px-8 py-4 border-b-2 border-gold text-gold font-bold uppercase tracking-widest text-xs hover:text-luxury-black transition-colors">
            Ver galeria completa
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2.5rem] premium-shadow"
            >
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1 rounded-2xl overflow-hidden aspect-square">
                  <img src={item.before} alt="Antes" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-[8px] font-bold uppercase">Antes</span>
                </div>
                <div className="relative flex-1 rounded-2xl overflow-hidden aspect-square border-2 border-gold/30">
                  <img src={item.after} alt="Depois" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-gold text-white px-2 py-1 rounded text-[8px] font-bold uppercase">Depois</span>
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold mb-1">{item.title}</h3>
              <p className="text-xs text-luxury-black/50 uppercase tracking-widest mb-4">{item.label}</p>
              <button className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all">
                Quero meu resultado <ChevronRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-12 text-[10px] uppercase font-bold text-luxury-black/30 tracking-widest">
          * Os resultados variam de acordo com as características individuais de cada paciente.
        </p>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section id="clinica" className="py-24 bg-nude-50 relative overflow-hidden">
      {/* Background Decor for Gallery */}
      <div className="absolute top-0 right-10 w-px h-full bg-linear-to-b from-transparent via-gold/10 to-transparent" />
      <div className="absolute bottom-10 left-0 w-1/2 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent" />
      <div className="absolute top-1/2 right-4 translate-y-[-50%] rotate-90 opacity-[0.05] pointer-events-none whitespace-nowrap">
        <span className="text-[12vw] font-serif font-black uppercase tracking-[0.5em] text-gold">BOUTIQUE</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold">Nosso Espaço</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">Uma experiência de <span className="italic">bem-estar</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="col-span-2 row-span-2 rounded-[3rem] overflow-hidden premium-shadow"
          >
            <img 
              referrerPolicy="no-referrer"
              src="https://i.postimg.cc/DZW3kmz3/foto-2.png" 
              alt="Recepção" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="col-span-2 row-span-1 rounded-[3rem] overflow-hidden premium-shadow"
          >
             <img 
              referrerPolicy="no-referrer"
              src="https://i.postimg.cc/mDcWfhgn/foto-1.png" 
              alt="Sala de Atendimento" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="col-span-1 row-span-1 rounded-[3rem] overflow-hidden premium-shadow"
          >
            <img 
              referrerPolicy="no-referrer"
              src="https://i.postimg.cc/NMyvqL0c/foto-3.png" 
              alt="Equipamento" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="col-span-1 row-span-1 rounded-[3rem] overflow-hidden premium-shadow"
          >
            <img 
              referrerPolicy="no-referrer"
              src="https://i.postimg.cc/cHKGy6JZ/foto-4.png" 
              alt="Ambiente" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BenefitsSection = () => {
  const benefits = [
    { title: 'Excelência Curada', desc: 'Protocolos criados sob medida, respeitando a singularidade de cada traço e história.' },
    { title: 'Visão Artística', desc: 'Mapeamento facial que une proporções áureas e técnica cirúrgica de precisão.' },
    { title: 'Naturalidade Absoluta', desc: 'Resultados que preservam sua essência, revelando sua versão mais descansada e jovial.' },
    { title: 'Mãos Especialistas', desc: 'Inovações trazidas diretamente dos maiores congressos de estética de Mônaco e Paris.' },
  ];

  return (
    <section id="sobre" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="mb-8 overflow-hidden">
                 <span className="text-4xl font-serif text-gold/20 font-black group-hover:text-gold transition-colors duration-500">0{i+1}</span>
                 <div className="w-12 h-0.5 bg-gold/30 mt-2 group-hover:w-full transition-all duration-700" />
              </div>
              <h4 className="font-serif text-2xl font-black text-luxury-black mb-4">{b.title}</h4>
              <p className="text-sm text-luxury-black/40 leading-relaxed font-light">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    { name: 'Mariana Silva', procedure: 'Harmonização Facial', stars: 5, text: 'O atendimento da Vivence Clinic é impecável. Fiz minha harmonização e o resultado ficou super natural, exatamente como eu queria. As pessoas notam que estou mais bonita mas não sabem o que fiz!', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop' },
    { name: 'Carolina Costa', procedure: 'Bioestimulador', stars: 5, text: 'Melhor clínica que já frequentei. A tecnologia deles é de outro mundo, praticamente não senti dor no procedimento. Super recomendo para quem busca o melhor.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop' },
    { name: 'Juliana Paes', procedure: 'Protocolo Glow', stars: 5, text: 'Minha pele mudou completamente após o Skincare guiado por elas. O ambiente é tão relaxante que a gente nem quer sair de lá. Nota 10 em tudo.', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop' },
  ];

  return (
    <section id="depoimentos" className="py-32 bg-nude-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif font-black text-gold/5 select-none pointer-events-none">NOBLE</div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase font-black tracking-[0.5em] text-gold mb-6 block"
          >
            Social Club
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif text-luxury-black mb-8 leading-tight">Vozes Da <br/><span className="text-gradient-gold italic">Experiência Vivence</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 rounded-[4rem] premium-shadow border border-white hover:border-gold/20 transition-all duration-700 relative group"
            >
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-30 transition-opacity">
                <Quote size={80} className="text-gold" />
              </div>
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/20">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                   <h4 className="font-serif font-black text-xl text-luxury-black">{t.name}</h4>
                   <p className="text-[10px] uppercase font-black text-gold tracking-widest">{t.procedure}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-8">
                 {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} fill="#C5A059" color="#C5A059" />)}
              </div>

              <p className="text-lg text-luxury-black/60 font-light italic leading-relaxed">
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const team: TeamMember[] = [
    { name: 'Dra. Beatriz Fontana', specialty: 'Fundadora & Dermatologia', photo: 'https://i.postimg.cc/MpHjpjpp/profissional-1.jpg', bio: 'Pioneira em técnicas de harmonização preservativa com mais de 10 anos de experiência internacional.' },
    { name: 'Dra. Helena Vaz', specialty: 'Especialista em Injetáveis', photo: 'https://i.postimg.cc/Qt8Djcjz/profissional-2.jpg', bio: 'Especialista em bioestimuladores e fios de sustentação avançados pela escola francesa de estética.' },
    { name: 'Dra. Clara Mendes', specialty: 'Cirurgiã Estética', photo: 'https://i.postimg.cc/kgy9zjm4/profissional-5.jpg', bio: 'Focada em estética orofacial e procedimentos de alta precisão para rejuvenescimento natural.' },
  ];

  return (
    <section id="equipe" className="py-32 bg-white relative overflow-hidden">
      {/* Cinematic Noise Texture Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Editorial Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-nude-50/50 -z-10" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-serif font-black text-gold/5 select-none pointer-events-none">EXPERT</div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 mb-24 items-end">
          <div className="flex-1">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-3 mb-6"
             >
               <div className="w-12 h-px bg-gold" />
               <span className="text-[10px] uppercase font-black tracking-[0.5em] text-gold">Nosso Time</span>
             </motion.div>
             <h2 className="text-5xl md:text-7xl font-serif text-luxury-black mb-0">Mãos que Dominam <br/><span className="italic text-gradient-gold">A Excelência</span></h2>
          </div>
          <div className="max-w-md">
             <p className="text-lg text-luxury-black/40 font-light leading-relaxed">
               Uma equipe multidisciplinar de alto nível, dedicada a transformar sua experiência estética em um momento de pura arte e segurança.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {team.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="relative mb-10">
                {/* Photo Frame Container */}
                <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl premium-shadow group-hover:translate-y-[-10px] transition-transform duration-700">
                  <img 
                    referrerPolicy="no-referrer"
                    src={m.photo} 
                    alt={m.name} 
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 scale-[1.05] group-hover:scale-100" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-luxury-black/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Doctor Label */}
                  <div className="absolute bottom-10 left-10 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                     <span className="text-[8px] uppercase font-black text-white/70 tracking-[0.3em]">Credenciada</span>
                     <p className="text-white text-xs font-bold mt-1">SBD / SBCP</p>
                  </div>
                </div>
                
                {/* Ornamental Element behind photo */}
                <div className="absolute -inset-4 border border-gold/10 rounded-[4.5rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="px-4">
                <span className="text-[10px] uppercase font-black text-gold tracking-[0.4em] mb-3 block">{m.specialty}</span>
                <h4 className="text-3xl font-serif font-black text-luxury-black mb-4 group-hover:text-gold transition-colors">{m.name}</h4>
                <p className="text-sm text-luxury-black/40 font-light leading-relaxed mb-8">{m.bio}</p>
                <button className="flex items-center gap-4 group/btn">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover/btn:bg-gold group-hover/btn:text-white transition-all">
                    <ArrowRight size={18} />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-luxury-black">Ver Especialidades</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConversionSection = () => {
  return (
    <section className="py-32 bg-nude-50 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Large Decorative Orbits */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-gold/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-gold/3 rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          {/* Animated Border Gradient */}
          <div className="absolute -inset-1 bg-linear-to-r from-gold/30 via-rose/30 to-gold/30 rounded-[4rem] blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative bg-white/80 backdrop-blur-2xl rounded-[3.8rem] p-12 md:p-24 shadow-[0_40px_100px_-20px_rgba(197,160,89,0.15)] border border-white overflow-hidden">
             {/* Decorative Corner Element */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-gold/5 to-transparent rounded-bl-full pointer-events-none" />
             
             <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block py-2 px-6 bg-rose/5 border border-rose/10 text-rose text-[10px] font-black uppercase tracking-[0.5em] rounded-full mb-8">
                    Oferta Exclusiva Limitada
                  </span>
                </motion.div>

                <h2 className="text-5xl md:text-7xl font-serif mb-10 text-luxury-black leading-[1.1] tracking-tight">
                  Agende sua avaliação <br />
                  <span className="text-gradient-gold italic font-medium relative block mt-2">
                    estética personalizada
                    <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-2 text-gold/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </h2>

                <p className="text-xl text-luxury-black/50 mb-14 max-w-2xl font-light leading-relaxed">
                  Descubra o protocolo ideal para o seu rosto e corpo através de uma análise minuciosa. Nossas vagas para consultoria estética inicial são <span className="text-luxury-black font-medium">extremamente limitadas</span> para garantir seu conforto e privacidade.
                </p>
                
                <div className="flex flex-col items-center gap-8">
                  <motion.a 
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://wa.me/5500000000000" 
                    target="_blank"
                    className="relative group/btn"
                  >
                    <div className="absolute -inset-4 bg-[#25D366]/20 blur-xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <div className="relative px-16 py-8 bg-linear-to-r from-[#25D366] to-[#128C7E] text-white text-lg font-black uppercase tracking-[0.3em] rounded-full premium-shadow flex items-center gap-5 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                      <MessageCircle fill="white" size={28} className="relative z-10" />
                      <span className="relative z-10">Agendar via WhatsApp</span>
                      <ArrowRight size={22} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                    </div>
                  </motion.a>

                  <div className="flex items-center gap-4 py-3 px-8 bg-nude-50 rounded-full border border-gold/5">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-luxury-black/60">
                      Apenas <span className="text-red-500">4 vagas</span> disponíveis para os próximos 7 dias
                    </span>
                  </div>
                </div>
             </div>

             {/* Footer Decoration */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-20 hidden md:flex">
                <CheckCircle2 size={12} className="text-gold" />
                <span className="text-[8px] uppercase tracking-[0.4em] font-black">Padrão Vivence de Excelência</span>
                <CheckCircle2 size={12} className="text-gold" />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: 'Os procedimentos são seguros?', a: 'Sim. Na Vivence Clinic, todos os nossos protocolos seguem normas internacionais de segurança, utilizando exclusivamente materiais de procedência premium e tecnologias de última geração aprovadas pelos órgãos reguladores.' },
    { q: 'Preciso fazer avaliação antes de qualquer procedimento?', a: 'Com certeza. Valorizamos a individualidade de cada face e corpo. A consultoria estética inicial é o pilar onde mapeamos suas necessidades e desenhamos um plano de tratamento exclusivo para seus objetivos.' },
    { q: 'Em quanto tempo vejo resultado?', a: 'O tempo de resposta varia conforme o protocolo. Procedimentos como preenchimentos e toxina botulínica apresentam resultados em poucos dias. Tratamentos regenerativos como bioestimuladores atingem seu pico de colágeno entre 30 a 90 dias.' },
    { q: 'Os resultados são naturais?', a: 'Esta é a nossa assinatura. Trabalhamos com "Estética Preservativa", um conceito onde o foco é realçar seus melhores traços e suavizar imperfeições sem alterar sua identidade ou expressões naturais.' },
    { q: 'Quais as formas de pagamento?', a: 'Oferecemos total flexibilidade. Aceitamos cartões de crédito em até 12x, PIX com condições especiais e planos de parcelamento personalizado para protocolos de longa duração.' },
    { q: 'A clínica atende por agendamento?', a: 'Sim, visando garantir sua total privacidade, conforto e um atendimento sem pressas, trabalhamos exclusivamente com horários agendados de forma personalizada.' },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 bg-nude-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-serif font-black text-gold/3 select-none pointer-events-none whitespace-nowrap">CURATED</div>
      
      {/* Technical rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-gold/10 rounded-full opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-px bg-gold/40" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">FAQ & Suporte</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif mt-4 mb-8 leading-[1.1] text-luxury-black">
                Esclareça suas <br />
                <span className="text-gradient-gold italic">principais dúvidas</span>
              </h2>
              <p className="text-luxury-black/50 text-lg mb-12 max-w-md leading-relaxed font-light">
                Transparência e segurança são nossos pilares. Se sua dúvida não estiver aqui, nosso concierge está pronto para seu contato.
              </p>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 bg-white rounded-[3rem] premium-shadow border border-gold/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <MessageCircle size={80} className="text-gold" />
                </div>
                <h4 className="font-serif text-2xl font-bold mb-4 relative z-10">Ainda com dúvidas?</h4>
                <p className="text-sm text-luxury-black/50 mb-8 relative z-10">Fale diretamente com uma de nossas especialistas agora mesmo via WhatsApp.</p>
                <a 
                  href="https://wa.me/5500000000000" 
                  target="_blank"
                  className="inline-flex items-center gap-3 text-gold text-xs font-black uppercase tracking-[0.3em] group/link"
                >
                  Consultar Especialista 
                  <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7 space-y-5">
             {faqs.map((faq, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${openIdx === i ? 'bg-white border-gold/30 shadow-[0_20px_40px_rgba(197,160,89,0.1)]' : 'bg-white/40 border-gold/5 hover:border-gold/20'}`}
               >
                  <button 
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full p-8 text-left flex justify-between items-center group"
                  >
                    <span className={`font-serif font-bold text-xl transition-colors duration-300 ${openIdx === i ? 'text-luxury-black' : 'text-luxury-black/70 group-hover:text-gold'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openIdx === i ? 'bg-gold text-white rotate-180' : 'bg-gold/10 text-gold group-hover:bg-gold/20'}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-8 pt-2 text-sm text-luxury-black/60 leading-relaxed font-light border-t border-gold/5 mx-8 mt-[-8px]">
                          <div className="pt-6">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section id="contato" className="py-24 bg-nude-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#c5a059 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] border border-gold/5 rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white rounded-[4rem] overflow-hidden premium-shadow border border-gold/10 flex flex-col lg:flex-row">
           <div className="flex-1 p-12 md:p-20">
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold mb-6 block">Venha nos visitar</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-12">Onde a <span className="italic">beleza</span> acontece</h2>
              
              <div className="space-y-10">
                 <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-nude-100 rounded-2xl flex items-center justify-center text-gold shrink-0">
                       <MapPin size={24} />
                    </div>
                    <div>
                       <p className="font-serif text-xl font-bold mb-1">Endereço</p>
                       <p className="text-luxury-black/60 text-sm">Av. Brigadeiro Faria Lima, 4500 <br /> Itaim Bibi, São Paulo - SP</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-nude-100 rounded-2xl flex items-center justify-center text-gold shrink-0">
                       <Clock size={24} />
                    </div>
                    <div>
                       <p className="font-serif text-xl font-bold mb-1">Horário de Atendimento</p>
                       <p className="text-luxury-black/60 text-sm">Segunda a Sexta: 08h às 20h <br /> Sábados: 09h às 14h</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-nude-100 rounded-2xl flex items-center justify-center text-gold shrink-0">
                       <Phone size={24} />
                    </div>
                    <div>
                       <p className="font-serif text-xl font-bold mb-1">Telefone / WhatsApp</p>
                       <p className="text-luxury-black/60 text-sm">+55 (11) 98888-7777</p>
                    </div>
                 </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                 <a href="https://maps.google.com" target="_blank" className="flex-1 py-4 bg-luxury-black text-white text-xs font-bold uppercase tracking-widest text-center rounded-xl hover:bg-gold transition-colors">Como chegar</a>
                 <a href="https://instagram.com" target="_blank" className="flex items-center justify-center w-full sm:w-14 h-14 bg-nude-100 text-gold rounded-xl hover:bg-gold hover:text-white transition-colors">
                    <Instagram size={24} />
                 </a>
              </div>
           </div>
           <div className="lg:w-[45%] h-[550px] lg:h-auto bg-nude-200 relative group overflow-hidden">
              <img 
                referrerPolicy="no-referrer"
                src="https://i.postimg.cc/pdD0q7bg/localizacao-ilustrativa.png" 
                alt="Localização Vivence" 
                className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-7000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-luxury-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gold/40 animate-ping opacity-30 scale-150" />
                    <div className="relative p-10 bg-white/95 backdrop-blur-md rounded-[3rem] shadow-2xl flex flex-col items-center border border-gold/20">
                       <div className="w-20 h-20 bg-gold/10 rounded-[1.5rem] flex items-center justify-center text-gold mb-4 border border-gold/10">
                          <MapPin size={40} />
                       </div>
                       <span className="font-serif font-black text-2xl text-luxury-black">Vivence Clinic</span>
                       <span className="text-[11px] uppercase tracking-[0.4em] font-black text-gold mt-3">Unidade Jardins</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
             <div className="flex items-center gap-2 mb-8">
                <span className="font-serif text-3xl font-bold tracking-widest">VIVENCE</span>
                <div className="w-2 h-2 rounded-full bg-gold" />
             </div>
             <p className="text-white/50 text-sm leading-relaxed mb-8">
                Uma clínica concebida para unir a mais alta tecnologia médica ao luxo e personalização que você merece. Sua beleza, nossa ciência.
             </p>
             <div className="flex gap-4">
                {[Instagram, MessageCircle, Heart].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all">
                     <Icon size={18} />
                  </a>
                ))}
             </div>
          </div>

          <div>
             <h5 className="font-serif text-xl font-bold mb-8">Links Rápidos</h5>
             <ul className="space-y-4 text-sm text-white/50">
                {['Início', 'Procedimentos', 'Resultados', 'Nossa Clínica', 'Dúvidas'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-gold transition-colors">{item}</a></li>
                ))}
             </ul>
          </div>

          <div>
             <h5 className="font-serif text-xl font-bold mb-8">Procedimentos</h5>
             <ul className="space-y-4 text-sm text-white/50">
                {['Harmonização Facial', 'Botox Premium', 'Bioestimuladores', 'Lasers de Alta Linha', 'Peelings'].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-gold transition-colors">{item}</a></li>
                ))}
             </ul>
          </div>

          <div>
             <h5 className="font-serif text-xl font-bold mb-8">Contato</h5>
             <ul className="space-y-6 text-sm text-white/50">
                <li className="flex items-start gap-3">
                   <MapPin size={18} className="text-gold shrink-0" />
                   <span>Av. Faria Lima, 4500 - Itaim Bibi, São Paulo - SP</span>
                </li>
                <li className="flex items-center gap-3">
                   <Phone size={18} className="text-gold shrink-0" />
                   <span>+55 (11) 98888-7777</span>
                </li>
                <li className="flex items-center gap-3">
                   <Clock size={18} className="text-gold shrink-0" />
                   <span>Seg-Sex: 08h - 20h | Sáb: 09h - 14h</span>
                </li>
             </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">
              © 2024 Vivence Clinic - Estética de Luxo. Todos os direitos reservados.
           </p>
           <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-white/30">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

// --- App Root ---

export default function App() {
  return (
    <div className="bg-nude-50">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <ProceduresSection />
        <PremiumHighlight />
        <BeforeAfterSection />
        <ExperienceSection />
        <BenefitsSection />
        <TestimonialsSection />
        <TeamSection />
        <ConversionSection />
        <FAQSection />
        <LocationSection />
      </main>
      <Footer />
      
      

      {/* Floating WhatsApp Bubble */}
      <a 
        href="https://wa.me/5500000000000" 
        target="_blank"
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center premium-shadow hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle size={32} fill="white" />
      </a>
    </div>
  );
}
