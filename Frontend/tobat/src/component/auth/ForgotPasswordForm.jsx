import {
    Button, Modal, Link, ModalBody, ModalHeader, Text,
    ModalContent, ModalCloseButton, ModalOverlay, FormControl,
    FormLabel, Input, Box, useToast
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import { axiosInstance } from '../../lib/hoc/api';
  import { useFormik } from "formik";
  import qs from 'qs';
  
  export default function ForgotPasswordForm() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast();
  
    const formik = useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: async () => {
        const { email } = formik.values
        try {
          let body = {
            email: email,
          }
  
          await axiosInstance.post("/user/sendResetPassword", qs.stringify(body))
          toast({
            title: `Link has been sent`,
            title: `An email has been sent with a link to reset your password`,
            status: "success",
            isClosable: true,
          })
        } catch (err) {
          console.log(err);
        }
        formik.setSubmitting(false)
        formik.resetForm({values: ""})
      }
    })
  
    return (
      <>
        <Link onClick={onOpen} color={'blue'} fontWeight='semibold'>Forgot Password?</Link>
        <Modal
          isOpen={isOpen}
          onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Forgot your password?</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                {/* <Text>{formik.values.email}</Text> */}
                <FormLabel>Enter your email and we'll send you a link to reset your password.</FormLabel>
                <Input placeholder='Email'
                  onChange={(event) =>
                    formik.setFieldValue("email", event.target.value)} mt={'10px'} maxLength={'40'} />
              </FormControl>
              <Box mt={'17px'}>
                <Button colorScheme='blue' mr={3}
                  onClick={
                    () => {
                      async function submit() {
                        await formik.handleSubmit();
                        onClose();
                      }
                      submit()
                    }}
                  disabled={formik.values.email.length > 9 ? false : true} >
                  Send Link
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }