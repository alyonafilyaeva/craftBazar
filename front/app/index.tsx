import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { IEvent } from "@/models/models";
import EventsPage from "@/pages/navbarPages/eventsPage";
import { StatusBar } from "expo-status-bar";
import Navbar from "@/navigation/navbarNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthPage from "@/pages/authPage";
import * as Font from 'expo-font';
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import AppNavigation from "@/navigation/appNavigation";
import { AuthContext } from "./authContext";
import { baseURL } from "@/constants/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  let [token, setToken] = useState()
  let [user, setUser] = useState({})
  async function getToken() {
    let res = await SecureStore.getItemAsync("token");
    setToken(res);
  }
  async function getFont() {
    await Font.loadAsync({
      'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf')
    })
    await Font.loadAsync({
      'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf')
    })
  }

  useEffect(() => {
    getToken();
    /* getUser() */
    getFont()
    console.log("token", token);
  }, []);
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      <AppNavigation />
    </AuthContext.Provider>
  );
}

