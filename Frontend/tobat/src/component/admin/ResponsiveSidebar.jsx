import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiActivity,
    FiBox,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import NextLink from "next/link"

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const userSelector = useSelector((state)=>state.auth)
    
    return (
        <Flex
            pos="sticky"
            left="5"
            h="85vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />

                <NextLink href={"/homepage"}>
                    <Link>
                        <NavItem navSize={navSize} icon={FiHome} title="Dashboard" />
                    </Link>
                </NextLink>

                <NextLink href={"/adminproducts"}>
                    <Link>
                        <NavItem navSize={navSize} icon={FiBox} title="Products" />
                    </Link>
                </NextLink>

                <NextLink href={"/adminorders"}>
                    <Link>
                        <NavItem navSize={navSize} icon={FiUser} title="Orders" />
                    </Link>
                </NextLink>

                <NextLink href={"/adminsales"}>
                    <Link>
                        <NavItem navSize={navSize} icon={FiActivity} title="Sales Report" />
                    </Link>
                </NextLink>
            </Flex>

            {/* <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{userSelector.username}</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex> */}
        </Flex>
    )
}