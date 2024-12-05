import { useEffect, useState } from 'react';
import {images} from '../../../assets/images'
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaHandsHoldingChild } from "react-icons/fa6";
import {NavLink} from 'react-router-dom'
const Home = () => {
console.log(images)
    return(
        <div className='container max-w-screen-lg m-auto pt-10'>
            <div className='relative'>
                <ImageView images={images} />
            <div className='absolute top-[58%] left-[10%]'><button className='bg-black text-white h-9 px-3 py-6 flex items-center'>Go To Collection</button></div>
            </div>
            <div className='flex justify-center flex-col mt-10'>
                <h1 className='font-semibold flex justify-center'>Categories</h1>
                <ul className='flex justify-around mt-10'>
                   
                    <li className='flex flex-col items-center gap-5'><NavLink to="/men"><span className='text-9xl'><FaMale/></span></NavLink><p>Men</p></li>
                    <li className='flex flex-col items-center gap-5'><NavLink to="/women"><span className='text-9xl'><FaFemale/></span></NavLink><p>Women</p></li>
                    <li className='flex flex-col items-center gap-5'><NavLink to="/kids"><span className='text-9xl'><FaHandsHoldingChild/></span></NavLink><p>Kids</p></li>
                </ul>
            </div>
        </div>
        
    )
}

export default Home

const ImageView = ({images}) => {
    const [activeImg,setActiveImg] = useState(0)

        useEffect(() => {
            const interval = setInterval(() => {
               setActiveImg((prevIndex) =>  (prevIndex + 1) % images.length);
            }, 4000); 
        
            return () => {
              clearInterval(interval); 
            };
        }, []);


    return(
        <img src={images[activeImg]}/>
    )
}