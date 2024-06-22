import React from 'react'
import cover from "../Images/cover 1.png"
import comment from "../Images/icons8-about-us-48 1.png"
import sort from "../Images/icons8-sort-down-24 1.png"
import main from "../Images/3d-techny-data-dashboard-with-charts-and-graphs 2.png"
import icon from '../Images/icons8-menu-48 1.svg'
import polygon from "../Images/Polygon 1.svg"
import { Link } from 'react-router-dom'

export const Landingpage = () => {
   const [value, setvalue] = React.useState('Sign Up')
    const [firstanimate, setfirstanimate] = React.useState(false)
    const [secondanimate , setsecondanimate] = React.useState(false)
    const [thirdanimate , setthirdanimate ] = React.useState(false)
    const [showresnav, setshowresnav] = React.useState(false)
   
   const timoutid0 = setTimeout(()=> {
    setfirstanimate(true)
    return ()=> clearTimeout(timoutid0)
 },100)
   const timoutid1 = setTimeout(()=> {
      setsecondanimate(true)
      return ()=> clearTimeout(timoutid1)
   },600)

   const timeoutid2 = setTimeout(()=> {
     setthirdanimate(true)
     return () => clearTimeout(timeoutid2)
   }, 1000)

   const handleSignuphover = () =>{
        setvalue('Sign Up')

    
   }
   const handleLoginhover = () => {
    setvalue('Log In')}

    const handleoiconclick = () => {
        setshowresnav(prev => !prev)
    }

    
  
    return(
        <div className='biggest-div ' >
        <div className=' bg-primcolor h-[100vh] main-div overflow-hidden'>
            <div className=' ps-6 pe-8 py-4 bg-primcolor fixed top-0 z-50 flex w-[100%] items-center'>
                
                <img src={cover} alt= "cover image" className='w-[131px] h-[52px] sm:me-6 me-2 '/>

                <div className='list-none sm:px-8 sm:py-5 px-3 py-3  small-font me-auto relative navdiv '>
                <img src={comment} alt="Comment" className='absolute top-0 right-0'/>    
                <li className=''>About us</li>
                </div>

                <div className='list-none flex  sm:gap-x-2 gap-x-1 sm:px-8 sm:py-5 px-0 py-3  small-font navdiv  '>
                    <li>Our offers</li> 
                    <img src={sort} alt='sort icon' />
                </div>

                <img src={icon} alt='Navbar icon' className="ms-auto img" onClick={handleoiconclick}/>

              
                <div className={`absolute  top-16 right-12 ${showresnav? 'resnavdiv animate__animated animate__faster animate__bounceInDown' : 'hidden'} `}>
                    <div className='p-5 flex flex-col relative items-center bg-navcolour  rounded-[20px]'>
                    <img src={polygon} alt="decision barrier" className='absolute right-0 top-[-9px] rotate-[16deg]'/>
                    <img src={comment} alt="Comment" className=''/>  
                    <img src={sort} alt='sort icon' />
                    </div>
                </div>

            </div>

            <div className=' ps-6 pe-8 py-4 opacity-0 top-0 flex w-[100%] items-center'>
                
                <img src={cover} alt= "cover image" className='w-[131px] h-[52px] sm:me-6 me-2 '/>

                <div className='list-none sm:px-8 sm:py-5 px-3 py-3  small-font me-auto relative navdiv '>
                <img src={comment} alt="Comment" className='absolute top-0 right-0'/>    
                <li className=''>About us</li>
                </div>

                <div className='list-none flex  sm:gap-x-2 gap-x-1 sm:px-8 sm:py-5 px-0 py-3  small-font navdiv  '>
                    <li>Our offers</li> 
                    <img src={sort} alt='sort icon' />
                </div>

                <img src={icon} alt='Navbar icon' className="ms-auto img" onClick={handleoiconclick}/>

              

            </div>

          
           

            <div className='pt-10 flex special-div  z-10 gap-x-3 ps-6 pe-8 '>
              
                <div className='flex flex-col landingpagediv1 h-full gap-y-8'>
                    <h1 className={`large-font ${firstanimate ? 'animate-slideup' : ''} ${!firstanimate ? 'opacity-0': ''} `}>University Asset Management System</h1>
                    <p className={`small-font ${secondanimate ? 'animate-slideup' : ''} ${!secondanimate ? 'opacity-0': ''} `}>This asset management system is a software designed to track, manage, and maintain all physical assets owned by a university or educational institution. These assets can range from equipment and technology to furniture and facilities. With the purpose being to ensure that assets are utilized efficiently, are properly maintained, and are accounted for accurately.</p>
                    <div className={`flex gap-x-3 ${thirdanimate ? 'animate-slideup' : ''} ${!thirdanimate ? 'opacity-0': ''} `}>
                        <div className='relative flex gap-x-3'>
                        <Link to='/Signup'  className='  z-50 rounded-[100px] medium-font p-4' onMouseEnter={handleSignuphover} >Sign Up</Link>
                        <Link to='/login' className="  z-50 rounded-[100px] medium-font p-4" onMouseEnter={handleLoginhover}>Log In</Link>
                        <div className={`absolute z-0  ${value === 'Sign Up'? 'left-0 animate-slideleft': 'right-0'} ${value === 'Log In'? ' right-0 animate-slideright ': 'left-0 '}  bg-specblue rounded-[100px] medium-font p-4`}><p className='opacity-0'>{value}</p></div>
                        </div>

                        
                    </div>
                </div>

                <div className='landingpagediv2 items-center'>
                    <img src={main} alt="main image" className='min-[1024px]:w-full min-[1024px]:h-full '/>
                </div>
            </div>
        </div>

        {/* <div className='w-full text-center p-8'>
            About Us
        </div> */}

        </div>
    )
}