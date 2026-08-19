import { type AnchorHTMLAttributes, type FormEvent, type ReactNode, useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    number: '01',
    type: 'Product design + build',
    name: 'Fieldnotes',
    description: 'A calmer operating system for independent teams to turn conversations into decisions.',
    tags: ['Next.js', 'Postgres', 'Product thinking'],
    art: 'project-art-grid',
    visual: 'browser',
  },
  {
    number: '02',
    type: 'Mobile app',
    name: 'Morrow',
    description: 'A tiny, focused habit companion built around reflection instead of streaks.',
    tags: ['React Native', 'Expo', 'Notifications'],
    art: 'project-art-coral',
    visual: 'phone',
  },
  {
    number: '03',
    type: 'Web platform',
    name: 'Common Ground',
    description: 'A directory and booking experience that made a local creative community easier to find.',
    tags: ['TypeScript', 'Supabase', 'Motion'],
    art: 'project-art-acid',
    visual: 'orbit',
  },
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function AppLink({ href, children, className = '', onClick, ...rest }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return <a href={href} onClick={onClick} className={className} {...rest}>{children}</a>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  useReveal();

  const closeMenu = () => setMenuOpen(false);
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main className="site-shell grain">
      <header className="ink-panel sticky top-0 z-20 border-b border-[#33405c]">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 md:px-10">
          <AppLink href="#" onClick={closeMenu} className="group flex items-center gap-3" data-testid="link-home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8ef67] text-[#182746] transition-transform duration-300 group-hover:rotate-12">
              <span className="display text-lg font-bold">A</span>
            </span>
            <span className="display text-lg font-semibold tracking-tight text-[#f4f0e6]">Aarav Mehta</span>
          </AppLink>
          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-[72px] flex-col gap-6 border-b border-[#33405c] bg-[#182746] px-5 py-7 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`} aria-label="Primary navigation">
            <AppLink href="#work" onClick={closeMenu} className="nav-link" data-testid="link-work">Selected work</AppLink>
            <AppLink href="#approach" onClick={closeMenu} className="nav-link" data-testid="link-approach">Approach</AppLink>
            <AppLink href="#services" onClick={closeMenu} className="nav-link" data-testid="link-services">Capabilities</AppLink>
            <AppLink href="#contact" onClick={closeMenu} className="nav-link" data-testid="link-contact">Contact</AppLink>
          </nav>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => window.print()} className="hidden border border-[#51607c] px-3 py-2 font-mono text-[10px] uppercase tracking-[.08em] text-[#f4f0e6] transition-colors hover:border-[#d8ef67] hover:text-[#d8ef67] md:block" data-testid="button-resume">
              Resume / CV
            </button>
            <button type="button" className="menu-button flex items-center justify-center md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <section className="ink-panel relative overflow-hidden px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="hero-orb" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="mb-16 flex items-center gap-3 reveal">
            <span className="hero-marker" />
            <span className="mono text-[10px] uppercase tracking-[.16em] text-[#d8ef67]">Available for select projects · 2024—25</span>
          </div>
          <div className="max-w-[1050px]">
            <p className="eyebrow mb-5 reveal delay-1">Full-stack web + app developer</p>
            <h1 className="display max-w-[1000px] text-[clamp(3.5rem,10vw,9.4rem)] font-semibold leading-[.88] text-[#f4f0e6] reveal delay-2">
              Good ideas<br /><span className="text-[#d8ef67]">need a way</span><br />to move.
            </h1>
            <div className="mt-12 grid max-w-[800px] grid-cols-1 gap-8 md:grid-cols-[1fr_1.05fr] md:items-end reveal delay-3">
              <p className="max-w-[360px] text-lg leading-7 text-[#c5c8c5] md:text-xl">
                I’m Aarav — a developer who helps thoughtful people turn messy ideas into fast, polished digital products.
              </p>
              <div className="flex flex-wrap gap-3">
                <AppLink href="#contact" className="acid-button" data-testid="link-start-project">
                  Start a conversation <ArrowUpRight size={15} />
                </AppLink>
                <AppLink href="#work" className="outline-button border-[#718097] text-[#f4f0e6]" data-testid="link-see-work">
                  See the work <ArrowDownRight size={15} />
                </AppLink>
              </div>
            </div>
          </div>
          <div className="mt-20 flex items-end justify-between border-t border-[#40506e] pt-5 reveal delay-4">
            <span className="mono text-[10px] uppercase tracking-[.14em] text-[#9ea9b7]">Based in India · working everywhere</span>
            <span className="mono hidden text-[10px] uppercase tracking-[.14em] text-[#9ea9b7] md:block">Scroll to explore <span className="ml-4 text-[#d8ef67]">↓</span></span>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 md:grid-cols-[.8fr_1.5fr] md:gap-24">
          <div className="reveal">
            <p className="eyebrow mb-5">The useful bit</p>
            <p className="mono max-w-[180px] text-xs uppercase leading-5 text-[#53617a]">Less translating.<br />More making.</p>
          </div>
          <div className="reveal delay-1">
            <h2 className="display max-w-[800px] text-4xl font-semibold leading-[1.03] md:text-6xl">
              You bring the rough edges. I bring the <span className="text-[#e7644b]">shape, systems,</span> and steady hands.
            </h2>
            <div className="mt-10 grid max-w-[760px] grid-cols-1 gap-7 text-base leading-7 text-[#53617a] md:grid-cols-2">
              <p>Early-stage founders, small teams, and independent makers rarely need another person who just writes tickets. They need someone who can see the whole thing.</p>
              <p>From the first sketch to the last deploy, I work across product decisions, interface craft, and the unglamorous engineering that keeps it dependable.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="border-y border-[#c9c4b9] bg-[#e9e4d9] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end reveal">
            <div>
              <p className="eyebrow mb-4">A few things I’ve made</p>
              <h2 className="display text-5xl font-semibold leading-none md:text-7xl">Selected work<span className="text-[#e7644b]">.</span></h2>
            </div>
            <p className="max-w-[250px] text-sm leading-6 text-[#53617a]">Different problems, same obsession: make the next step feel obvious.</p>
          </div>
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.15fr_.85fr]">
            {projects.map((project, index) => (
              <article key={project.name} className={`project-card reveal delay-${index + 1} border border-[#b9b5aa] bg-[#f4f0e6] ${index === 0 ? 'lg:row-span-2' : ''}`} data-testid={`card-project-${project.number}`}>
                <div className={`project-art ${project.art} relative ${index === 0 ? 'h-[280px] lg:h-[390px]' : 'h-[240px]'}`}>
                  {project.visual === 'browser' && <div className="browser-window"><div className="browser-top"><span /><span /><span /></div><div className="p-4"><div className="mb-5 h-3 w-2/5 bg-[#182746]" /><div className="grid grid-cols-3 gap-2"><div className="col-span-2 h-20 bg-[#d8ef67]" /><div className="h-20 bg-[#e7644b]" /></div><div className="mt-3 h-3 w-4/5 bg-[#b7c8bd]" /></div></div>}
                  {project.visual === 'phone' && <div className="phone-shape"><div className="p-3 pt-5"><div className="mb-2 h-2 w-2/3 bg-[#182746]" /><div className="h-2 w-1/2 bg-[#b6c7bd]" /></div></div>}
                  {project.visual === 'orbit' && <div className="absolute left-[20%] top-[18%] h-[160px] w-[160px] rounded-full border-[2px] border-[#182746] md:h-[190px] md:w-[190px]"><div className="absolute -right-2 top-1/2 h-4 w-4 rounded-full bg-[#e7644b]" /><div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#182746]" /></div>}
                  <span className="absolute left-5 top-5 mono text-[10px] uppercase tracking-[.12em] text-[#182746]">0{index + 1} / 03</span>
                </div>
                <div className="flex flex-col gap-6 p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="eyebrow mb-3 text-[#e7644b]">{project.type}</p><h3 className="display text-3xl font-semibold">{project.name}</h3></div>
                    <button type="button" aria-label={`View ${project.name} project`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#182746] transition-colors hover:bg-[#182746] hover:text-[#f4f0e6]" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} data-testid={`button-view-project-${project.number}`}><ExternalLink size={15} /></button>
                  </div>
                  <p className="max-w-[480px] text-sm leading-6 text-[#53617a]">{project.description}</p>
                  <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="mono border border-[#c5c0b4] px-2 py-1 text-[10px] uppercase text-[#53617a]">{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-24">
            <div className="reveal"><p className="eyebrow mb-5">How we get there</p><h2 className="display max-w-[320px] text-5xl font-semibold leading-[.95] md:text-6xl">A small loop, done <span className="text-[#e7644b]">well.</span></h2></div>
            <div className="grid grid-cols-1 gap-0 border-t border-[#c9c4b9]">
              {[
                ['01', 'Make it legible', 'We pull the useful signal out of the idea, agree what matters now, and leave the rest on the cutting-room floor.'],
                ['02', 'Make it real', 'A tight prototype becomes a sturdy product. You see progress early, not after a mysterious six-week silence.'],
                ['03', 'Make it last', 'Clean code, measured decisions, and a handover you can actually understand. No black boxes, no drama.'],
              ].map(([number, title, copy], index) => (
                <div key={number} className={`relative grid grid-cols-[70px_1fr] gap-5 border-b border-[#c9c4b9] py-7 reveal delay-${index + 1}`}>
                  <span className="number-stamp text-[#e7644b]">{number}</span>
                  <div><h3 className="display mb-2 text-2xl font-semibold">{title}</h3><p className="max-w-[520px] text-sm leading-6 text-[#53617a]">{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="ink-panel px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-14 grid grid-cols-1 gap-7 md:grid-cols-[1fr_1fr] md:items-end reveal">
            <div><p className="eyebrow mb-5 text-[#d8ef67]">What I can own</p><h2 className="display text-5xl font-semibold leading-[.92] text-[#f4f0e6] md:text-7xl">From first thought<br />to <span className="text-[#d8ef67]">first user.</span></h2></div>
            <p className="max-w-[330px] justify-self-end text-sm leading-6 text-[#bfc4c7]">Bring me in for the full arc or the tricky middle. I’m comfortable starting with a blank page or joining a moving train.</p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#42506b] bg-[#42506b] md:grid-cols-3">
            {[
              { icon: Layers3, title: 'Product shaping', copy: 'Flows, scope, prototypes, and a plan the team can rally around.' },
              { icon: Code2, title: 'Web engineering', copy: 'Fast, accessible interfaces backed by APIs and data that behave.' },
              { icon: Smartphone, title: 'Apps that belong', copy: 'Focused mobile experiences that feel at home in someone’s hand.' },
            ].map(({ icon: Icon, title, copy }, index) => (
              <div key={title} className={`group bg-[#182746] p-7 transition-colors duration-300 hover:bg-[#243555] md:min-h-[270px] reveal delay-${index + 1}`} data-testid={`card-capability-${index + 1}`}>
                <div className="mb-16 flex items-center justify-between"><Icon size={24} strokeWidth={1.4} className="text-[#d8ef67]" /><span className="mono text-[10px] text-[#78869c]">0{index + 1}</span></div>
                <h3 className="display mb-3 text-2xl font-semibold text-[#f4f0e6]">{title}</h3>
                <p className="text-sm leading-6 text-[#bfc4c7]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d8ef67] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-9 md:flex-row md:items-center md:justify-between reveal">
          <div className="flex items-start gap-5"><Sparkles className="mt-1 text-[#e7644b]" size={24} /><p className="display max-w-[760px] text-3xl font-semibold leading-[1.05] md:text-5xl">“The best technical partner is the one who makes the whole room feel more capable.”</p></div>
          <span className="mono shrink-0 text-[10px] uppercase tracking-[.12em] text-[#536124]">A working principle</span>
        </div>
      </section>

      <section id="contact" className="ink-panel px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 md:grid-cols-[1fr_.85fr] md:gap-28">
          <div className="reveal">
            <p className="eyebrow mb-5 text-[#d8ef67]">Have a good mess?</p>
            <h2 className="display max-w-[650px] text-6xl font-semibold leading-[.88] text-[#f4f0e6] md:text-8xl">Let’s give it a <span className="text-[#d8ef67]">shape.</span></h2>
            <p className="mt-8 max-w-[400px] text-base leading-7 text-[#bfc4c7]">Tell me what you’re working on, what’s getting in the way, and what a good outcome looks like. I’ll get back to you within two working days.</p>
            <div className="mt-10 flex flex-col gap-4">
              <AppLink href="mailto:hello@aaravmehta.dev" className="group flex w-fit items-center gap-3 text-[#f4f0e6] transition-colors hover:text-[#d8ef67]" data-testid="link-email"><Mail size={16} /> <span className="border-b border-[#59667e] pb-1 font-mono text-xs">hello@aaravmehta.dev</span> <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></AppLink>
              <AppLink href="https://www.linkedin.com" className="group flex w-fit items-center gap-3 text-[#f4f0e6] transition-colors hover:text-[#d8ef67]" data-testid="link-linkedin"><Linkedin size={16} /> <span className="border-b border-[#59667e] pb-1 font-mono text-xs">LinkedIn / Aarav</span> <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></AppLink>
            </div>
          </div>
          <form onSubmit={submitInquiry} className="reveal delay-1" data-testid="form-inquiry">
            <div className="mb-5"><label htmlFor="name" className="mono text-[10px] uppercase tracking-[.12em] text-[#96a2b1]">Your name</label><input id="name" name="name" required className="contact-input" placeholder="A name I can put on a reply" data-testid="input-name" /></div>
            <div className="mb-5"><label htmlFor="email" className="mono text-[10px] uppercase tracking-[.12em] text-[#96a2b1]">Email address</label><input id="email" name="email" type="email" required className="contact-input" placeholder="you@somewhere.good" data-testid="input-email" /></div>
            <div className="mb-8"><label htmlFor="project" className="mono text-[10px] uppercase tracking-[.12em] text-[#96a2b1]">The short version</label><textarea id="project" name="project" required rows={3} className="contact-input resize-none" placeholder="What are you trying to make?" data-testid="input-project" /></div>
            {sent ? (
              <div className="flex items-center gap-3 border border-[#71833b] bg-[#30402e] px-4 py-4 text-sm text-[#d8ef67]" data-testid="status-inquiry-sent"><Check size={17} /> Message received. I’ll be in touch soon.</div>
            ) : (
              <button type="submit" className="acid-button w-full md:w-auto" data-testid="button-send-inquiry">Send the first note <ArrowUpRight size={15} /></button>
            )}
          </form>
        </div>
      </section>

      <footer className="ink-panel border-t border-[#33405c] px-5 pb-8 pt-7 md:px-10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3"><span className="hero-marker" /><span className="mono text-[10px] uppercase tracking-[.13em] text-[#a8b0b7]">Aarav Mehta · Full-stack developer</span></div>
          <div className="flex items-center gap-5 text-[#a8b0b7]"><AppLink href="https://github.com" className="transition-colors hover:text-[#d8ef67]" data-testid="link-github"><Github size={16} /></AppLink><AppLink href="mailto:hello@aaravmehta.dev" className="transition-colors hover:text-[#d8ef67]" data-testid="link-footer-email"><MessageCircle size={16} /></AppLink><span className="mono text-[10px]">© 2024—25</span></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;