import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IRequest } from '@/models/models'
import { styles } from './styles'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'
import axios from 'axios'
import { baseURL } from '@/constants/constants'

interface RequestProps {
    request: IRequest
}

export default function Request(props: RequestProps) {
    console.log(props.request)
    function RejectRequest() {
        axios
            .patch(
                `${baseURL}/api/requests/${props.request.request_id}`
            )
            .then((response) => {
                console.log(response);
            })
    }

    function AcceptRequest() {
        axios.delete(`${baseURL}/api/requests/${props.request.request_id}`)
        axios
            .post(
                `${baseURL}/api/mastersEvents/`,
                {
                    master_id: props.request.master_id,
                    event_id: props.request.event_id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        /* Authorization: `Bearer ${token}`, */
                    },
                }
            )
            .then((response) => {
                console.log(response);
            })
    }

return (
    <View style={styles.block}>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: paddings.elementPadding }}>
            <View style={styles.circlePink}>
            </View>
            <View style={{ marginLeft: paddings.elementPadding }}>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>{props.request.title_master}</Text>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.greyColor }}>{props.request.nickname}</Text>
            </View>
        </View>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>{props.request.title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: paddings.elementPadding }}>
            <TouchableOpacity style={[stylesSheet.button, stylesSheet.redButton, { width: '45%' }]} onPress={RejectRequest}>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor }}>ОТКЛОНИТЬ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, { width: '45%' }]} onPress={AcceptRequest}>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor, textAlign: 'center' }}>ПРИНЯТЬ</Text>
            </TouchableOpacity>
        </View>
    </View>
)
}