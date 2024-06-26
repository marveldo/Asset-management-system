import React from "react";
import img3 from "../Images/Signup ellipse 3.svg"
import img4 from "../Images/Signup ellipse 5.svg"
import icon1 from "../Images/icons8-waving-hand-emoji-48 2.svg"
import axios from "axios";
import { Useaxios } from "../utils/axiosinstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../reducers/Auth";

export const CreateInstitution = () => {
    const [formstate, setformstate] = React.useState({institution_name : "", institution_address : "", institution_contact :"",  institution_email:""})
    const [error, seterror] = React.useState(false)
    const [errormessage, seterrormessage] = React.useState('')
    const [cansee, setcansee] = React.useState(false)
    const [confirmcansee , setconfirmcansee] = React.useState(false)
    const [isloading, setisloading] = React.useState(false)
    const navigate = useNavigate()
    const axiis = Useaxios()

    
    const Submittobackend = async() => {
        setisloading(true)
      try{
        const response = await axiis.post('/Institution/',formstate)
        navigate(`/dashboard/${response.data.id}/`)
      }
      catch(error){
        if(error.response?.data.institution_contact){
        
            seterror(true)
            seterrormessage('Invalid Contact or Existing contact')
            setformstate(prev => ({
                ...prev,
                institution_contact : ''
            }))

        }
        else if(error.response?.data.institution_email){
            seterror(true)
            seterrormessage('Invalid Email')
            setformstate(prev => ({
                ...prev,
                institution_email : ""
            }))
        }
        else{
            seterror(true)
            seterrormessage('Network Error')
        }
     
      }
      finally{
        setisloading(false)
      }

    }


    

    const inputchange = (e) => {
      const {name,value} = e.target

      setformstate((prev)=> {
        return({
          ...prev,
          [name] : value
        })
      })
 }

 const SubmitForm = (e) => {
   e.preventDefault()

   
    if (formstate.institution_address === '' || formstate.institution_contact === '' || formstate.institution_email === '' || formstate.institution_name === ''){
      seterror(true)
      seterrormessage("No field can be left empty") 
    }
    else{
      Submittobackend()
    }
    
 }

 const clickTryagain = () => {
    seterror(false)
    seterrormessage('')
 }


let loadingicon = <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
<path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path>
</svg>


    return ( 
    <div className="h-[100vh] flex justify-center items-center sm:overflow-hidden relative  ">
        <div className={`${error? '':'hidden'} absolute top-0 h-[100vh] w-full flex  justify-center z-50 items-center bg-shadowcolour`}>
          <div className={`${error? 'flex animate__animated animate__shakeY': 'hidden'} flex-col items-center bg-white py-9 px-20 text-center gap-y-5 rounded-[18px] `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-20 text-red-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

   <p className="text-red-600 text-[23px]">Sorry :( </p>

   <p>{errormessage}</p>

   <button className="bg-red-600 text-white p-3 rounded-[12px]" onClick={clickTryagain}>Try again</button>
          </div>
        </div>
        <img src={img3} alt="image top" className="absolute  resimg1  top-[-40px] left-6"/>
        <img src={img4} alt="image top" className="absolute  resimg2  top-[-40px] left-16"/>
   
   
        <div className=" sm:p-2   p-1 shadow-lg flex flex-col gap-y-6 signupdiv overflow-y-auto  relative ">
            <div className="flex text-center items-center">
            <h1 className="sm:text-[35px] text-[24px]">Create Institution</h1>
            </div>

          <form className="flex flex-col  w-full items-center  sm:px-9 px-3 sm:gap-y-5 gap-y-3 mb-6" onSubmit={SubmitForm}>
            <div className="w-full text-center px-7">
              <p>Institution Contact :</p>
              <input type="text"  name="institution_contact" className={`bg-inputcolor w-full  mt-1 px-3 py-2 h-[43px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block ${isloading? 'brightness-75': ''}  rounded-lg sm:text-sm focus:ring-1`} onChange={inputchange} value={formstate.institution_contact} disabled={isloading}/>            </div>

            <div className="w-full text-center px-7">
              <p >Institution Address :</p>
              <input type="text"  name="institution_address" className={`bg-inputcolor w-full  mt-1 px-3 py-2 h-[43px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-lg ${isloading? 'brightness-75': ''} sm:text-sm focus:ring-1`} onChange={inputchange} value={formstate.institution_address} disabled={isloading}/>
            </div>

            <div className="w-full text-center  px-7">
              <p>Institution Email :</p>
              <div className="relative">
              <input type="text"  name="institution_email" className={`bg-inputcolor w-full  mt-1 px-3 py-2 h-[43px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block ${isloading? 'brightness-75': ''}  rounded-lg sm:text-sm focus:ring-1`} onChange={inputchange} value={formstate.institution_email} disabled={isloading}/>
  
              </div>
            </div>
  
  
  
            <div className="w-full text-center  px-7">
              <p>Institution Name :</p>
              <div className="relative">
              <input type="text"  name="institution_name" className={`bg-inputcolor w-full  mt-1 px-3 py-2 h-[43px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  ${isloading? 'brightness-75': ''} rounded-lg sm:text-sm focus:ring-1`} onChange={inputchange} value={formstate.institution_name} disabled={isloading}/>
  
              </div>
            </div>
         <div className="flex flex-col items-center gap-y-3">
         <button className="py-4 px-7 restext bg-buttoncolor rounded-[17px]" disabled={isloading}>{isloading ? loadingicon :"Create"}</button>
         </div>
          </form>
        </div>
         
      </div>
      )
}