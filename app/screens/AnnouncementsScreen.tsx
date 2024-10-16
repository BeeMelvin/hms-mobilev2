// Example for AnnouncementsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnnouncementsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Announcements</Text>
      {/* Add your announcements content here */}
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

export default AnnouncementsScreen;
