import React from 'react'
import '../Styles/Sub.css'
import { BiChevronRight } from 'react-icons/bi'
import DiamondUpload from './DiamondUpload';
 import GoldUpload from './GoldUpload';
import PlatinumUpload from './PlatinumUpload';
const Sub = () => {
function Diamond(){
    const x = document.getElementById('subdiamond');
    if(x.style.display === 'none') {
        x.style.display = "block";
    }else{
        x.style.display="none"
    }
}

function Gold(){
    const x = document.getElementById('subgold');
    if(x.style.display === 'none') {
        x.style.display = "block";
    }else{
        x.style.display="none"
    }
}

function Platinum(){
    const x = document.getElementById('subplatinum');
    if(x.style.display === 'none') {
        x.style.display = "block";
    }else{
        x.style.display="none"
    }
}

  return (
   <>
     <div className='subContainer'>
       
            <DiamondUpload/>
      

         {/* <div>
         <div onClick={Gold} className='SubGoldCon'>       
             <BiChevronRight className='subIcons' />
            <h2>Men</h2>
     
         </div>
         <div id='subgold'>
            <GoldUpload/>
         </div>
         </div>

         <div>
         <div onClick={Platinum} className='SubPlatinumCon'>        
             <BiChevronRight className='subIcons' />
            <h2>Kids</h2>
         </div>
         <div id='subplatinum'>
            <PlatinumUpload/>
         </div>
         </div> */}
     </div>
   </>
  )
}

export default Sub