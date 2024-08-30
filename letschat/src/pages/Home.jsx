import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Home = () => {
  return (
    <>
    <div className="main-body-wrapper">

    
    <div className="left-content-wrapper">

    </div>
    <div className="right-content-wrapper">
    <Container centerContent maxWidth={'550px'}>
      <Box
        d="flex"
        justifyContent="center"
        // alignItems="center"
        // p={3}
        p='40px 10px'
        bg="rgba(255, 255, 255, 0.5)"
        maxHeight={'550px'}
        maxWidth='450px'
        w="100%"
        m="40px 0 15px 0"
        boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
        borderRadius="4px"
      >
        <Text
          textAlign={"center"}
          fontSize="4xl"
          fontFamily="work sans"
          color="black"
        >
          LET'S CHATT...
        </Text>

        <Box
        d='flex'
        justifyContent='center'
        p = '10px 4px'
        bg="rgba(255, 255, 255, 0.5)"
        w="100%"
        

        >
          <Tabs variant="unstyled">
            <TabList d='flex'  justifyContent='center' >
              <Tab w='140px'  _selected={{ color: "white", bg: "#007CFF", w:'140px', }}>Login</Tab>
              <Tab w='140px' _selected={{ color: "white", bg: "#007CFF" , w:'140px'}}>Sign Up</Tab>
            </TabList>
            <TabPanels 
            padding={'10px 0'}
             maxH="350px"
        overflowY="auto"
            >
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Container>
    </div>
    
    </div>
    </>
  );
};

export default Home;
