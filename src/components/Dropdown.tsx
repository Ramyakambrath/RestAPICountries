import React,{useRef, Fragment} from 'react';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ClearIcon from '@material-ui/icons/Clear';
import { SvgIconProps } from '@material-ui/core';

type propT ={
    ref:React.RefObject<HTMLInputElement>,
    handler: (event:React.ChangeEvent<HTMLInputElement>) => React.ChangeEvent<HTMLInputElement>
}

// const useOnClickOutside=({ref,handler}:propT)=> {

//     React.useEffect(()=>{
//         const listener=(event:React.ChangeEvent<HTMLInputElement>)=>{

//             // console.log('eee',ref.current )
          
//             if(!ref.current || ref.current.contains(event.target)){
//             //    console.log('xx',event.target,ref.current)
//                 return
//             }

//             handler(event)
//             // console.log('yy',handler)

//         }

//         document.addEventListener('mousedown',listener);

//         return()=>{
//             document.removeEventListener('mousedown',listener);
//         }
//     },[ref,handler])
    
// }

type Props = {
    items: Array<string>,
    mousePosition:string,
    dropDownField:string,
    toggleDropdownStatus: () => void,
    setSelectedValue: (index:number) => void,
    toggleDropdownIconStatus: () => void,
    setData: (value:string) => void

  }



const ListValue = ({items,mousePosition, dropDownField,toggleDropdownStatus,setSelectedValue,toggleDropdownIconStatus,setData}:Props) => {
 
  const [item, setSelectedItem] = React.useState<string>('');
  const [filteredData,setFilteredData]= React.useState<string[]>(items);
  const [showManageForm, setManageForm] = React.useState<boolean>(false);
  const centerY = document.documentElement.clientHeight / 2;
 // const centerY = 1000;


  const handleListItemClick=(index:number)=>{

  
    setSelectedValue(index);
    toggleDropdownStatus();

  }


 

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {

    setSelectedItem(event.target.value);
    filteredList(event.target.value)

  }
  const filteredList=(data:string)=>{
    let currentList=[];
    let newList=[];
  
  
    if(data !==""){
  
        
        currentList=items;
       
       
        newList=currentList.filter(item=>{     
             
                return item.includes(data)
           
        })
        
  
    }else{
  
        newList=items
    }
  
    setFilteredData(newList)
  
   
   
  }

  const handeManage=()=>{
    
    setManageForm(!showManageForm);
    toggleDropdownIconStatus();

  }

  const handleCloseForm=()=>{
    toggleDropdownStatus();

  }



  return (
    <Fragment>
    
    <div className='flex flex-column w-40 border-b-2 shadow-md mt-5px absolute z-1000 '>    
      <ul className='w-full flex flex-col bg-white items-center top-0 left-0 .rounded '  >
        <div className='max-h-275px w-full'>
         {filteredData.map((item,index) => (
          <li  className='hover:bg-purple-500 cursor-pointer hover:text-white pl-2 pt-2 pb-2 bg-white text-gray-500 text-xs' onClick={event => handleListItemClick( index)} key={index}>
            {item}
          </li>
        ))}
        </div>
       
      </ul>
     
    </div>
   
    </Fragment>
  )

}

type Properties = {
    disabled:boolean,
    items: Array<string>,
    placeHolderValue:string,
    customWidth:string,
    dropDownField:string,
    backgroundValue:string,
    defaultValue:string,
    setInputDropdownvalue:(value:string) => void
  //  icon: (props: SvgIconProps) => JSX.Element;

  }

export default function Dropdown({ disabled,dropDownField,items,placeHolderValue,customWidth,backgroundValue,defaultValue,setInputDropdownvalue}:Properties ) {
  
  const [data, setData] = React.useState<string>(defaultValue?defaultValue:'');
  const [mousePosition, setmousePosition] = React.useState<string>('')

  const [dropDownStatus, setDropdownStatus] = React.useState(false);
  const [dropDownIconStatus, setDropdownIconStatus] = React.useState(false);
  
  React.useEffect(()=>{ 

  if(defaultValue!==undefined){

    setData(defaultValue) 
  }

    
    return()=>{
      
    
  }
  },[defaultValue])

  

  const node = React.useRef<HTMLInputElement>(null);

  const clearData=()=>{
    setData('');
    setInputDropdownvalue('')
 
  }
 
  const setSelectedValue=(index:number)=>{

    setData(items[index])
    setInputDropdownvalue(items[index])
 
  }

  const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
   
    setData(event.target.value)
    setInputDropdownvalue(event.target.value)
  }


//   useOnClickOutside(node, (event:React.ChangeEvent<HTMLInputElement>) => {
//     if(dropDownIconStatus && dropDownStatus)
//     setDropdownStatus(false)});

  const toggleDropdownStatus = () => {
    // setAnchorEl(anchorEl ? null : event.currentTarget)
    setDropdownStatus(!dropDownStatus);
    toggleDropdownIconStatus();
    ;
  }
  const toggleDropdownIconStatus = () => {

    setDropdownIconStatus(!dropDownStatus);

    
  }

 const handleMouseMove=(event:React.MouseEvent)=>{
  // console.log(e.clientY, e.target.offsetTop)
  setmousePosition(event.clientY.toString())

 }
  
  const expandIcon =(!dropDownStatus || !dropDownIconStatus) ? <ExpandMoreIcon  className={`${backgroundValue} border-r-0 border-t-0 border-b-1 border-l-0 h-12` } onClick={toggleDropdownStatus} /> : <ExpandLessIcon className={`${backgroundValue} border-r-0 border-t-0 border-b-1 border-l-0 h-12` } onClick={toggleDropdownStatus} />
  
  const clearIcon =!dropDownStatus && data!=='' ?disabled === true ?<ClearIcon className={`${backgroundValue} border-r-0 border-t-0 border-b-1 border-l-0 h-12` }/>:<ClearIcon className={`${backgroundValue} border-r-0 border-t-0 border-b-1 border-l-0 h-12` } onClick={clearData} /> : null

  return (
     <div  ref={node} className={`${customWidth}`?`${customWidth}`:`null`}>
     {/* <div className='flex border-b-1' onMouseMove={handleMouseMove} >    */}
      <div className={` flex mt-8 ${backgroundValue} items-center w-full pt-1 h-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border-b-2 shadow-md border-b-0`} onMouseMove={handleMouseMove} onClick={toggleDropdownStatus}>
      <input
        id={dropDownField}
        type='text'
        value={data}
        placeholder={`${placeHolderValue}`?`${placeHolderValue}`:`null`}    
        className={` text-xs p-2 w-full border-white ${backgroundValue} focus:outline-none ${disabled}?cursor-not-allowed:cursor-pointer` }
        disabled={disabled? true: false}
       onChange={handleChange}
      /> 
       {clearIcon}
       {expandIcon} 
      </div>
     
      {/* </div>    */}
      {dropDownStatus?  <ListValue  items={items} dropDownField={dropDownField} toggleDropdownStatus={toggleDropdownStatus} setSelectedValue={setSelectedValue} toggleDropdownIconStatus={toggleDropdownIconStatus} mousePosition={mousePosition} setData={setData}/>:null}    
    
    </div>
  )
}
