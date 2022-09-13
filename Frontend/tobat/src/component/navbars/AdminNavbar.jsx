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
import { useSelector } from 'react-redux';
import { Modal, Group } from '@mantine/core'
import LoginForm from '../auth/LoginForm';
import { useState } from 'react'

export default function AdminNav() {
  const userSelector = useSelector((state)=> state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter()
  const [opened, setOpened] = useState(false)

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
          <Flex alignItems={'center'} paddingLeft={"5px"}>
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
                    userSelector.profile_pic
                  }
                />
              </MenuButton>
              <MenuList align={"center"}>
                <MenuItem >My Profile</MenuItem>
                <MenuItem >Transaction</MenuItem>
                <MenuItem >Help & Support</MenuItem>
                <MenuItem >Logout</MenuItem>
              </MenuList>
            </Menu>
            Hello, Admin
          </Flex>
          </>
          ) 
          : (
            <>
            <Modal opened={opened}
                onClose={()=> setOpened(false)}>
                    <LoginForm></LoginForm>
                </Modal>
                <Group>
                <Button bgColor="white" 
                leftIcon={<Image src={signinlogo} />} 
                onClick={()=> setOpened(true)}
                borderColor={"teal"}>
                  Sign In
                </Button>
                </Group>
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
    </>
  );
}