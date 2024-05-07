import { View, Text } from 'react-native'
import React from 'react'
import EditMasterProfilePage from '@/pages/masterPages/editMasterProfilePage/editMasterProfilePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterProfilePage from '@/pages/navbarPages/masterProfilePage/masterProfilePage';
import AddProductPage from '@/pages/productPages/addProductPage/addProductPage';
import ProductPage from '@/pages/productPages/productPage/productPage';
import EditProductPage from '@/pages/productPages/editProductPage/editProductPage';


const Stack = createNativeStackNavigator();

export default function MasterProfileNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='MasterProfile' component={MasterProfilePage} />
            <Stack.Screen name='EditMasterProfile' component={EditMasterProfilePage} />
            <Stack.Screen name='Product' component={ProductPage} />
            <Stack.Screen name='AddProduct' component={AddProductPage} />
            <Stack.Screen name='EditProduct' component={EditProductPage} />
        </Stack.Navigator>
    )
}

