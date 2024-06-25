import "./index.css"
import { Loginpage } from "./Components/Loginpage"
import {BrowserRouter,HashRouter , Route , Routes} from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Landingpage } from "./Components/Landingpage"
import { Dashboard } from "./Components/Dashboard"
import { SignUp } from "./Components/SignUp"
import { CheckInstitution } from "./Components/NoInstitution"
import { Updateuser } from "./reducers/Auth"
import { Setup } from "./Components/Setup"
import 'animate.css'
import { useDispatch } from "react-redux"
import { Setuser,Setdepartment } from "./reducers/Auth"
import { IsLoggedin,Isauthenticated , Isdepartmentauthenticated} from "./utils/Protectedroutings"
import { Department } from "./Components/Departmentdashboard"
import { Activity } from "./Components/Activity"
import { Depassets } from "./Components/Depassts"
import { CreateInstitution } from "./Components/CreateInstitution"
import { Join } from "./Components/JoinInstitution"


export const App = () => {
 const isauthenticated = JSON.parse(localStorage.getItem("auttokens"))
 const isAuthenticateddepartment = JSON.parse(sessionStorage.getItem("Department"))
 const dispatch = useDispatch()

 if(isauthenticated){
    dispatch(Setuser(isauthenticated))
 }
 if(isAuthenticateddepartment){
   dispatch(Setdepartment(isAuthenticateddepartment))
 }
 return(
    <HashRouter> 
       <Routes> 
         <Route path="/" element={<Landingpage/>}/>
         <Route path="/login" element={<IsLoggedin><Loginpage/></IsLoggedin>}/>
         <Route path="/create" element={<Isauthenticated><CreateInstitution/></Isauthenticated>}/>
         <Route path='/join' element={<Isauthenticated><Join/></Isauthenticated>}/>
         <Route path="/dashboard/:InstitutionId/" element={<Isauthenticated><Dashboard/></Isauthenticated>}/>
         <Route path="/setup/:InstitutionId/" element={<Isauthenticated><Setup/></Isauthenticated>}/>
         <Route path="/department/:DepartmentId/" element={<Isdepartmentauthenticated><Department/></Isdepartmentauthenticated>}/>
         <Route path="/activity/:DepartmentId/" element={<Isdepartmentauthenticated><Activity/></Isdepartmentauthenticated>}/>
         <Route path="/assets/:DepartmentId/" element={<Isdepartmentauthenticated><Depassets/></Isdepartmentauthenticated>}/>
         <Route path="/Signup" element={<IsLoggedin><SignUp/></IsLoggedin>}/>
         <Route path="/validate" element={<Isauthenticated><CheckInstitution/></Isauthenticated>}/>
         <Route path="*" element={<Navigate to="/login"/>}/>
       </Routes>
    </HashRouter>
 )
}