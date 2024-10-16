// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [studentNumber, setStudentNumber] = useState(''); // New state for student number
  const [firstName, setFirstName] = useState(''); // New state for first name
  const [lastName, setLastName] = useState(''); // New state for last name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState(''); // New state for password confirmation
  const navigation = useNavigation();

  const handleSignup = async () => {
    // Validate input fields
    if (
      username === '' ||
      studentNumber === '' ||
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Check if passwords match
    if (password !== password2) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Make the signup request to the API
      const response = await fetch('http://192.168.120.11:8000/api/usr/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          student_number: studentNumber, // Include student number
          first_name: firstName, // Include first name
          last_name: lastName, // Include last name
          email,
          password,
          password2,
        }),
      });

      // Check if the response was ok
      if (!response.ok) {
        const data = await response.json();
        Alert.alert('Error', data.username || data.email || 'Signup failed');
        return; // Exit if the response is not OK
      }

      // Parse the response data
      const data = await response.json();
      Alert.alert('Success', `User ${data.username} registered successfully! A verification code has been sent to your email.`);

      // Optionally navigate to a verification screen or handle verification code here
      navigation.navigate('Verification', { verificationCode: data.verification_code });

    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong. Please check your internet connection and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Student Number" // New field for student number
        value={studentNumber}
        onChangeText={setStudentNumber}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="First Name" // New field for first name
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name" // New field for last name
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password" // New field for password confirmation
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>or sign up with</Text>
      
      <View style={styles.socialButtons}>
        <TouchableOpacity onPress={() => console.log('Google Sign Up')}>
          <Image source={require('../(tabs)/assets/google.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Facebook Sign Up')}>
          <Image source={require('../(tabs)/assets/communication.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Twitter Sign Up')}>
          <Image source={require('../(tabs)/assets/twitter.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f7f9fc', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', 
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, 
    marginBottom: 16,
    paddingLeft: 12,
    backgroundColor: '#fff', 
  },
  signupButton: {
    backgroundColor: '#6200ee', 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 12,
    color: '#555'
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
