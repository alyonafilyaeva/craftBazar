import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { colors, paddings } from "@/styles/styles";
import { IEvent } from '@/models/models';
import { AntDesign } from '@expo/vector-icons';

interface EventProps {
    event: IEvent
}

export default function Event(props: EventProps) {
    return (
        <View style={styles.event}>
            <View  style={{ borderTopLeftRadius: 20 }}>
                <ImageBackground source={require("../../assets/images/event.png")} resizeMode="cover" style={{ height: 160, borderTopLeftRadius: 20 }} />
            </View>
            {/* <Image source={require("../../assets/images/event.png")} /> */}
            <View style={styles.date}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentColor }}>08</Text>
                <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accentColor }}>12</Text>
            </View>
            <View style={styles.textBlock}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: '500', paddingTop: 16 }}>{props?.event?.title}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 14, paddingTop: 8 }}>{props?.event?.city}</Text>
                        <Text style={{ fontSize: 14, paddingTop: 8 }}>, </Text>
                        <Text style={{ fontSize: 14, paddingTop: 8 }}>{props?.event?.address}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 14, paddingTop: 8 }}>{props?.event?.time_start}</Text>
                        <Text style={{ fontSize: 14, paddingTop: 8 }}> - </Text>
                        <Text style={{ fontSize: 14, paddingTop: 8 }}>{props?.event?.time_finish}</Text>
                    </View>

                </View>
                <AntDesign name="hearto" size={30} color={colors.accentColor} />
            </View>
        </View>
    )
}