import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsPage from '@/pages/navbarPages/eventsPage/eventsPage';
import AddEventPage from '@/pages/eventPages/addEventPage/addEventPage';
import EventPage from '@/pages/eventPages/eventPage/eventPage';
import MasterPage from '@/pages/masterPages/masterPage/masterPage';
import EditMasterProfilePage from '@/pages/masterPages/editMasterProfilePage/editMasterProfilePage';
import { colors } from '@/styles/styles';
import { styles } from '../components/event/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterProfilePage from '@/pages/navbarPages/masterProfilePage/masterProfilePage';
import AddProductPage from '@/pages/productPages/addProductPage/addProductPage';
import ProductPage from '@/pages/productPages/productPage/productPage';
import MastersPage from '@/pages/navbarPages/mastersPage/mastersPage';
import MastersEventsPage from '@/pages/mastersEventsPage/mastersEventsPage';
import InvetationsPage from '@/pages/invetationsPage/invetationsPage';
import MyEventsPage from '@/pages/masterPages/myEventsPage/myEventsPage';

const Stack = createNativeStackNavigator();
export default function MasterNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Masters' component={MastersPage} />
            <Stack.Screen name='Master' component={MasterPage} />
            <Stack.Screen name='MastersEvents' component={MastersEventsPage} />
            <Stack.Screen name='Product' component={ProductPage} />
        </Stack.Navigator>
    )
}