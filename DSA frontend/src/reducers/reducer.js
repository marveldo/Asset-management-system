import { Authlogin ,Authdelete, Authupdate, AuthUpdateImg, DepartmentLogin, Departmentdelete, AuthadminUpdate , Authrefresh} from "./constants"

const InitialState = {
    access : "",
    refresh : "",
    id : "",
    img : "",
    authenticated : false,
    is_admin : false
    
}


export const Authreducer = (state = InitialState, action) => {
    switch(action.type){
        case Authlogin:
            return({
                ...state,
                access : action.payload.access,
                refresh : action.payload.refresh,
                id : action.payload.id,
                img : action.payload.img,
                authenticated : true,
                is_admin : false
            })
        case Authupdate :
            return({
                ...state,
                access : action.payload.access,
                refresh : action.payload.refresh,
                id : action.payload.id,
                img : action.payload.img,
                authenticated : true,
                is_admin : action.payload.is_admin
            })
            
        case Authrefresh :
            return({
                ...state,
                access : action.payload.access,
                refresh : action.payload.refresh,
                id : action.payload.id,
                img : action.payload.img,
                authenticated : true,

            })
        case Authdelete :
            return({
                ...state,
                access:"",
                refresh :"",
                id : "",
                img : "",
                authenticated : false,
                is_admin : false
            })
        case AuthUpdateImg :
            return({
                ...state,
                img : action.payload
            })
        case AuthadminUpdate: 
        return({
            ...state,
            is_admin : action.payload.is_admin
        })

        default:
            return state
        }
}

const DepartmentInitialState = {
    id : "",
    color : "",
    department_name : "",
    is_verified : false
}

export const DepartmentAuthreducer = (state = DepartmentInitialState, action) => {
    switch(action.type){
        case DepartmentLogin :
            return{
                ...state,
                id : action.payload.id,
                color : action.payload.color,
                department_name : action.payload.department_name,
                is_verified : true
            }
        case Departmentdelete :
            return{
                ...state,
                id: "",
                color : "",
                department_name : "",
                is_verified : false
            }
        default:
            return state
    }
} 