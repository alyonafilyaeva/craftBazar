import { View, Text, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { colors, stylesSheet } from '@/styles/styles'
import { styles } from './styles'
import { FontAwesome6 } from '@expo/vector-icons'
import EventsMaster from '@/components/eventsMaster/eventsMaster'
import { IMastersEvents } from '@/models/models'
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import { AuthContext } from '@/app/authContext'


export default function MastersEventsPage({ navigation, route }) {
    let isFocused = useIsFocused()
    let id = route.params.id
    let title = route.params.title
    let path = route.params.path
    let org_id = route.params.org_id
    let nav
    let [mastersEvents, setMastersEvents] = useState<Array<IMastersEvents>>([])
    useEffect(() => {
        if (isFocused) {
            axios.get(`${baseURL}/api/mastersEvents?${path}=${id}`).then(response => setMastersEvents(response.data))
        }
    }, [isFocused])
    console.log(id)
    path == 'event_id' ? nav = 'Master' : nav = 'Event'
    return (
        <View style={stylesSheet.container}>
            <View style={styles.topPanel}>
                <TouchableOpacity style={styles.back} onPress={() =>
                    navigation.goBack()
                }>
                    <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
                </TouchableOpacity>
                <Text style={stylesSheet.title}>{title}</Text>
            </View>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={mastersEvents}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() =>
                            navigation.navigate(nav, { id: item.id })}
                        >
                            <EventsMaster item={item} org_id={org_id} />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}