import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import KeyFeature from './KeyFeature'
import WhyUs from './WhyUs'
import { useCallback, useMemo, useRef } from 'react';
import keyFet from './keyFet.json'
import whyUs from './whyUs.json'
import Container from "@/components/ui/container";
import FadeIn from "@/components/ui/fadein";
import PublicFooter from '@/PublicFooter'
import Feedback from './Feedback'
import feedbacks from './feedbacks.json'

const HomePage = () => {
  const memoizedFeatures = useMemo(() => keyFet, []);
  const memoizedWhyUs = useMemo(() => whyUs, []);
  const memoizedFeedbacks = useMemo(() => feedbacks, []);

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div>
      {/* Logo/Brand - Top Left */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 bg-clip-text text-transparent cursor-pointer"
        >
          Content Aura
        </h1>
      </motion.div>
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32 overflow-hidden">
        <div className="">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-800/20 via-transparent to-transparent" />
        </div>

        <Container className="relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <FadeIn delay={100}>
              <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                Next-Generation Content Management
              </span>
            </FadeIn>

            <FadeIn delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 mt-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                  Empower Your Business with Seamless <span className='text-violet-400 italic'>Content Management!</span>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={300} className="mb-8">
              <p className="text-lg text-white/70 max-w-2xl">
                Streamline your projects with a robust, developer-friendly CMS designed for efficiency.
              </p>
            </FadeIn>

            <FadeIn delay={400}>
              {/* Buttons */}
              <div className='flex flex-row gap-8 justify-center'>
                <Link to={"/auth"}><Button className='p-8 rounded-full text-lg font-semibold hover:scale-105 hover:transition-all'>Get Started</Button> </Link>
                <Button className='p-8 rounded-full text-lg font-semibold bg-transparent hover:scale-105 hover:transition-all border' onClick={handleClick}> Learn more &rarr;</Button>
              </div>
              {/* </motion.div> */}
            </FadeIn>
          </div>
        </Container>
      </section >
      {/* Other components */}
      <KeyFeature ref={ref} features={memoizedFeatures} />
      <WhyUs features={memoizedWhyUs} />
      <Feedback feedbacks={memoizedFeedbacks} />

      <PublicFooter />
    </div>
  );
};

export default HomePage;