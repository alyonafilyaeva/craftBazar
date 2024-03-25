import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'
import { baseURL } from '@/constants/constants'
import * as SecureStore from "expo-secure-store";
import { AuthContext } from '@/app/authContext';
import axios from 'axios';

export default function Login() {
    let { token, setToken } = useContext(AuthContext)
    let [users, setUsers] = useState()
    var { user, setUser } = useContext(AuthContext)
    let [login, setLogin] = useState()
    let [password, setPassword] = useState()
    async function saveToken(key: string, value: string) {
        await SecureStore.setItemAsync(key, value);
    }
    let loginUser = async () => {
        let response = await fetch(`${baseURL}/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: login,
                password: password,
            }),
        });
        let data = await response.json();
        if (response.status === 200) {
            setToken(data.accessToken)
            saveToken('token', data.accessToken)
        }
        console.log('login token', data.accessToken)
    }

return (
    <View>
        <View>
            <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Логин
            </Text>
            <TextInput
                style={stylesSheet.input}
                value={login}
                onChangeText={setLogin}
                placeholder="Логин"
            />
        </View>
        <View>
            <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Пароль
            </Text>
            <TextInput
                style={stylesSheet.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Пароль"
            />
        </View>
        <TouchableOpacity onPress={loginUser} style={[stylesSheet.button,stylesSheet.accentButton, { marginTop: paddings.bodyPadding }]}>
            <Text style={{ fontSize: fonts.descriptionFont, color: colors.secondColor, textAlign: 'center' }}>ВОЙТИ</Text>
        </TouchableOpacity>
    </View>
)
}