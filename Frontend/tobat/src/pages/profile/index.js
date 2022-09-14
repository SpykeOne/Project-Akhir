import { Box, Center, Flex, Spinner, VStack } from "@chakra-ui/react"
import { useState } from "react"
import Head from "next/head"
import Navbar from "../../component/navbars/Navbar"
import Image from 'next/image'
import banner from '../../asset/imgs/medicure-banner.png'
import Footer from "../../component/footer"
import EditProfile from "../../component/profile/EditProfile"

export default function profile(){
    
    const [isLoading, setIsLoading] = useState(false)


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
            <Navbar/>

            <Box display={"flex"} justify={"center"}>
                <EditProfile />
            </Box>

            <Box display={"flex"}>
                {/* <Footer/> */}
            </Box>
            </>
        )}
        </>
    )
}