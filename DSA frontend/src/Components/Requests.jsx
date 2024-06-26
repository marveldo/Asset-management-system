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
import icon from "../Images/619551_add_correct_done_go_ok_icon 1.svg"


export const Request = () => {
  const [showresnav, setshowresnav] = React.useState(false)
  const [data, setdata] = React.useState(null)
  const params = useParams()
  const id = params.InstitutionId
  const [imgform, setimgform] = React.useState(null)
  const [imgsubmittingform , setimgsubmittingform] = React.useState(null)
  const [imgformdiv, setimgformdiv] = React.useState(false)
  const [showdiv, setshowdiv] = React.useState(false)
  const [idto,setid] = React.useState(null)
  const [requestloading , setrequestloading] = React.useState(false)
  const [showextranav, setshowextranav] = React.useState(false)
  const [isloading, setloading] = React.useState(true)
  const [imgloading, setimgloading] = React.useState(false)
  const [error , seterror] = React.useState(false)
  const [showapprovedmessage, setshowapprovedmessage] = React.useState(false)
  const [errortype, seterrortype] = React.useState({
    Updateimage : false,
    Changingpassword : false,
    requests: false,
    updaterequests: false
 })
 const [showapprovalmessage, setshowapprovalmessage] = React.useState(false)
 
  
  const dispatch = useDispatch()


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
  if(errortype.requests){
    Querybackend()
    seterrortype(prev => ({
      ...prev,
      requests : false
    }))
  }
  if(errortype.updaterequests){
    seterrortype(prev => ({
      ...prev,
      updaterequests : false
    }))
  }


  
 }

 const Querybackend = async() => {
      if(!isloading){
        setloading(true)
      }
      try{
         const response = await axiis.get(`/Institution/${id}/`)
         setdata(response.data)
      
      }
      catch(error){
        seterror(true)
        seterrortype(prev => ({
          ...prev,
          requests : true
        }))


      }
      finally{
        setloading(false)
      }
 }


 let requests = ''

 const setApproval = (id) =>{
  setshowextranav(false)
  setshowdiv(true)
  setid(id)
  setshowapprovalmessage(true)
  
}

const noclicked = () => {
  setid(null)
  setshowdiv(false)
  setshowapprovalmessage(false)
}

const yesclicked = async() => {
  setrequestloading(true)
  console.log(idto)
  try{
    const response = await axiis.put(`/Requests/${idto}/`,{is_approved : true})
    setshowapprovalmessage(false)
    setshowapprovedmessage(true)
    setdata(prev => ({
      ...prev,
      requests : prev.requests.filter((item) => item.id !== idto )
    }))
    setid(false)
    const timeoutid = setTimeout(()=> {
      setshowapprovedmessage(false)
      setshowdiv(false)
      return () => clearTimeout(timeoutid)
    }, [2000])

    

  }
   catch(error){
    seterror(true)
    seterrortype((prev)=>({
      ...prev,
      updaterequests : true
    }))
   }
   finally{
    setrequestloading(false)
   }
}
 if(data){
  if(data.requests.length >= 1){
  requests = data.requests.map((obj) => {
    return(
      <div key={obj.id} className="w-[219px] departmentdiv rounded-[20px] sm:h-[150px] h-[115px] mb-7  bg-white shadow-shadowcolour shadow-lg p-3 relative z-20" onClick={()=>{setApproval(obj.id)}}>

      <p className="sm:text-[17px] text-[10px] text-[#F4B617] mb-3">{obj.request_info}-{obj.department_name}</p>

      
     
      <span className="sm:text-[17px] text-[10px]">made by {obj.user.staff_id}</span>
  
  
      <div className="absolute p-4 right-0 bottom-0">
          <img src={icon11} className="sm:w-[28px] sm:h-[28px] w-[18px] h-[18px]" alt="plusicon"/>
      </div>
  
     
  </div>
    )
  })
}
else{
  requests =<div className="h-full w-full pt-28 flex justify-center">
  No Requests to display
</div>
}
 }
 else{
  requests = ''
 }

 
 let divs =   <div className={`px-3 h-[70%] pt-3 flex gap-x-6 max-[600px]:justify-center content-start flex-wrap overflow-y-auto gap-y-16 specdiv`}>
    {requests}
   
</div>   






 


  

  let message = ''

  if(errortype.Updateimage){
    message = "Check Image Uploaded or network"
  }
  
  if(errortype.Changingpassword){
    message = "check internet Connection"
  }
  if(errortype.requests){
    message = "Check Internet connection"
  }
  if(errortype.updaterequests){
    message = "Check Internet connection"
  }

  const Disapprovedclicked = async() => {
    setrequestloading(true)
    try{
      const response = await axiis.delete(`/Requests/${idto}/`)
      setshowapprovalmessage(false)
      setshowdiv(false)
      setdata(prev => ({
        ...prev,
        requests : prev.requests.filter((item) => item.id !== idto )
      }))
      setid(false)
    }catch(error){
      seterror(true)
      seterrortype(prev => ({
        ...prev,
        updaterequests : true
      }))
    }finally{
      setrequestloading(false)
    }
  }



  let loadingicon = <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
<path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path>
</svg>

const loading_icon = <div className="w-full h-[60%] flex flex-col gap-y-2 justify-center  items-center"> 
<svg xmlns="http://www.w3.org/2000/svg" className="sm:w-[50px] w-[36px]" viewBox="0 0 24 24"><path fill="#19327b" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.5}></path><path fill="#19327b" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.975s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>

              <p className="sm:text-[25px] text-[16px]">Loading Requests.......</p>
              </div>

  React.useEffect(()=>{
    Querybackend()
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

        <div className={`flex flex-col justify-center relative rounded-[20px] py-5 px-10 items-center gap-y-5 ${showapprovalmessage? '': 'hidden'} bg-white `}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-3" onClick={noclicked}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
          <p>Approve This Request ?</p>

          <div className="flex gap-x-5">
            <button className="bg-[#59D2DA] py-3 px-5 rounded-[20px]" onClick={yesclicked} disabled={requestloading}>{requestloading? loadingicon : 'Approve'}</button>
            <button className="bg-[#59D2DA] py-3 px-5 rounded-[20px]" onClick={Disapprovedclicked}  disabled={requestloading}>{requestloading ? loadingicon : 'Disapprove'}</button>
          </div>

        </div>

        <div className={`bg-white p-4 flex flex-col rounded-[20px] items-center ${showapprovedmessage? '' : 'hidden'} text-center gap-y-8`}>
                   <img src={icon} className="w-[40px] h-[40px]" alt="done"/>
                   <div className="flex gap-x-6 w-full justify-center">
                 Your approval has been sent!!
                   </div>
                </div>

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
                    <Link to={`/setup/${id}/`} className="p-4 flex gap-x-3  rounded-l-[20px] justify-start  w-[87%] items-center"> <img src={navicon3} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Setup</p></Link>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center"> <img src={navicon4} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Help</p> </li>
                    <li className={`p-4 flex gap-x-3 ${Authdetails.is_admin ? '' : 'hidden'}   rounded-l-[20px] justify-start w-[87%]  bg-dashboardcolor items-center`}> <img src={navicon5} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item"> Requests</p></li>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%] opacity-0  items-center"> <img src={navicon2} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Assets</p> </li> 
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  opacity-0 items-center" > <img src={navicon7} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Activity</p></li>

                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center" onClick={()=>{dispatch(Logoutuser())}}> <img src={navicon6} className="w-[29px] h-[29px]" alt="dashboard icon"/>  <p className="hidden-item">Logout</p></li>
                  {/* Might not Be changed*/}

                </div>
            </div>
            <div className="w-[80vw] bg-dashboardcolor flex flex-col pb-12 gap-y-2 z-10">
                <h1 className="sm:text-[32px] text-[23px] ms-6 mt-4">Requests</h1>


                {isloading? loading_icon :divs}
               

            </div>

        </div>
     </div>
     )
}