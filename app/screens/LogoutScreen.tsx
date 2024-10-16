import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logout</Text>
      {/* Add logout confirmation or actions here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LogoutScreen;
