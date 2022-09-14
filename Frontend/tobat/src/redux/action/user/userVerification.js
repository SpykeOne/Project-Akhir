import { axiosInstance } from "../../../lib/hoc/api";
import qs from "qs"

export function verification(values, setSubmitting){
    return async function (dispatch){
        try{
            let body = {
                is_verified: values.is_verified
            }

            const res = await axiosInstance.patch(`/user/${values.id}`, qs.stringify(body))

            setSubmitting(false)

        } catch (err) {

            console.log(err)

            setSubmitting(false)
        }
    }
}