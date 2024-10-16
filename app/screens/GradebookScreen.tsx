import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GradebookScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gradebook</Text>
      {/* Add gradebook content here */}
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

export default GradebookScreen;
