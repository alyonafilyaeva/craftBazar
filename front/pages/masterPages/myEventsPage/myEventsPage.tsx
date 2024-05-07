import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { colors, paddings, stylesSheet } from '@/styles/styles'
import {
    Calendar
} from "react-native-calendars";
import axios from 'axios';
import { baseURL } from '@/constants/constants';
import Event from '@/components/event/event';
import { FontAwesome6 } from '@expo/vector-icons';

export const Swimming = { key: "Swimming", color: "#A12FAA", selectedDotColor: "blue" };

export default function MyEventsPage({ navigation, route }) {
    let isFocused = useIsFocused()
    let id = route.params.id
    let path = route.params.path
    let [mastersEvents, setMastersEvents] = useState([])
    useEffect(() => {
        if (isFocused) {
            axios.get(`${baseURL}/api/mastersEvents?${path}=${id}`).then(response => setMastersEvents(response.data))
        }
    }, [isFocused])
    let markedDates = {};
    mastersEvents.forEach((item) => {
        markedDates[item.date_start?.slice(0, 10)] = {
            dots: [{ color: colors.accentColor }],
        };
    });
    console.log(mastersEvents)
    return (
        <View style={stylesSheet.container}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity style={stylesSheet.back} onPress={() =>
                    navigation.goBack()
                }>
                    <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
                </TouchableOpacity>
                <Text style={[stylesSheet.title, { marginLeft: paddings.elementPadding }]}>Мои события</Text>
            </View>
            <Calendar style={{ borderRadius: 20, marginTop: 32, marginBottom: 32 }}
                markingType={"multi-dot"}
                markedDates={markedDates}
                firstDay={1} />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={mastersEvents}
                renderItem={({ item }) => (
                    <View>
                        <Event event={item} navigation={navigation} isPaid={true} />
                    </View>
                )}
            />
        </View>
    )
}