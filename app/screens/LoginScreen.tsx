import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore for secure token storage
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indication
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Validate input fields
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      // Make the login request to the API
      const response = await fetch('http://192.168.120.11:8000/api/token/', {
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
      // Store the access and refresh tokens in SecureStore
      await SecureStore.setItemAsync('userToken', data.access);
      await SecureStore.setItemAsync('refreshToken', data.refresh);

      Alert.alert('Success', 'Logged in successfully!');
      // Navigate to the home screen
      navigation.navigate('Home');

    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please check your internet connection and try again.');
    } finally {
      setLoading(false); // Set loading state to false after operation
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'A password reset link will be sent to your email.');
  };

  const refreshToken = async () => {
    try {
      // Retrieve the refresh token from SecureStore
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!refreshToken) throw new Error('No refresh token found.');

      // Make the request to refresh the token
      const response = await fetch('http://192.168.120.11:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      // Check if the response was ok
      if (!response.ok) {
        throw new Error('Failed to refresh token.');
      }

      // Parse the response data
      const data = await response.json();
      // Save the new access token
      await SecureStore.setItemAsync('userToken', data.access);

      return data.access; // Return the new access token
    } catch (error) {
      console.error('Error refreshing token:', error);
      Alert.alert('Error', 'Session expired. Please log in again.');
      navigation.navigate('Login');
    }
  };

  const apiRequest = async (url, options = {}) => {
    const token = await SecureStore.getItemAsync('userToken');

    // Set the authorization header
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      // If unauthorized, try refreshing the token
      await refreshToken();
      const newToken = await SecureStore.getItemAsync('userToken'); // Get the new token after refresh

      // Retry the request with the new token
      headers.Authorization = `Bearer ${newToken}`;
      return fetch(url, { ...options, headers });
    }

    return response;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>
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
    backgroundColor: '#f9f9f9', // Light background for better contrast
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#4B0082', // Dark purple for the title
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    backgroundColor: '#fff', // White background for inputs
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200ee', // Primary color for the button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff', // White text for button
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 12,
    color: '#4B0082', // Purple color for "Forgot Password"
    textAlign: 'center',
    fontWeight: '500',
  },
});
