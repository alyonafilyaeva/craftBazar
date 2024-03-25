import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, paddings, stylesSheet } from '@/styles/styles'
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import Request from '@/components/request/request'
import { styles } from './styles'
import { FontAwesome6 } from '@expo/vector-icons'
import Invetation from '@/components/invetation/invetation'
import { IRequest } from '@/models/models'

export default function InvetationsPage({ navigation, route }) {
  let id = route.params.id
  let [invetations, setInvetations] = useState<IRequest>()
  let [active, setActive] = useState('new')
  useEffect(() => {
    axios.get(`${baseURL}/api/invetations?id_master=${id}`).then(response => setInvetations(response.data))
    
  }, [])
  console.log(id);
  console.log(invetations)
  function getNewRequests() {
    /* setActive('new')
    axios.get(`${baseURL}/api/invetations?id_master=${id}`).then(response => setInvetations(response.data)) */
  }

  function getRejectRequests() {
    /* setActive('reject')
    axios.get(`${baseURL}/api/invetations?id_master=${id}`).then(response => setInvetations(response.data.filter(invetation => invetation.is_active == false))) */
  }
  return (
    <View style={stylesSheet.container}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TouchableOpacity style={stylesSheet.back} onPress={() =>
          navigation.goBack()
        }>
          <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
        </TouchableOpacity>
        <Text style={[stylesSheet.title, { marginLeft: paddings.elementPadding }]}>Приглашения</Text>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', marginTop: paddings.bodyPadding, marginBottom: paddings.bodyPadding }}>
        <TouchableOpacity onPress={getNewRequests}>
          <Text style={[styles.switch, active == 'new' && { backgroundColor: colors.accentColor, color: colors.secondColor }]}>Новые</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getRejectRequests}>
          <Text style={[styles.switch, active == 'reject' && { backgroundColor: colors.accentColor, color: colors.secondColor }]}>Отклоненые</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={invetations}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>
              navigation.navigate('Event', { id: item.event_id })}
            >
              <Invetation invetation={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}