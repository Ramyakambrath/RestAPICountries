import React from 'react'
import Country from './Country'
import ICountryList from './IcountryList'


type Props = {
    countryList: ICountryList[],

  }

  
export default function Countries({countryList}:Props) {
    console.log('countryList',countryList)
    return (
        <div className='ml-8 mt-8 mb-8 flex flex-wrap justify-between'>
            {countryList.map((country:ICountryList)=>
                <Country country={country}/>
            )}
        </div>
    )
}
