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
import { UpdateImg,LogoutDepartment } from "../reducers/Auth"
import { useDispatch, useSelector } from "react-redux"
import { Useaxios } from "../utils/axiosinstance"
import { useNavigate } from "react-router-dom"
import navicon9 from "../Images/49855_closed_padlock_icon 1.svg"
import { Navbar } from "./Dashboard"
import { Link } from "react-router-dom"
import moment from "moment"
import icon10 from "../Images/10132037_image_circle_plus_line_icon 1.png"
import icon11 from "../Images/icons8-right-arrow-24 3.png"


export const Depassets = () => {
  const [showresnav, setshowresnav] = React.useState(false)
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
    Changingpassword : false
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const axiis = Useaxios()
  const Authdetails = useSelector(state => state.Authdetails)
  const AuthDepartmentdetails = useSelector(state => state.AuthDepartmentdetails)
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
  
 }


  let div = ''

  let message = ''

  if(errortype.Updateimage){
    message = "Check Image Uploaded or network"
  }
  if(errortype.departments){
    message = "Check Internet Connection"
  }
  if(errortype.Changingpassword){
    message = "check internet Connection"
  }

  const loading_icon = <div className="w-full h-[60%] flex flex-col gap-y-2 justify-center items-center"> 
  <svg xmlns="http://www.w3.org/2000/svg" className="sm:w-[50px] w-[36px]" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path><circle cx={12} cy={2.5} r={1.5} fill="currentColor"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></circle></svg>

                <p className="sm:text-[25px] text-[16px]">Loading Assets .......</p>
                </div>


  let loadingicon = <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
<path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path>
</svg>



  React.useEffect(()=>{
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
                    <li className=" opacity-0 p-4 flex gap-x-3 hidden-div rounded-l-[20px] rounded-t-[20px] rounded-r-none items-center"></li>
                    <Link to={`/department/${AuthDepartmentdetails.id}`}  className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center"> <img src={navicon1} className="w-[29px] h-[29px]" alt="dashboard icon"/>  <p className="hidden-item">Dashboard</p></Link>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center" style={{backgroundColor : AuthDepartmentdetails.color}}> <img src={navicon2} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Assets</p> </li> 
                    <Link to={`/activity/${AuthDepartmentdetails.id}`} className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]   items-center" > <img src={navicon7} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Activity</p></Link>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start  w-[87%] opacity-0  items-center"> <img src={navicon3} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Setup</p></li>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%] opacity-0   items-center"> <img src={navicon4} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Help</p> </li>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  opacity-0   items-center"> <img src={navicon5} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item"> Requests</p></li>
     

                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center" onClick={()=>{dispatch(LogoutDepartment())}}> <img src={navicon6} className="w-[29px] h-[29px]" alt="dashboard icon"/>  <p className="hidden-item">Logout</p></li>
                </div>
            </div>
            <div className={`w-[80vw] flex gap-y-9 flex-col p-6 z-10`} style={{backgroundColor : `${AuthDepartmentdetails.color}`}}>
              <div>
                <h1 className="sm:text-[28px] text-[18px]">{AuthDepartmentdetails.department_name}</h1>
                <span className="sm:text-[19px] text-[12px]"> You last logged in : {moment().format('D[,] MMMM YYYY')}</span>
                </div>
              
              <div className="ps-3  h-[70%] pt-3  flex gap-x-[3rem]  max-[600px]:justify-center content-start flex-wrap overflow-y-auto gap-y-12 specdiv">
                {/* TASK OBJECT */}
                <div className="bg-[#FCF8F5]  rounded-[20px] flex sm:gap-x-20 gap-x-5  mb-7  shadow-shadowcolour shadow-md p-3 relative ">
                  {/* Firstdiv */}
                     <div className="flex flex-col gap-y-4">
                          <h1 className="sm:text-[20px] text-[10px]">Total Bunk Beds In mary hall</h1>
                          <h1 className="text-center w-full sm:text-[26px] text-[15px]">350</h1>
                          <div className="p-4 shadow-shadowcolour shadow-lg rounded-[20px] sm:text-[16px] text-[8px] ">
                            <p>Last Edited by 2001110033</p>
                            <p>-Removed 20 items</p>
                            <div>
                                <img src={icon11} className="sm:w-[28px] sm:h-[28px] w-[18px] h-[18px] ms-auto" alt="plusicon"/>
                            </div>
                          </div>
                     </div>

                    {/* ?End of first div */}

                    {/* SecondDiv */}
                    <div className="flex flex-col justify-between">
                    
                      <img src={icon10} className="sm:w-[32px] sm:h-[32px] w-[22px] h-[22px]  ms-auto" alt="glass plus icon"/>

                      <div className="flex flex-col gap-y-2 sm:text-[16px] text-[8px]">
                        <button className="bg-[#59D2DA] p-2 rounded-[20px]">Comment</button>
                        <button className="bg-[#59D2DA] p-2 rounded-[20px]">Update</button>
                      </div>
                    </div>

                    {/* END OF SECOND DIV */}
                </div>
                {/* END TASK OBJEct */}

                 
               {/* TASK OBJECT */}
               <div className="bg-[#FCF8F5]  rounded-[20px] flex sm:gap-x-20 gap-x-5  mb-7  shadow-shadowcolour shadow-md p-3 relative ">
                  {/* Firstdiv */}
                     <div className="flex flex-col gap-y-4">
                          <h1 className="sm:text-[20px] text-[10px]">Total Bunk Beds In mary hall</h1>
                          <h1 className="text-center w-full sm:text-[26px] text-[15px]">350</h1>
                          <div className="p-4 shadow-shadowcolour shadow-lg rounded-[20px] sm:text-[16px] text-[8px] ">
                            <p>Last Edited by 2001110033</p>
                            <p>-Removed 20 items</p>
                            <div>
                                <img src={icon11} className="sm:w-[28px] sm:h-[28px] w-[18px] h-[18px] ms-auto" alt="plusicon"/>
                            </div>
                          </div>
                     </div>

                    {/* ?End of first div */}

                    {/* SecondDiv */}
                    <div className="flex flex-col justify-between">
                    
                      <img src={icon10} className="sm:w-[32px] sm:h-[32px] w-[22px] h-[22px]  ms-auto" alt="glass plus icon"/>

                      <div className="flex flex-col gap-y-2 sm:text-[16px] text-[8px]">
                        <button className="bg-[#59D2DA] p-2 rounded-[20px]">Comment</button>
                        <button className="bg-[#59D2DA] p-2 rounded-[20px]">Update</button>
                      </div>
                    </div>

                    {/* END OF SECOND DIV */}
                </div>
                {/* END TASK OBJEct */}

                 
                   {/* TASK OBJECT */}
                <div className="bg-[#FCF8F5]  rounded-[20px] flex sm:gap-x-20 gap-x-5  mb-7  shadow-shadowcolour shadow-md p-3 relative ">
                  {/* Firstdiv */}
                     <div className="flex flex-col gap-y-4">
                          <h1 className="sm:text-[20px] text-[10px]">Total Bunk Beds In mary hall</h1>
                          <h1 className="text-center w-full sm:text-[26px] text-[15px]">350</h1>
                          <div className="p-4 shadow-shadowcolour shadow-lg rounded-[20px] sm:text-[16px] text-[8px] ">
                            <p>Last Edited by 2001110033</p>
                            <p>-Removed 20 items</p>
                            <div>
                                <img src={icon11} className="sm:w-[28px] sm:h-[28px] w-[18px] h-[18px] ms-auto" alt="plusicon"/>
                            </div>
                          </div>
                     </div>

                    {/* ?End of first div */}

                    {/* SecondDiv */}
                    <div className="flex flex-col justify-between">
                    
                      <img src={icon10} className="sm:w-[32px] sm:h-[32px] w-[22px] h-[22px]  ms-auto" alt="glass plus icon"/>

                      <div className="flex flex-col gap-y-2 sm:text-[16px] text-[8px]">
                        <button className="bg-[#59D2DA] p-2 rounded-[20px]">Comment</button>
                        <button className="bg-[#59D2DA] p-2 rounded-[20px]">Update</button>
                      </div>
                    </div>

                    {/* END OF SECOND DIV */}
                </div>
                {/* END TASK OBJEct */}

                   {/* TASK OBJECT */}
                <div className="bg-[#FCF8F5]  rounded-[20px] flex sm:gap-x-20 gap-x-5  mb-7  shadow-shadowcolour shadow-md p-3 relative ">
                  {/* Firstdiv */}
                     <div className="flex flex-col gap-y-4">
                          <h1 className="sm:text-[20px] text-[10px]">Total Bunk Beds In mary hall</h1>
                          <h1 className="text-center w-full sm:text-[26px] text-[15px]">350</h1>
                          <div className="p-4 shadow-shadowcolour shadow-lg rounded-[20px] sm:text-[16px] text-[8px] ">
                            <p>Last Edited by 2001110033</p>
                            <p>-Removed 20 items</p>
                            <div>
                                <img src={icon11} className="sm:w-[28px] sm:h-[28px] w-[18px] h-[18px] ms-auto" alt="plusicon"/>
                            </div>
                          </div>
                     </div>

                    {/* ?End of first div */}

                    {/* SecondDiv */}
                    <div className="flex flex-col justify-between">
                    
                      <img src={icon10} className="sm:w-[32px] sm:h-[32px] w-[22px] h-[22px]  ms-auto" alt="glass plus icon"/>

                      <div className="flex flex-col gap-y-2 sm:text-[16px] text-[8px]">
                        <button className="bg-[#59D2DA] p-2 rounded-[20px]">Comment</button>
                        <button className="bg-[#59D2DA] p-2 rounded-[20px]">Update</button>
                      </div>
                    </div>

                    {/* END OF SECOND DIV */}
                </div>
                {/* END TASK OBJEct */}

                 

              
              </div>


               
               

            </div>

        </div>
     </div>
     )
}