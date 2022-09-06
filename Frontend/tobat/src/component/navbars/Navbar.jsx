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
import cartlogo from '../../asset/imgs/cart-logo.png'
import homelogo from '../../asset/imgs/home-logo.png'
import uploadlogo from '../../asset/imgs/upload-presc.png'
import paymentlogo from '../../asset/imgs/payment-confirm.png'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Modal, Group } from '@mantine/core'

export default function Navbar() {
  const userSelector = useSelector((state)=> state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter()

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
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
                <Button bg={"white"} leftIcon={<Image src={homelogo} />}> Home</Button>
                <Button bg={"white"} leftIcon={<Image src={uploadlogo} />}> Upload Prescription</Button>
                <Button bg={"white"} leftIcon={<Image src={paymentlogo} />}> Payment Confirmation</Button>
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
            <Link href='/cart'>
                <Button bgColor={"white"} size={"sm"}>
                  <Image src={cartlogo}/>
                </Button>
            </Link>

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
                <MenuItem >My Profile</MenuItem>
                <MenuItem >Transaction</MenuItem>
                <MenuItem >Help & Support</MenuItem>
                <MenuItem >Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          </>
          ) 
          : (
            <>
            
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