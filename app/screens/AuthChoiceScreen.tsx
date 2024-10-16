// AuthChoiceScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthChoiceScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navigate to the login screen
  };

  const handleSignUpPress = () => {
    navigation.navigate('Signup'); // Navigate to the sign-up screen
  };

  return (
    <ImageBackground 
      source={require('../(tabs)/assets/1.jpg')} // Updated path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Please choose an option:</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white background for better readability
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    width: '90%', // Width of the container
    shadowColor: '#000', // Shadow for a floating effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Dark color for better contrast
    textAlign: 'center', // Centered title
  },
  subtitle: {
    fontSize: 20, // Increased font size
    marginBottom: 32,
    color: '#555', // Medium gray color
    textAlign: 'center', // Centered subtitle
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded button corners
    marginVertical: 10, // Spacing between buttons
    width: '80%', // Button width
    alignItems: 'center', // Center button text
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontSize: 18, // Font size of the button text
    fontWeight: 'bold', // Bold text
  },
});

export default AuthChoiceScreen;
