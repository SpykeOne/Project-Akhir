import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    Icon,
    InputRightAddon,
    FormHelperText,
    HStack,
    Image,
    Divider
  } from "@chakra-ui/react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import * as Yup from "yup"
import { userLogin } from "../../redux/action/user/userLogin";
import { useEffect } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import logo from '../../asset/imgs/medicure-logo.png'

  export default function LoginForm(){
    const [viewPassword, setViewPassword] = useState(false)

    const userSelector = useSelector((state)=> state.auth)
    const dispatch = useDispatch ()
    const router = useRouter()

    const formik = useFormik({
      initialValues: {
        phoneNum: "",
        email: "",
        password:""
      },
      validationSchema: Yup.object().shape({
        mailphone: Yup.string().required("Email/Phone Number needs to be filled"),
        password: Yup.string().required("Password needs to be filled"),
      }),
      validateOnChange: false,
      onSubmit: (values) => {
        dispatch(userLogin(values, formik.setSubmitting))
      }
    })

    useEffect(()=> {
      if (userSelector?.id) {
        router.push("/homepage")
      }
    }, [userSelector.id])


    return(
      <>
      <HStack>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Image src={logo} width={"250px"} height={"70px"}></Image>
            <Heading fontSize={"4xl"}>Sign in with your account</Heading>
            <Text fontSize={"lg"} color={"gray"}>
              {formik.values.usermail}
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
            <FormControl id="email" isInvalid={formik.errors.mailphone}>
                      <FormLabel>Email/PhoneNumber</FormLabel>
                      <Input
                        type="email"
                        onChange={(event) =>
                          formik.setFieldValue("usermail", event.target.value)
                        }
                      />
                      <FormHelperText>{formik.errors.usermail}</FormHelperText>
                    </FormControl>
                    <FormControl id="password" isInvalid={formik.errors.password}>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={viewPassword ? "text" : "password"}
                          onChange={(event) =>
                            formik.setFieldValue("password", event.target.value)
                          }
                        />
        
                        <InputRightAddon>
                          <Icon
                            fontSize="xl"
                            onClick={() => setViewPassword(!viewPassword)}
                            as={viewPassword ? IoMdEye : IoMdEyeOff}
                            sx={{ _hover: { cursor: "pointer" } }}
                          />
                        </InputRightAddon>
                      </InputGroup>
                      <FormHelperText>{formik.errors.password}</FormHelperText>
                    </FormControl>
                    <Stack spacing={10}>
                          <Link onClick={() => router.push("/forgotpassword")} color="facebook">
                            Forgot your password?
                          </Link>
                      <Button
                        onClick={formik.handleSubmit}
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        disabled={formik.values.usermail && formik.values.password ? false : true}
                      >
                        Sign in
                      </Button>
                    </Stack>
            </Stack>
          </Box>
          
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <Text>Don't have an account yet?
              <Link onClick={() => router.push("/signup")} colorScheme="facebook"> Register now!</Link>
              </Text>
          </Box>
        </Stack>
      </HStack>
      </>
    )

  }