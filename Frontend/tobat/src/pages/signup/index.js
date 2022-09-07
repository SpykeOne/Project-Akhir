import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RegisterForm from "../../component/auth/RegisterForm";

export default function signup(){
    
    const userSelector = useSelector((state)=> state.auth)
    const router = useRouter()
    const [loading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(userSelector?.id){
            setIsLoading(false)
            router.push("/homepage")
        }
        else{
            setIsLoading(false)
        }
    }, [!userSelector?.id])

    return(
        <RegisterForm></RegisterForm>
    )
}