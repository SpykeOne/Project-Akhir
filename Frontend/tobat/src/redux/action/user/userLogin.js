import jsCookie from "js-cookie"
import { axiosInstance } from "../../../lib/hoc/api"
import auth_types from "../../reducer/auth/type"
import qs from "qs"
import { useToast } from "@chakra-ui/react"

export function userLogin(values, setSubmitting){

    return async function (dispatch){

        try{
            let body = {
                phoneNum: values.usermail,
                email: values.usermail,
                password: values.password,
            }

            const res = await axiosInstance.post("/user/login", qs.stringify(body))

            const userData = res.data.result.user
            const token = res.data.result.token

            if(!userData) {
                throw new Error("User not found")
            }

            console.log(userData)

            jsCookie.set("auth_token", token)
            dispatch({
                type:auth_types.AUTH_LOGIN,
                payload: userData
            })
            
            setSubmitting(false)
        } catch (err) {
            console.log(err)
            alert("Username, Email, or Password is wrong")

            setSubmitting(false)
        }
    }

}