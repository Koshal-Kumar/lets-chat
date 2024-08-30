import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [picture, setPicture] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate =useNavigate();
    const handleToggle = () => {
        setShow(!show);
    }

    const postDetails = (picture) => {
        setLoading(true);
        if (picture === undefined) {
            toast({
                title: 'Please select an image',
                description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }

        if (picture.type === 'image/jpeg' || picture.type === 'image/png') {
            const data = new FormData();
            data.append("file", picture);
            data.append("upload_preset", "letsChatApp")
            data.append("cloud_name", "dezdrg4sb")
            fetch("https://api.cloudinary.com/v1_1/dezdrg4sb/image/upload", {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(data => {
                    setPicture(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                })
        } else {
            toast({
                title: 'Invalid image type',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!name || !email || !password || !confirm) {
            setLoading(false);
            toast({
                title: 'Please fill the required fields',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        if (password !== confirm) {
            setLoading(false);
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            const { data } = await axios.post("http://localhost:5000/api/v1/user/register", { name, email, password, picture });
            toast({
                title: 'Registered successfully',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            localStorage.setItem("userinfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chats')
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                toast({
                    title: 'Error occurred!',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom'
                });
                console.error('API error:', error.response.data);
            } else {
                toast({
                    title: 'Error occurred!',
                    description: 'An unexpected error occurred. Please try again.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom'
                });
                console.error('Unexpected error:', error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={'15px'} color={'black'}>
                <FormControl id='name' isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Enter your Name'
                        onChange={(e) => setName(e.target.value)} />
                </FormControl>

                <FormControl id='email' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Enter your Email'
                        onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl id='password' isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input placeholder='Enter your Password'
                            type={show ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)} />
                        <InputRightElement width={'4.5rem'}>
                            <Button size='sm' height={'1.75rem'} onClick={handleToggle}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl id='confirm' isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input placeholder='Confirm your Password'
                            type={show ? 'text' : 'password'}
                            onChange={(e) => setConfirm(e.target.value)} />
                        <InputRightElement width={'4.5rem'}>
                            <Button size='sm' height={'1.75rem'} onClick={handleToggle}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Upload Image</FormLabel>
                    <Input type='file'
                        p={1.5}
                        accept='image/*'
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
                </FormControl>

                <Button w={'100%'}
                    background={'#007CFF'}
                    color={'#fff'}
                    style={{ marginTop: '15px' }}
                    isLoading={loading}
                    type='submit'
                >Submit</Button>
            </VStack>
        </form>
    )
}

export default Signup;
