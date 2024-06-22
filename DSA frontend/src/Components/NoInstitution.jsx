import React from "react";
import cover from "../Images/cover 1.png"
import arrow from "../Images/icons8-curved-arrow-downward-24 1.svg"
import { Useaxios } from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import { Logoutuser } from "../reducers/Auth";
import { useDispatch } from "react-redux";


export const CheckInstitution = () => {
    const  [isloading, setisloading] = React.useState(true)
    const axiosin = Useaxios()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, seterror] = React.useState(false)



    const  Submittobackend = async() => {
       
        try{
            const response = await axiosin.get('/Userviewset/me/')
            if (response.data.institution !== null){
                navigate(`/dashboard/${response.data.institution}/`)
            }
        }
        catch(error){
            console.log(error)
            seterror(true)
        }
        finally{
            setisloading(false)
        }
    }

    let maindiv = ''

   





    const innerdiv2 = <div className="w-full h-full bg-bluecolor rounded-[22px] flex justify-between py-5 items-center">
              <div className="flex flex-col w-full gap-y-3 items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="sm:w-[25px] w-[16px]" viewBox="0 0 24 24">
                   <rect width={2.8} height={12} x={1} y={6} fill="currentColor">
                    <animate id="svgSpinnersBarsScale0" attributeName="y" begin="0;svgSpinnersBarsScale1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"> </animate>
                    <animate attributeName="height" begin="0;svgSpinnersBarsScale1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"></animate></rect><rect width={2.8} height={12} x={5.8} y={6} fill="currentColor">
                    <animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"></animate>
                    <animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"></animate>
                    </rect>
                    <rect width={2.8} height={12} x={10.6} y={6} fill="currentColor"><animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"></animate><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"></animate></rect><rect width={2.8} height={12} x={15.4} y={6} fill="currentColor"><animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.3s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"></animate><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.3s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"></animate></rect><rect width={2.8} height={12} x={20.2} y={6} fill="currentColor"><animate id="svgSpinnersBarsScale1" attributeName="y" begin="svgSpinnersBarsScale0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"></animate><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12">
                    </animate>
                    </rect>
                    </svg>

                    <p className="sm:text-[25px] text-[16px]">Fetching User data.....</p>
              </div>
    </div>




    let innerdiv =   <>
   
    <div className="w-full h-full bg-bluecolor rounded-[22px] flex flex-col justify-between py-5 items-center">
        <div className="text-center">
            <h1 className="text-red-600 mb-2 sm:text-[25px] text-[16px]">You aren't part of an Institution !!!!</h1>
            <div className="sm:text-[25px] text-[16px] flex ps-3 "><h1>Choose One of the options to continue </h1> <img src={arrow} alt="curved" className="rotate-[12deg] sm:w-[60px] sm:h-[60px] w-[40px] h-[40px]"/></div>

        </div>

        <button className="bg-specblue p-5 sm:text-[25px] rounded-[110px] text-white text-[16px]  hover:brightness-200">Request to be added</button>

        <p className="sm:text-[25px] rounded-[110px] text-[16px]">OR</p>

        <button className="bg-specblue p-5 sm:text-[25px] rounded-[110px] text-white text-[16px]  hover:brightness-200">Create an Institution</button>

        <p className="sm:text-[25px] rounded-[110px] text-[16px]">OR</p>

        <button className="bg-specblue p-5 sm:text-[25px] rounded-[110px] text-white text-[16px]  hover:brightness-200" onClick={()=>{dispatch(Logoutuser())}}>Logout</button>
    </div>
    </>

if (error){
    maindiv = <div className="w-full h-full bg-bluecolor rounded-[22px] flex justify-between py-5 items-center"></div>
}
else{
    maindiv = isloading? innerdiv2 : innerdiv
}


    React.useEffect(()=> {
        Submittobackend()
    }, [])
    return(
        <div className="sm:p-[4.5rem] py-[5rem] px-[2.5rem] h-[100vh] relative">
        <img src={cover} alt= "cover image" className='w-[111px] h-[45px] absolute top-4 left-4'/>
          {maindiv}
        </div>
    )
}