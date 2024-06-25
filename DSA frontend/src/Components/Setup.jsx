import React from "react"
import searchicon from "../Images/8581125_magnifier_magnifying glass_magnifying_view_search_icon 4.svg"
import navicon1 from "../Images/8399337_dashboard_meter_statistics_icon 1.svg"
import navicon2 from "../Images/9043946_asset_confirm_icon 1.svg"
import navicon3 from "../Images/icons8-setup-24 1.svg"
import navicon4  from "../Images/5349749_faq_faqs_help_info_information_icon 1.svg"
import navicon5 from "../Images/icons8-request-32 1.svg"
import navicon6 from "../Images/4280468_log_out_outlined_logout_sign out_icon 1.svg"
import navicon7 from "../Images/8541611_calendar_schedule_event_date_icon 1.svg"
import plusicon from "../Images/icons8-plus-50 1.svg"
import polygon from "../Images/Polygon 1.svg"
import { Logoutuser,UpdateImg } from "../reducers/Auth"
import { useDispatch, useSelector } from "react-redux"
import { Useaxios } from "../utils/axiosinstance"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import navicon9 from "../Images/49855_closed_padlock_icon 1.svg"
import { Navbar } from "./Dashboard"
import icon11 from "../Images/icons8-right-arrow-24 3.png"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"


export const Setup = () => {
  const [showresnav, setshowresnav] = React.useState(false)
  const location = useLocation()
  const [formdiv, setformdiv] = React.useState(location.state?.formdiv ? location.state?.formdiv : false)
  const params = useParams()
  const id = params.InstitutionId
  const [formstate, setformstate] = React.useState({
    Institution : id,
    department_name : '',
    color : '',
    password : '',
    confirm_password : ''
  })
  const [index, setindex] =React.useState(null)
  const [imgform, setimgform] = React.useState(null)
  const [imgsubmittingform , setimgsubmittingform] = React.useState(null)
  const [imgformdiv, setimgformdiv] = React.useState(false)
  const [showdiv, setshowdiv] = React.useState(false)
  const [showextranav, setshowextranav] = React.useState(false)
  const [isloading, setloading] = React.useState(false)
  const [imgloading, setimgloading] = React.useState(false)
  const [error , seterror] = React.useState(false)
  const [errortype, seterrortype] = React.useState({
    Updateimage : false,
    Changingpassword : false,
    passwordvalidation : false,
    Createdepartment : false,
    emptyfields : false

  })
 const [drafts, setdrafts] = React.useState(null)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const axiis = Useaxios()
  const Authdetails = useSelector(state => state.Authdetails)
  const handleoiconclick = () => {
    setshowresnav(prev => !prev)
    setshowextranav(false)
  }
 const handleprofileclick = ()=> {
  setshowextranav(prev => !prev)
  setshowresnav(false)
}

const clickPopupdiv =() => {
    setshowdiv(false)
    if(imgformdiv){
      setimgformdiv(false)
      setimgform(null)
      setimgsubmittingform(null)
    }
}
 
const clickprofilepicture = () => {
  setshowdiv(true)
  setimgformdiv(true)
  setshowextranav(false)
}

const Changeform = (event) => {
  const {name, value} = event.target

  setformstate(prev => ({
    ...prev,
    [name]: value
  }))

}

const changeimgform = (event) => {
  const file = event.target.files[0]
  setimgsubmittingform(file)

  
  if (file && file.type.startsWith('image/')){
    const reader = new FileReader()
    reader.onloadend = () => {
      setimgform(reader.result)
    }
    reader.readAsDataURL(file)
  }
  else{
    alert('please select an image file')
  }

}
  const GetCurrentImg = async() => {
    try{
     const response = await axiis.get('/Userviewset/me/')
     dispatch(UpdateImg(response.data))

    }catch(error){
     console.error(error)
    }
  }

 

  const Updatebackendimg = async(e) => {
    e.preventDefault()
    try{
      setimgloading(true)
      const response = await axiis.put('/Userviewset/me/', {user_img : imgsubmittingform })
      dispatch(UpdateImg(response.data))
      clickPopupdiv()


    }
    catch(error){
      console.error(error)
      seterror(true)
      seterrortype(prev => {
        return({
          ...prev,
          Updateimage : true
        })
      })
    }
    finally{
      setimgloading(false)
      
    }
  }

 const clickTryagain = () => {
  seterror(false)
  if(errortype.Updateimage){
    seterrortype(prev=>{
      return({
        ...prev,
        Updateimage : false
      })
    })
  }
  if(errortype.passwordvalidation){
    seterrortype(prev =>({
      ...prev,
      passwordvalidation : false
    }))
  }
  if(errortype.emptyfields){
    seterrortype(prev =>({
      ...prev,
      emptyfields : false
    }))
  }

  
 }

 const SubmittoBackend = async() => {
   setloading(true)
   if(Authdetails.is_admin){
    try{
      const response = await axiis.post('/Departments/',formstate)
      if(response.status == 201){
         navigate(`/dashboard/${id}`)
      }
     }
    catch(error){
      console.error(error)
      seterror(true)
      seterrortype(prev => ({
        ...prev,
        Createdepartment : true
      }))
    }
    finally{
      setloading(false)
    }
    }
    else{
      

    }
  }



 const FormSubmit = () => {
  if(formstate.password !== formstate.confirm_password){
    seterror(true)
    seterrortype(prev => ({
      ...prev,
      passwordvalidation : true
    }))
 }
 if(formstate.department_name === '' || formstate.password ==='' || formstate.confirm_password === '' || formstate.color === ''){
  seterror(true)
  seterrortype(prev => ({
    ...prev,
    emptyfields : true
  }))
}
else{
   SubmittoBackend()
}
 }

 const setdraft = (index, obj) => {
  setindex(index)
  setformstate(prev => ({
    ...prev,
    department_name : obj.department_name,
    color : obj.color,
    password : obj.password,
    confirm_password : obj.confirm_password
  }))
  setformdiv(true)
 }

 const SaveAsDraft = () => {
  const Drafts = JSON.parse(localStorage.getItem('drafts'))
  if(Drafts){
  if(index !== null){
       Drafts[index].department_name = formstate.department_name
       Drafts[index].color = formstate.color
       Drafts[index].password = formstate.password
       Drafts[index].confirm_password = formstate.confirm_password
     
       localStorage.setItem('drafts',JSON.stringify(Drafts))
       setdrafts(Drafts)
       
       setformstate(prev => ({
        ...prev,
        department_name : '',
        password : '',
        confirm_password : ''
}))
        setformdiv(false)
        setindex(null)
  }
  if(index === null){
      Drafts.push(formstate)
  
      localStorage.setItem('drafts',JSON.stringify(Drafts))
      setdrafts(Drafts)
      setformstate(prev => ({
          ...prev,
          department_name : '',
          password : '',
          confirm_password : ''
   }))
    setformdiv(false)
  }
  }
  else{
   
    localStorage.setItem('drafts', JSON.stringify([formstate]))
    setdrafts([formstate])
    setformstate(prev => ({
      ...prev,
      department_name : '',
      password : '',
      confirm_password : ''
     }))
     setformdiv(false)
  }
 }

 


  

  let message = ''

  if(errortype.Updateimage){
    message = "Check Image Uploaded or network"
  }
  
  if(errortype.Changingpassword){
    message = "check internet Connection"
  }
  if(errortype.passwordvalidation){
    message = "Passwords dont match"
  }
  if(errortype.Createdepartment){
    message = "Failed Check connection"
  }
  if(errortype.emptyfields){
    message = "No field can be empty"
  }


  let loadingicon = <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
<path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path>
</svg>


let drafts_list = ''



if(drafts){
   drafts_list = drafts.map((obj,index )=> {
    return(
      <div key={index} className="w-[219px] departmentdiv rounded-[20px] sm:h-[150px] h-[115px] mb-7  bg-white shadow-shadowcolour shadow-lg p-3 relative z-20" onClick={()=>{setdraft(index, obj)}}>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-3 z-30 " onClick={(event)=> {deletedrafts(index, event)}}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
          <p className="sm:text-[20px] text-[16px] text-[#F4B617]">Draft</p>
          <p className="sm:text-[17px] text-[10px]">Department name :</p>
          <span className="sm:text-[17px] text-[10px]">{obj.department_name}</span>
  
  
          <div className="absolute p-4 right-0 bottom-0">
              <img src={icon11} className="sm:w-[28px] sm:h-[28px] w-[18px] h-[18px]" alt="plusicon"/>
          </div>
  
         
      </div>
    )
  })
}

const deletedrafts = (index, event) => {
  
  const filtered_drafts = drafts.filter((item, i) => i !== index)
  setdrafts(filtered_drafts)
  localStorage.setItem('drafts', JSON.stringify(filtered_drafts))
  event.stopPropagation(); 
 }

const clickcancel = ()=>{
  setformdiv(false)
  setformstate(prev => ({
    ...prev,
    department_name : '',
    color : '',
    password : '',
    confirm_password : ''
  }))
  setindex(null)
}

let div = <div className="px-3 h-[70%] pt-3 flex gap-x-6 max-[600px]:justify-center content-start flex-wrap overflow-y-auto gap-y-16 specdiv">
<div className="w-[219px] departmentdiv rounded-[20px] sm:h-[150px] h-[115px] mb-7  bg-white shadow-shadowcolour shadow-lg p-3 relative" onClick={()=>{setformdiv(true)}}>
        <p className="sm:text-[24px] text-[19px]">Add your </p>
        <span className="sm:text-[24px] text-[19px]">Department</span>

        <div className="absolute p-4 right-0 bottom-0">
            <img src={plusicon} className="sm:w-[48px] sm:h-[48px] w-[38px] h-[38px]" alt="plusicon"/>
        </div>

       
    </div>
  {/* TO BE LOOPED */}
    {drafts_list}
  
    {/* END OF TO BE LOOPED */}
</div>



let div2 =<div className="w-full h-full flex flex-col gap-y-4 items-center">
  <div className="h-[75%] sm:w-[85%] w-[95%] bg-[#FCF8F5] rounded-[20px] relative shadow-shadowcolour shadow-lg py-4 flex flex-col items-center justify-between">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-3" onClick={clickcancel}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
    {/* BEGINNING OF FIELDS */}
    <div className="flex flex-col gap-y-1 text-center sm:w-[40%] w-[80%]">
        <p>Name of department</p>
        <input name="department_name" value={formstate.department_name} type="text" className=" h-[45px] shadow-[#00000040] shadow-md focus:outline-none p-3" onChange={Changeform} required disabled={isloading}/>

    </div>

    <div className="flex flex-col gap-y-1 text-center sm:w-[40%] w-[80%]">
        <p>Pick A colour</p>
        <select id="mySelect" name="color" value={formstate.color} className=" h-[45px] shadow-[#00000040]  shadow-md focus:outline-none p-3" onChange={Changeform} required disabled={isloading}>
                   <option value="" >Select A colour</option>
                    <option value="red">Red</option>
                     <option  value="yellow">Yellow</option>
                    <option  value="blue">Blue</option>
                    <option  value="indigo">Indigo</option>
                    <option value="orange">Orange</option>
                    <option  value="purple">Purple</option>
                    <option  value="green">Green</option>
</select>

    </div>

    <div className="flex flex-col gap-y-1 text-center sm:w-[40%] w-[80%]">
        <p>Password</p>
        <input name="password" value={formstate.password} type="password" className=" h-[45px] shadow-[#00000040] shadow-md focus:outline-none p-3" onChange={Changeform} required disabled={isloading}/>

    </div>

    <div className="flex flex-col gap-y-1 text-center sm:w-[40%] w-[80%]">
        <p>Confirm Password</p>
        <input name="confirm_password" value={formstate.confirm_password} type="password" className=" h-[45px] shadow-[#00000040] shadow-md focus:outline-none p-3" onChange={Changeform} required disabled={isloading}/>

    </div>
    {/* END OF FIELDS */}
    </div>
    <div className="sm:w-[68%] w-[100%]  flex justify-between">
      <button className="rounded-[20px] bg-[#59D2DA] p-3" onClick={SaveAsDraft}>Save as draft</button>
      <button className="rounded-[20px] bg-[#59D2DA] p-3" onClick={FormSubmit}>{isloading ? loadingicon : 'Complete'}</button>
    </div>
    </div> 



  React.useEffect(()=>{
    setdrafts(JSON.parse(localStorage.getItem('drafts')))
    GetCurrentImg()
  },[])

     return( 
     <div className="h-[100vh] main-body  bg-white relative">

<div className={`${error? '':'hidden'} absolute top-0 h-[100vh] w-full flex  justify-center z-50 items-center bg-shadowcolour`}>
          <div className={`${error? 'flex animate__animated animate__shakeY': 'hidden'} flex-col items-center bg-white py-9 px-20 text-center gap-y-5 rounded-[18px] `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-20 text-red-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

   <p className="text-red-600 text-[23px]">Sorry :( </p>

   <p>{message}</p>

   <button className="bg-red-600 text-white p-3 rounded-[12px]" onClick={clickTryagain}>Try again</button>
          </div>
        </div>
      {/* IMAGINARY DIV */}
      <div className={`h-[100vh] absolute ${showdiv ? 'flex':'hidden'}  top-0 w-full  justify-center items-center bg-shadowcolour z-40`}>
        <form className={`bg-white py-3 px-8 ${imgformdiv ? 'flex':'hidden'} text-center flex-col relative gap-y-5 items-center rounded-[14px]`} onSubmit={Updatebackendimg} encType="multipart/form-data">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-3" onClick={clickPopupdiv}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

          <h1>Change Profile picture</h1>
          {imgform && <img src={imgform} className="rounded-full sm:w-[60px] w-[60px] h-[60px]"/>}
          <input type="file" id="uploadImg" placeholder="Upload image" className="hidden" onChange={changeimgform}/>
          <label htmlFor="uploadImg" className="py-2 px-14 bg-buttoncolor rounded-[14px]">Upload Img</label>

          <button className="p-3 bg-buttoncolor rounded-[20px]">{imgloading ? loadingicon : 'Submit'}</button>
        </form>
      </div>

      {/* END OF IMAGINARY DIV */}
      
        <Navbar clickicon={handleoiconclick} img={Authdetails.img} clickprofile={handleprofileclick}/>
        <div className="flex h-[100vh] relative">

        <div className={`absolute top-[-18px] right-12 ${showresnav? 'resnavdiv animate__animated animate__faster animate__bounceInDown' : 'hidden'} z-50 `}>
                    <div className='py-5 px-12 flex flex-col gap-y-3 relative items-center bg-navcolour  rounded-[20px]'>
                    <img src={polygon} alt="decision barrier" className='absolute right-0 top-[-7px] rotate-[16deg]'/>
                    
                    <img src={Authdetails.img} alt='sort icon' className=' w-[50px] h-[50px] rounded-full' onClick={handleprofileclick} />

                    <div className=" p-0 bg-searchlogocolorn rounded-full">
              <img src={searchicon} alt="search logo"/>
              </div>
                    </div>
                </div>
          <div className={`absolute top-[-18px] right-12 ${showextranav? ' flex' : 'hidden' } z-50 bg-white rounded-[14px] flex-col gap-y-3 shadow-shadowcolour shadow-lg`}>
            <div className="w-full flex items-center hover:bg-slate-200  pt-3 px-3 pb-1 rounded-t-[14px] " onClick={clickprofilepicture}>
                  <div className="p-3 rounded-full bg-searchlogocolorn sm:me-7 me-3">
                    <img src={plusicon} className="sm:w-[20px] w-[14px]"/>
                  </div>
                  <div>Change profile picture</div>
             </div>

             <div className="w-full flex items-center hover:bg-slate-200  pb-3 px-3 pt-1 rounded-b-[14px] ">
                  <div className="p-3 rounded-full bg-searchlogocolorn  sm:me-7 me-3 ">
                    <img src={navicon9} className="sm:w-[20px] w-[14px]"/>
                  </div>
                  <div>Change password</div>
             </div>


          </div>

          
            <div className="w-[20vw] z-10">
            <div className="h-[75%] flex flex-col items-end justify-between list-none">
               {/* To Be changed Later On*/}
                    <li className=" opacity-0 p-4 flex gap-x-3 hidden-div rounded-l-[20px] rounded-t-[20px] rounded-r-none items-center"></li>
                    <Link to={`/dashboard/${id}/`} className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center"> <img src={navicon1} className="w-[29px] h-[29px]" alt="dashboard icon"/>  <p className="hidden-item">Dashboard</p></Link>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start  bg-dashboardcolor w-[87%] items-center"> <img src={navicon3} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Setup</p></li>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center"> <img src={navicon4} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Help</p> </li>
                    <li className={`p-4 flex gap-x-3 ${Authdetails.is_admin ? '' : 'hidden'}   rounded-l-[20px] justify-start w-[87%] items-center`}> <img src={navicon5} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item"> Requests</p></li>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%] opacity-0  items-center"> <img src={navicon2} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Assets</p> </li> 
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  opacity-0 items-center" > <img src={navicon7} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Activity</p></li>

                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center" onClick={()=>{dispatch(Logoutuser())}}> <img src={navicon6} className="w-[29px] h-[29px]" alt="dashboard icon"/>  <p className="hidden-item">Logout</p></li>
                  {/* Might not Be changed*/}
                </div>
            </div>
            <div className="w-[80vw] bg-dashboardcolor flex flex-col pb-12  z-10">
                <h1 className="sm:text-[32px] text-[23px] ms-6 mt-4">Setup</h1>


                {formdiv? div2 : div}
               

            </div>

        </div>
     </div>
     )
}