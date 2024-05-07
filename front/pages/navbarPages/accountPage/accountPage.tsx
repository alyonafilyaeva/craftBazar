import { View, Text, TouchableOpacity, Switch, ScrollView, TextInput } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import * as SecureStore from "expo-secure-store";
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles';
import { AuthContext } from '@/app/authContext';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { styles } from './styles';
import axios from 'axios';
import { baseURL } from '@/constants/constants';
import { IMaster } from '@/models/models';
import {
  Calendar,
  WeekCalendar,
  CalendarProvider,
  LocaleConfig,
} from "react-native-calendars";

export default function AccountPage({ navigation }) {
  let isFocused = useIsFocused()
  let { token, setToken } = useContext(AuthContext)
  let { user, setUser } = useContext(AuthContext)
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsEnabled((previousState) => !previousState);
  const [id, setId] = useState(0)
  const [master, setMaster] = useState<IMaster>({})
  const [org, setOrg] = useState({})
  const [events, setEvents] = useState([])
  const [isEditNickname, setisEditNickname] = useState(false)
  const [nickname, setNickname] = useState()
  let markedDates = {};
  events.forEach((item) => {
    markedDates[item.date_start?.slice(0, 10)] = {
      dots: [{ color: colors.accentColor }],
    };
  });

  useEffect(() => {
    if (isFocused) {
      if (user.role == 'org') {
        axios.get(`${baseURL}/api/organizers?user_id=${user?.id}`).then(response => setOrg(response.data[0]))
      }
      if (user.role == 'master') {
        axios.get(`${baseURL}/api/masters?user_id=${user?.id}`).then(response => setMaster(response.data[0]))
      }
      if (user.role == 'user') {
        axios.get(`${baseURL}/api/favouriteEvents?user_id=${user.id}`).then(response => setEvents(response.data))
      }
      if (user.role == 'org') {
        axios.get(`${baseURL}/api/events?user_id=${user.id}`).then(response => setEvents(response.data))
      }
    }
  }, [isFocused])
  console.log(org)
  let logoutUser = async () => {
    await SecureStore.deleteItemAsync('token')
    let token = await SecureStore.getItemAsync('token')
    console.log(token)
    setToken(null)
    setUser('')
  }
  let editNickname = () => {
    axios({
      method: "patch",
      url: `${baseURL}/api/masters/${master.id}`,
      data: {
        nickname: nickname
      },
    }).then((response) => {
      console.log(response);
      setisEditNickname(false)
      setNickname()
    });
  }
  return (
    <ScrollView style={stylesSheet.container}>
      <Text style={stylesSheet.title}>Личный кабинет</Text>
      <View style={styles.block}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>{user.login}</Text>
        <View style={styles.icon}>
          <Ionicons name="notifications-outline" size={24} color={colors.accentColor} />
        </View>
      </View>
      <View style={styles.block}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Уведомления</Text>
        <Switch
          trackColor={{ false: colors.secondAccentColor, true: "#ADB9E3" }}
          thumbColor={!isEnabled ? '#CB6980' : colors.accentColor}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
        />
      </View>


      {user.role == 'org' && <TouchableOpacity style={[stylesSheet.button, stylesSheet.whiteButton, { marginBottom: paddings.elementPadding }]} onPress={() => navigation.navigate('Requests', { id: org?.id, path: 'id_organizer' })}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: colors.accentColor }}>МОИ ЗАЯВКИ</Text>
      </TouchableOpacity>}
      {user.role == 'master' && <TouchableOpacity style={[stylesSheet.button, stylesSheet.whiteButton, { marginBottom: paddings.elementPadding }]} onPress={() => navigation.navigate('MyEvents', { id: master?.id, path: 'master_id' })}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: colors.accentColor }}>МОИ СОБЫТИЯ</Text>
      </TouchableOpacity>}
      {user.role == 'master' && <TouchableOpacity style={[stylesSheet.button, stylesSheet.whiteButton, { marginBottom: paddings.elementPadding }]} onPress={() => navigation.navigate('Invetations', { id: master?.id })}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: colors.accentColor }}>МОИ ПРИГЛАШЕНИЯ</Text>
      </TouchableOpacity>}

      {user.role !== 'master' && <Calendar style={{ borderRadius: 20, marginTop: 32, marginBottom: 32 }}
        markingType={"multi-dot"}
        markedDates={markedDates}
        firstDay={1} />}

      {user.role == 'org' && <View style={{ marginBottom: paddings.bodyPadding }}>
        <View style={styles.block}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Название организации</Text>
          <Octicons name="pencil" size={24} color="black" />
        </View>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>ОАО Московская ярмарка</Text>
      </View>}
      {user.role == 'master' && <View style={{ marginBottom: paddings.bodyPadding }}>
        <View style={styles.block}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Ник</Text>
          {!isEditNickname ? <TouchableOpacity onPress={() => setisEditNickname(true)}>
            <Octicons name="pencil" size={24} color="black" />
          </TouchableOpacity> :
            <TouchableOpacity onPress={editNickname}>
              <Octicons name="check" size={24} color="black" />
            </TouchableOpacity>}
        </View>
        {!isEditNickname ? <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>{master?.nickname}</Text> :
        <TextInput style={stylesSheet.input}
          onChangeText={setNickname}
          value={nickname}
          placeholder={master?.nickname} />}
      </View>}
      {user.role == 'master' && <View style={{ marginBottom: paddings.bodyPadding }}>
        <View style={styles.block}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Город</Text>
          <Octicons name="pencil" size={24} color="black" />
        </View>
        {user.role == 'master' && <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>{master?.city}</Text>}
      </View>}
      <View style={{ marginBottom: paddings.bodyPadding }}>
        {user.role !== 'user' && <View style={styles.block}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Контакты для связи</Text>
          <Octicons name="pencil" size={24} color="black" />
        </View>}
        {master.contacts && <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>{master?.contacts}</Text>}
        {org.contacts && <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>{org?.contacts}</Text>}
      </View>
      <TouchableOpacity style={[stylesSheet.button, stylesSheet.whiteButton, { marginBottom: paddings.elementPadding }]}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: colors.accentColor }}>ТЕХПОДДЕРЖКА</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[stylesSheet.button, stylesSheet.redButton, { marginBottom: 28 }]} onPress={logoutUser}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: '#CB6980' }}>ВЫЙТИ</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}