import whyUs from './whyUs.json'

export default function WhyUs() {
  return (
    <div className='flex flex-col items-center h-screen md:justify-center'>
        <div className='flex justify-center text-4xl font-bold text-violet-400 mb-16 mt-14 md:text-5xl md:mb-20 ml-6'>
            Why Businesses and Developers Trust Our CMS?
        </div>
        <div className='flex flex-col m-4 gap-5 justify-between md:ml-12 md:gap-8'>
            {whyUs.map((why) => (
                <div className=''>{why.txt}</div>
            ))}
        </div>
    </div>
  )
}
