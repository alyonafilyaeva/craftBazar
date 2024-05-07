import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'
import { baseURL } from '@/constants/constants'
import * as SecureStore from "expo-secure-store";
import { AuthContext } from '@/app/authContext';
import axios from 'axios';

export default function LogupOrg() {
    var { user, setUser } = useContext(AuthContext)
    let [login, setLogin] = useState()
    let [password, setPassword] = useState()
    let [name, setName] = useState()
    let [contacts, setContacts] = useState()
    let [accept, setAccept] = useState(false)

    let loginUser = async () => {
        let response = await fetch(`${baseURL}/api/organizers/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: login,
                password: password,
                name: name, 
                contacts: contacts
            }),
        });
    }

return (
    <View>
        <View>
            <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Название организации
            </Text>
            <TextInput
                style={stylesSheet.input}
                value={name}
                onChangeText={setName}
                placeholder="Название организации"
            />
        </View>
        <View>
            <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Контакты для связи
            </Text>
            <TextInput
                style={stylesSheet.input}
                value={contacts}
                onChangeText={setContacts}
                placeholder="Номер теелфона, почта или телеграм"
            />
        </View>
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
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: paddings.bodyPadding }}>
                <TouchableOpacity style={[stylesSheet.radio, accept && stylesSheet.active]} onPress={() => setAccept(!accept)}>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>Я согласен с условиями политики конфиденциальности</Text>
            </View>
        <TouchableOpacity onPress={loginUser} style={[stylesSheet.button,stylesSheet.accentButton, { marginTop: paddings.bodyPadding }]}>
            <Text style={{ fontSize: fonts.descriptionFont, color: colors.secondColor, textAlign: 'center' }}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
        </TouchableOpacity>
    </View>
)
}