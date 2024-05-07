import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'
import { AntDesign, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { IProduct } from '@/models/models'
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import ProductModal from '@/components/modals/productModal/productModal'

export default function ProductPage({ navigation, route }) {
  let isFocused = useIsFocused()
  let id = route.params.id
  const [product, setProduct] = useState<IProduct>()
  const [productModal, setProductModal] = useState(false)
  useEffect(() => {
    if (isFocused) {
    axios.get(`${baseURL}/api/products/${id}`).then(response => setProduct(response.data[0]))}
  }, [isFocused])
  return (
    <View style={stylesSheet.container}>
      <View style={styles.topPanel}>
        {productModal && <ProductModal setProductModal={setProductModal} id={id} navigation={navigation} />}
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.back} onPress={() =>
            navigation.goBack()
          }>
            <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
          </TouchableOpacity>
          <Text style={stylesSheet.title}>Товар</Text>
        </View>

        <TouchableOpacity style={styles.back} onPress={() => setProductModal(true)}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.accentColor} />
        </TouchableOpacity>
      </View>
      <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>{product?.title}</Text>
      <ImageBackground source={require("../../../assets/images/master.png")} resizeMode="cover" style={{ height: 200, borderRadius: 20, marginBottom: paddings.elementPadding }} />
      <View style={styles.iconBlock}>
        <View style={[stylesSheet.icon, { borderColor: colors.accentColor, borderWidth: 1 }]}>
          <AntDesign name="enviromento" size={24} color={colors.accentColor} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.mainText}>Стоимость</Text>
          <Text style={styles.accentText}>{product?.cost}₽</Text>
        </View>
      </View>
      <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, marginTop: paddings.elementPadding }}>{product?.description}</Text>

    </View>
  )
}