import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Button, Checkbox, FormControl, FormLabel, Heading, IconButton, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import icons from react-icons

function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleRememberMeChange = (event) => setRememberMe(event.target.checked);

  const onSubmit = async (data) => {
    console.log("Form submitted", data); // Log form data
    try {
      const response = await axios.post('https://seat-booking-be0.onrender.com/user/signin', {
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response received:", response); // Log the response

  
      if (response.data?.status === 'SUCCESS') {
        toast({
          title: 'Login Successful',
          description: 'Your account has been login successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        reset();
       
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        navigate('/booking');
      } else {
        // Display error message if signup fails
        toast({
          title: 'Login Failed',
          description: response.data?.message || 'An error occurred during signup.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: 'Login Failed',
        description:'An error occurred during login.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgGradient="linear(to-r, teal.500, blue.500)"
    >
      <Box
        bg="white"
        p={6}
        rounded="md"
        w={{ base: '90%', sm: '80%', md: '400px' }}
        boxShadow="lg"
      >
        <Heading textAlign="center" size="lg" mb={6}>
          Sign In
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email',
                  },
                })}
              />
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required' })}
                pr="4.5rem"
              />
              <IconButton
                position="absolute"
                right="1rem"
                top="2rem"
                aria-label="Toggle password visibility"
                icon={showPassword ? <HiEyeOff /> : <HiEye />}
                onClick={togglePasswordVisibility}
              />
            </FormControl>

            <Stack direction="row" spacing={4} align="center" justify="space-between">
              <Checkbox
                isChecked={rememberMe}
                onChange={handleRememberMeChange}
                colorScheme="teal"
              >
                Remember me
              </Checkbox>
              <Text fontSize="sm">
                <a href="#">Forgot password?</a>
              </Text>
            </Stack>

            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              w="full"
              mt={4}
              fontWeight="bold"
            >
              Sign In
            </Button>
          </Stack>
        </form>
        <Text textAlign="center" mt={4}>
          Don't have an account?{' '}
          <Text as="span" color="teal.500">
            <a href="/SignUp">Register</a>
          </Text>
        </Text>
      </Box>
    </Box>
  );
}

export default Login;
