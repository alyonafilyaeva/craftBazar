import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, stylesSheet } from '@/styles/styles'
import { Formik } from 'formik'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from './styles'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { IMaster } from '@/models/models'
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import { SelectList } from 'react-native-dropdown-select-list'
import { useIsFocused } from '@react-navigation/native'

interface IdProps {
  id: number,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default function EditMasterProfilePage({ navigation, route }) {
  let isFocused = useIsFocused()
  let id = route.params.id
  const [master, setMaster] = useState<IMaster>()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [picture, setPicture] = useState()
  const [link, setLink] = useState()
  const [time, setTime] = useState()
  const [category, setCategory] = useState()
  const [idMaster, setIdMaster] = useState()
  const [categories, setCategories] = useState([])
  useEffect(() => {
    if (isFocused) {
      axios.get(`${baseURL}/api/masters/${id}`).then(response => {
        setMaster(response.data[0])
        setTitle(response.data[0].title_master)
        setDescription(response.data[0].description)
        setPicture(response.data[0].picture_path)
        setLink(response.data[0].link)
        setTime(response.data[0].time)
        setCategory(response.data[0].category_id)
        setIdMaster(response.data[0].id)
      })
      axios.get(`${baseURL}/api/categories`).then(response => {
        setCategories(response.data)
      })
    }
  }, [isFocused])

  let data = categories.map((item) => ({ key: item.category_id, value: item.category_title }))

  function EditMaster() {
    axios({
      method: "put",
      url: `${baseURL}/api/masters/${id}/`,
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
      data: {
        title_master: title,
        description: description,
        link: link,
        picture_path: picture,
        time: time,
        category_id: category,
        nickname: master?.nickname,
        city: master?.city,
        contacts: master?.contacts,

      },
    }).then((response) => {
      console.log(response);
      navigation.goBack()
    });
  }
  console.log(category)
  return (
    <ScrollView style={stylesSheet.container}>
      <View style={styles.topPanel}>
        <TouchableOpacity style={stylesSheet.back} onPress={() =>
          navigation.goBack()
        }>
          <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 'auto', marginLeft: 10 }}>
          <Text style={stylesSheet.title}>Редактировать профиль</Text>
        </View>

      </View>
      <View>
        <View style={styles.inputBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Название
          </Text>
          <TextInput
            style={stylesSheet.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Название"
          />
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
            Срок изготовления
          </Text>
          <TextInput
            style={stylesSheet.input}
            onChangeText={setTime}
            value={time}
            placeholder="Скрок изготовления"
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
            Категория
          </Text>
          <SelectList
            setSelected={(key) => setCategory(key)}
            data={data}
            placeholder="Категория"
            searchPlaceholder="Найти категорию"
            save="key"
            boxStyles={{ borderRadius: 20, borderColor: colors.secondColor, backgroundColor: colors.secondColor }}
            dropdownItemStyles={{
              borderRadius: 20,
              borderColor: colors.secondColor,
            }} />
        </View>
        <View style={styles.imageBlock}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>
            Загрузить изображение
          </Text>
          <TouchableOpacity style={styles.addImage}>
            <MaterialCommunityIcons name="file-image-plus-outline" size={30} color={colors.accentColor} />
          </TouchableOpacity>

        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={[stylesSheet.button, stylesSheet.mainButton, { paddingLeft: 30, paddingRight: 30 }]} onPress={() => navigation.navigate('OrgEvents')}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.accentColor }}>ОТМЕНИТЬ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, { paddingLeft: 30, paddingRight: 30 }]} onPress={EditMaster}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor }}>СОХРАНИТЬ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
