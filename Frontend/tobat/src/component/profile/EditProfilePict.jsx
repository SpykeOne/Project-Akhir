import {
  Button, Center, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useToast 
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../lib/hoc/api"
import { useFormik } from "formik"

export default function ProfilePicture(props) {
  const { onClose } = props
  const [ selectedFile, setSelectedFile ] = useState(null)
  const userSelector = useSelector((state) => state.auth)
  const inputFileRef = useRef(null)
  const toast = useToast()
  const [ imageShow, setImageShow ] = useState(null)

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      const formData = new FormData()
      formData.append("image", selectedFile)
      
      try {
        await axiosInstance.patch("/user/uploadprofpic/" + userSelector.id, formData)
        .then(() => {
          toast({
            title: "Updating Profile Picture",
            description: "Profile Picture updated successfuly",
            status: "success",
            isClosable: true,
          })
        })
      } catch (err) {
        toast({
          title: "Upload Error!",
          description: err.toString(),
          status: "error",
          isClosable: true,
        })
      }
    }
  })

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0])
    const temp = event.target.files[0]
    setImageShow(URL.createObjectURL(temp))
  }

  const submitHandler = async () => {
    await formik.handleSubmit()
    onClose
  }

  return (
    <>
      <ModalContent>
        <ModalHeader>Change Profile Picture</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Center>
            <Input
              type={"file"}
              onChange={handleFile}
              accept={"image/png, image/jpg, image/gif"}
              ref={inputFileRef}
            />
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button onClick={submitHandler} colorScheme="blue" mx="2">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}