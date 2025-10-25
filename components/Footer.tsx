
import React from 'react';

type Page = 'generator' | 'prompt-library' | 'history' | 'contact';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem('email') as HTMLInputElement;
    if (emailInput && emailInput.value) {
      alert(`Thank you for subscribing, ${emailInput.value}!`);
      emailInput.value = '';
    }
  };

  return (
    <footer className="w-full mt-24 border-t border-slate-300/20 text-text-secondary">
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div className="md:col-span-1">
           <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
            RupVeda AI
          </h3>
          <p className="mt-2 text-sm">Craft Your Digital Soul.</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Instagram" className="hover:text-cyan-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
            </a>
            <a href="#" aria-label="X (Twitter)" className="hover:text-cyan-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-text-primary tracking-wider uppercase">Navigate</h4>
          <ul className="mt-4 space-y-2">
            <li><button onClick={() => onNavigate('generator')} className="hover:text-cyan-400 transition-colors text-sm">Generator</button></li>
            <li><button onClick={() => onNavigate('prompt-library')} className="hover:text-cyan-400 transition-colors text-sm">Prompt Library</button></li>
            <li><button onClick={() => onNavigate('history')} className="hover:text-cyan-400 transition-colors text-sm">History</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors text-sm">Contact</button></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-text-primary tracking-wider uppercase">Legal</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-text-primary tracking-wider uppercase">Stay Updated</h4>
          <p className="mt-4 text-sm">Join our newsletter for the latest styles and features.</p>
          <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              name="email"
              placeholder="Your email"
              required
              aria-label="Email for newsletter"
              className="flex-grow p-2 bg-white/5 border border-slate-300/20 rounded-md focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-amber-500/80 to-cyan-500/80 rounded-md shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-300/20 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} RupVeda AI. Powered by <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-400 hover:underline">Google Gemini</a>.
        </p>
      </div>
    </footer>
  );
};
