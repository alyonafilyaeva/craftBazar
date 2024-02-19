import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './navbarNavigation';
import AuthPage from '@/pages/authPage';
import { AuthContext } from '@/app/authContext';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from 'axios';
import { baseURL } from '@/constants/constants';

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
    let { token, setToken } = useContext(AuthContext)
    console.log(token)
    return (
        token == null ? <AuthPage /> : <NavigationContainer independent={true} >
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="Navbar"
                    component={Navbar}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}