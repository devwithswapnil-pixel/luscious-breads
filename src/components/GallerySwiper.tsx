import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GALLERY_IMAGES = [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800'
];

export default function GallerySwiper() {
    return (
        <section className="py-24 bg-accent/30 overflow-hidden relative group">
            <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block">Our Spaces</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground">The Bakery</h2>
                </motion.div>

                <div className="flex gap-4 hidden md:flex">
                    <button className="gallery-prev w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-transparent transition-all cursor-scale">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="gallery-next w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-transparent transition-all cursor-scale">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full pl-4 md:pl-10"
            >
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.2 },
                    }}
                    navigation={{
                        prevEl: '.gallery-prev',
                        nextEl: '.gallery-next',
                    }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    className="!overflow-visible"
                >
                    {GALLERY_IMAGES.map((imgSrc, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
                                <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition-colors duration-500" />
                                <img
                                    src={imgSrc}
                                    alt={`Gallery ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 cursor-scale"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </section>
    );
}
