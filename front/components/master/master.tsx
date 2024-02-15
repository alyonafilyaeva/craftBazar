import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { colors, paddings } from "@/styles/styles";
import { IMaster } from '@/models/models';
import { AntDesign } from '@expo/vector-icons';

interface MasterProps {
    master: IMaster
}

export default function Master(props: MasterProps) {
    return (
        <View style={styles.master}>
            <View style={{ borderTopLeftRadius: 20 }}>
                <ImageBackground source={require("../../assets/images/master.png")} resizeMode="cover" style={{ height: 160, borderTopLeftRadius: 20 }} />
            </View>
            <View style={styles.textBlock}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: '500', paddingTop: 16 }}>{props?.master?.title}</Text>
                    <Text style={{ fontSize: 14, paddingTop: 8, color: colors.accentColor }}>{props?.master?.nickname}</Text>
                    <Text style={{ fontSize: 14, paddingTop: 8, color: colors.accentColor }}>{props?.master?.city}</Text>
                </View>
                <AntDesign name="hearto" size={30} color={colors.accentColor} />
            </View>
        </View>
    )
}