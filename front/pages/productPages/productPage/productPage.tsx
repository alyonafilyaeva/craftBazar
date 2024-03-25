import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { colors, fonts, stylesSheet } from '@/styles/styles'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { IProduct } from '@/models/models'
import axios from 'axios'
import { baseURL } from '@/constants/constants'

export default function ProductPage({ navigation, route }) {
  let id = route.params.id
  let [product, setProduct] = useState<IProduct>()

  useEffect(() => {
    axios.get(`${baseURL}/api/products/${id}`).then(response => setProduct(response.data[0]))
  }, [])
  return (
    <View style={stylesSheet.container}>
      <View style={styles.topPanel}>
        <Text style={stylesSheet.title}>Профиль</Text>
        <TouchableOpacity style={styles.back} /* onPress={() => setOrgEventsModal(true)} */>
            <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.accentColor} />
          </TouchableOpacity>
      </View>
      <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>{product?.title}</Text>
      <ImageBackground source={require("../../../assets/images/master.png")} resizeMode="cover" style={{ height: 200, borderRadius: 20 }} />
      <View style={styles.iconBlock}>
        <View style={[stylesSheet.icon, { borderColor: colors.accentColor, borderWidth: 1 }]}>
          <AntDesign name="enviromento" size={24} color={colors.accentColor} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.mainText}>Стоимость</Text>
          <Text style={styles.accentText}>{product?.cost}</Text>
        </View>
      </View>
      <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>{product?.description}</Text>

    </View>
  )
}