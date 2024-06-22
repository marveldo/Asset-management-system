import React from "react"
import cover from "../Images/cover 1.png"
import searchicon from "../Images/8581125_magnifier_magnifying glass_magnifying_view_search_icon 4.svg"
import navicon1 from "../Images/8399337_dashboard_meter_statistics_icon 1.svg"
import navicon2 from "../Images/9043946_asset_confirm_icon 1.svg"
import navicon3 from "../Images/icons8-setup-24 1.svg"
import navicon4  from "../Images/5349749_faq_faqs_help_info_information_icon 1.svg"
import navicon5 from "../Images/icons8-request-32 1.svg"
import navicon6 from "../Images/4280468_log_out_outlined_logout_sign out_icon 1.svg"
import navicon7 from "../Images/8541611_calendar_schedule_event_date_icon 1.svg"
import plusicon from "../Images/icons8-plus-50 1.svg"
import moment from "moment"
import icon from '../Images/icons8-menu-48 1.svg'
import polygon from "../Images/Polygon 1.svg"
import { Logoutuser,UpdateImg,LoginDepartment } from "../reducers/Auth"
import { useDispatch, useSelector } from "react-redux"
import { Useaxios } from "../utils/axiosinstance"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import navicon9 from "../Images/49855_closed_padlock_icon 1.svg"
import { Link } from "react-router-dom"




export const Navbar = (props) => {
    const [time, settime] = React.useState(moment().format('h:mm:ss a'))
    
     const intervalid = setInterval(()=>{
        settime(moment().format('h:mm:ss a'))
        return () => clearInterval(intervalid)
    }, 1000)

  
    return(
        <div className="py-4 flex items-center justify-between bg-white px-8">
               <img src={cover} alt= "cover image" className='  sm:w-[131px] sm:h-[52px] w-[81px] h-[32px] sm:me-6 me-2 '/>
              
              <div className=" relative navdiv">
              <input type="text" name="search" placeholder="Search..." className=" p-2 bg-searchcolor sm:w-[400px] w-[200px] h-[52px] rounded-[25px]"/>
              <div className="absolute right-1 top-0 p-0 bg-searchlogocolorn  rounded-full">
              <img src={searchicon} alt="search logo"/>
              </div>
                
              </div>

              <div className="text-center">
                <p className="sm:text-[26px] text-[19px]">{time}</p>
                <span className="sm:text-[14px] text-[12px]">{moment().format('dddd Do MMMM YYYY')}</span>
              </div>

              <div className="navdiv">
                 <img src={props.img} alt="add icon" className="sm:w-[70px] sm:h-[70px] w-[40px] h-[40px] rounded-full" onClick={props.clickprofile}/>
              </div>

              <img src={icon} alt='Navbar icon' className="img sm:ms-3" onClick={props.clickicon}/>
               
        </div>
    )
}


export const Dashboard = () => {
  const [showresnav, setshowresnav] = React.useState(false)
  const [data,setdata] = React.useState(null)
  const [imgform, setimgform] = React.useState(null)
  const [imgsubmittingform , setimgsubmittingform] = React.useState(null)
  const [imgformdiv, setimgformdiv] = React.useState(false)
  const [showdiv, setshowdiv] = React.useState(false)
  const [passworddiv, setpassworddiv] = React.useState(false)
  const [passwordformstate, setpasswordformstate] = React.useState({
    id : "",
    password : ""
  })
 
  const [cansee, setcansee] = React.useState(false)
  const [showextranav, setshowextranav] = React.useState(false)
  const [isloading, setloading] = React.useState(true)
  const [imgloading, setimgloading] = React.useState(false)
  const [error , seterror] = React.useState(false)
  const [errortype, seterrortype] = React.useState({
    departments: false,
    Updateimage : false,
    Changingpassword : false,
    departmentlogin : false,
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const id = params.InstitutionId
  const axiis = Useaxios()
  const Authdetails = useSelector(state => state.Authdetails)
  const Departmentdetails = useSelector(state => state.AuthDepartmentdetails)
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
    if(passworddiv){
      setpassworddiv(false)
      setpasswordformstate(prev=>{
        return({
          ...prev ,
          id : "",
          password : ""
        })
      })
      setloginformerrormessage('')
    }
}

const eyeclick = () => {
  setcansee(!cansee)
}
const setpasswordformchange = (event) => {
  const {name, value} = event.target
  setloginformerrormessage('')
  setpasswordformstate(prev => {
    return({
      ...prev,
      [name] : value
    })
  })
}
 


//For departments

const [islogindeoartmentloading, setlogindepartmentloading] = React.useState(false)
const [loginformerrormessage, setloginformerrormessage] = React.useState('')

const Clickdepartment = (id) => {
  if(id === Departmentdetails.id){
    navigate(`/department/${id}/`)
  }
  setshowdiv(true)
  setshowextranav(false)
  setpassworddiv(true)
   setpasswordformstate(prev => {
    return({
      ...prev,
      id : id
    })
   })
}


const DepartmentalSubmitForm = async(e) => {
  e.preventDefault();
  setlogindepartmentloading(true)
   try{
    const response = await axiis.post('Departments/login/', passwordformstate )
    dispatch(LoginDepartment(response.data))
    navigate(`/department/${response.data.id}`)

   }catch(error){
    
    if(error.response?.status == 401){
      setpasswordformstate(prev => {
        return({
          ...prev,
          password : ''
        })
      })
      setloginformerrormessage('Incorrect password')
    }
    else{
    seterror(true)
    seterrortype(prev => {
      
      return({
        ...prev,
        departmentlogin : true
      })
    })
   }
    
   }finally{
    setlogindepartmentloading(false)
   }
}

//End of Department

//For Images

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

  //End of Images

  const Getinstitution = async() => {
      if(!isloading){
        setloading(true)
      }
      try{
        const response = await axiis.get(`/Institution/${id}/`)
        setdata(response.data)
        

      }
      catch(error){
        console.error(error)
        seterror(true)
        seterrortype(prev => {
          return({
            ...prev,
             departments : true
          })
        })
      }
      finally{
        setloading(false)
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
  if(errortype.departments){
    Getinstitution()
    GetCurrentImg()
    seterrortype(prev => {
      return({
        ...prev,
        departments : false
      })
    })
  }
  if(errortype.departmentlogin){
    seterrortype(prev => {
      return({
        ...prev,
        departmentlogin : false
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
  if(errortype.departmentlogin){
    message = "Couldn't send request"
  }

  let eyeopen =      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 right-2" onClick={eyeclick}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

let eyeclosed =   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-2 right-2" onClick={eyeclick}>
<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>

  const loading_icon = <div className="w-full h-[60%] flex flex-col gap-y-2 justify-center  items-center"> 
  <svg xmlns="http://www.w3.org/2000/svg" className="sm:w-[50px] w-[36px]" viewBox="0 0 24 24"><path fill="#19327b" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.5}></path><path fill="#19327b" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.975s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>

                <p className="sm:text-[25px] text-[16px]">Loading Assets .......</p>
                </div>

  if (data){
    const user_present  = data.users.some(object => object.id === Authdetails.id)
    if(!user_present){
         navigate('/validate',{replace : true})
    }
    const departments = data.departments.map((object)=> {
      return(<div key={object.id} className={`w-[219px] rounded-[20px] h-[150px] mb-7  shadow-shadowcolour shadow-lg p-3 relative departmentdiv`} style={{background: `${object.color}`}} onClick={()=>{Clickdepartment(object.id)}}>
        <img src={object.department_profile} className="mb-1 rounded-full w-[40px] h-[40px]" alt="profile"/>
        <p className="sm:text-[20px] text-[18px]   ">{object.department_name}</p>
       </div>
   )
    })
    div =   <div className={`px-3 h-[70%] pt-3 flex gap-x-6 max-[600px]:justify-center content-start flex-wrap overflow-y-auto gap-y-16 specdiv`}>
    <div className="w-[219px] departmentdiv rounded-[20px] sm:h-[150px] h-[115px] mb-7  bg-white shadow-shadowcolour shadow-lg p-3 relative">
        <p className="sm:text-[24px] text-[19px]">Create my </p>
        <span className="sm:text-[24px] text-[19px]">Department</span>

        <div className="absolute p-4 right-0 bottom-0">
            <img src={plusicon} className="sm:w-[48px] sm:h-[48px] w-[38px] h-[38px]" alt="plusicon"/>
        </div>

       
    </div>
    {departments}
</div>       

  }
  else{
    div = ''
  }

  let loadingicon = <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
<path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path>
</svg>



  React.useEffect(()=>{
    GetCurrentImg()
    Getinstitution()
  },[])

     return( 
     <div className="h-[100vh] main-body  bg-white relative font-sans">
  {/* ERROR FORM BEGINNING */}
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
        {/* ERROR FORM ENDING */}
      {/* IMAGINARY FPRM INTRO*/}
      {/* IMAGINARY FORM */}
      <div className={`h-[100vh] absolute ${showdiv ? 'flex':'hidden'}  top-0 w-full  justify-center items-center bg-shadowcolour z-40`}>
        {/* PROFILE PICTURE UPDATE FORM */}
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
         {/* PROFILE PICTURE UPDATE FORM  END*/}
        {/* DEPARTMENT FORM BEGIN */}
        <form className={`bg-white py-3 px-8 ${passworddiv ? 'flex':'hidden'} text-center flex-col relative gap-y-5 items-center rounded-[14px]`} onSubmit={DepartmentalSubmitForm}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-3" onClick={clickPopupdiv}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

          <h1>Input department Password</h1>

          <div className="relative">
          <input name="password" type={cansee? 'text':'password'} className=" border-buttoncolor h-[30px] p-5 bg-buttoncolor rounded-[10px] focus:border-buttoncolor focus:outline-none" value={passwordformstate.password} onChange={setpasswordformchange} />
          {cansee ? eyeclosed : eyeopen}
          </div>

         <p className=" text-red-600">{loginformerrormessage}</p>

          <button className="p-3 bg-buttoncolor rounded-[20px]">{islogindeoartmentloading? loadingicon : 'Submit'}</button>
        </form>
        {/* DEPARTMENT FORM END */}
      </div>

      {/* IMAGINARY FORM END */}
      
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
                    <li className="p-4 flex gap-x-3  bg-dashboardcolor rounded-l-[20px] justify-start w-[87%]  items-center"> <img src={navicon1} className="w-[29px] h-[29px]" alt="dashboard icon"/>  <p className="hidden-item">Dashboard</p></li>
                    <Link to={`/setup/${id}`} className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%] items-center"> <img src={navicon3} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Setup</p></Link>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center"> <img src={navicon4} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Help</p> </li>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]   items-center"> <img src={navicon5} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item"> Requests</p></li>
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%] opacity-0  items-center"> <img src={navicon2} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Assets</p> </li> 
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  opacity-0 items-center" > <img src={navicon7} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Activity</p></li>

                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center" onClick={()=>{dispatch(Logoutuser())}}> <img src={navicon6} className="w-[29px] h-[29px]" alt="dashboard icon"/>  <p className="hidden-item">Logout</p></li>
                {/* Might not Be changed*/}
                </div>
            </div>
            <div className="w-[80vw] bg-dashboardcolor flex gap-y-9 flex-col p-6 z-10">
                <h1 className="sm:text-[32px] text-[23px]">Dashboard</h1>


                {isloading ? loading_icon : div}
               

            </div>

        </div>
     </div>
     )
}