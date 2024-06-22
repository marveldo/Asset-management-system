import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export const IsLoggedin = ({children}) => {
    const Authdetails = useSelector(state => state.Authdetails)

    return !Authdetails.authenticated ? children : <Navigate to="/validate" replace/>

}

export const Isauthenticated = ({children}) => {
    const Authdetails = useSelector(state => state.Authdetails)

    return Authdetails.authenticated ? children : <Navigate to='/login' replace/>
}

export const Isdepartmentauthenticated = ({children}) => {
    const Authdetails = useSelector(state => state.Authdetails)
    const AuthDepartmentdetails = useSelector(state => state.AuthDepartmentdetails)
    const params = useParams()
    const condition = Authdetails.authenticated && AuthDepartmentdetails.id === params.DepartmentId && AuthDepartmentdetails.is_verified 
    

    return condition ? children : <Navigate to="/validate" replace/>
}
