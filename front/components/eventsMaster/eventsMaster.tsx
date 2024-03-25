import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './styles'
import { colors, fonts, paddings } from '@/styles/styles'
import { IMastersEvents } from '@/models/models'
import { AuthContext } from '@/app/authContext'

interface MasterProps {
    item: IMastersEvents,
    org_id: number
}

export default function EventsMaster(props: MasterProps) {
    const { user } = useContext(AuthContext)
    console.log(user.organizer_id)
    console.log(props.org_id)
    return (
        <View style={styles.block}>
            <View style={styles.circlePink}></View>
            <View style={{ marginLeft: paddings.bodyPadding }}>
                <Text style={{ fontSize: fonts.descriptionFont }}>{props.item.title_master}</Text>
                {props.item.nickname && <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item.nickname}</Text>}
                {props.item?.date_start && <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item?.date_start?.slice(0, 10)}, </Text>
                    <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item.address}</Text>
                </View>}

            </View>
            {user.organizer_id !== props.org_id && <View style={{ position: 'absolute', top: '100%', left: '80%' }}>
                {props.item.is_paid ? <Text style={[styles.isPaid, {backgroundColor: colors.accentColor}]}>Оплачено</Text> : <Text style={[styles.isPaid, {backgroundColor: colors.secondAccentColor}]}>Не оплачено</Text>}
            </View>}
        </View>
    )
}