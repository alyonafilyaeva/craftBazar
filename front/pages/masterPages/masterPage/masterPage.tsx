import { View, Text, Button, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { stylesSheet } from '@/styles/styles'
import { Feather, MaterialIcons, FontAwesome, FontAwesome6, AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors, fonts, paddings } from '@/styles/styles';
import { styles } from './styles';
import { IEvent, IMaster, IMastersEvents, IProduct } from '@/models/models';
import axios from 'axios';
import { baseURL } from '@/constants/constants';
import Product from '@/components/product/product';
import { AuthContext } from '@/app/authContext';
import SendInvitationModal from '@/components/modals/sendInvitationModal/sendInvitationModal';


export default function MasterPage({ navigation, route }) {
  let isFocused = useIsFocused()
  let id = route.params.id
  let { user } = useContext(AuthContext)
  let [master, setMaster] = useState<IMaster>()
  let [products, setProducts] = useState<Array<IProduct>>()
  let [mastersEvents, setMastersEvents] = useState<Array<IMastersEvents>>([])
  let [orgId, setOrgId] = useState()
  let [invitationModal, setInvitationModal] = useState(false)
  let [categories, setCategories] = useState([])
  useEffect(() => {
    if (isFocused) {
      axios.get(`${baseURL}/api/masters/${id}`).then(response => setMaster(response.data[0]))
      axios.get(`${baseURL}/api/organizers?user_id=${user.id}`).then(response => setOrgId(response.data[0].id))
      axios.get(`${baseURL}/api/mastersEvents?master_id=${id}`).then(response => setMastersEvents(response.data))
      axios.get(`${baseURL}/api/products?master_id=${id}`).then(response => setProducts(response.data))
      axios.get(`${baseURL}/api/categories`).then(response => setCategories(response.data))
    }
  }, [isFocused])

  return (
    <ScrollView>
      <View style={{ borderTopLeftRadius: 20 }}>
        <ImageBackground source={{ uri: master?.picture_path }} resizeMode="cover" style={{ height: 250, borderTopLeftRadius: 20 }} />
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.back} onPress={() =>
            navigation.goBack()
          }>
            <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
          </TouchableOpacity>
          {user.role == 'master' && <View style={styles.back} >
            <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.accentColor} />
          </View>}
        </View>

      </View>
      <View style={stylesSheet.containerWhite}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: fonts.mainFont, fontWeight: '500' }}>{master?.title_master}</Text>
            <View style={{ backgroundColor: colors.mainColor, padding: 5, borderRadius: 20 }}>
              <Text style={{ color: colors.accentColor }}>#{categories?.filter(item => item.category_id == master?.category_id)[0]?.category_title}</Text>
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
                <Text style={styles.accentText}>До {master?.time} дней</Text>
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
          <TouchableOpacity style={styles.detail} onPress={() => { navigation.navigate('MastersEvents', { id: id, title: 'События мастера', path: 'master_id' }) }}>
            <Text style={styles.accentText}>Подробнее</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.mainText, {marginBottom: paddings.bodyPadding}]}>{master?.description} </Text>

        <View>
          {products?.length != 0 && <Text style={{ fontSize: fonts.mainFont, fontWeight: '500', marginBottom: paddings.elementPadding }}>Товар мастера</Text>}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() =>
                navigation.navigate('Product', { id: item.id })}
              >
                <Product product={item} color='main' />
              </TouchableOpacity>
            )}
          />
        </View>

        {user.role == 'org' && <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, { width: '50%', marginLeft: '25%', alignItems: 'center' }]} onPress={() => setInvitationModal(true)}>
          <Text style={{ color: colors.secondColor }}>ПРИГЛАСИТЬ</Text>
        </TouchableOpacity>}
      </View>
      <SendInvitationModal invitationModal={invitationModal} setInvitationModal={setInvitationModal} masterId={master?.id} orgId={orgId} />
    </ScrollView>
  )
}