import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { styles } from './styles'
import { colors, fonts, paddings } from '@/styles/styles'
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';

interface IdProps {
    id: number,
    setOrgEventsModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigation:  NavigationScreenProp<NavigationState, NavigationParams>
}

export default function OrgEventModal(props: IdProps) {
    let deleteEvent = () => {
        axios.delete(`${baseURL}/api/events/${props.id}`).then(props.navigation.navigate('OrgEvents'))
        props.setOrgEventsModal(false)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.block, styles.underline]} onPress={() => props.navigation.navigate('EditEvent', {id: props.id})}>
                <Octicons name="pencil" size={24} color={colors.accentColor} />
                <Text style={{fontSize: fonts.descriptionFont, color: colors.accentColor, marginLeft: paddings.elementPadding}}>Редактировать</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.block, styles.underline]} onPress={() => props.navigation.navigate('Requests', {id: props.id, path: 'id_event'})}>
                <AntDesign name="appstore-o" size={24} color={colors.accentColor}  />
                <Text style={{fontSize: fonts.descriptionFont, color: colors.accentColor, marginLeft: paddings.elementPadding}}>Открыть заявки</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.block} onPress={deleteEvent}>
                <AntDesign name="delete" size={24} color={colors.secondAccentColor}  />
                <Text style={{fontSize: fonts.descriptionFont, color: colors.secondAccentColor, marginLeft: paddings.elementPadding}}>Удалить</Text>
            </TouchableOpacity>
        </View>
    )
}