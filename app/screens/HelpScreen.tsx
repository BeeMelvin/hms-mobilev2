import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const HelpScreen = () => {
  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help Center</Text>
      
      <Text style={styles.header}>Frequently Asked Questions</Text>
      <View style={styles.faqContainer}>
        <Text style={styles.faq}>1. How do I submit an assignment?</Text>
        <Text style={styles.answer}>You can submit your assignment by navigating to the Assignments section and selecting the submission option.</Text>
      </View>
      <View style={styles.faqContainer}>
        <Text style={styles.faq}>2. How can I check my grades?</Text>
        <Text style={styles.answer}>To check your grades, go to the Gradebook section from the home screen.</Text>
      </View>
      
      <Text style={styles.header}>Contact Support</Text>
      <TouchableOpacity onPress={() => openURL('mailto:hamalepeb@gmail.com')} style={styles.linkButton}>
        <Text style={styles.link}>hamalepeb@gmail.com</Text>
      </TouchableOpacity>

      <Text style={styles.header}>User Guides</Text>
      <TouchableOpacity onPress={() => openURL('https://example.com/tutorials')} style={styles.linkButton}>
        <Text style={styles.link}>View Tutorials</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Feedback</Text>
      <Text>If you have any feedback or suggestions, please let us know!</Text>
      <TouchableOpacity onPress={() => openURL('https://example.com/feedback')} style={styles.linkButton}>
        <Text style={styles.link}>Submit Feedback</Text>
      </TouchableOpacity>

  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200EA', 
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333', 
  },
  faqContainer: {
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#f7f7f7', 
    borderRadius: 8,
    padding: 15,
    elevation: 1,
  },
  faq: {
    fontSize: 16,
    fontWeight: '600', 
  },
  answer: {
    fontSize: 14,
    marginTop: 5,
    color: '#555', 
  },
  linkButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6200EA', 
    borderRadius: 5,
  },
  link: {
    color: '#ffffff', 
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HelpScreen;
