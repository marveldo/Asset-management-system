import React from "react";
import img3 from "../Images/Signup ellipse 3.svg"
import img4 from "../Images/Signup ellipse 5.svg"
import icon1 from "../Images/icons8-waving-hand-emoji-48 2.svg"
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../reducers/Auth";

export const SignUp = () => {
    const [formstate, setformstate] = React.useState({staff_id : "", password : "", confirm_password:"",email:""})
    const [error, seterror] = React.useState(false)
    const [errormessage, seterrormessage] = React.useState('')
    const [cansee, setcansee] = React.useState(false)
    const [confirmcansee , setconfirmcansee] = React.useState(false)
    const [isloading, setisloading] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const Submittobackend = async() => {
      try{
        setisloading(true)
        const response = await axios.post('/Userviewset/', formstate )
        dispatch(LoginUser(response.data))
        navigate('/validate', {replace : true})

      }
      catch(error){
        if(error.response?.data.staff_id){
          seterror(true)
          seterrormessage("This Id Already Exists")
          setformstate(prev => {
            return({
              ...prev,
              staff_id : ""
            })
          })
        }
        else if(error.response?.data.email){
           seterror(true)
           seterrormessage("This Email Already Exists")
           setformstate(prev => {
            return({
              ...prev,
              email : ""
            })
          })
        }
        else{
          seterror(true)
          seterrormessage('A Network error occured')
        }
      }
      finally{
        setisloading(false)
      }

    }

    const eyeclick = () => {
      setcansee(!cansee)
    }

    const confirmeyeclick = () => {
      setconfirmcansee(!confirmcansee)
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

    if (formstate.password !== formstate.confirm_password) {
      seterror(true)
      seterrormessage("Passwords Do not match")
      setformstate(prev => {
        return({
          ...prev,
          password : '',
          confirm_password : ''
        })
      })
    }
    else if (formstate.password === '' || formstate.confirm_password === '' || formstate.staff_id === '' || formstate.email === ''){
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
  
    let eyeopen =      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 right-2" onClick={eyeclick}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  
  let eyeclosed =   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 right-2" onClick={eyeclick}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>

let eyeopen2 =      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 right-2" onClick={confirmeyeclick}>
<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

let eyeclosed2 =   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 right-2" onClick={confirmeyeclick}>
<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>

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
   
  
        <div className=" sm:p-2   p-1 shadow-lg flex flex-col signupdiv overflow-y-auto  relative ">
            <div className="flex text-center items-center">
            <h1 className="large-font">Sign Up</h1>
            <img src={icon1} alt='Waving hand' className="sm:w-[60px] sm:h-[60px] w-[45px] h-[45px] animate-rotation"/>
            </div>

          <form className="flex flex-col  w-full items-center  sm:px-9 px-3 sm:gap-y-5 gap-y-3 mb-6" onSubmit={SubmitForm}>
            <div className="w-full text-center px-7">
              <p>Staff id :</p>
              <input type="text"  name="staff_id" className={`bg-inputcolor w-full  mt-1 px-3 py-2 h-[43px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block ${isloading? 'brightness-75': ''}  rounded-lg sm:text-sm focus:ring-1`} onChange={inputchange} value={formstate.staff_id} disabled={isloading}/>            </div>

            <div className="w-full text-center px-7">
              <p >email :</p>
              <input type="text"  name="email" className={`bg-inputcolor w-full  mt-1 px-3 py-2 h-[43px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-lg ${isloading? 'brightness-75': ''} sm:text-sm focus:ring-1`} onChange={inputchange} value={formstate.email} disabled={isloading}/>
            </div>

            <div className="w-full text-center  px-7">
              <p>password:</p>
              <div className="relative">
              <input type={cansee ? 'text' : "password"}  name="password" className={`bg-inputcolor w-full  mt-1 px-3 py-2 h-[43px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block ${isloading? 'brightness-75': ''}  rounded-lg sm:text-sm focus:ring-1`} onChange={inputchange} value={formstate.password} disabled={isloading}/>
              {cansee ? eyeclosed : eyeopen}
  
              </div>
            </div>
  
  
  
            <div className="w-full text-center  px-7">
              <p>Confirm password:</p>
              <div className="relative">
              <input type={confirmcansee ? 'text' : "password"}  name="confirm_password" className={`bg-inputcolor w-full  mt-1 px-3 py-2 h-[43px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  ${isloading? 'brightness-75': ''} rounded-lg sm:text-sm focus:ring-1`} onChange={inputchange} value={formstate.confirm_password} disabled={isloading}/>
              {confirmcansee ? eyeclosed2 : eyeopen2}
  
              </div>
            </div>
         <div className="flex flex-col items-center gap-y-3">
         <button className="py-4 px-7 restext bg-buttoncolor rounded-[17px]" disabled={isloading}>{isloading ? loadingicon :"Sign Up"}</button>
         <p>Already have Account ? <span className="text-buttoncolor">Log in</span></p>
         </div>
          

            
  
          </form>
        </div>
         
      </div>
      )
}