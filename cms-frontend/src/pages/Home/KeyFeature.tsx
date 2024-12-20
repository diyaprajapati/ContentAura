import keyFet from './keyFet.json'
import { motion } from 'framer-motion'
import BlurFade from "@/components/ui/blur-fade";
import { forwardRef } from 'react';

// This forwardRef<HTMLDivElement> is used for the smooth scroll after click on the learn more button
const KeyFeature = forwardRef<HTMLDivElement>((props, ref) => {
  return (

    // title
    <div ref={ref} {...props} className='flex flex-col items-center md:justify-center'>
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

          {/* All the elements fetching from the json file */}
        <div className='grid md:grid-cols-2 m-4 gap-3 justify-between md:ml-12 md:gap-8'>
          {keyFet.map((fet) => (
              <div>

                {/* Blur effect while scrolling */}
                  <BlurFade inView>
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
                  </BlurFade>
              </div>
          ))}
        </div>
    </div>
  )
});

export default KeyFeature