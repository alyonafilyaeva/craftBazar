import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsPage from '@/pages/navbarPages/eventsPage';
import AddEventPage from '@/pages/eventPages/addEventPage';
import EditEventPage from '@/pages/eventPages/editEventPage';
import EventPage from '@/pages/eventPages/eventPage';
import MasterPage from '@/pages/masterPages/masterPage';
import EditMasterProfilePage from '@/pages/masterPages/editMasterProfilePage';
import { colors } from '@/styles/styles';
import { styles } from '../components/event/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterProfilePage from '@/pages/navbarPages/masterProfilePage';
import AddProductPage from '@/pages/productPages/addProductPage';
import EditProductPage from '@/pages/productPages/editProductPage';
import ProductPage from '@/pages/productPages/productPage';
import MastersEventsPage from '@/pages/mastersEventsPage';
import InvetationsPage from '@/pages/invetationsPage';
import RequestsPage from '@/pages/requestsPage';

const Stack = createNativeStackNavigator();

export default function PagesNavigation() {
    return (
        <Stack.Navigator  screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='Events' component={EventsPage} />
            <Stack.Screen name='AddEvent' component={AddEventPage}  />
            <Stack.Screen name='EditEvent' component={EditEventPage} />
            <Stack.Screen name='Event' component={EventPage} />
            <Stack.Screen name='Master' component={MasterPage}  />
            <Stack.Screen name='MasterProfile' component={MasterProfilePage} />
            <Stack.Screen name='EditMasterProfile' component={EditMasterProfilePage} />
            <Stack.Screen name='AddProduct' component={AddProductPage}  />
            <Stack.Screen name='EditProduct' component={EditProductPage} />
            <Stack.Screen name='Product' component={ProductPage} />
            <Stack.Screen name='Invetations' component={InvetationsPage}  />
            <Stack.Screen name='MastersEvents' component={MastersEventsPage} />
            <Stack.Screen name='Requests' component={RequestsPage} />
        </Stack.Navigator>
    )
}