import React from 'react'
import keyFet from './keyFet.json'

export default function KeyFeature() {
  return (
    <div className='flex flex-col items-center h-screen'>
        <div className='flex justify-center text-4xl font-bold text-violet-400 mb-10 mt-14'>Key Features</div>
        <div className='grid md:grid-cols-2 m-4 gap-3 justify-between md:ml-12'>
            {keyFet.map((fet) => (
                <div>
                    <div className='flex flex-col px-6 py-3 bg-[#0e1936] rounded-lg border border-indigo-900 cursor-pointer hover:bg-[#0c142b] hover:border-indigo-950'>
                        <div className='text-xl font-semibold'>
                            {fet.title}    
                        </div>
                        <div className='font-medium text-slate-500'>
                            {fet.desc}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
