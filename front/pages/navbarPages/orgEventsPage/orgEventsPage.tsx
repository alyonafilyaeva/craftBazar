import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { stylesSheet, colors, fonts } from '@/styles/styles'
import { styles } from './styles'
import { IEvent } from '@/models/models'
import axios from 'axios'
import Event from '@/components/event/event'
import { baseURL } from '@/constants/constants'
import { AuthContext } from '@/app/authContext'

export default function OrgEventsPage({ navigation }) {
  let [events, setEvents] = useState<Array<IEvent>>([])
  const { user } = useContext(AuthContext)
  const [id, setId] = useState(0)
  useEffect(() => {
    axios.get(`${baseURL}/api/organizers/${user.id}`).then(response => setId(response.data[0].id))
    axios.get(`${baseURL}/api/events?org_id=${id}`).then(response => setEvents(response.data))
  }, [id])
  return (
    <View style={stylesSheet.container}>
      <View style={styles.topPanel}>
        <Text style={stylesSheet.title}>Мои события</Text>
        <TouchableOpacity style={[stylesSheet.button ,stylesSheet.accentButton]} onPress={() =>
          navigation.navigate('AddEvent')
        }>
          <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor }}>Создать</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>
            navigation.navigate('Event', { id: item.id })}
          >
            <Event event={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}