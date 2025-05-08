import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";


const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
    ? JSON.parse(localStorage.getItem("cad_cliente"))
    : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex h="100vh" 
    align="flex-start"
    justify="center" 
    fontSize="20px" 
    fontFamily="poppins"
    pt={10} 
    >
      <Box
          maxW={800}
          w="100%"
          h="auto"
          rounded="lg"
          shadow="xl"
          overflow="hidden"
        >

      <Box
        bg="blue.500"
        color="white"
        p={4}
        mb={6}
        rounded="md"
        shadow="md"
        textAlign="center"
        fontSize="2xl"
        fontWeight="bold"
      >
        Cadastro de Clientes
      </Box>

      <Flex justify="center" mb={4}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>
      </Flex>


        <Box overflowY="auto" height="100%">
        <Table mt={6} variant="simple" colorScheme="gray">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  E-mail
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, email }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td p={0}>
                  <EditIcon
                      fontSize={20}
                      color="green.500"
                      cursor="pointer"
                      ml={2}
                      onClick={() => [
                        setDataEdit({ name, email, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    color="red.600"
                    cursor="pointer"
                    ml={2}
                    onClick={() => handleRemove(email)}
                  />

                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp 
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit} 
        />
      )}
    </Flex>
  );
};

export default App;
