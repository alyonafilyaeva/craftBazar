import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import * as SecureStore from "expo-secure-store";
import { stylesSheet } from '@/styles/styles';
import { AuthContext } from '@/app/authContext';

export default function AccountPage({navigation}) {
  let {token, setToken} = useContext(AuthContext)
  let {user, setUser} = useContext(AuthContext)
  let logoutUser = async () => {
    await SecureStore.deleteItemAsync('token')
    let token = await SecureStore.getItemAsync('token')
    console.log(token)
    setToken(null)
    setUser('')
  }
  return (
    <View>
      <TouchableOpacity style={stylesSheet.accentButton} onPress={logoutUser}>
        <Text>Выйти</Text>
        
      </TouchableOpacity>
      <Text>{user.id}</Text>
    </View>
  )
}