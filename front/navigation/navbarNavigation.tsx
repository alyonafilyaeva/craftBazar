import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsPage from '@/pages/navbarPages/eventsPage';
import MastersPage from '@/pages/navbarPages/mastersPage';
import AccountPage from '@/pages/navbarPages/accountPage';
import MasterProfilePage from '@/pages/navbarPages/masterProfilePage';
import OrgEventsPage from '@/pages/navbarPages/orgEventsPage';
import FavouritePage from '@/pages/navbarPages/favouritePage';
import { colors } from '@/styles/styles';
import { styles } from '../components/event/styles';
import PagesNavigation from './pagesNavigation';

const Tab = createBottomTabNavigator()

export default function Navbar() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
            <Tab.Screen name='Events' component={PagesNavigation} options={{ tabBarIcon: ({ focused }) => (<Feather name="calendar" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />
            <Tab.Screen name='Masters' component={MastersPage} options={{ tabBarIcon: ({ focused }) => (<Octicons name="people" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />
            <Tab.Screen name='Favourite' component={AccountPage} options={{ tabBarIcon: ({ focused }) => (<AntDesign name="hearto" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />
            <Tab.Screen name='Account' component={AccountPage} options={{ tabBarIcon: ({ focused }) => (<FontAwesome5 name="user-circle" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />
            {/* <Tab.Screen name='MasterProfile' component={MasterProfilePage} options={{ tabBarIcon: ({ focused }) => (<Feather name="calendar" size={24} color={focused ? colors.accentColor : colors.greyColor} />) }} />
            <Tab.Screen name='OrgEvents' component={OrgEventsPage} options={{ tabBarIcon: ({ focused }) => (<Feather name="calendar" size={24} color={focused ? colors.accentColor : colors.greyColor} />) }} /> */}
        </Tab.Navigator>
    )
}