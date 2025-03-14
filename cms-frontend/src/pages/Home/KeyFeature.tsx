// import Container from '@/components/ui/container';
// import keyFet from './keyFet.json'
// import FadeIn from '@/components/ui/fadein';
// import { motion } from 'framer-motion'
// import { forwardRef } from 'react';

// const FeatureCard = ({ feature, index }: { feature: typeof keyFet[0], index: number }) => {
//   return (
//     <FadeIn delay={100 + index * 100} className="w-full">
//       <motion.div
//         className="h-full p-6 rounded-xl blur-card-bg border border-white/10 transition-all duration-500 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 group"
//         whileHover={{ y: -8, transition: { duration: 0.3 } }}
//       >
//         <div className="p-3 rounded-lg bg-violet-500/10 w-fit mb-4 relative overflow-hidden">
//           <div className="text-violet-400 relative z-10">
//             <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
//           </div>
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//             initial={{ scale: 0 }}
//             whileHover={{ scale: 1, transition: { duration: 0.3 } }}
//           />
//         </div>

//         <h3 className="text-xl font-playfair font-medium mb-2 group-hover:text-violet-300 transition-colors duration-300">{feature.title}</h3>

//         <p className="text-white/60 font-jakarta group-hover:text-white/80 transition-colors duration-300">{feature.desc}</p>

//         <motion.div
//           className="w-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mt-4 group-hover:w-full transition-all duration-500"
//           initial={{ width: 0 }}
//           whileHover={{ width: "100%" }}
//         />
//       </motion.div>
//     </FadeIn>
//   );
// };

// const KeyFeature = forwardRef<HTMLDivElement>((props, ref) => {
//   return (
//     <section id="features" className="py-20 md:py-28 relative overflow-hidden">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"></div>

//       {/* Background decoration elements */}
//       <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl"></div>
//       <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl"></div>
//       <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-500/5 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

//       <Container>
//         <div ref={ref} {...props} className="text-center max-w-2xl mx-auto mb-16">
//           <FadeIn delay={100}>
//             <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 relative">
//               <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
//                 Key Features
//               </span>
//               <motion.div
//                 className="absolute -bottom-2 left-1/2 h-0.5 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 rounded-full"
//                 initial={{ width: "0%", x: "-50%" }}
//                 whileInView={{ width: "120px", x: "-50%" }}
//                 transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
//                 viewport={{ once: true }}
//               />
//             </h2>
//           </FadeIn>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 mx-2 lg:grid-cols-3 gap-6">
//           {keyFet.map((feature, index) => (
//             <FeatureCard key={index} feature={feature} index={index} />
//           ))}
//         </div>
//       </Container>

//       {/* Floating particles */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-violet-500/10 w-2 h-2"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -20, 0],
//               opacity: [0.2, 0.8, 0.2],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 5,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// });

// export default KeyFeature;

import Container from '@/components/ui/container';
import FadeIn from '@/components/ui/fadein';
import { motion } from 'framer-motion'
import { forwardRef } from 'react';

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  return (
    <FadeIn delay={100 + index * 100} className="w-full">
      <motion.div
        className="h-full p-6 rounded-xl blur-card-bg border border-white/10 transition-all duration-500 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 group"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="p-3 rounded-lg bg-violet-500/10 w-fit mb-4 relative overflow-hidden">
          <div className="text-violet-400 relative z-10">
            <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1, transition: { duration: 0.3 } }}
          />
        </div>

        <h3 className="text-xl font-playfair font-medium mb-2 group-hover:text-violet-300 transition-colors duration-300">{feature.title}</h3>

        <p className="text-white/60 font-jakarta group-hover:text-white/80 transition-colors duration-300">{feature.desc}</p>

        <motion.div
          className="w-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mt-4 group-hover:w-full transition-all duration-500"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
        />
      </motion.div>
    </FadeIn>
  );
};

const KeyFeature = forwardRef<HTMLDivElement, { features: any[] }>(({ features }, ref) => {
  return (
    <section id="features" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"></div>

      {/* Background decoration elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-500/5 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

      <Container>
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn delay={100}>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                Key Features
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </Container>

      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-violet-500/10 w-2 h-2"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
});

export default KeyFeature;