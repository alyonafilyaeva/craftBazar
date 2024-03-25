import { View, Text } from 'react-native'
import React from 'react'
import { IRequest } from '@/models/models'
import { styles } from './styles'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'

interface RequestProps {
    request: IRequest
}

export default function Request(props: RequestProps) {
    return (
        <View style={styles.block}>
            <View style={{display: 'flex', flexDirection: 'row', marginBottom: paddings.elementPadding}}>
                <View style={styles.circlePink}>
                </View>
                <View style={{marginLeft: paddings.elementPadding}}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont}}>{props.request.title_master}</Text>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.greyColor}}>{props.request.nickname}</Text>
                </View>
            </View>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont}}>{props.request.title}</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: paddings.elementPadding}}>
                <View style={[stylesSheet.button, stylesSheet.redButton, {width: '45%'}]}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor}}>ОТКЛОНИТЬ</Text>
                </View>
                <View style={[stylesSheet.button, stylesSheet.accentButton, {width: '45%'}]}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor}}>ПРИНЯТЬ</Text>
                </View>
            </View>
        </View>
    )
}