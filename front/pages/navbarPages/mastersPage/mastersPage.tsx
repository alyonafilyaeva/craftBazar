import { View, Text, TextInput, FlatList, TouchableOpacity, Button } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'
import Event from '@/components/event/event'
import { IEvent } from '@/models/models'
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import { AntDesign, Feather, Octicons } from '@expo/vector-icons';
import Master from '@/components/master/master'
import MasterFilterModal from '@/components/modals/masterFilterModal/masterFilterModal';
import { styles } from './styles';


export default function MastersPage({ navigation }) {
  let isFocused = useIsFocused()
  let [masters, setMasters] = useState<Array<IEvent>>([])
  let [filterModal, setFilterModal] = useState(false)
  let [filters, setFilters] = useState([])
  useEffect(() => {
    if (isFocused) {
      axios.get(`${baseURL}/api/masters`).then(response => setMasters(response.data))
    }

  }, [isFocused])

  function clearFilters() {
    setFilters([])
    axios.get(`${baseURL}/api/masters`).then(response => setMasters(response.data))
  }
  return (
    <View style={stylesSheet.container}>
      <Text style={stylesSheet.title}>Все мастера </Text>
      <View style={styles.searchPanel}>
        <View style={{ width: '80%' }}>
          <TextInput style={[stylesSheet.input, { paddingLeft: 35 }]} placeholder='Найти мастера' />
          <Feather name="search" size={30} color={colors.accentColor} style={{ position: 'absolute', top: 20, left: 5 }} />
        </View>

        <TouchableOpacity style={styles.filerIcon} onPress={() => setFilterModal(true)}>
          <Octicons name="filter" size={30} color={colors.accentColor} />
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={true}
          data={filters}
          renderItem={({ item }) => (
            <View style={styles.filterItem}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor, }}>{item}</Text>
            </View>
          )}
        />
        {filters.length != 0 && <TouchableOpacity style={styles.filerIcon} onPress={clearFilters}>
          <AntDesign name="close" size={30} color={colors.accentColor} />
        </TouchableOpacity>}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={masters}
        renderItem={({ item }) => (
          <View
          >
            <Master master={item} navigation={navigation} />
          </View>
        )}
      />
      <MasterFilterModal filterModal={filterModal} setFilterModal={setFilterModal} setMasters={setMasters} filters={filters} setFilters={setFilters} />
    </View>
  )
}