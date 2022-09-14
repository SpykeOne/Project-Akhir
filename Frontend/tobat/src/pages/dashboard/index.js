import { Box, Center, Divider, Flex, Heading, Spinner, VStack, Text, Avatar } from "@chakra-ui/react"
import { useState } from "react"
import Head from "next/head"
import AdminNav from "../../component/navbars/AdminNavbar"
import Image from 'next/image'
import banner from '../../asset/imgs/medicure-banner.png'
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import Sidebar from "../../component/admin/ResponsiveSidebar"

export default function dashboard(){
    
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const userSelector = useSelector((state)=>state.auth)

    useEffect(() => {
        if (!userSelector?.is_admin) {
          setIsLoading(false);
          router.push("/homepage");
        }
        else{
            setIsLoading(false);
        }
      }, [userSelector?.is_admin]);


    return(
        <>
        {isLoading ?(
            <Center>
                <Spinner size={"lg"}/>
            </Center>
        ): (
            <>
            <Head>
                <title>Medicure</title>
            </Head>

            <Flex flexDir={"column"}>
            <AdminNav></AdminNav>

            <Sidebar></Sidebar>
            </Flex>


            </>
        )}
        </>
    )
}