import React from 'react'
import ICountryList from './IcountryList'


type Props = {
    country: ICountryList,

  }

export default function Country({country}:Props) {
    
    return (
        <div className="m-8 bg-white w-48 min-w-content flex flex-col justify-start font-sans box-border border-b-2 shadow-md flex-auto dark:bg-gray-100 dark:text-gray-800">
         <div className='h-3/4'><img className='min-h-full object-cover' src={`${country.flag}`} alt="W3Schools.com"/></div>
         <div className=" flex flex-col p-8 justify-start text-sm">
             <span className='font-bold '>{country.name}</span>
             <span className='pt-2'><span className='font-medium'>Population:</span>{country.population}</span>
             <span><span className='font-medium'>Region:</span>{country.region}</span>
             <span><span className='font-medium'>Capital:</span>{country.capital}</span>

         </div>
        
        </div>
    )
}
