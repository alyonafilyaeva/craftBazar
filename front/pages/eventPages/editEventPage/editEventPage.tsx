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
  const [title, setTitle] = useState()
  useEffect(() => {
    axios.get(`${baseURL}/api/events/${id}`).then(response => setEvent(response.data[0]));
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
  function AddEvent(values) {
    axios({
      method: "put",
      url: `${baseURL}/api/events/${event?.id}`,
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
      data: {
        title: 'Хоровод',
          date_start: event?.date_start,
          time_start: event?.time_start,
          time_finish: event?.time_finish,
          city: event?.city,
          address: event?.address,
          description: event?.description,
          link: event?.link,
          cost: event?.cost,
          path_picture: event?.path_picture,
      },
    }).then((response) => {
      console.log(response);
        navigation.goBack()
    });
    /* axios
      .put(
        `${baseURL}/api/events/${event?.id}`,
        {
          title: event?.title,
          date_start: event?.date_start,
          time_start: event?.time_start,
          time_finish: event?.time_finish,
          city: event?.city,
          address: event?.address,
          description: event?.description,
          link: event?.link,
          cost: event?.cost,
          path_picture: event?.path_picture,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigation.goBack()
      }) */
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
      <Formik
        initialValues={{
          title: title,
          date_start: "",
          time_start: "",
          time_finish: "",
          city: "",
          address: "",
          description: "",
          link: "",
          cost: 0,
          path_picture: "",
          count_masters: 0
        }}
        onSubmit={(values) => AddEvent(values)}
      >
        {({ handleChange, handleSubmit, values }) => (

          <View>
            <View style={styles.inputBlock}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
                Название события
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={(title) => setEvent(prevState => ({
                  ...prevState,
                  ['title']: title
                }))}
                value={event?.title}
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
                  onChangeText={handleChange("date")}
                  value={values.date}
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
                    onChangeText={handleChange("time_start")}
                    value={values.time_start}
                    placeholder="00:00"
                  />
                  <Text> - </Text>
                  <TextInput
                    style={[stylesSheet.input, styles.timeInput]}
                    onChangeText={handleChange("time_finish")}
                    value={values.time_finish}
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
                onChangeText={handleChange("city")}
                value={values.city}
                placeholder="Город"
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
                Место проводения
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("address")}
                value={values.address}
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
                  onChangeText={handleChange("cost")}
                  value={values.cost}
                  placeholder="Стоимость участия"
                />
                <TextInput
                  style={[stylesSheet.input, { width: '45%' }]}
                  onChangeText={handleChange("cost")}
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
                onChangeText={handleChange("description")}
                value={values.description}
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
                onChangeText={handleChange("title")}
                value={values.link}
                placeholder="Сайт, страничка ВКонтакте и тд."
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
                Ожидаемое количество мастеров
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("title")}
                value={values.count_masters}
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
              <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, { paddingLeft: 30, paddingRight: 30 }]} onPress={handleSubmit}>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor }}>СОХРАНИТЬ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}