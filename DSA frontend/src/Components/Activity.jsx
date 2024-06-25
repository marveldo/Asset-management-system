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
import {UpdateImg, LogoutDepartment } from "../reducers/Auth"
import { useDispatch, useSelector } from "react-redux"
import { Useaxios } from "../utils/axiosinstance"
import { useNavigate } from "react-router-dom"
import navicon9 from "../Images/49855_closed_padlock_icon 1.svg"
import { Navbar } from "./Dashboard"
import { Link } from "react-router-dom"
import moment from "moment"
import icon10 from "../Images/10132037_image_circle_plus_line_icon 1.png"
import icon11 from "../Images/icons8-right-arrow-24 3.png"
import icon12 from "../Images/icons8-bell-16 1.png"
import icon13 from "../Images/icons8-active-24 1.png"
import icon14 from "../Images/icons8-comment-30 2.png"




export const Activity = () => {
  const [showresnav, setshowresnav] = React.useState(false)
  const [imgform, setimgform] = React.useState(null)
  const [imgsubmittingform , setimgsubmittingform] = React.useState(null)
  const [imgformdiv, setimgformdiv] = React.useState(false)
  const [showdiv, setshowdiv] = React.useState(false)
  const [showextranav, setshowextranav] = React.useState(false)
  const [isloading, setloading] = React.useState(true)
  const [taskdiv, settaskdiv] = React.useState(false)
  const [taskformloading,settaskformloading] =  React.useState(false)
  const [commentformloading,setcommentformloading] =  React.useState(false)
 
  const [commentdiv, setcommentdiv] = React.useState(false)
  const [activediv, setactivediv] = React.useState(false)
  const [data,setdata] =React.useState(null)
  const [imgloading, setimgloading] = React.useState(false)
  const [error , seterror] = React.useState(false)
  const [errortype, seterrortype] = React.useState({
    departments: false,
    Updateimage : false,
    Changingpassword : false,
    Addtask : false,
    Addcomment : false,
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const axiis = Useaxios()
  const Authdetails = useSelector(state => state.Authdetails)
  const AuthDepartmentdetails = useSelector(state => state.AuthDepartmentdetails)
  const [taskform, settaskform] = React.useState({department : AuthDepartmentdetails.id, task : ''})
  const [commentform, setcommentform] = React.useState({department : AuthDepartmentdetails.id, comment: ''})
  
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
    if(taskdiv){
      settaskdiv(false)
    }
    if(commentdiv){
      setcommentdiv(false)
    }
    if(activediv){
      setactivediv(false)
    }
}

const Changetask = (event) => {
  const {name, value} = event.target

  settaskform(prev => {
    return({
      ...prev,
      [name] : value
    })
  })
}

const   ChangeComment = (event) => {
  const {name, value} = event.target

  setcommentform(prev => {
    return({
      ...prev,
      [name]: value
    })
  })
}
 
const clickprofilepicture = () => {
  setshowdiv(true)
  setimgformdiv(true)
  setshowextranav(false)
}

const ClickArrow = (event) => {
  setshowextranav(false)
  const name = event.target.alt

  if(name === 'Task'){
    setshowdiv(true)
    settaskdiv(true)
  }
  if(name === 'Comment'){
    setshowdiv(true)
    setcommentdiv(true)
  }
  if(name === 'Active'){
    setshowdiv(true)
    setactivediv(true)
  }
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

 

 const QueryBackend = async() => {
  if(!isloading){
    setloading(true)
  }
   try{
     const response = await axiis.get(`/Departments/${AuthDepartmentdetails.id}/`)
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
    QueryBackend()
    GetCurrentImg()
    seterrortype(prev => {
      return({
        ...prev,
        departments : false
      })
    })
  }
  if(errortype.Addtask){
    seterrortype(prev => {
      return({
        ...prev,
        Addtask : false
      })
    })
  }
 if(errortype.Addcomment){
  seterrortype(prev => {
    return({
      ...prev,
       Addcomment : false
    })
  })
 }
  
 }

 

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
  if(errortype.Addtask){
    message = "check internet Connection"
  }
  if(errortype.Addcomment){
    message = "check internet Connection"
  }

  let Taskdiv = ''
  let ImaginaryTaskdiv = ''
  let Commentdiv =''
  let ImaginaryCommentdiv = ''
  let Activediv = ''
  let ImaginaryActivediv = ''
  
  // Handling the loops
  if (data){
     if(data.tasks.length >= 1){
      const tasks = data.tasks.slice(0,2).map((obj) => {
        return(
          <div key={obj.id} className="p-4 flex flex-col gap-y-3 border-b-[1px] border-black">
          <div className="flex gap-x-4 items-center"><div className="h-[15px] w-[15px] rounded-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`}}></div> <h1 className="sm:text-[17px] text-[13px]">{obj.task} </h1></div>
         <div className="flex gap-x-4">
         <div className="p-3 opacity-0 rounded-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`}}></div> 
         <button className={`rounded-[20px] ${obj.progress_status === 'not_done'? '': 'hidden'} p-3 sm:text-[12px] text-[6px] bg-[#F31717]`}>Not Done</button>
         <button className={`rounded-[20px] ${obj.progress_status === 'in_progress'? '': 'hidden'} p-3 sm:text-[12px] text-[6px] bg-[#FFF506]`}>In progress</button>
          <button className={`rounded-[20px] ${obj.progress_status === 'done'? '': 'hidden'} p-3 sm:text-[12px] text-[6px] bg-[#2AE90B]`}>Done</button>
         </div>
        </div> )
       
      })
      const moretasks = data.tasks.map((obj) => {
        return(
          <div key={obj.id} className="p-4 flex flex-col gap-y-3 border-b-[1px] border-black">
          <div className="flex gap-x-4 items-center"><div className=" h-[15px] w-[15px] rounded-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`}}></div> <h1 className="sm:text-[17px] text-[13px]">{obj.task} </h1></div>
         <div className="flex gap-x-4">
         <div className=" p-3 opacity-0 rounded-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`}}></div> 
         <button className={`rounded-[20px] ${obj.progress_status === 'not_done'? '': 'hidden'} p-3 sm:text-[12px] text-[6px] bg-[#F31717]`}>Not Done</button>
         <button className={`rounded-[20px] ${obj.progress_status === 'in_progress'? '': 'hidden'} p-3 sm:text-[12px] text-[6px] bg-[#FFF506]`}>In progress</button>
          <button className={`rounded-[20px] ${obj.progress_status === 'done'? '': 'hidden'} p-3 sm:text-[12px] text-[6px] bg-[#2AE90B]`}>Done</button>
         </div>
        </div> )
       
      })
      Taskdiv =   <div className="overflow-x-auto taskdiv h-[75%]">
      {/* FOR LOOPING FROM BACKEND */}
        {tasks}
    
      {/* END */}
    
      </div>
      ImaginaryTaskdiv =
      <div className="overflow-x-auto taskdiv h-[75%]">
      {/* FOR LOOPING FROM BACKEND */}
        {moretasks}
    
      {/* END */}
    
      </div>
     }
     else{
       Taskdiv =   <div className="overflow-x-auto taskdiv h-[75%]">
       {/* FOR LOOPING FROM BACKEND */}
        <div className="h-full w-full flex justify-center items-center">
          No task to display
        </div>
     
       {/* END */}
     
       </div>
       
       ImaginaryTaskdiv = <div className="overflow-x-auto taskdiv h-[75%]">
       {/* FOR LOOPING FROM BACKEND */}
        <div className="h-full w-full flex justify-center items-center">
          No task to display
        </div>
     
       {/* END */}
     
       </div>


     }   

  
  }

  if(data){
    if(data.comments.length >= 1){
      const comments = data.comments.slice(0,2).map((obj) => {
      return(
        <div key={obj.id} className="p-4 flex flex-col gap-y-3 border-b-[1px] border-black">
        <div className="flex gap-x-2 items-center"><div className=" h-[15px] w-[15px] rounded-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`}}></div> <h1 className="sm:text-[17px] text-[13px]">{obj.user.staff_id} - {obj.comment}</h1></div>

        </div>
      )
    })

    const morecomments = data.comments.map((obj) => {
      return(
        <div key={obj.id} className="p-4 flex flex-col gap-y-3 border-b-[1px] border-black">
        <div className="flex gap-x-2 items-center"><div className=" h-[15px] w-[15px] rounded-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`}}></div> <h1 className="sm:text-[17px] text-[13px]">{obj.user.staff_id} - {obj.comment}</h1></div>

        </div>
      )
    })

    Commentdiv =   <div className="overflow-y-auto taskdiv h-[75%]">
    {/* FOR LOOPING */}
     {comments}
  {/*END*/}
  </div>
  ImaginaryCommentdiv = <div className="overflow-y-auto taskdiv h-[75%]">
  {/* FOR LOOPING */}
   {morecomments}
{/*END*/}
</div>
    }
    else{
      Commentdiv =   <div className="overflow-y-auto taskdiv h-[75%]">
        <div className="h-full w-full flex justify-center items-center">
            No Comment to display
          </div>
     
    </div>
    ImaginaryCommentdiv = <div className="overflow-y-auto taskdiv h-[75%]">
    <div className="h-full w-full flex justify-center items-center">
        No Comment to display
      </div>
 
</div>
    }
  }

  if(data){
    if(data.activities.length >= 1){
      const activities = data.activities.slice(0,2).map((obj) => {
      return(
        <div key={obj.id} className="p-4 flex flex-col gap-y-3 border-b-[1px] border-black">
        <div className="flex gap-x-2 items-center"><div className="h-[15px] w-[15px] rounded-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`}}></div> <h1 className="sm:text-[17px] text-[13px]">{obj.activity}-{moment(obj.created).fromNow()}</h1></div>

        </div>
      )
    })
    const moreactivities = data.activities.map((obj) => {
      return(
        <div key={obj.id} className="p-4 flex flex-col gap-y-3 border-b-[1px] border-black">
        <div className="flex gap-x-2 items-center"><div className=" h-[15px] w-[15px] rounded-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`}}></div> <h1 className="sm:text-[17px] text-[13px]">{obj.activity}-{moment(obj.created).fromNow()} </h1></div>

        </div>
      )
    })

    Activediv =   <div className="overflow-y-auto taskdiv h-[75%]">
    {/* FOR LOOPING */}
     {activities}
  {/*END*/}
  </div>
  ImaginaryActivediv = <div className="overflow-y-auto taskdiv h-[75%]">
  {/* FOR LOOPING */}
   {moreactivities}
{/*END*/}
</div>
    }
    else{
      Activediv =   <div className="overflow-y-auto taskdiv h-[75%]">
        <div className="h-full w-full flex justify-center items-center">
            No Activity to display
          </div>
     
    </div>
    ImaginaryActivediv = <div className="overflow-y-auto taskdiv h-[75%]">
    <div className="h-full w-full flex justify-center items-center">
        No Activities to display
      </div>
 
</div>


    }
  }

  const SubmitTask = async(event) => {
    event.preventDefault()
    if(taskform.task !== ''){
    try{
      settaskformloading(true)
      const response = await axiis.post('/Tasks/', taskform)
      setdata(prev => ({
        ...prev,
        tasks : [response.data , ...prev.tasks]
      }))
      settaskform(prev => {
        return({
          ...prev,
          task : ''
        })
      })
    }
    catch(error){
      seterror(true)
      seterrortype(prev => {
        return({
          ...prev,
          Addtask : true
        })
      })
    }
    finally{
      settaskformloading(false)
    }
  }
  }

  const SubmitComment = async(event) => {
    event.preventDefault()
    if(commentform.comment !== ''){
    try{
      setcommentformloading(true)
      const response = await axiis.post('/Comments/', commentform)
      setdata(prev => ({
        ...prev,
        comments : [response.data , ...prev.comments]
      }))
      setcommentform(prev => {
        return({
          ...prev,
          comment : ''
        })
      })
    }
    catch(error){
     seterror(true)
     seterrortype(prev => {
      return({
        ...prev,
        Addcomment : true
      })
    })
    }
    finally{
      setcommentformloading(false)
    }
  }
  }
  






  //End of handling the loops


  let loadingicon =<div className="h-full w-full flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
<path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path>
</svg>
</div> 

let papericon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>


  React.useEffect(()=>{
    QueryBackend()
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
        {/* Imaginary Div */}
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
       
       {/* IMAGINARY TASKDIV */}
        
        <div className={`bg-white ${taskdiv? 'animate__animated animate__fadeInLeft animate__faster': 'hidden'} flex flex-col sm:h-[420px] sm:w-[420px] w-[308px] h-[400px]  rounded-[20px] shadow-shadowcolour shadow-lg overflow-x-hidden py-2  relative`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-3" onClick={clickPopupdiv}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                        <div className="w-full justify-center flex gap-x-1 items-center"><h1 className=" text-center text-[25px]">Task</h1>  <img src={icon12}/></div>

                        {isloading ? loadingicon : ImaginaryTaskdiv}
                        
                        <form className=" fixed bottom-0 w-full h-[50px]" onSubmit={SubmitTask}>
                          <div className="relative h-full w-full">
                          <input type="text"  name="task" className="w-full border-2  p-4  focus:outline-none  h-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`, borderColor : `${AuthDepartmentdetails.color}`}} value={taskform.task} onChange={Changetask} disabled={taskformloading} />
                          <button className="absolute right-4 top-4" disabled={taskformloading}>{taskformloading? loadingicon:papericon}</button>
                          </div>
                        </form>
                      
                      </div>

        {/* END OF IMAGINARY TASK DIV */}

        {/* IMAGINARYCOMMENTDIV */}

        <div className={`bg-white ${commentdiv? 'animate__animated animate__fadeInRight animate__faster': 'hidden'} flex flex-col sm:h-[380px] sm:w-[420px] w-[308px] h-[400px]  rounded-[20px] shadow-shadowcolour shadow-lg overflow-x-hidden py-2  relative`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-3" onClick={clickPopupdiv}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

<div className="w-full justify-center flex gap-x-1 items-center"><h1 className=" text-center text-[25px]">Comment</h1>  <img src={icon14}/></div>

                        {isloading ? loadingicon : ImaginaryCommentdiv}
                        
                        <form className=" fixed bottom-0 w-full h-[50px]" onSubmit={SubmitComment}>
                          <div className="relative h-full w-full">
                          <input type="text" name="comment" className="w-full border-2  p-4  focus:outline-none  h-full" style={{backgroundColor : `${AuthDepartmentdetails.color}`, borderColor : `${AuthDepartmentdetails.color}`}} onChange={ChangeComment} value={commentform.comment} disabled={commentformloading}/>
                          <button className="absolute right-4 top-4" disabled={commentformloading}>{commentformloading? loadingicon : papericon}</button>
</div>
                        </form>
                      
                      </div>


        {/* ENDOFIMAGINARYCOMMENTDIV */}

          {/* IMAGINARYACTIVEDIV */}

          <div className={`bg-white ${activediv? 'animate__animated animate__fadeInRight animate__faster': 'hidden'} flex flex-col sm:h-[380px] sm:w-[420px] w-[308px] h-[400px]  rounded-[20px] shadow-shadowcolour shadow-lg overflow-x-hidden py-2  relative`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-3 right-3" onClick={clickPopupdiv}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

<div className="w-full justify-center flex gap-x-1 items-center"><h1 className=" text-center text-[25px]">Active</h1>  <img src={icon13}/></div>

                        {isloading ? loadingicon : ImaginaryActivediv}
                        
                      </div>


        {/* ENDOFIMAGINARYACTIVEDIV */}





      </div>
      {/* End of Imaginary div */}
      
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
                    <Link to={`/department/${AuthDepartmentdetails.id}`} className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center"> <img src={navicon1} className="w-[29px] h-[29px]" alt="dashboard icon"/>  <p className="hidden-item">Dashboard</p></Link>
                    <Link to={`/assets/${AuthDepartmentdetails.id}`} className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]  items-center"> <img src={navicon2} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Assets</p> </Link> 
                    <li className="p-4 flex gap-x-3  rounded-l-[20px] justify-start w-[87%]   items-center" style={{backgroundColor : AuthDepartmentdetails.color}} > <img src={navicon7} className="w-[29px] h-[29px]" alt="dashboard icon"/> <p className="hidden-item">Activity</p></li>
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
                <div className="ps-3  h-[65%]  pt-3  w-full flex gap-x-24 justify-center  max-[1024px]:justify-center content-start flex-wrap overflow-y-auto gap-y-12">
                  {/* FOR TASK */}
                     <div className="flex pt-6">
                       
                       {/* BEGINNING OF TASK DIV */}

                      <div className="bg-white flex flex-col sm:h-[380px] sm:w-[380px] w-[269px] h-[270px] max-[370px]:w-[209px] rounded-[20px] shadow-shadowcolour shadow-lg overflow-x-hidden py-2  relative">
                        <img src={icon11} className="absolute w-[35px] h-[25px] bottom-3 right-3" alt="Task" onClick={ClickArrow}/>
                        <div className="w-full justify-center flex gap-x-1 items-center"><h1 className=" text-center sm:text-[25px] text-[15px]">Task</h1>  <img src={icon12}/></div>

                        {isloading ? loadingicon : Taskdiv}
                      
                      </div>
                      {/* END OF TASK DIV */}

                     </div>
                     {/* END OF TASK */}
                    
                     <div className="flex flex-col gap-y-14">
                       {/* BEGINNING OF COMMENTS AND ACTIVE */}
                      <div className="bg-white flex flex-col rounded-[20px] sm:w-[420px] h-[200px] w-[269px] max-[370px]:w-[209px]  relative shadow-shadowcolour shadow-lg">
                      <img src={icon11} className="absolute w-[35px] h-[25px]  bottom-3 right-3" alt="Comment" onClick={ClickArrow} />
                      <div className="w-full justify-center flex gap-x-1 items-center"><h1 className=" text-center sm:text-[25px] text-[15px]">Comment</h1>  <img src={icon14}/></div>
                      
                       {isloading? loadingicon : Commentdiv}

                      </div>
                       {/* END OF COMMENTS AND ACTIVE */}
                        {/* BEGINNING OF ACTIVE */}
                     <div className="flex flex-col gap-y-10">
                      <div className="bg-white flex flex-col rounded-[20px] sm:w-[420px] h-[200px] w-[269px] max-[370px]:w-[209px] relative shadow-shadowcolour shadow-lg">
                      <img src={icon11} className="absolute w-[35px] h-[25px] bottom-3 right-3" alt="Active" onClick={ClickArrow}/>
                      <div className="w-full justify-center flex gap-x-1 items-center"><h1 className=" text-center sm:text-[25px] text-[15px] ">Active</h1>  <img src={icon13}/></div>
                      {isloading ? loadingicon : Activediv}

                      </div>

                     </div>
                     {/* END OF ACTIVE */}
                     </div>
                     
                    

                </div>

               

            </div>

        </div>
     </div>
     )
}