import './App.css';
import './styles/index.css'
import React from 'react'
import Countries from './components/Countries'
import {AxiosResponse} from 'axios'
import axios from 'axios';
import ICountryList from './components/IcountryList'
import Dropdown from './components/Dropdown'
import DarkTheme from './components/DarkTheme'



function App() {

   const url="https://restcountries.eu/rest/v2"
   

   const [countryList,setCountryList]=React.useState<ICountryList[]>([])
   const [filteredCountryList,setFilteredCountryList]=React.useState<ICountryList[]>(countryList)
   const [inputdropdownVal,setInputDropdownvalue]=React.useState<string>('')
   const [searchCountry,setSearchCountry]=React.useState<string>('') 
   const [ darkMode, setDarkMode ] = React.useState<boolean>(false);


   console.log('filteredCountryList',filteredCountryList)

   const handleSearchChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
   
    setSearchCountry(event.target.value)
    
  }


  React.useEffect(()=>{

    if(searchCountry!=='' && inputdropdownVal===''){

    axios.get(url + `/name/${searchCountry}`)
        .then((res: AxiosResponse) =>{    
          setCountryList(res.data)

        })
      }

   },[countryList.length,searchCountry])

   React.useEffect(()=>{

    if(searchCountry!=='' && inputdropdownVal!==''){
      console.log('dddd',countryList,inputdropdownVal,searchCountry,countryList.filter(country=>country.region.toLowerCase()===  inputdropdownVal.toLowerCase() && country.name.toLowerCase() ===searchCountry.toLowerCase()))

      setFilteredCountryList(countryList.filter(country=>country.region.toLowerCase()===  inputdropdownVal.toLowerCase() && country.name.toLowerCase() ===searchCountry.toLowerCase()))

  }

   },[countryList.length,searchCountry,inputdropdownVal,filteredCountryList.length])

   React.useEffect(()=>{


    if(inputdropdownVal==='' && searchCountry===''){

    axios.get(url + '/all')
        .then((res: AxiosResponse) =>{    
          console.log(res)    
          setCountryList(res.data)

        })
      }

   },[countryList.length,inputdropdownVal,searchCountry])

   React.useEffect(()=>{

    if(inputdropdownVal!==''&& searchCountry ===''){
    axios.get(url + `/region/${inputdropdownVal}`)
        .then((res: AxiosResponse) =>{    
          console.log(res)    
          setCountryList(res.data)

        })

      }
   },[inputdropdownVal])  


  return (
    <div className={`h-full flex flex-col ${darkMode ? 'dark' : ''}`}>
     {/* <div className='h-full flex flex-col' > */}
      <div className='flex justify-between box-border h-12  pt-2.5 pl-8  border-b-2 w-full shadow-md dark:bg-gray-900 dark:text-white bg-white'>
         <h2 className='font-bold'>Where in the world?</h2>
         <DarkTheme darkMode={darkMode} setDarkMode ={setDarkMode}/>
      </div> 
      <div className='min-h-screen flex-auto dark:bg-gray-600 dark:text-white bg-gray-50 text-gray-700'>
        <div className='flex w-full justify-between'>
        <input className='text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ml-16 mt-8 h-12 w-96 p-2 border-b-2 shadow-md text-gray-700 ' type="search" id="site-search" name="q" aria-label="Search through site content" placeholder='Search for a country...' value={searchCountry} onChange={handleSearchChange}/>
        <Dropdown setInputDropdownvalue={setInputDropdownvalue} disabled={false} dropDownField='' items={['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']} placeHolderValue='Filter by region' customWidth='w-40 mr-10' backgroundValue='bg-white' defaultValue=''/>
        </div>
        {inputdropdownVal!=='' && searchCountry!=='' ?
        <Countries countryList={filteredCountryList} />:
        <Countries countryList={countryList} />
        }
      </div>
    </div>
  );
}

export default App;
