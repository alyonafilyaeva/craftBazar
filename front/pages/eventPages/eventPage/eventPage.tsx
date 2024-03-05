import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesSheet } from '@/styles/styles'
import { Feather, MaterialIcons, FontAwesome, FontAwesome6, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts, paddings } from '@/styles/styles';
import { styles } from './styles';
import { IEvent, IMastersEvents } from '@/models/models';
import axios from 'axios';
import { baseURL } from '@/constants/constants';


export default function EventPage({ navigation, route }) {
  let id = route.params.id
  let [event, setEvent] = useState<IEvent>()
  let [mastersEvents, setMastersEvents] = useState<Array<IMastersEvents>>([])
  useEffect(() => {
    axios.get(`${baseURL}/api/events/${id}`).then(response => setEvent(response.data[0]))
    axios.get(`${baseURL}/api/mastersEvents?event_id=${id}`).then(response => setMastersEvents(response.data))
  }, [])
  console.log(mastersEvents)
  return (
    <View>
      <View style={{ borderTopLeftRadius: 20 }}>
        <ImageBackground source={require("../../../assets/images/event.png")} resizeMode="cover" style={{ height: 250, borderTopLeftRadius: 20 }} />
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.back} onPress={() =>
            navigation.goBack()
          }>
            <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
          </TouchableOpacity>
          <View style={styles.back}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.accentColor} />
          </View>
        </View>

      </View>
      <View style={stylesSheet.containerWhite}>
        <Text style={{ fontSize: fonts.mainFont, fontWeight: '500' }}>{event?.title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View>
            <View style={styles.iconBlock}>
              <View style={stylesSheet.icon}>
                <Feather name="calendar" size={24} color={colors.accentColor} />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.mainText}>{event?.date_start?.slice(0,10)}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={styles.accentText}>{event?.time_start?.slice(0,5)}</Text>
                  <Text style={styles.accentText}>-</Text>
                  <Text style={styles.accentText}>{event?.time_finish?.slice(0,5)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.iconBlock}>
              <View style={stylesSheet.icon}>
                <AntDesign name="enviromento" size={24} color={colors.accentColor} />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.mainText}>{event?.address}</Text>
                <Text style={styles.accentText}>{event?.city}</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.iconBlock}>
              <View style={stylesSheet.icon}>
                <Feather name="mail" size={24} color={colors.accentColor} />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.mainText}>Связаться</Text>
                <Text style={styles.accentText}>{event?.contacts}</Text>
              </View>
            </View>
            <View style={styles.iconBlock}>
              <View style={stylesSheet.icon}>
                <MaterialIcons name="currency-ruble" size={24} color={colors.accentColor} />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.mainText}>Участие</Text>
                <Text style={styles.accentText}>{event?.cost}₽</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mastersBlock}>
          <View style={styles.circleBlock}>
            <View style={styles.circlePurple}></View>
            <View style={[styles.circlePink, styles.secondCircle]}></View>
            <View style={[styles.circleGrey, styles.thirdCircle]}></View>
            <View style={[styles.circlePurple, styles.fourthCircle]}></View>
            <View style={[styles.circlePink, styles.fifthCircle]}></View>
          </View>
          <Text style={[styles.mainText, { left: -90 }]}>{mastersEvents?.length} мастера</Text>
          <TouchableOpacity style={styles.detail} onPress={() => {navigation.navigate('MastersEvents', {id: id, title: 'Мастера событий', path: 'event_id'})}}>
            <Text style={styles.accentText}>Подробнее</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.mainText}>{event?.description}</Text>

        <View style={{ display: 'flex', flexDirection: 'row', marginTop: paddings.bodyPadding }}>
          <Text style={styles.mainText}>Основной ресурс продвижения: </Text>
          <Text style={styles.accentText}>site.com</Text>
        </View>
      </View>
    </View>
  )
}