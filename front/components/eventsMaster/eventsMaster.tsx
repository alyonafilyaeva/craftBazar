import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import { colors, fonts, paddings } from '@/styles/styles'
import { IMastersEvents } from '@/models/models'
import { AuthContext } from '@/app/authContext'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { baseURL } from '@/constants/constants'

interface MasterProps {
    item: IMastersEvents,
    org_id: number
}

export default function EventsMaster(props: MasterProps) {
    const { user } = useContext(AuthContext)
    let [org, setOrg] = useState({})
    let isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused && user.role == 'org') {
            axios.get(`${baseURL}/api/organizers?user_id=${user.id}`).then(response => setOrg(response.data[0]))
        }

    }, [isFocused])
    console.log(user.id)
    console.log(org.id)
    console.log(props.org_id)
    return (
        <View style={styles.block}>
            <View style={styles.circlePink}></View>
            <View style={{ marginLeft: paddings.bodyPadding }}>
                {props.item.title_master && <Text style={{ fontSize: fonts.descriptionFont }}>{props.item.title_master}</Text>}
                {props.item.nickname && <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item.nickname}</Text>}
                {props.item.title && <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item.title}</Text>}
                {props.item?.date_start && <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item?.date_start?.slice(0, 10)}, </Text>
                    <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item.address}</Text>
                </View>}

            </View>
            {org?.id == props.org_id &&  user.role == 'org' && <View style={{ position: 'absolute', top: '100%', right: '5%' }}>
                {props.item.is_paid ? <Text style={[styles.isPaid, { backgroundColor: colors.accentColor }]}>Оплачено</Text> : <Text style={[styles.isPaid, { backgroundColor: colors.secondAccentColor }]}>Не оплачено</Text>}
            </View>}
        </View>
    )
}