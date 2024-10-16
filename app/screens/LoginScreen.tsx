// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Validate input fields
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      // Make the login request to the API
      const response = await fetch('http://196.252.197.151:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if the response was ok
      if (!response.ok) {
        const data = await response.json();
        Alert.alert('Error', data.detail || 'Login failed');
        return; // Exit if the response is not OK
      }

      // Parse the response data
      const data = await response.json();
      // Store the access token in AsyncStorage
      await AsyncStorage.setItem('userToken', data.access);
      Alert.alert('Success', 'Logged in successfully!');
      // Navigate to the home screen
      navigation.navigate('Home');

    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please check your internet connection and try again.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'A password reset link will be sent to your email.'); // Implement your logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  forgotPassword: {
    marginTop: 12,
    color: 'blue',
    textAlign: 'center',
  },
});
