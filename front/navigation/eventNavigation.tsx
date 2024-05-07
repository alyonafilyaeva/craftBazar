import { View, Text } from 'react-native'
import React from 'react'
import EventsPage from '@/pages/navbarPages/eventsPage/eventsPage';
import EventPage from '@/pages/eventPages/eventPage/eventPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MastersEventsPage from '@/pages/mastersEventsPage/mastersEventsPage';
import EditEventPage from '@/pages/eventPages/editEventPage/editEventPage';
import RequestsPage from '@/pages/requestsPage/requestsPage';
import InvetationsPage from '@/pages/invetationsPage/invetationsPage';
import MasterPage from '@/pages/masterPages/masterPage/masterPage';

const Stack = createNativeStackNavigator();

export default function EventNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Events' component={EventsPage} />
            <Stack.Screen name='EditEvent' component={EditEventPage} />
            <Stack.Screen name='Event' component={EventPage} />
            <Stack.Screen name='Invetations' component={InvetationsPage} />
            <Stack.Screen name='MastersEvents' component={MastersEventsPage} />
            <Stack.Screen name='Requests' component={RequestsPage} />
            <Stack.Screen name='Master' component={MasterPage} />
        </Stack.Navigator>
    )
}

