import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsPage from '@/pages/navbarPages/eventsPage';
import AddEventPage from '@/pages/eventPages/addEventPage/addEventPage';
import EditMasterProfilePage from '@/pages/masterPages/editMasterProfilePage/editMasterProfilePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterProfilePage from '@/pages/navbarPages/masterProfilePage/masterProfilePage';
import AddProductPage from '@/pages/productPages/addProductPage/addProductPage';
import InvetationsPage from '@/pages/invetationsPage/invetationsPage';

const Stack = createNativeStackNavigator();

export default function MasterProfileNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='MasterProfile' component={MasterProfilePage} />
            <Stack.Screen name='EditMasterProfile' component={EditMasterProfilePage} />
            <Stack.Screen name='AddProduct' component={AddProductPage} />
            <Stack.Screen name='Invetations' component={InvetationsPage} />
        </Stack.Navigator>
    )
}

