// import { motion } from 'framer-motion';
// import whyUs from './whyUs.json'
// import Container from '@/components/ui/container';

// const TimelineItem = ({ text = '', index = 0 }) => (
//   <motion.div
//     className="flex relative"
//     initial={{ opacity: 0, x: -20 }}
//     whileInView={{ opacity: 1, x: 0 }}
//     transition={{ duration: 0.5, delay: index * 0.1 }}
//     viewport={{ once: true }}
//   >
//     {/* Timeline line */}
//     <div className="absolute left-4 top-0 h-full w-0.5 bg-violet-900/30" />

//     {/* Timeline dot with pulse animation */}
//     <div className="relative">
//       <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-violet-400 border-4 border-[#0e1936]" />
//       <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-violet-400/50 animate-ping"
//         style={{ animationDuration: '3s' }} />
//     </div>

//     {/* Content */}
//     <div className="ml-12 pb-8">
//       <div className="flex items-center mb-2">
//         <span className="text-sm font-semibold text-violet-400 font-playfair">
//           {index + 1}.
//         </span>
//       </div>
//       <div className="text-gray-400 text-lg font-jakarta animate-fadeIn">
//         {text}
//       </div>
//     </div>
//   </motion.div>
// );

// export default function WhyUs() {
//   return (
//     <div className="flex flex-col items-center py-20 relative overflow-hidden">
//       {/* Background decoration elements */}
//       <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-violet-500/5 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-violet-500/5 to-transparent rounded-full blur-3xl"></div>

//       <Container>
//         <motion.div
//           className="text-4xl font-bold font-playfair text-violet-400 mb-16 text-center md:text-5xl"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           Why Businesses and Developers Trust Our CMS?
//         </motion.div>

//         <div className="flex flex-col w-full max-w-3xl mx-auto px-4 md:px-12">
//           {whyUs.map((why, index) => (
//             <TimelineItem
//               key={index}
//               text={why.txt}
//               index={index}
//             />
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

import { motion } from 'framer-motion';
import Container from '@/components/ui/container';
import { forwardRef } from 'react';

const TimelineItem = ({ text = '', index = 0 }) => (
  <motion.div
    className="flex relative"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    {/* Timeline line */}
    <div className="absolute left-4 top-0 h-full w-0.5 bg-violet-900/30" />

    {/* Timeline dot with pulse animation */}
    <div className="relative">
      <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-violet-400 border-4 border-[#0e1936]" />
      <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-violet-400/50 animate-ping"
        style={{ animationDuration: '3s' }} />
    </div>

    {/* Content */}
    <div className="ml-12 pb-8">
      <div className="flex items-center mb-2">
        <span className="text-sm font-semibold text-violet-400 font-playfair">
          {index + 1}.
        </span>
      </div>
      <div className="text-gray-400 text-lg font-jakarta animate-fadeIn">
        {text}
      </div>
    </div>
  </motion.div>
);

const WhyUs = forwardRef<HTMLDivElement, { features: any[] }>(({ features }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-center py-20 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-violet-500/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-violet-500/5 to-transparent rounded-full blur-3xl"></div>

      <Container>
        <motion.div
          className="text-4xl font-bold font-playfair text-violet-400 mb-16 text-center md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Businesses and Developers Trust Our CMS?
        </motion.div>

        <div className="flex flex-col w-full max-w-3xl mx-auto px-4 md:px-12">
          {features.map((feature, index) => (
            <TimelineItem
              key={index}
              text={feature.txt}
              index={index}
            />
          ))}
        </div>
      </Container>
    </div>
  );
});

export default WhyUs;