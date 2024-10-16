// AuthChoiceScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AuthChoiceScreen() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navigate to the login screen
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp'); // Navigate to the sign-up screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Please choose an option:</Text>
      <Button title="Login" onPress={handleLoginPress} />
      <Button title="Sign Up" onPress={handleSignUpPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
});
