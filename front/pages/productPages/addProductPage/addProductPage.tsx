import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, fonts, stylesSheet } from '@/styles/styles'
import { styles } from './styles'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { AuthContext } from '@/app/authContext'
import axios from 'axios'
import { baseURL } from '@/constants/constants'

export default function AddProductPage({navigation}) {
  const { user } = useContext(AuthContext)
  const [id, setId] = useState()
  useEffect(() => {
    axios.get(`${baseURL}/api/masters?user_id=${user.id}`).then(response => setId(response.data[0].id))
  }, [])
  function AddProduct(values) {
    axios
      .post(
        `${baseURL}/api/products/`,
        {
          title: values.title,
          description: values.description,
          cost: values.cost,
          path_picture: values.picture,
          master_id: id,
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
        navigation.goBack()
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
          <Text style={stylesSheet.title}>Добавить товар</Text>
        </View>

      </View>
      <Formik
        initialValues={{
          title: "",
          description: "",
          cost: 0,
          path_picture: ""
        }}
        onSubmit={(values) => AddProduct(values)}
      >
        {({ handleChange, handleSubmit, values }) => (

          <View>
            <View style={styles.inputBlock}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont}}>
                Название товара
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("title")}
                value={values.title}
                placeholder="Название товара"
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont}}>
                Описание товара
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
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                Стоимость
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("cost")}
                value={values.cost}
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
              <TouchableOpacity style={[stylesSheet.button ,stylesSheet.accentButton, {paddingLeft: 30, paddingRight: 30}]} onPress={handleSubmit}>
                <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont, color: colors.secondColor }}>СОХРАНИТЬ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}