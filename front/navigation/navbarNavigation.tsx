import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather, FontAwesome5, Entypo, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsPage from '@/pages/navbarPages/eventsPage';
import MastersPage from '@/pages/navbarPages/mastersPage';
import AccountPage from '@/pages/navbarPages/accountPage';
import MasterProfilePage from '@/pages/navbarPages/masterProfilePage';
import OrgEventsPage from '@/pages/navbarPages/orgEventsPage/orgEventsPage';
import FavouritePage from '@/pages/navbarPages/favouritePage';
import { colors } from '@/styles/styles';
import { styles } from '../components/event/styles';
import PagesNavigation from './eventNavigation';
import MasterNavigation from './masterNavigation';
import EventNavigation from './eventNavigation';
import MasterProfileNavigation from './masterProfileNavigation';
import OrgEventsNavigation from './orgEventsNavigation';

const Tab = createBottomTabNavigator()

export default function Navbar() {
    const [user, setUser] = useState('org')
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
            <Tab.Screen name='Events' component={EventNavigation} options={{ tabBarIcon: ({ focused }) => (<Feather name="calendar" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />
            <Tab.Screen name='Masters' component={MasterNavigation} options={{ tabBarIcon: ({ focused }) => (<Octicons name="people" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />
            {user == 'guest' && <Tab.Screen name='Favourite' component={FavouritePage} options={{ tabBarIcon: ({ focused }) => (<AntDesign name="hearto" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />}
            {user == 'master' && <Tab.Screen name='MasterProfile' component={MasterProfileNavigation} options={{ tabBarIcon: ({ focused }) => (<Entypo name="add-to-list" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />}
            {user == 'org' && <Tab.Screen name='OrgEvents' component={OrgEventsNavigation} options={{ tabBarIcon: ({ focused }) => (<Entypo name="add-to-list" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />}
            <Tab.Screen name='Account' component={AccountPage} options={{ tabBarIcon: ({ focused }) => (<FontAwesome5 name="user-circle" size={30} color={focused ? colors.accentColor : colors.greyColor} />) }} />
            
        </Tab.Navigator>
    )
}