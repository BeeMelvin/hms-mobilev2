import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const buttons = [
  { title: "Announcements", image: { uri: "https://via.placeholder.com/50" } },
  { title: "Assignments", image: { uri: "https://via.placeholder.com/50" } },
  { title: "Submissions", image: { uri: "https://via.placeholder.com/50" } },
  { title: "Gradebook", image: { uri: "https://via.placeholder.com/50" } },
  { title: "Settings", image: { uri: "https://via.placeholder.com/50" } },
  { title: "Help", image: { uri: "https://via.placeholder.com/50" } },
  { title: "Contact Us", image: { uri: "https://via.placeholder.com/50" } },
  { title: "Log Out", image: { uri: "https://via.placeholder.com/50" } },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to the HMS App!</Text>
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Image source={button.image} style={styles.image} />
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    flexBasis: '45%', // Two buttons per row
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
});

