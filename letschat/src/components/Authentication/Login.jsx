import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleToggle = () => {
        setShow(!show);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form from refreshing the page
        setLoading(true);

        if (!email || !password) {
            toast({
                title: 'Fields Required',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;  // Stop further execution if fields are empty
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            const { data } = await axios.post("http://localhost:5000/api/v1/user/login", { email, password }, );
            console.log(data, "data from login");
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            localStorage.setItem("userLoginInfo", JSON.stringify(data));
            navigate("/chats");
        } catch (error) {
          console.log(error)
            toast({
                title: 'Error occurred during login',
                description: error.response?.data?.message ,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
        } finally {
            setLoading(false); 
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack>
                <FormControl id='email' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        placeholder='Enter your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl id='password' isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            placeholder='Enter your Password'
                            type={show ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width={'4.5rem'}>
                            <Button size='sm' height={'1.75rem'} onClick={handleToggle}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Button
                    w={'100%'}
                    background={'#007CFF'}
                    type='submit'
                    color={'#fff'}
                    style={{ marginTop: '15px' }}
                    isLoading={loading}
                >
                    Submit
                </Button>
            </VStack>
        </form>
    )
}

export default Login;
