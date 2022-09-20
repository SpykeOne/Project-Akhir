import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
  TableContainer,
  TableCaption,
  Tfoot,
  Image as Img,
} from "@chakra-ui/react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiCreditCard,
  FiSearch,
  FiBell,
  FiGrid,
  FiLogOut,
  FiShoppingCart,
  FiEdit,
} from "react-icons/fi";
import { EditIcon } from "@chakra-ui/icons";
// import MyChart from "../../../components/Chart/index";

import Logo from "../../../public/NavbarLogoPink.gif";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import jsCoockie from "js-cookie";
import { useRouter } from "next/router";
import auth_types from "../../../redux/reducers/types/auth";
import M_addCategory from "../../modals/M_addCategory/index";
import M_addProduct from "../../modals/M_addProduct";
import * as moment from "moment";
import { axiosInstance } from "../../../library/api";

export default function NavbarA() {
  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);
  const userSelector = useSelector((state) => {
    return state.auth;
  });

  const autoRender = useSelector((state) => {
    return state.post;
  });

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    jsCoockie.remove("auth_token");

    dispatch({
      type: auth_types.AUTH_LOGOUT,
    });
    setIsLoading(true);
    router.push("/auth");
  };

  useEffect(() => {
    setIsLoading(false);
  }, [autoRender]);

  // const current = new Date();
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;
  const date = moment(new Date()).format("LLLL");

  const [loadPage, setLoadPage] = useState(1);
  const [contentList, setContentList] = useState([]);

  const fetchData = async () => {
    await axiosInstance
      .get("/categories")
      .then((res) => {
        const data = res.data.result;
        console.log("tryg" + data);
        setContentList(res.data.result);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (autoRender?.value !== undefined) {
      setLoadPage(loadPage);
      fetchData();
      console.log(contentList);
    }
  }, [autoRender?.value]);

  const renderCategory = () => {
    return contentList.map((val, index) => {
      return (
        <Tr>
          <Td>{val.category}</Td>
          <Td>
            <Img src={`http://${val.img_url}`} width={"90px"} height={"50px"} />
          </Td>
          <Flex justify={"space-between"}>
            <Td>
              <Icon as={FiEdit} fontSize="2xl" />
            </Td>
          </Flex>
        </Tr>
      );
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      h={[null, null, "300vh"]}
      maxW="2000px"
      flexDir={["column", "column", "row"]}
      overflow="hidden"
    >
      {/* Column 1 */}

      {/* --------------Column 2------------- */}
      <Flex
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="2%"
        flexDir="column"
        overflow="auto"
        minH="full"
        minW="full"
      >
        {/* <Heading fontWeight="normal" mb={4} letterSpacing="tight">
          Welcome back, {""}
          <Flex display="inline-flex" fontWeight="bold">
            {userSelector.username}
          </Flex>
        </Heading> */}

        {/* -------------CATEGORY------------ */}

        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              CATEGORY
            </Heading>
            <Text fontSize="small" color="gray" ml={4}>
              {date}
            </Text>
          </Flex>

          <M_addCategory />
        </Flex>
        <Box
          mt={5}
          borderRadius={5}
          // bgColor={"#e3e3e3"}
          minH="40vh"
          minW="80vh"
          boxShadow={"dark-lg"}
          border={2}
        >
          {/* -----------TABLE CATEGORY---------- */}
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th>Image</Th>
                  <Th isNumeric>Setting</Th>
                </Tr>
              </Thead>
              <Tbody>{renderCategory()}</Tbody>
              <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>

        {/* ------------PRODUCT DATA--------- */}

        
        
      </Flex>

      {/* --------------Column 3------------ */}
    </Flex>
  );
}