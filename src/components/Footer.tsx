import { MapPin, Phone, Instagram, Facebook, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-foreground text-background pt-24 pb-12 relative overflow-hidden">
            {/* Background flourish */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">

                {/* Brand & Info */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-serif mb-6 text-primary">Luscious Breads</h2>
                        <p className="text-secondary/80 font-light leading-relaxed max-w-sm mb-8">
                            Artisanal sourdough, brilliant coffee, and the finest pastries nestled in the hills of Mussoorie. A space for connection, community, and spectacular baked goods.
                        </p>

                        <div className="space-y-4">
                            <a href="tel:08791907077" className="cursor-scale flex items-center gap-3 text-secondary/90 hover:text-primary transition-colors group">
                                <span className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center group-hover:border-primary">
                                    <Phone size={18} />
                                </span>
                                <span className="font-medium">+91 87919 07077</span>
                            </a>
                            <div className="flex items-start gap-3 text-secondary/90">
                                <span className="w-10 h-10 shrink-0 rounded-full border border-secondary/20 flex items-center justify-center">
                                    <MapPin size={18} />
                                </span>
                                <span className="font-light mt-2 max-w-[280px]">Luscious Breads, Kharola Tower, Diversion Road, near IMS Unison University, Salan Gaon, Bhagwant Pur, Mussoorie, Dehradun, Uttarakhand 248009</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex gap-4 mt-12">
                        {[Instagram, Facebook, Mail].map((Icon, i) => (
                            <a key={i} href="#" className="cursor-scale w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* CTA & Opening Hours */}
                <div className="lg:col-span-3 lg:col-start-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="p-8 border border-secondary/10 rounded-2xl bg-white/5 backdrop-blur-sm"
                    >
                        <h3 className="font-serif text-2xl mb-6 text-white">Opening Hours</h3>
                        <ul className="space-y-4 text-secondary/70 font-light">
                            <li className="flex justify-between border-b border-secondary/10 pb-2">
                                <span>Mon - Fri</span>
                                <span className="text-white">8:00 AM - 9:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-secondary/10 pb-2">
                                <span>Saturday</span>
                                <span className="text-white">8:00 AM - 10:00 PM</span>
                            </li>
                            <li className="flex justify-between pb-2">
                                <span>Sunday</span>
                                <span className="text-white">9:00 AM - 8:00 PM</span>
                            </li>
                        </ul>

                        <a href="tel:08791907077" className="cursor-scale mt-8 w-full py-4 flex items-center justify-center gap-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-300">
                            <Phone size={18} />
                            Reserve a Table
                        </a>
                    </motion.div>
                </div>

                {/* Google Map */}
                <motion.div
                    className="lg:col-span-4 h-64 lg:h-auto rounded-2xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <iframe
                        src="https://maps.google.com/maps?q=Luscious+Breads+Kharola+Tower+Diversion+Road+Mussoorie&output=embed"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Luscious Breads Mussoorie Location"
                    ></iframe>
                </motion.div>

            </div>

            <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center text-sm text-secondary/50 font-light gap-4">
                <p>&copy; {new Date().getFullYear()} Luscious Breads. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
