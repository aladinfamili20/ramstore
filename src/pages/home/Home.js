import React from 'react' 
import Slider from "../../components/slider/Slider"; 
 import Diamond from '../../Substriction/diamond/Diamond';
import Gold from '../../Substriction/Gold/Gold';
import Platinum from '../../Substriction/Platinum/Platinum';
const HomeScreen =({id})=> {     
return (
 <section>     
<div className='SlideShow'>
 {/* slideshow imported here */}
<Slider />  
</div>    
    <Diamond/> 
    {/* <Gold/> */}
    {/* <Platinum/> */}
 </section>  
)
 }  
 
 
 
 
 
 

export default HomeScreen

