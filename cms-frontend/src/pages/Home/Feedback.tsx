import Container from '@/components/ui/container';
import FadeIn from '@/components/ui/fadein';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface FeedbackItem {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    feedback: string;
    featured?: boolean;
}

const TestimonialCard = ({ feedback }: { feedback: FeedbackItem }) => {
    return (
        <motion.div
            className="h-full p-6 rounded-xl blur-card-bg border border-white/10 transition-all duration-500 group relative overflow-hidden bg-background"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            {/* Background gradient on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
            />
            <div className="relative z-10">
                {/* Quote icon */}
                <div className="mb-4">
                    <Quote className="w-8 h-8 text-violet-400/60 group-hover:text-violet-400 transition-colors duration-300" />
                </div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < feedback.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-600'
                                }`}
                        />
                    ))}
                </div>
                {/* Feedback text */}
                <p className="text-white/80 font-jakarta mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                    "{feedback.feedback}"
                </p>
                {/* User info */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                            <img
                                src={feedback.avatar}
                                alt={feedback.name}
                                className="w-full h-full rounded-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(feedback.name)}&background=6366f1&color=ffffff`;
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-playfair font-medium text-white group-hover:text-violet-200 transition-colors duration-300">
                            {feedback.name}
                        </h4>
                        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                            {feedback.role} at {feedback.company}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Feedback = ({ feedbacks }: { feedbacks: FeedbackItem[] }) => {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"></div>

            {/* Background decoration elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-indigo-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/2 right-1/2 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

            <Container>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <FadeIn delay={100}>
                        <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4 inline-block">
                            Client Testimonials
                        </span>
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 relative">
                            <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                                What Our Clients Say
                            </span>
                            <motion.div
                                className="absolute -bottom-2 left-1/2 h-0.5 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 rounded-full"
                                initial={{ width: "0%", x: "-50%" }}
                                whileInView={{ width: "120px", x: "-50%" }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                viewport={{ once: true }}
                            />
                        </h2>
                    </FadeIn>
                    <FadeIn delay={200}>
                        <p className="text-lg text-white/70">
                            Don't just take our word for it. Here's what our satisfied clients have to say about Content Aura.
                        </p>
                    </FadeIn>
                </div>
                {/* Carousel with single testimonial visible */}
                <div className="flex justify-center">
                    <Carousel className="max-w-lg w-full">
                        <CarouselContent>
                            {feedbacks.map((feedback) => (
                                <CarouselItem key={feedback.id} className="flex items-center justify-center">
                                    <TestimonialCard feedback={feedback} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-between mt-4">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </div>
            </Container>
            {/* Floating particles (unchanged) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-indigo-500/10 w-1.5 h-1.5"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Feedback;