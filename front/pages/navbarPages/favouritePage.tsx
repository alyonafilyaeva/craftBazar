import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'
import { StyleSheet } from "react-native";
import axios from 'axios';
import { baseURL } from '@/constants/constants';
import { AuthContext } from '@/app/authContext';
import Event from '@/components/event/event';
import Master from '@/components/master/master';

export default function FavouritePage({ navigation }) {
  let isFocused = useIsFocused()
  let { user } = useContext(AuthContext)
  let [active, setActive] = useState('events')
  let [events, setEvents] = useState()
  let [masters, setMasters] = useState()
  useEffect(() => {
    if (isFocused) {
      axios.get(`${baseURL}/api/favouriteEvents?user_id=${user.id}`).then(response => setEvents(response.data))
      axios.get(`${baseURL}/api/favouriteMasters?user_id=${user.id}`).then(response => setMasters(response.data))
    }
  }, [isFocused])
  function getEvents() {
    setActive('events')
    axios.get(`${baseURL}/api/favouriteEvents?user_id=${user.id}`).then(response => setEvents(response.data))
  }

  function getMasters() {
    setActive('masters')
    axios.get(`${baseURL}/api/favouriteMasters?user_id=${user.id}`).then(response => setMasters(response.data))
  }
  return (
    <View style={stylesSheet.container}>
      <Text style={stylesSheet.title}>Избранное</Text>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: paddings.bodyPadding, marginBottom: paddings.bodyPadding }}>
        <TouchableOpacity onPress={getEvents}>
          <Text style={[styles.switch, active == 'events' && { backgroundColor: colors.accentColor, color: colors.secondColor }]}>События</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getMasters}>
          <Text style={[styles.switch, active == 'masters' && { backgroundColor: colors.accentColor, color: colors.secondColor }]}>Мастера</Text>
        </TouchableOpacity>
      </View>

      {active == 'events' ? <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>
            navigation.navigate('Event', { id: item.id })}
          >
            <Event event={item} isPaid={false} isFavourite={true} />
          </TouchableOpacity>
        )}
      /> : <FlatList
        showsVerticalScrollIndicator={false}
        data={masters}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>
            navigation.navigate('Master', { id: item.id })}
          >
            <Master master={item} isFavourite={true} />
          </TouchableOpacity>
        )}
      />}
    </View>
  )
}

export const styles = StyleSheet.create({
  switch: {
    borderRadius: 30,
    borderColor: colors.accentColor,
    borderWidth: 1,
    color: colors.accentColor,
    padding: paddings.elementPadding,
    fontFamily: 'Montserrat-Medium',
    fontSize: fonts.descriptionFont,
    marginRight: paddings.elementPadding
  }
})