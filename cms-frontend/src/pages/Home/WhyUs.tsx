import whyUs from './whyUs.json'
import BlurFade from "@/components/ui/blur-fade";

const TimelineItem = ({ text = '', index = 0 }) => (
  <div className="flex relative">
    {/* Timeline line */}
    <div className="absolute left-4 top-0 h-full w-0.5 bg-violet-200" />
    
    {/* Timeline dot */}
    <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-violet-400 border-4 border-violet-100" />
    
    {/* Content */}
    <div className="ml-12 pb-8">
      <div className="flex items-center mb-2">
        <span className="text-sm font-semibold text-violet-400">
          {index + 1}.
        </span>
      </div>
      <div className="text-gray-500 text-lg animate-fadeIn">
        {text}
      </div>
    </div>
  </div>
);

export default function WhyUs() {

  return (
    <div className="flex flex-col items-center min-h-screen md:justify-center">
      <div className="flex justify-center text-4xl font-bold text-violet-400 mb-16 mt-10 md:text-5xl md:mb-16 ml-6">
        Why Businesses and Developers Trust Our CMS?
      </div>
      <BlurFade inView>
      <div className="flex flex-col w-full max-w-3xl px-4 md:px-12">
        {whyUs.map((why, index) => (
          <TimelineItem 
            key={index}
            text={why.txt}
            index={index}
          />
        ))}
      </div>
      </BlurFade>
    </div>
  );
}