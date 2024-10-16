import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from '@react-navigation/stack';
import AssignmentsScreen from "../screens/Assignments";
import AssignmentDetailScreen from "../screens/AssignmentsDetails";
import AnnouncementsScreen from '../screens/AnnouncementsScreen';
import SubmissionsScreen from '../screens/SubmissionsScreen';
import GradebookScreen from '../screens/GradebookScreen';
import SettingsScreen from '../screens/SettingScreen';
import HelpScreen from '../screens/HelpScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import LogoutScreen from '../screens/LogoutScreen';

// Defining screen names
type RootStackParamList = {
  Home: undefined;
  Assignments: undefined;
  AssignmentsDetails: { assignment: any }; // Pass the assignment object
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const buttons = [
  { title: "Announcements", image: require('./assets/announcements.png') },
  { title: "Assignments", image: require('./assets/assignments.png') },
  { title: "Submissions", image: require('./assets/submission.png') },
  { title: "Gradebook", image: require('./assets/gradebook.png') },
  { title: "Settings", image: require('./assets/settings.png') },
  { title: "Help", image: require('./assets/help.png') },
  { title: "Contact Us", image: require('./assets/contact.png') },
  { title: "Logout", image: require('./assets/logout.png') },
];

// Create stack navigator
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Assignments" component={AssignmentsScreen} />
        <Stack.Screen name="AssignmentsDetails" component={AssignmentDetailScreen} />
        <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
        <Stack.Screen name="Submissions" component={SubmissionsScreen} />
        <Stack.Screen name="Gradebook" component={GradebookScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Contact Us" component={ContactUsScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Get navigation object

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome!</Text>
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleNavigation(button.title as keyof RootStackParamList)}
          >
            <Image source={button.image} style={styles.image} />
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.versionText}>Version: 1.0.0</Text>
      <Text style={styles.copyrightText}>© {new Date().getFullYear()} HMS App. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5", // Light grey background
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200EA", // Purple color for header
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: "center",
    flexBasis: "45%", // Two buttons per row
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#6200EA", // Border color to match the theme
    borderWidth: 1,
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
  versionText: {
    marginTop: 20,
    fontSize: 14,
    color: "#333",
  },
  copyrightText: {
    fontSize: 14,
    color: "#333",
  },
});
