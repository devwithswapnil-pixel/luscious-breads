import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
    { title: "Luscious Breads", description: "Where every bite tells a story.", media: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920" },
    { title: "The Beverage Co.", description: "Today's good mood is sponsored by coffee.", media: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920" },
    { title: "Artisan Breads", description: "Crafted fresh every morning in the hills.", media: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920" },
    { title: "Alfresco Dining", description: "Dine under open skies with mountain views.", media: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1920" },
    { title: "Golden Hour", description: "Come for the coffee. Stay for the feeling.", media: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920" },
    { title: "Reserve a Table", description: "Open 10 AM onwards · Mussoorie, Dehradun", media: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1920" }
];

function splitTitle(title: string) {
    const parts = title.split(' ');
    if (parts.length > 1) {
        const lastWord = parts.pop();
        return { firstPart: parts.join(' '), lastWord };
    }
    return { firstPart: title, lastWord: null };
}

export default function HeroOverview() {
    const container = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        gsap.to('.hero-text-parallax', {
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
            y: 200,
            ease: 'none',
        });
    }, []);

    // GSAP Slider Effect Setup
    useEffect(() => {
        let currentIndex = 0;
        let transitionTimer: ReturnType<typeof setTimeout>;
        let tl: gsap.core.Timeline;

        const transitionSlide = () => {
            const nextIndex = (currentIndex + 1) % SLIDES.length;

            setActiveIndex(nextIndex);

            tl = gsap.timeline({
                onComplete: () => {
                    currentIndex = nextIndex;
                    transitionTimer = setTimeout(transitionSlide, 5000);
                }
            });

            const currentImg = container.current?.querySelector(`.slide-bg-${currentIndex}`);
            const nextImg = container.current?.querySelector(`.slide-bg-${nextIndex}`);
            const bloom = container.current?.querySelector('.bloom-overlay');

            if (!currentImg || !nextImg || !bloom) {
                transitionTimer = setTimeout(transitionSlide, 5000);
                return;
            }

            gsap.set(nextImg, { opacity: 0, zIndex: 1 });
            gsap.set(currentImg, { zIndex: 0 });

            // 1. Crossfade
            tl.to(nextImg, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.inOut"
            }, 0);

            // 2. Warm Color Bloom
            gsap.set(bloom, { scale: 0, opacity: 0 });
            tl.to(bloom, {
                scale: 1.2,
                opacity: 1,
                duration: 0.75,
                ease: "power2.in"
            }, 0)
                .to(bloom, {
                    opacity: 0,
                    duration: 0.75,
                    ease: "power2.out"
                }, 0.75);

            tl.set(currentImg, { opacity: 0 }, 1.5);
        };

        // Start slider
        transitionTimer = setTimeout(transitionSlide, 5000);

        return () => {
            clearTimeout(transitionTimer);
            if (tl) tl.kill();
        };
    }, []);

    const activeSlide = SLIDES[activeIndex];
    const { firstPart, lastWord } = splitTitle(activeSlide.title);

    return (
        <div ref={container} className="relative h-screen w-full overflow-hidden bg-foreground">
            {/* Fallback Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920")' }}
            />

            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                {SLIDES.map((slide, i) => (
                    <div
                        key={i}
                        className={`slide-bg-${i} absolute top-0 left-0 w-full h-full bg-cover bg-center`}
                        style={{
                            backgroundImage: `url("${slide.media}")`,
                            opacity: i === 0 ? 1 : 0,
                            zIndex: i === 0 ? 1 : 0
                        }}
                    />
                ))}

                {/* Bloom Overlay */}
                <div
                    className="bloom-overlay absolute inset-0 z-[5] pointer-events-none origin-center mix-blend-screen"
                    style={{
                        background: 'radial-gradient(circle, rgba(212,168,67,0.3) 0%, rgba(212,168,67,0) 70%)',
                        opacity: 0,
                        transform: 'scale(0)'
                    }}
                />

                {/* Specific Warm Dark Overlay Requested */}
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundColor: 'rgba(44, 26, 14, 0.45)' }} />
            </motion.div>

            <div className="relative flex flex-col items-center justify-center h-full text-white px-4 z-[2]">
                <div className="text-center flex flex-col items-center justify-center gap-4">
                    <span className="text-secondary tracking-[0.3em] uppercase text-sm font-medium mb-2 block">Est. 2010 • Mussoorie</span>

                    <div className="flex items-center justify-center w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <h1 className="hero-text-parallax text-6xl md:text-8xl lg:text-9xl font-bold font-serif tracking-tight">
                                    {firstPart}
                                    {lastWord && (
                                        <>
                                            <br />
                                            <span className="italic text-primary">{lastWord}</span>
                                        </>
                                    )}
                                </h1>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-center w-full mt-6 mb-8">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={activeIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                transition={{ duration: 0.6 }}
                                className="text-lg md:text-xl max-w-lg mx-auto font-light text-gray-200"
                            >
                                {activeSlide.description}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button
                            className="cursor-scale group relative px-8 py-4 bg-primary text-white overflow-hidden rounded-full font-medium tracking-wide transition-colors"
                            onClick={() => {
                                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Menu
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-primary-dark scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></div>
                        </button>

                        <button
                            className="cursor-scale group relative px-8 py-4 bg-transparent border border-white/50 text-white overflow-hidden rounded-full font-medium tracking-wide transition-colors hover:border-white"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Reserve a Table
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    className="w-[1px] h-16 bg-white/30 relative overflow-hidden"
                >
                    <motion.div
                        className="w-full h-full bg-primary absolute top-0 left-0"
                        animate={{ top: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
