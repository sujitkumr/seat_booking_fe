import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  useToast,
  Link,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

function SignUp() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleTermsChange = (event) => setTermsAccepted(event.target.checked);

  const onSubmit = async (data) => {
  
    if (!termsAccepted) {
      toast({
        title: 'Terms not accepted',
        description: 'You must accept the terms and conditions to proceed.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // Call the API to create the user account
      const response = await axios.post(
        'https://seat-booking-be0.onrender.com/user/SignUp',
        {
          name: data.username,
          email: data.email,
          password: data.password,
          termsAccepted: termsAccepted,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data); // Log the response

      if (response.data?.status === 'SUCCESS') {
        toast({
          title: 'Signup Successful',
          description: 'Your account has been created successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        reset();
        navigate('/login' );
      } else {
        // Display error message if signup fails
        toast({
          title: 'Signup Failed',
          description: response.data?.message || 'An error occurred during signup.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle errors (e.g., network issues)
      console.error('Error during signup:', error);
      toast({
        title: 'Signup Failed',
        description: 'A server or network error occurred. Please try again.',
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
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register('username', { required: 'Username is required', minLength: 3, maxLength: 12 })}
              />
              {errors.username && <Text color="red.500">{errors.username.message}</Text>}
            </FormControl>

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
              {errors.email && <Text color="red.500">{errors.email.message}</Text>}
            </FormControl>

            <FormControl isInvalid={errors.password} position="relative">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required', minLength: 6 })}
              />
              <IconButton
                position="absolute"
                right="1rem"
                top="2rem"
                aria-label="Toggle password visibility"
                icon={showPassword ? <HiEyeOff /> : <HiEye />}
                onClick={togglePasswordVisibility}
              />
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </FormControl>

            <FormControl>
              <Checkbox
                isChecked={termsAccepted}
                onChange={handleTermsChange}
                colorScheme="teal"
              >
                I accept all terms & conditions
              </Checkbox>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              w="full"
              mt={4}
              fontWeight="bold"
            >
              Sign Up
            </Button>
          </Stack>
        </form>

        <Text textAlign="center" mt={4}>
          Already have an account?{' '}
          <Link color="teal.500" href="/login">
            Sign In
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default SignUp;