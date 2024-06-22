import { Authlogin ,Authupdate ,Authdelete,AuthUpdateImg,DepartmentLogin, Departmentdelete } from "./constants";
import { jwtDecode } from "jwt-decode";

 
export const Setuser = (data) => {
    const user = jwtDecode(data.access)

    const new_data = {
        access : data.access,
        refresh : data.refresh,
        id : user.user_id,
        img: user.img
    }
    return({
        type:Authlogin,
        payload : new_data
    })
}

export const LoginUser = (data) => {
    localStorage.setItem("auttokens",JSON.stringify(data))

    const user = jwtDecode(data.access)

    const new_data = {
        access : data.access,
        refresh : data.refresh,
        id : user.user_id,
        img: user.img
    }

    return ({
        type : Authlogin,
        payload : new_data
    })
}

export const Updateuser = (data) => {
    localStorage.setItem("auttokens",JSON.stringify(data))

    const user = jwtDecode(data.access)

    const new_data = {
        access : data.access,
        refresh : data.refresh,
        id : user.user_id,
        img: user.img
    }
    return({
        type : Authupdate,
        payload : new_data
    })
}

export const Logoutuser = () => {
    localStorage.removeItem("auttokens")
    return ({
        type : Authdelete
    })
}

export const UpdateImg = (data) => {
    return ({
        type : AuthUpdateImg,
        payload : data.user_img
    })
}

export const LoginDepartment = (data) => {
    sessionStorage.setItem("Department", JSON.stringify(data))
    return ({
        type : DepartmentLogin,
        payload : data
    })
}

export const Setdepartment = (data) => {
    return ({
        type : DepartmentLogin,
        payload : data
    })
}

export const LogoutDepartment = (data) => {
    sessionStorage.removeItem("Department")
    return({
        type : Departmentdelete
    })
}
