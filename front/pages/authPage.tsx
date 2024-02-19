import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { fonts, paddings, stylesSheet } from '@/styles/styles'
import Login from '@/components/auth/login'

export default function AuthPage() {
  const [active, setActive] = useState('login')
  return (
    <View style={stylesSheet.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: paddings.bodyPadding }}>
        <TouchableOpacity>
          <Text style={{ fontSize: fonts.titleFont, fontWeight: '500' }}>Вход</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: fonts.titleFont, fontWeight: '500' }}>Регистрация</Text>
        </TouchableOpacity>
      </View>

      {active == 'login' && <Login />}
    </View>
  )
}