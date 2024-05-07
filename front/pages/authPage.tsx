import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'
import Login from '@/components/auth/login'
import Logup from '@/components/auth/logup'

export default function AuthPage() {
  const [active, setActive] = useState('login')
  return (
    <View style={[stylesSheet.container, {justifyContent: 'center', alignContent: 'center'}]}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: paddings.bodyPadding }}>
        <TouchableOpacity onPress={() => setActive('login')}>
          <Text style={[{ fontSize: fonts.titleFont, fontWeight: '500', }, active == 'login' && styles.active]}>Вход</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive('logup')}>
          <Text style={[{ fontSize: fonts.titleFont, fontWeight: '500', }, active == 'logup' && styles.active]}>Регистрация</Text>
        </TouchableOpacity>
      </View>

      {active == 'login' ? <Login /> : <Logup />}
    </View>
  )
}

const styles = StyleSheet.create({
  active: {
    color: colors.accentColor
  }
})