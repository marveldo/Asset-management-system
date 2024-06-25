import React from "react";
import { Useaxios } from "../utils/axiosinstance";
import icon from "../Images/619551_add_correct_done_go_ok_icon 1.svg"
import { useNavigate } from "react-router-dom";




export const Join = () => {
    const [searchstate, setsearchstate] = React.useState('')
    const [isloading, setisloading] = React.useState(false)
    const [data, setdata] = React.useState(null)
    const [showdiv, setshowdiv] = React.useState(false)
    const [showApprovaldiv, setShowAprrovaldiv] = React.useState(false)
    const [id, setid] = React.useState(null)
    const [requestloading, setrequestloading ] = React.useState(false)
    const [showapprovedmessage, setshowapprovedmessage] = React.useState(false)
    const [error, seterror] = React.useState(false)
    const navigate = useNavigate()
    const [errortype, seterrortype] = React.useState({
        institution : false,
        makerequest : false
    })
    const axiis = Useaxios()
    const QueryBackend = async() => {
        setisloading(true)
        try{
          const response = await axiis.get(`/Institution/?institution_name=${searchstate}`)
          setdata(response.data)
        }
        catch(error){
            seterror(true)
            seterrortype(prev => ({
                ...prev,
                institution : true
            }))
            

        }
        finally{
            setisloading(false)
        }
    }
    const ChangeSearchform = (event) => {
        const value = event.target.value 
        setsearchstate(value)
        QueryBackend()
    }

     const clickTryagain = () => {
    seterror(false)
    if (errortype.institution){
        seterrortype(prev => ({
            ...prev ,
            institution : false,

        }))
        QueryBackend()

    }
    if(errortype.makerequest){
        seterrortype(prev => ({
            ...prev,
            makerequest : false
        }))
    }
    
    
 }
 const Noclicked = () => {
    setshowdiv(false)
    setShowAprrovaldiv(false)
    setid(null)
 }

 const YesClicked = async() => {
    setrequestloading(true)
    try{
        const response = await axiis.post(`/Requests/`,{ institution : id , request_type : 'user_type'})
        setShowAprrovaldiv(false)
        setshowapprovedmessage(true)
        const timeoutid = setTimeout(()=>{
            navigate('/validate', {replace : true})
        }, 2000)
        return () => clearTimeout(timeoutid)
    }
    catch(error){
        console.error(error)
        seterror(true)
        seterrortype(prev => ({
            ...prev,
            makerequest : true
        }))

    }
    finally{
       setrequestloading(false)
    }
    
 }


 const InstitutionClicked = (id) =>{
    setid(id)
    setshowdiv(true)
    setShowAprrovaldiv(true)
 }
 let errormessage = ''

 if (errortype.institution){
    errormessage = 'Check Internet Connection'
 }
 if(errortype.makerequest){
    errormessage = 'Check Internet Connection'
 }

    

   let loadingicon = <div className="w-full h-[80%] flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

    </div>
 let institutions = ''
    if(data){
        institutions = data.map((obj,index) => 
            {
            return(<div  key={obj.id} className="flex gap-x-3 items-center" onClick={()=>{InstitutionClicked(obj.id)}}> 
            <div className="bg-[#59D2DA] px-5 rounded-full sm:py-1 py-2 sm:text-[28px] text-[16px] ">{index +1}</div> 
            <p className="sm:text-[28px] text-[16px] ">{obj.institution_name}</p>
            </div>)
          
        })

    }
    else{
        institutions = ''
    }

    let div2 = <div className="h-full pt-12 flex flex-col gap-y-10">
        {/* TO BE LOOPED */}
         {institutions}
       {/* End of LOOP */}

    </div>

let loading_icon = <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path>
<path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path>
</svg>

    return(
        <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center relative">
            {/* Error Form Beginning */}
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
        {/* Error form Ending */}

        {/* IMAGINARY FORM BEGINNING */}
            <div className={`h-[100vh] absolute ${showdiv ? 'flex':'hidden'}  top-0 w-full  justify-center items-center bg-shadowcolour z-40`}>
                {/* APPROVAL DIV */}
                <div className={`bg-white p-4 flex flex-col rounded-[20px] ${showApprovaldiv? '' : 'hidden'} text-center gap-y-8`}>
                   <h1>Are you sure you want to join this Institution ?</h1>
                   <div className="flex gap-x-6 w-full justify-center">
                    <button className="bg-[#59D2DA] px-4 py-3 rounded-[20px]" onClick={YesClicked} disabled={requestloading}>{requestloading? loading_icon : 'Yes' }</button>
                    <button className="bg-[#59D2DA] rounded-[20px] px-4 py-3" onClick={Noclicked} disabled={requestloading}>No</button>
                   </div>
                </div>
                {/* END OF APPROVAL DIV */}
                {/* SHOW APPROVED MESSAGE */}
                <div className={`bg-white p-4 flex flex-col rounded-[20px] items-center ${showapprovedmessage? '' : 'hidden'} text-center gap-y-8`}>
                   <img src={icon} className="w-[40px] h-[40px]" alt="done"/>
                   <div className="flex gap-x-6 w-full justify-center">
                 Your request has been sent!!
                   </div>
                </div>
                {/* END OF SHOW APPROVED MESSAGE */}

            </div>
        {/* IMAGINARY FORM ENDING       */}
            <h1 className="sm:text-[48px] text-[28px]">Join an Institution</h1>
           <div className={`h-[80%] w-[70%] rounded-[15px] flex flex-col items-center pt-14 overflow-hidden bg-[#0747A1]`}>
          
          <div className="relative sm:w-[60%] w-[75%]">
          <input name="institution_name" placeholder="Search....." value={searchstate} className="bg-[#59D2DA] p-3 placeholder-black w-full focus:outline-none rounded-[10px]  " type="text" onChange={ChangeSearchform}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-4 top-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

          </div>
          <div className=" overfloy-y-scroll h-[90%] m:w-[60%] w-[75%]">
               {isloading ? loadingicon : div2 }
          </div>
            



 
           </div>
        </div>
    )
}