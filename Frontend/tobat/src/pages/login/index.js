import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../component/auth/LoginForm";
import { Flex, Box } from "@chakra-ui/react";

export default function login(){
    
    const userSelector = useSelector((state)=> state.auth)
    const router = useRouter()
    const [loading, setIsLoading] = useState(true)

    return(
            <LoginForm></LoginForm>
    )
}