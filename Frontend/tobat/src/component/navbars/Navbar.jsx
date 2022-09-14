import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Divider,
  Icon,
  MenuGroup,
  Toast,
  useToast,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import Image from 'next/image'
import logo from '../../asset/imgs/medicure-logo.png'
import signinlogo from '../../asset/imgs/sign-in-logo.png'
import cartlogo from '../../asset/imgs/cart-logo.png'
import homelogo from '../../asset/imgs/home-logo.png'
import uploadlogo from '../../asset/imgs/upload-presc.png'
import paymentlogo from '../../asset/imgs/payment-confirm.png'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Group } from '@mantine/core'
import LoginForm from '../auth/LoginForm';
import { useState } from 'react'
import jsCookie from 'js-cookie'
import auth_types from '../../redux/reducer/auth/type';
import Router from 'next/router';
import axios from 'axios';
import { axiosInstance } from '../../lib/hoc/api';




export default function Navbar() {

  const toast = useToast()
  const dispatch = useDispatch();
  const userSelector = useSelector((state)=> state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  
      function Logout() {

      jsCookie.remove("auth_token");

      dispatch({
        type: auth_types.AUTH_LOGOUT
      })

        Router.push("/login")
    }

    function resendVerification(){
      try{
        
        let body = {
          id: userSelector.id,
          username: userSelector.username,
          email: userSelector.email
        }
        
        axiosInstance.post("/resendVerification", qs.stringify(body))
        
        console.log(body)

        toast({
          title: "Verification email sent",
          description: "A new verification email has been sent to your email",
          status: "success",
          isClosable: true
        })

      } catch (err) {
        
        console.log(err)
        toast({
          title: "Error",
          description: "There seems to be an error sending a new verification email",
          status: "error",
          isClosable: true
        })
      }
    }


  return (
    <>
      <Box bg={useColorModeValue('white')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} alignContent={'center'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box>
            <Image src={logo} alt={"Medicure"} height={'42px'} width={"192px"} />
          </Box>
          <HStack spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <HStack
              as={'nav'}
              spacing={8}
              display={{ base: 'none', md: 'flex' }}>
                <Box display={"flex"}>
                  <Image src={homelogo} width={"110px"} alt=""/>
                  <Button bgColor={"white"} onClick={() => Router.push("/homepage")}>
                  Home
                  </Button>
                </Box>
                <Box display={"flex"} >
                  <Image src={uploadlogo} alt=""/>
                  <Button bgColor={"white"} >
                  Upload Prescription
                  </Button>
                </Box>
                <Box display={"flex"}>
                  <Image src={paymentlogo} alt=""/>
                  <Button bgColor={"white"}>
                  Payment Confirmation
                  </Button>
                </Box>
                {/* <Button bg={"white"} leftIcon={<Image src={homelogo}  width={"50px"}/>}> Home</Button>
                <Button bg={"white"} leftIcon={<Image src={uploadlogo}  width={"50px"} />}> Upload Prescription</Button>
                <Button bg={"white"} leftIcon={<Image src={paymentlogo} width={"50px"}   />}> Payment Confirmation</Button> */}
                <InputGroup>
                <InputLeftElement color="gray.400">
                  <SearchIcon />
                </InputLeftElement>
                <Input focusBorderColor="teal.400" 
                placeholder="Search for medicine" />
                <InputRightElement
                  width="4.5rem"
                  px={2}
                  color={"white"}
                  onClick={() => {
                    console.log("search");
                  }}
                  bg="teal.400"
                  _hover={{ bg: "teal.500" }}
                  borderRightRadius="md"
                >
                  Search
                </InputRightElement>
              </InputGroup>
            </HStack>
          </HStack>
          {userSelector.id ? (
          <>
          <Flex alignItems={'center'} paddingLeft={"5px"} justifyContent="space-between">

            {userSelector.is_verified ? (
              <>
                <Link href='/cart'>
                    <Button bgColor={"white"} size={"sm"}>
                      <Image src={cartlogo}/>
                    </Button>
                </Link>
              </>
            ) : (
              <>
              <HStack>
                <Button bgColor="white" onClick={()=> resendVerification()}>
                  Verify
                </Button>
              </HStack>
              </>
            )}
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList align={"center"}>
                <MenuGroup title={`Hello, ${userSelector.username}`}>
                <MenuItem onClick={ () => router.push("/profile/" + userSelector.id)}>My Profile</MenuItem>
                <MenuItem >Transaction</MenuItem>
                </MenuGroup>
                <MenuDivider/>
                <MenuItem >Help & Support</MenuItem>
                <MenuItem onClick={() => Logout()} >Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          </>
          ) 
          : (
            <>
                <Button bgColor="white" 
                leftIcon={<Image src={signinlogo} />} 
                onClick={()=> router.push("/login")}
                borderColor={"teal"}>
                  Sign In
                </Button>
            </>
          ) }
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Divider></Divider>

      <Box p={4}>
          <HStack spacing={5} align={"center"} justifyContent={"space-between"}>
          <Button bg={"white"}>Medication</Button>
          <Button bg={"white"}>Vitamins & Supplements</Button>
          <Button bg={"white"}>Women's Health</Button>
          <Button bg={"white"}>Men's Health</Button>
          <Button bg={"white"}>Infant & Children</Button>
          </HStack>
      </Box>
      <Divider></Divider>
    </>
  );
}