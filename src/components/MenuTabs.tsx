import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['Breads', 'Pastries', 'Coffee'];

const MENU_ITEMS = {
    Breads: [
        { name: 'Classic Sourdough', price: '₹450', desc: 'Fermented for 48 hours for a deep, complex flavor.' },
        { name: 'Olive Rosemary Sourdough', price: '₹550', desc: 'Studded with Kalamata olives and fresh rosemary.' },
        { name: 'Rustic Baguette', price: '₹280', desc: 'Crisp crust with an airy, open crumb structure.' },
        { name: 'Multigrain Loaf', price: '₹380', desc: 'Toasted seeds, honey, and whole wheat flour.' },
    ],
    Pastries: [
        { name: 'Butter Croissant', price: '₹220', desc: 'Flaky, buttery, and baked fresh every morning.' },
        { name: 'Almond Croissant', price: '₹280', desc: 'Twice-baked with rich frangipane filling.' },
        { name: 'Pain au Chocolat', price: '₹250', desc: 'Dark couverture chocolate encased in flaky layers.' },
        { name: 'Cinnamon Morning Bun', price: '₹190', desc: 'Spiced sugar, laminated dough, orange zest.' },
    ],
    Coffee: [
        { name: 'House Espresso', price: '₹180', desc: 'Double shot, notes of dark chocolate and berry.' },
        { name: 'Cortado', price: '₹220', desc: 'Equal parts espresso and steamed texture milk.' },
        { name: 'Oat Milk Flat White', price: '₹260', desc: 'Smooth, creamy, roasted by Blue Tokai.' },
        { name: 'Pour Over V60', price: '₹300', desc: 'Single origin Ethiopian, bright and floral.' },
    ],
};

export default function MenuTabs() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <section id="menu" className="py-32 px-4 bg-background relative overflow-hidden">
            {/* Decorative BG element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-16"
                >
                    <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block">Our Offerings</span>
                    <h2 className="text-5xl md:text-6xl font-serif text-foreground">Menu</h2>
                </motion.div>

                {/* Tab Selection */}
                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-8 py-3 rounded-full text-lg transition-colors duration-300 ${activeTab === tab ? 'text-white' : 'text-foreground/70 hover:text-foreground hover:bg-black/5'
                                }`}
                        >
                            <span className="relative z-10">{tab}</span>
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 bg-primary rounded-full z-0"
                                    transition={{ type: 'spring', duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Menu Items List */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, staggerChildren: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
                        >
                            {MENU_ITEMS[activeTab as keyof typeof MENU_ITEMS].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="flex justify-between items-end border-b border-foreground/10 pb-4 mb-3">
                                        <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                        <span className="text-xl text-primary-dark font-medium">{item.price}</span>
                                    </div>
                                    <p className="text-foreground/70 font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
