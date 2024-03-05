import { View, Text, Button, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesSheet } from '@/styles/styles'
import { Feather, MaterialIcons, FontAwesome, FontAwesome6, AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors, fonts, paddings } from '@/styles/styles';
import { styles } from './styles';
import { IEvent, IMaster, IMastersEvents, IProduct } from '@/models/models';
import axios from 'axios';
import { baseURL } from '@/constants/constants';
import Product from '@/components/product/product';


export default function MasterPage({ navigation, route }) {
  let id = route.params.id
  let [master, setMaster] = useState<IMaster>()
  let [products, setProducts] = useState<Array<IProduct>>()
  let [mastersEvents, setMastersEvents] = useState<Array<IMastersEvents>>([])
  useEffect(() => {
    axios.get(`${baseURL}/api/masters/${id}`).then(response => setMaster(response.data[0]))
    axios.get(`${baseURL}/api/products/?master_id=${id}`).then(response => setProducts(response.data))
    axios.get(`${baseURL}/api/mastersEvents?master_id=${id}`).then(response => setMastersEvents(response.data))
  }, [])
  return (
    <ScrollView>
      <View style={{ borderTopLeftRadius: 20 }}>

        <ImageBackground source={require("../../../assets/images/master.png")} resizeMode="cover" style={{ height: 250, borderTopLeftRadius: 20 }} />
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.back} onPress={() =>
                navigation.goBack()
            }>
            <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
          </TouchableOpacity>
          <View style={styles.back} >
            <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.accentColor} />
          </View>
        </View>

      </View>
      <View style={stylesSheet.containerWhite}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: fonts.mainFont, fontWeight: '500' }}>{master?.title}</Text>
            <View style={{ backgroundColor: colors.mainColor, padding: 5, borderRadius: 20 }}>
              <Text style={{ color: colors.accentColor }}>#{master?.category}</Text>
            </View>
          </View>
          <Text style={{ fontSize: fonts.mainFont, fontWeight: '500', color: colors.accentColor }}>{master?.nickname}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.iconBlock}>
              <View style={stylesSheet.icon}>
                <Feather name="calendar" size={24} color={colors.accentColor} />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.mainText}>Город</Text>

                <Text style={styles.accentText}>{master?.city}</Text>
              </View>
            </View>
            <View style={styles.iconBlock}>
              <View style={stylesSheet.icon}>
                <Feather name="mail" size={24} color={colors.accentColor} />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.mainText}>Связаться</Text>
                <Text style={styles.accentText}>{master?.contacts}</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.iconBlock}>
              <View style={stylesSheet.icon}>
                <Ionicons name="time-outline" size={24} color={colors.accentColor} />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.mainText}>Сроки изготовления</Text>
                <Text style={styles.accentText}>{master?.time}</Text>
              </View>
            </View>


          </View>
        </View>

        <View style={styles.mastersBlock}>
          <View style={styles.circleBlock}>
            <View style={styles.circlePurple}></View>
            <View style={[styles.circlePink, styles.secondCircle]}></View>
            <View style={[styles.circleGrey, styles.thirdCircle]}></View>
            <View style={[styles.circlePurple, styles.fourthCircle]}></View>
            <View style={[styles.circlePink, styles.fifthCircle]}></View>
          </View>
          <Text style={[styles.mainText, { left: -90 }]}>{mastersEvents.length} события</Text>
          <TouchableOpacity style={styles.detail} onPress={() => {navigation.navigate('MastersEvents', {id: id, title: 'События мастера', path: 'master_id'})}}>
            <Text style={styles.accentText}>Подробнее</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>Много интересного текста про это мероприятие. Много интересного текста про это мероприятие. Много интересного текста про это мероприятие. Много интересного текста про это мероприятие. Много интересного текста про это мероприятие. Много интересного текста про это мероприятие. Много интересного текста про это мероприятие. Много интересного текста про это мероприятие. </Text>
        
        <View>
          <Text style={{ fontSize: fonts.mainFont, fontWeight: '500', marginBottom: paddings.elementPadding }}>Товар мастера</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() =>
                navigation.navigate('Event', { id: item.id })}
              >
                <Product product={item} />
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity style={[stylesSheet.accentButton, {width: '50%', marginLeft: '25%', alignItems: 'center'}]}>
          <Text style={{color: colors.secondColor}}>ПРИГЛАСИТЬ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}