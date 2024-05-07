import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvetationsPage from '@/pages/invetationsPage/invetationsPage';
import MyEventsPage from '@/pages/masterPages/myEventsPage/myEventsPage';
import RequestsPage from '@/pages/requestsPage/requestsPage';
import AccountPage from '@/pages/navbarPages/accountPage/accountPage';

const Stack = createNativeStackNavigator();
export default function AccountNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Account' component={AccountPage} />
            <Stack.Screen name='Requests' component={RequestsPage} />
            <Stack.Screen name='Invetations' component={InvetationsPage} />
            <Stack.Screen name='MyEvents' component={MyEventsPage} />
        </Stack.Navigator>
    )
}