import { Server, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Server size={18} className="text-white" />
              <span className="text-lg font-medium tracking-tight">BharatNodes</span>
            </div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest leading-loose max-w-xs">
              Pure infrastructure. <br />
              No compromises.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-400">Services</h4>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-600">
                <li><Link to="/#pricing" className="hover:text-white transition-colors">VPS Hosting</Link></li>
                <li><Link to="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/#locations" className="hover:text-white transition-colors">Locations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-400">Company</h4>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-600">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/knowledge-base" className="hover:text-white transition-colors">Knowledge Base</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-400">Legal</h4>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-600">
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/sla" className="hover:text-white transition-colors">SLA</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-zinc-400">Social</h4>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-600">
                <li><a href="https://twitter.com/bharatnodes" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://github.com/bharatnodes" className="hover:text-white transition-colors">Github</a></li>
                <li><a href="https://linkedin.com/company/bharatnodes" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-700">
          <p>© {new Date().getFullYear()} BharatNodes</p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/sla" className="hover:text-white transition-colors">SLA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
