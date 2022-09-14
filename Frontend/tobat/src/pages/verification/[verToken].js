import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Box,
    Icon,
    Spinner,
  } from '@chakra-ui/react';
import { icons } from 'react-icons/lib';
import { FaCheck, FaCheckDouble } from 'react-icons/fa'
import { axiosInstance } from '../../lib/hoc/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiError } from "react-icons/bi"
  
  
  export default function verificaton(){

    const [verified, setVerified] = useState(false)

    const router = useRouter()
    const {verToken} = router.query

    useEffect(()=>{

      async function updateVerif(){
        console.log("eror di update verif")

        console.log(verToken)

        const res = await axiosInstance.patch("/user/verify/" + verToken )

        if(res.data){
          const success = res.data.success
          console.log(success)
            setVerified(success)
        }
      }
      if(verToken){
        updateVerif()
      }
    }, [router.isReady])

    return (
      <>
      {router.isReady?
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
        //   w={'full'}
          maxW={'2xl'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>

          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          {verified?
            <>
            Your account has been verified
            <Icon paddingLeft={2} boxSize={7} as={FaCheck}></Icon>
            </>
            :
            <>
            Your account has not been verified
            <Icon paddingLeft={2} boxSize={7} as={BiError}></Icon>
            </>
          } 
          </Heading>
          <Button onClick={()=> router.push("/homepage")}>
          Back to Homepage
          </Button>
    
        </Stack>
      </Flex>
        : <Spinner></Spinner>}
      </>

    );
  }