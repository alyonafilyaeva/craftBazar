import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { stylesSheet, colors, fonts } from '@/styles/styles'
import { styles } from './styles'
import { IEvent } from '@/models/models'
import axios from 'axios'
import Event from '@/components/event/event'
import { baseURL } from '@/constants/constants'
import { AuthContext } from '@/app/authContext'

export default function OrgEventsPage({navigation}) {
  let [events, setEvents] = useState<Array<IEvent>>([])
  const {user} = useContext(AuthContext)
  useEffect(() => {
    axios.get(`${baseURL}/events?idOrg=${user.id}`).then(response => setEvents(response.data))
    console.log(events[0]?.address)
  }, [])
  return (
    <View style={stylesSheet.container}>
      <View style={styles.topPanel}>
        <Text style={stylesSheet.title}>Мои события</Text>
        <TouchableOpacity style={stylesSheet.accentButton} onPress={() =>
                navigation.navigate('AddEvent', {
                    name: 'Jane',
                })
            }>
          <Text style={{fontSize: fonts.descriptionFont, color: colors.secondColor}}>Создать</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        renderItem={({ item }) => (
          <TouchableOpacity
          >
            <Event event={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}