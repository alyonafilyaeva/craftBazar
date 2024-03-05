import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { colors, fonts, paddings } from '@/styles/styles'
import { IMastersEvents } from '@/models/models'

interface MasterProps {
    item: IMastersEvents
}

export default function EventsMaster(props: MasterProps) {
    return (
        <View style={styles.block}>
            <View style={styles.circlePink}></View>
            <View style={{ marginLeft: paddings.bodyPadding }}>
                <Text style={{ fontSize: fonts.descriptionFont }}>{props.item.title}</Text>
                {props.item.nickname && <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item.nickname}</Text>}
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item.date_start.slice(0, 10)}, </Text>
                    <Text style={{ fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.item.address}</Text>
                </View>

            </View>
        </View>
    )
}