import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalContent, ModalOverlay, Radio, RadioGroup, Stack, Text, useDisclosure, useToast 
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup"
import qs from "qs"
import YupPassword from "yup-password"
import { axiosInstance } from "../../lib/hoc/api";
import ProfilePicture from "./EditProfilePict";

export default function EditProfile(props) {
  const { isOpen: isOpenPP, onOpen: onOpenPP, onClose: onClosePP } = useDisclosure()
  const userSelector = useSelector((state) => (state.auth))
  const dispatch = useDispatch()
  YupPassword(Yup)
  const toast = useToast()

  // Fetching and Update user data.

  let thisYear = new Date().getFullYear()
  let minYear = thisYear - 15
  let maxYear = thisYear - 100
  const formik = useFormik({
    initialValues : {
      id: userSelector.id,
      username: `${userSelector.username}`,
      email: `${userSelector.email}`,
      name: `${userSelector.name}`,
      dob: `${userSelector.dob}`,
      gender: `${userSelector.gender}`,
      phoneNum: `${userSelector.phoneNum}`,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Fullname is required!")
            .min(1, "Your name is too short!")
            .max(50, "Yor name is too long!")
            .matches(/^[aA-zZ\s]+$/, "Your name contain number and symbol!"),
      dob: Yup.string().required("Date is required!")
            .max(`${maxYear}-01-01`, `Cannot be more than ${maxYear}`)
            .min(`${minYear}-12-12`, `Cannot be less than ${minYear}`),
      email: Yup.string().required("email is required!")
            .email("use email format")
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { name, email, dob, gender, phoneNum } = formik.values

      try {
        let body = {
          name: name,
          email: email,
          dob: dob,
          gender: gender,
          phoneNum: phoneNum,
        }
        const res = await axiosInstance.patch(`/user/${userSelector.id}`, qs.stringify(body))
        dispatch({
          type: "idk",
          payload: { value: !autoRender.value }
        })
        toast({
          title: "Profile Edited",
          description: "Profile change has been saved",
          status: "success",
          isClosable: true,
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Error",
          description: "please check again your changes.",
          status: "error",
          isClosable: true,
        })
      }
      formik.setSubmitting(false)
    }
  })

  //
  return (
  <>
    <Box>
    {/* Edit Profile Picture */}
      <Box>
        <Button onClick={onOpenPP}>
          Change Picture
        </Button>
        <Modal isOpen={isOpenPP} onClose={onClosePP}>
          <ModalOverlay />
          <ModalContent>
            <ProfilePicture onClose={onClosePP} />
          </ModalContent>
        </Modal>
      </Box>

    {/* Edit User Profile */}
      <Box>
        <Heading as='info' size='lg'>
          Account Information
        </Heading>
        <Box>
          <FormControl isInvalid={formik.errors.username}>
            <FormLabel>Username : </FormLabel>
            <Input
              placeholder="username"
              _placeholder={{ color: 'grays.500'}}
              type='text'
              defaultValue={userSelector.username}
              disabled
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isInvalid={formik.errors.email}>
            <FormLabel>Email : </FormLabel>
            <Input
              placeholder="email"
              _placeholder={{ color: 'grays.500'}}
              type='email'
              defaultValue={userSelector.email}
              onChange={(e) => {formik.setFieldValue("name", e.target.value)}}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isInvalid={formik.errors.name}>
            <FormLabel>Fullname : </FormLabel>
            <Input
              placeholder="fullname"
              _placeholder={{ color: 'grays.500'}}
              type='text'
              defaultValue={userSelector.name}
              onChange={(e) => {formik.setFieldValue("name", e.target.value)}}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isInvalid={formik.errors.dob}>
            <FormLabel>Date of birth : </FormLabel>
            <Input
              placeholder="date of birth"
              _placeholder={{ color: 'grays.500'}}
              type='date'
              defaultValue={userSelector.dob}
              onChange={(e) => {formik.setFieldValue("dob", e.target.value)}}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isInvalid={formik.errors.gender}>
            <FormLabel>Gender : </FormLabel>
            <RadioGroup
              onChange={(e) => {formik.setFieldValue("gender", e.target.value)}}
              // defaultValue={ userSelector.gender == Male ? Male : Female }
              defaultValue={ userSelector.gender }
            >
              <Stack direction='row'>
                <Radio value='Male'>Male</Radio>
                <Radio value='Female'>Female</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
      
        <Box>
          <FormControl isInvalid={formik.errors.phoneNum}>
            <FormLabel>Phone Number : </FormLabel>
            <Input
              placeholder="Phone Number"
              _placeholder={{ color: 'grays.500'}}
              type= 'number'
              defaultValue={userSelector.phoneNum}
              onChange={(e) => {formik.setFieldValue("phoneNum", e.target.value)}}
            />
          </FormControl>
        </Box>

        {/* Address */}
        <Box>
          <Text>Address </Text>
          <Button>Edit Address</Button>
        </Box>
      </Box>
      
      <Button onClick={formik.handleSubmit}>
        Save Changes
      </Button>
      <Box>
      </Box>
    </Box>
  </>
  )
}