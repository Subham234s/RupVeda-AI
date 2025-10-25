
import React, { useState } from 'react';
import { FAQ_DATA } from '../constants';

const FaqItem: React.FC<{ item: { question: string; answer: string; }; isOpen: boolean; onClick: () => void; }> = ({ item, isOpen, onClick }) => (
    <div className="border-b border-slate-300/20 py-4">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left">
            <h3 className="text-lg font-semibold text-text-primary">{item.question}</h3>
            <svg className={`w-6 h-6 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        {isOpen && (
            <p className="mt-4 text-text-secondary animate-fade-in">{item.answer}</p>
        )}
    </div>
);

export const ContactPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    
    const handleFaqClick = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send to a backend.
        // For this example, we'll just show an alert.
        alert('Thank you for your message! We will get back to you soon.');
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
                Get in Touch
            </h1>
            <p className="mt-2 text-lg text-text-secondary max-w-2xl">
                Have questions, feedback, or a brilliant idea? We'd love to hear from you.
            </p>

            <div className="w-full mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
                {/* Contact Form Section */}
                <div className="glassmorphic rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">Send us a Message</h2>
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          required
                          className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
                        />
                         <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                          className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
                        />
                        <textarea
                          name="message"
                          placeholder="Your Message..."
                          rows={5}
                          required
                          className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
                        />
                        <button
                            type="submit"
                            className="w-full mt-2 py-4 px-6 text-xl font-bold text-white bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 hover:shadow-cyan-500/50"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* FAQ and Other Info Section */}
                <div className="flex flex-col gap-8">
                    <div className="glassmorphic rounded-2xl p-8">
                         <h2 className="text-2xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
                         <div>
                            {FAQ_DATA.map((item, index) => (
                                <FaqItem key={index} item={item} isOpen={openFaq === index} onClick={() => handleFaqClick(index)} />
                            ))}
                         </div>
                    </div>
                     <div className="glassmorphic rounded-2xl p-8">
                         <h2 className="text-2xl font-bold text-text-primary mb-4">Other Ways to Connect</h2>
                         <p className="text-text-secondary mb-4">Follow us on social media for updates and inspiration!</p>
                         <div className="flex justify-center gap-6">
                            {/* Placeholder Social Icons */}
                            <a href="#" className="text-text-secondary hover:text-cyan-400 transition-colors" aria-label="Twitter"><svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
                            <a href="#" className="text-text-secondary hover:text-cyan-400 transition-colors" aria-label="Instagram"><svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg></a>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
