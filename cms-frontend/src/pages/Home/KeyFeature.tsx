import keyFet from './keyFet.json'
import { motion } from 'framer-motion'

export default function KeyFeature() {
  return (
    <div className='flex flex-col items-center h-screen md:justify-center'>
        <motion.div className='flex justify-center text-4xl font-bold text-violet-400 mb-10 mt-14 md:text-5xl md:mb-20'
        initial={{
            y:-20
          }}
          animate = {{
            y:0,
            transition: {
              duration: 0.75
            }
          }}
          >Key Features</motion.div>
        <motion.div className='grid md:grid-cols-2 m-4 gap-3 justify-between md:ml-12 md:gap-8'
        initial={{
            x:-20
          }}
          animate = {{
            x:0,
            transition: {
              duration: 0.75
            }
          }}>
            {keyFet.map((fet) => (
                <div>
                    <div className='flex flex-row px-6 py-3 bg-[#0e1936] rounded-lg border border-indigo-900 cursor-pointer hover:bg-[#0c142b] hover:border-indigo-950 gap-6'>
                        <div className='mr-15 flex items-center'>
                            <img
                            src={`/${fet.icon}`} className='fill-white size-10'/>
                        </div>
                        <div>
                            <div className='text-xl font-semibold'>
                                {fet.title}    
                            </div>
                            <div className='font-medium text-slate-500'>
                                {fet.desc}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    </div>
  )
}
