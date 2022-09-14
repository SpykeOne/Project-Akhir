import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    FormHelperText,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { Modal, Group } from '@mantine/core'
  import { useFormik } from 'formik';
  import * as Yup from 'yup'
  import YupPassword from 'yup-password'
  import { useDispatch } from 'react-redux';
  import { userRegister } from '../../redux/action/user/userRegister';
  import router from 'next/router';
  import { axiosInstance } from '../../lib/hoc/api';
  
  export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    YupPassword (Yup)

    const dispatch = useDispatch()

    const toast = useToast();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const formik = useFormik({
        initialValues: {
            phoneNum: '',
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
            .email("Email must be an email")
            .required("Email must be filled")
            .matches(/@/, "Email must be an email")
            .matches(/.com/,"Email must be an email"),
            username: Yup.string().required("Username must be filled")
            .test("Unique Username", "Username already registered",
            function(values){
                return new Promise((resolve, reject) => {
                    axiosInstance.get(`/user/${username.values}`).then((res)=>{
                        resolve(true)
                    })
                    .catch((error)=>{
                        if(error.response.data.content === "The username has already been taken")
                        resolve(false)
                    })
                })
            }),
            phoneNum: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
            .required("Phone number must be filled"),
            password: Yup.string().required("Password must be filled")
            .minLowercase(1, "Your password needs a minimum of 1 lower case letter")
            .minUppercase(1, "Your password needs a minimum of 1 upper case letter")
            .minSymbols(1, "Your password needs a minimum of 1 special character")
            .minNumbers(1,"Your password needs a minimum of 1 number")
            .min(8, "Minimum 8 characters"),
            passwordConfirmation: 
            Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("Retype Password")
        }),
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log(values)
            dispatch(userRegister(values,formik.setSubmitting))
        }
    })

    // function test(values){
    //     console.log(values)
    // }

    async function submit() {
         await formik.handleSubmit()

         toast({
            title: "Account registered, please check your email to verify your account!", 
            description: "",
            status: "success",
            isClosable: true    
         })
    }
    return (
        <>
            {/* <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}> */}
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                    Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>

                    {/* <FormControl id="fullname" isRequired>
                        <FormLabel>Full name</FormLabel>
                        <Input type="text" onChange={(e)=>{
                            formik.setFieldValue("full_name", e.target.value)
                        }}/>
                        <FormHelperText>{formik.errors.full_name}</FormHelperText>
                    </FormControl> */}

                    <FormControl id="phoneNum" isRequired>
                        <FormLabel>Phone Number</FormLabel>
                        <Input type="text" onChange={(e)=>{
                            formik.setFieldValue("phoneNum", e.target.value)
                        }}/>
                        <FormHelperText>{formik.errors.phoneNum}</FormHelperText>
                    </FormControl>

                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" onChange={(e)=>{
                            formik.setFieldValue("username", e.target.value)
                        }}/>
                        <FormHelperText>{formik.errors.username}</FormHelperText>
                    </FormControl>

                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" onChange={(e)=>{
                            formik.setFieldValue("email", e.target.value)
                        }}/>
                    <FormHelperText>{formik.errors.email}</FormHelperText>
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>{
                            formik.setFieldValue("password", e.target.value)
                        }} />
                        <InputRightElement h={'full'}>
                            <Button
                            variant={'ghost'}
                            onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                        <FormHelperText>{formik.errors.password}</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>{
                            formik.setFieldValue("passwordConfirmation", e.target.value)
                        }}/>
                        <InputRightElement h={'full'}>
                        <Button
                            variant={'ghost'}
                            onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                        <FormHelperText>{formik.errors.passwordConfirmation}</FormHelperText>
                    </FormControl>

                    <Stack spacing={10} pt={2}>
                        <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={submit}
                        disabled={formik.values.username && formik.values.email && formik.values.password && formik.values.passwordConfirmation ? false : true }
                         >
                        Sign up
                        </Button>
                        {/* <Button onClick={()=>test()}>
                            
                        </Button> */}
                    </Stack>

                    <Link onClick={() => router.push("/homepage")} color="facebook" textAlign={"center"}>
                            Already have an account?
                          </Link>
                    </Stack>
                </Box>
                </Stack>
            {/* </Flex> */}
        </>
    );
  }