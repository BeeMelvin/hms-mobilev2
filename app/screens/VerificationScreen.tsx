import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Ensure you have this package installed
import { useRoute } from '@react-navigation/native';

export default function VerificationScreen() {
  const [verificationCode, setVerificationCode] = useState('');
  const route = useRoute();
  const { verificationCode: expectedCode } = route.params;

  const handleVerify = async () => {
    // Validate the verification code
    if (verificationCode === '') {
      Alert.alert('Error', 'Please enter the verification code.');
      return;
    }

    if (verificationCode === expectedCode.toString()) {
      Alert.alert('Success', 'Verification successful! You can now log in.');
    } else {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#6200ea', '#f0f8ff']} style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.instruction}>Enter the verification code sent to your email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </LinearGradient>
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
    color: '#ffffff', 
  },
  instruction: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#ffffff', 
  },
  input: {
    height: 40,
    borderColor: '#6200ea', 
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8, 
    backgroundColor: '#ffffff', 
  },
  button: {
    backgroundColor: '#6200ea', 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
