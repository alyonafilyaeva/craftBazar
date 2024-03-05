import { View, Text, TextInput, FlatList, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, paddings, stylesSheet } from '@/styles/styles'
import Event from '@/components/event/event'
import { IEvent } from '@/models/models'
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import { Feather, Octicons } from '@expo/vector-icons';
import Master from '@/components/master/master'


export default function MastersPage({ navigation }) {
  let [masters, setMasters] = useState<Array<IEvent>>([])
  useEffect(() => {
    axios.get(`${baseURL}/api/masters`).then(response => setMasters(response.data))
  }, [])
  return (
    <View style={stylesSheet.container}>
      <Text style={stylesSheet.title}>Все мастера </Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: paddings.bodyPadding }}>
        <View style={{ width: '80%' }}>
          <TextInput style={[stylesSheet.input, { paddingLeft: 35 }]} placeholder='Найти мастера' />
          <Feather name="search" size={30} color={colors.accentColor} style={{ position: 'absolute', top: 20, left: 5 }} />
        </View>

        <View style={{ width: 50, height: 50, backgroundColor: colors.secondColor, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}><Octicons name="filter" size={30} color={colors.accentColor} /></View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={masters}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>
            navigation.navigate('Master', { id: item.id })}
          >
            <Master master={item} />
          </TouchableOpacity>
        )}
      />

    </View>
  )
}