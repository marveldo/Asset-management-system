import axios from "axios";
import { useDispatch } from "react-redux";
import { Updateuser ,Logoutuser} from "../reducers/Auth";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const BaseUrl = "http://127.0.0.1:8000/api/v1/"

export const Useaxios = () => {
    const tokens = useSelector(state => state.Authdetails)
    const dispatch = useDispatch()

    const axiosInstance = axios.create({
        baseURL : BaseUrl,
        headers : {'Authorization': `Bearer ${tokens?.access}` , 'Content-Type':"multipart/form-data"}
    })

    axiosInstance.interceptors.request .use(async req => {
        const user = jwtDecode(tokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if(!isExpired) return req
        try {
            const response = await axios.post('/refresh/', {refresh : tokens.refresh})

            req.headers.Authorization = `Bearer ${response.data.access}`

            dispatch(Updateuser(response.data))
            
            return req

        }
        catch(error){
           if(error.response?.data.detail){
            dispatch(Logoutuser())
           }
        }
    })
    return axiosInstance
}
