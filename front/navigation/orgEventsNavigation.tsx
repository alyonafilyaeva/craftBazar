import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsPage from '@/pages/navbarPages/eventsPage';
import AddEventPage from '@/pages/eventPages/addEventPage/addEventPage';
import EditEventPage from '@/pages/eventPages/editEventPage';
import EventPage from '@/pages/eventPages/eventPage/eventPage';
import { colors } from '@/styles/styles';
import { styles } from '../components/event/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrgEventsPage from '@/pages/navbarPages/orgEventsPage/orgEventsPage';

const Stack = createNativeStackNavigator();

export default function OrgEventsNavigation() {
    return (
        <Stack.Navigator  screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='orgEvent' component={OrgEventsPage} />
            <Stack.Screen name='AddEvent' component={AddEventPage} />
            <Stack.Screen name='Event' component={EventPage} />
        </Stack.Navigator>
    )
}