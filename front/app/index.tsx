import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { IEvent, IEvents } from "@/models/models";
import EventsPage from "@/pages/navbarPages/eventsPage";
import { StatusBar } from "expo-status-bar";
import Navbar from "@/navigation/navbarNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthPage from "@/pages/authPage";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator  screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen
          name="Navbar"
          component={Navbar}
        />
        <Stack.Screen
          name="Auth"
          component={AuthPage}
        />
      </Stack.Navigator>
      {/* <Navbar /> */}
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
