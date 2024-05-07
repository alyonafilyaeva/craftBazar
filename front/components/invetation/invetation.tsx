import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IRequest } from '@/models/models'
import { styles } from './styles'
import { colors, fonts, paddings, stylesSheet } from '@/styles/styles'
import axios from 'axios'
import { baseURL } from '@/constants/constants'

interface InvetationProps {
    invetation: IRequest
}

export default function Invetation(props: InvetationProps) {
    function RejectInvetation() {
        axios
            .patch(
                `${baseURL}/api/invetations/${props.invetation.invetation_id}`
            )
            .then((response) => {
                console.log(response);
            })
    }

    function AcceptInvetation() {
        axios.delete(`${baseURL}/api/invetations/${props.invetation.invetation_id}`)
        axios
            .post(
                `${baseURL}/api/mastersEvents/`,
                {
                    master_id: props.invetation.master_id,
                    event_id: props.invetation.event_id
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
            <View style={{display: 'flex', flexDirection: 'row', marginBottom: paddings.elementPadding}}>
                <View style={styles.circlePink}>
                </View>
                <View style={{marginLeft: paddings.elementPadding}}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont}}>{props.invetation.title}</Text>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.greyColor}}>{props.invetation?.date_start.slice(0, 10)}, {props.invetation?.address}</Text>
                </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: paddings.elementPadding}}>
                <TouchableOpacity style={[stylesSheet.button, stylesSheet.redButton, {width: '45%'}]} onPress={RejectInvetation}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor, textAlign: 'center'}}>ОТКЛОНИТЬ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, {width: '45%'}]} onPress={AcceptInvetation}>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor, textAlign: 'center'}}>ПРИНЯТЬ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}