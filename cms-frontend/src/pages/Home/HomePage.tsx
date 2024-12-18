import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import KeyFeature from './KeyFeature'

function HomePage() {
  return (
    <>
      <nav className='absolute w-fit left-5 top-4'>
        <motion.div className='bg-gradient-to-br from-indigo-500 to-blue-200 bg-clip-text text-transparent font-bold italic cursor-pointer text-xl'
        initial={{
          x:-10
        }}
        animate = {{
          x:0,
          transition: {
            duration: 0.75
          }
        }}
        >
          Content Aura
        </motion.div>
      </nav>
      <motion.div className='flex flex-col space-y-10 h-dvh justify-center items-center w-full p-10'
      initial={{
        opacity:0
      }}
      animate = {{
        opacity:1,
        transition: {
          duration: 0.60,
          delay: 0.1
        }
      }}
      >
        <div className='space-y-5 md:w-[70%] md:self-center'>
          {/* Headline */}
          <div className='font-extrabold text-5xl w-full text-center'>
            Empower Your Business with Seamless <span className='text-violet-400 italic'>Content Management!</span>
          </div>

          {/* subHeadline */}
          <div className='font-medium text-lg text-slate-500 w-full text-center'>
          Streamline your projects with a robust, developer-friendly CMS designed for efficiency.
          </div>
        </div>
        <div className='flex flex-row gap-8'>
          <Link to={"/auth"}><Button className='p-8 rounded-full text-lg font-semibold hover:scale-105 hover:transition-all'>Get Started</Button> </Link>
          <Button className='p-8 rounded-full text-lg font-semibold bg-transparent hover:scale-105 hover:transition-all'> Learn more &rarr;</Button>
        </div>
      </motion.div>
      <KeyFeature />
    </>
  )
}

export default HomePage
