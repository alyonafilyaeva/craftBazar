import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Formik, Field, Form } from 'formik'
import { stylesSheet, colors, fonts } from '@/styles/styles'
import { styles } from './styles'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import { AuthContext } from '@/app/authContext'

export default function AddEventPage({navigation}) {
  const {user} = useContext(AuthContext)
  function AddEvent(values) {
    axios
      .post(
        `${baseURL}/events`,
        {
          title: values.title,
          date: values.date,
          time_start: values.time_start,
          time_finish: values.time_finish,
          city: values.city,
          address: values.address,
          descriprion: values.description,
          link: values.link,
          cost: values.cost,
          picture: values.picture,
          idOrganizer: user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            /* Authorization: `Bearer ${token}`, */
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
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
          <Text style={stylesSheet.title}>Создать событие</Text>
        </View>

      </View>
      <Formik
        initialValues={{
          title: "",
          date: "",
          time_start: "",
          time_finish: "",
          city: "",
          address: "",
          descriprion: "",
          link: "",
          cost: '',
          picture: "",
        }}
        onSubmit={(values) => AddEvent(values)}
      >
        {({ handleChange, handleSubmit, values }) => (

          <View>
            <View style={styles.inputBlock}>
              <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Название события
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("title")}
                value={values.title}
                placeholder="Название события"
              />
            </View>
            <View style={[styles.inputBlock, styles.dateTimeBlock]}>
              <View style={{ width: '50%', marginRight: 30 }}>
                <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
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
                <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                  Время
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
              <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
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
              <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
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
              <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Стоимость участия
              </Text>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput
                  style={[stylesSheet.input, {width: '45%'}]}
                  onChangeText={handleChange("cost")}
                  value={values.cost}
                  placeholder="Стоимость участия"
                />
                <TextInput
                  style={[stylesSheet.input, {width: '45%'}]}
                  onChangeText={handleChange("cost")}
                  value={values.cost}
                  placeholder="В день"
                />
              </View>

            </View>
            <View style={styles.inputBlock}>
              <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Описание
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("description")}
                value={values.descriprion}
                placeholder="Описание"
                multiline
                numberOfLines={5}
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Основной ресурс продвижения
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("title")}
                value={values.title}
                placeholder="Сайт, страничка ВКонтакте и тд."
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Ожидаемое количество мастеров
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("title")}
                value={values.title}
                placeholder="Ожидаемое количество мастеров"
              />
            </View>
            <View style={styles.imageBlock}>
              <Text style={{ fontSize: fonts.descriptionFont, fontWeight: '700' }}>
                Загрузить изображение
              </Text>
              <TouchableOpacity style={styles.addImage}>
                <MaterialCommunityIcons name="file-image-plus-outline" size={30} color={colors.accentColor} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={stylesSheet.mainButton}>
                <Text style={{ fontSize: fonts.descriptionFont, color: colors.accentColor }}>ОТМЕНИТЬ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesSheet.accentButton} onPress={handleSubmit}>
                <Text style={{ fontSize: fonts.descriptionFont, color: colors.secondColor }}>СОХРАНИТЬ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}