import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, fonts, stylesSheet } from '@/styles/styles'
import { styles } from './styles'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { AuthContext } from '@/app/authContext'
import axios from 'axios'
import { baseURL } from '@/constants/constants'

export default function EditProductPage({navigation, route}) {
  let id = route.params.id
  const [product, setProduct] = useState()
  const [title, setTile] = useState()
  const [description, setDescription] = useState()
  const [cost, setCost] = useState()
  const [picture, setPicture] = useState()
  const [masterId, setmasterId] = useState()
  useEffect(() => {
    axios.get(`${baseURL}/api/products/${id}`).then(response => {
      setProduct(response.data)
      setTile(response.data[0].title)
      setDescription(response.data[0].description)
      setCost(response.data[0].cost)
      setPicture(response.data[0].path_picture)
      setmasterId(response.data[0].master_id)
    })
  }, [])
  console.log(product)
  function EditProduct() {
    axios({
      method: "put",
      url: `${baseURL}/api/products/${id}`,
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
      data: {
        title: title,
        description: description,
        cost: cost,
        path_picture: picture,
        master_id: masterId
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
          <Text style={stylesSheet.title}>Редактировать товар</Text>
        </View>

      </View>

          <View>
            <View style={styles.inputBlock}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont}}>
                Название товара
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={setTile}
                value={title}
                placeholder="Название товара"
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont}}>
                Описание товара
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
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                Стоимость
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={setCost}
                value={cost}
                placeholder="Стоимость"
              />
            </View>
            <View style={styles.imageBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                Загрузить изображение
              </Text>
              <TouchableOpacity style={styles.addImage}>
                <MaterialCommunityIcons name="file-image-plus-outline" size={30} color={colors.accentColor} />
              </TouchableOpacity>

            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={[stylesSheet.button, stylesSheet.mainButton, {paddingLeft: 30, paddingRight: 30}]} onPress={() => navigation.navigate('OrgEvents')}>
                <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont, color: colors.accentColor }}>ОТМЕНИТЬ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[stylesSheet.button ,stylesSheet.accentButton, {paddingLeft: 30, paddingRight: 30}]} onPress={EditProduct}>
                <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont, color: colors.secondColor }}>СОХРАНИТЬ</Text>
              </TouchableOpacity>
            </View>
          </View>
    </ScrollView>
  )
}