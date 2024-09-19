import { Box, Button, Menu, MenuButton, Text, Tooltip } from '@chakra-ui/react'
import {BellIcon} from '@chakra-ui/icons'
import React from 'react'

const SideDrower = () => {
  return (
    <div>
      <Box 
      display='flex'
      width='100%'
      justifyContent='space-between'
      alignItems='center'
      padding='8px 10px'
      bg='#007CFF'
      >
        <Tooltip label='Search users to Chat' hasArrow placement='bottom-end'>
            <Button variant='ghost' >
                <Text d={{base:"none" , md :"flex"}}>Search Users</Text>
            </Button>
        </Tooltip>
        <Text fontSize='2xl' color='white'>Let's Chat</Text>

        <div>
            <Menu>
                <MenuButton p={1}>
                <BellIcon color='white'/>
                </MenuButton>
            </Menu>
        </div>
      </Box>
    </div>
  )
}

export default SideDrower
