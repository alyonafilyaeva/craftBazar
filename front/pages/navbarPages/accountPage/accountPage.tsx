import { View, Text, TouchableOpacity, Switch } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as SecureStore from "expo-secure-store";
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles';
import { AuthContext } from '@/app/authContext';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { styles } from './styles';
import axios from 'axios';
import { baseURL } from '@/constants/constants';
import { IMaster } from '@/models/models';

export default function AccountPage({ navigation }) {
  let { token, setToken } = useContext(AuthContext)
  let { user, setUser } = useContext(AuthContext)
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsEnabled((previousState) => !previousState);
  const [id, setId] = useState(0)
  const [master, setMaster] = useState<IMaster>({})
  const [org, setOrg] = useState({})
  let logoutUser = async () => {
    await SecureStore.deleteItemAsync('token')
    let token = await SecureStore.getItemAsync('token')
    console.log(token)
    setToken(null)
    setUser('')
  }
  useEffect(() => {
    if (user.role == 'org') {
      axios.get(`${baseURL}/api/organizers/${user?.id}`).then(response => setOrg(response.data[0]))
    }
    if (user.role == 'master') {
      axios.get(`${baseURL}/api/masters?user_id=${user?.id}`).then(response => setMaster(response.data[0])) 
    }
  }, [])
  console.log(org)
  return (
    <View style={stylesSheet.container}>
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
      {user.role == 'master' && <TouchableOpacity style={[stylesSheet.button, stylesSheet.whiteButton, { marginBottom: paddings.elementPadding }]} >
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: colors.accentColor }}>МОИ СОБЫТИЯ</Text>
      </TouchableOpacity>}
      {user.role == 'master' && <TouchableOpacity style={[stylesSheet.button, stylesSheet.whiteButton, { marginBottom: paddings.elementPadding }]} onPress={() => navigation.navigate('Invetations', {id: master?.id})}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: colors.accentColor }}>МОИ ПРИГЛАШЕНИЯ</Text>
      </TouchableOpacity>}
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
          <Octicons name="pencil" size={24} color="black" />
        </View>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>{master?.nickname}</Text>
      </View>}
      {user.role == 'master' && <View style={{ marginBottom: paddings.bodyPadding }}>
        <View style={styles.block}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Город</Text>
          <Octicons name="pencil" size={24} color="black" />
        </View>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>{master?.city}</Text>
      </View>}
      <View style={{ marginBottom: paddings.bodyPadding }}>
        <View style={styles.block}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Контакты для связи</Text>
          <Octicons name="pencil" size={24} color="black" />
        </View>
        {master.contacts && <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>{master?.contacts}</Text>}
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont, color: colors.accentColor }}>{org?.contacts}</Text>
      </View>
      <TouchableOpacity style={[stylesSheet.button, stylesSheet.whiteButton, { marginBottom: paddings.elementPadding }]}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: colors.accentColor }}>ТЕХПОДДЕРЖКА</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[stylesSheet.button, stylesSheet.redButton]} onPress={logoutUser}>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, fontWeight: '500', color: '#CB6980' }}>ВЫЙТИ</Text>
      </TouchableOpacity>
    </View>
  )
}