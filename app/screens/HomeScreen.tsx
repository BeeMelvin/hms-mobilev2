import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import type { PropsWithChildren } from 'react';
import { 
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,

} from "react-native";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";

//Screens
import AssignmentsScreen from "../assignments";
import { useNavigation } from "expo-router";




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

const Stack =createNativeStackNavigator()

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
    flexBasis: '45%', 
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

