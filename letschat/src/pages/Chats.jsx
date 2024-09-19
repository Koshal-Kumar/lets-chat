import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import MyChats from '../components/Authentication/mesclineus/MyChats';
import SideDrower from '../components/Authentication/mesclineus/SideDrower';
import ChatBox from '../components/Authentication/mesclineus/ChatBox';


const Chats = () => {
 const {user} =  ChatState();
  return (
    <div style={{width: '100%'}}>
      {user && <SideDrower/>}
        <Box
        d='flex'
        alignItems='center'
        justifyContent='space-between'
        w='100%'
        
        padding='20px'>
          {user && <MyChats/>}
          {user && <ChatBox/>}
        </Box>
    </div>
  )
}

export default Chats
