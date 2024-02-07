import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesSheet } from '@/styles/styles'
import Event from '@/components/event/event'
import { IEvent } from '@/models/models'
import axios from 'axios'

export default function EventsPage() {
  let [events, setEvents] = useState<Array<IEvent>>([])
  useEffect(() => {
    axios.get('http://192.168.0.101:3000/events').then(response => setEvents(response.data))
    console.log(events[0]?.address)
  }, [])
  return (
    <View style={stylesSheet.container}>
      <Text>Все события</Text>
      <View>
        <TextInput></TextInput>
        <View></View>
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