import React from 'react';
import type { PropsWithChildren } from 'react';
import { 
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,

} from "react-native";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";

//Screens
import AssignmentsScreen from "../assignments";
import HomeScreen from '../(tabs)/index';

const Stack = createNativeStackNavigator();


export default function App() {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Assignments" component={AssignmentsScreen} />
            </Stack.Navigator>
     </NavigationContainer>
    );
}