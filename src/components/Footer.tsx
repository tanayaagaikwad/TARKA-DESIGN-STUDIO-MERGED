import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-[var(--ink)] text-[var(--muted-on-ink)] py-8 px-[var(--gutter)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[12.5px] border-t border-[var(--line-on-ink)] mt-auto z-10 relative">
            <div className="flex items-center gap-3">
                <Logo className="w-9 opacity-90" />
                <span className="opacity-50">© {new Date().getFullYear()} Design Studio</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
                <Link to="/services" className="footer-link hover:text-white transition-colors">Services</Link>
                <Link to="/work" className="footer-link hover:text-white transition-colors">Work</Link>
                <Link to="/clients" className="footer-link hover:text-white transition-colors">Clients</Link>
                <Link to="/team" className="footer-link hover:text-white transition-colors">Team</Link>
                <Link to="/quote" className="footer-link hover:text-white transition-colors">Get a Quote</Link>
                <Link to="/inquiry" className="footer-link hover:text-white transition-colors">Inquiry</Link>
            </div>
        </footer>
    );
}
