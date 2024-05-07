import { View, Text, TextInput, TouchableOpacity, ScrollView, Input } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik'
import { stylesSheet, colors, fonts } from '@/styles/styles'
import { styles } from './styles'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import { AuthContext } from '@/app/authContext'
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import { RadioButton } from 'react-native-paper'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { IEvent } from '@/models/models'

interface IdProps {
  id: number,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default function EditEventPage({ navigation, route }) {
  let id = route.params.id
  const { user } = useContext(AuthContext)
  const [selectedValue, setSelectedValue] = useState("one")
  const [event, setEvent] = useState<IEvent>()
  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [cost, setCost] = useState()
  const [dateStart, setDateStart] = useState()
  const [description, setDescription] = useState()
  const [link, setLink] = useState()
  const [title, setTitle] = useState()
  const [timeStart, setTimeStart] = useState()
  const [timeFinish, setTimeFinish] = useState()
  const [picture, setPicture] = useState()
  const [countMasters, setCountMasters] = useState()
  useEffect(() => {
    axios.get(`${baseURL}/api/events/${id}`).then(response => {
      setEvent(response.data[0])
      setAddress(response.data[0].address)
      setCity(response.data[0].city)
      setCost(response.data[0].cost)
      setCountMasters(response.data[0].count_masters)
      setDateStart(response.data[0].date_start)
      setDescription(response.data[0].description)
      setLink(response.data[0].link)
      setPicture(response.data[0].path_picture)
      setTimeFinish(response.data[0].time_finish)
      setTimeStart(response.data[0].time_start)
      setTitle(response.data[0].title)
    });
  }, [])
  console.log(id)
  console.log('event', event)
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  }
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' })
    console.log(result)
  }
  function EditEvent() {
    axios({
      method: "put",
      url: `${baseURL}/api/events/${id}`,
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
      data: {
        title: title,
        date_start: dateStart,
        time_start: timeStart,
        time_finish: timeFinish,
        city: city,
        address: address,
        description: description,
        link: link,
        cost: cost,
        path_picture: picture,
        count_masters: countMasters
      },
    }).then((response) => {
      console.log(response);
      navigation.goBack()
    });
  }
  return (
    <ScrollView style={stylesSheet.container}>
      <View style={styles.topPanel}>
        <TouchableOpacity style={stylesSheet.back} onPress={() =>
          navigation.goBack()
        }>
          <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 'auto', marginLeft: 10 }}>
          <Text style={stylesSheet.title}>Редактировать событие</Text>
        </View>

      </View>
      <View>
        <View style={styles.inputBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Название события
          </Text>
          <TextInput
            style={stylesSheet.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Название события"
          />
        </View>
        <View style={styles.radioButton}>
          <TouchableOpacity style={[styles.radio, selectedValue == 'one' && styles.active]} onPress={() => setSelectedValue("one")}></TouchableOpacity>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16 }}>
            Событие в один день
          </Text>
        </View>
        <View style={styles.radioButton}>
          <TouchableOpacity style={[styles.radio, selectedValue == 'many' && styles.active]} onPress={() => setSelectedValue("many")}></TouchableOpacity>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16 }}>
            Событие в несколько дней
          </Text>
        </View>
        <View style={[styles.inputBlock, styles.dateTimeBlock]}>
          <View style={{ width: '50%', marginRight: 30 }}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
              Дата
            </Text>
            <TextInput
              style={[stylesSheet.input, styles.dateInput]}
              onChangeText={setDateStart}
              value={dateStart}
              placeholder="ДД/ММ/ГГ"
            />
          </View>
          <View>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
              Время
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[stylesSheet.input, styles.timeInput]}
                onChangeText={setTimeStart}
                value={timeStart}
                placeholder="00:00"
              />
              <Text> - </Text>
              <TextInput
                style={[stylesSheet.input, styles.timeInput]}
                onChangeText={setTimeFinish}
                value={timeFinish}
                placeholder="00:00"
              />
            </View>
          </View>
        </View>
        <View style={styles.inputBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Город
          </Text>
          <TextInput
            style={stylesSheet.input}
            onChangeText={setCity}
            value={city}
            placeholder="Город"
          />
        </View>
        <View style={styles.inputBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Место проводения
          </Text>
          <TextInput
            style={stylesSheet.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Место проведения"
          />
        </View>
        <View style={styles.inputBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Стоимость участия
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={[stylesSheet.input, { width: '45%' }]}
              onChangeText={setCost}
              value={cost}
              placeholder="Стоимость участия"
            />
            <TextInput
              style={[stylesSheet.input, { width: '45%' }]}
              /* onChangeText={} */
              /* value={values.cost} */
              placeholder="В день"
            />
          </View>

        </View>
        <View style={styles.inputBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Описание
          </Text>
          <TextInput
            style={stylesSheet.input}
            onChangeText={setDescription}
            value={description}
            placeholder="Описание"
            multiline
            numberOfLines={5}
          />
        </View>
        <View style={styles.inputBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Основной ресурс продвижения
          </Text>
          <TextInput
            style={stylesSheet.input}
            onChangeText={setLink}
            value={link}
            placeholder="Сайт, страничка ВКонтакте и тд."
          />
        </View>
        <View style={styles.inputBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Ожидаемое количество мастеров
          </Text>
          <TextInput
            style={stylesSheet.input}
            onChangeText={setCountMasters}
            value={countMasters}
            placeholder="Ожидаемое количество мастеров"
          />
        </View>
        <View style={styles.imageBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Загрузить изображение
          </Text>
          <TouchableOpacity style={styles.addImage} onPress={openGallery}>
            <MaterialCommunityIcons name="file-image-plus-outline" size={30} color={colors.accentColor} />
          </TouchableOpacity>

        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={[stylesSheet.button, stylesSheet.mainButton, { paddingLeft: 30, paddingRight: 30 }]} onPress={() => navigation.navigate('OrgEvents')}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.accentColor }}>ОТМЕНИТЬ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, { paddingLeft: 30, paddingRight: 30 }]} onPress={EditEvent}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor }}>СОХРАНИТЬ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}