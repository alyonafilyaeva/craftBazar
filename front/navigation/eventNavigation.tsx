import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsPage from '@/pages/navbarPages/eventsPage';
import AddEventPage from '@/pages/eventPages/addEventPage/addEventPage';
import EventPage from '@/pages/eventPages/eventPage/eventPage';
import MasterPage from '@/pages/masterPages/masterPage/masterPage';
import EditMasterProfilePage from '@/pages/masterPages/editMasterProfilePage/editMasterProfilePage';
import { colors } from '@/styles/styles';
import { styles } from '../components/event/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductPage from '@/pages/productPages/productPage/productPage';
import MastersEventsPage from '@/pages/mastersEventsPage/mastersEventsPage';
import EditEventPage from '@/pages/eventPages/editEventPage/editEventPage';
import RequestsPage from '@/pages/requestsPage/requestsPage';
import InvetationsPage from '@/pages/invetationsPage/invetationsPage';

const Stack = createNativeStackNavigator();

export default function EventNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Events' component={EventsPage} />
            <Stack.Screen name='EditEvent' component={EditEventPage} />
            <Stack.Screen name='Event' component={EventPage} />
            <Stack.Screen name='Product' component={ProductPage} />
            <Stack.Screen name='Invetations' component={InvetationsPage} />
            <Stack.Screen name='MastersEvents' component={MastersEventsPage} />
            <Stack.Screen name='Requests' component={RequestsPage} />
        </Stack.Navigator>
    )
}

