
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.instruction}>Enter the verification code sent to your email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />
      <Button title="Verify" onPress={handleVerify} />
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
  instruction: {
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
});
