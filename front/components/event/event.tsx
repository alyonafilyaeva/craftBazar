import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { styles } from './styles'
import { colors, paddings } from "@/styles/styles";
import { IEvent } from '@/models/models';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '@/app/authContext';
import { baseURL, toDate } from '@/constants/constants';
import axios from 'axios';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';

interface EventProps {
    event: IEvent,
    isPaid: boolean,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default function Event(props: EventProps) {
    let { user } = useContext(AuthContext)
    const [isFavourite, setIsFavourite] = useState<boolean>()
    let [events, setEvents] = useState([])
    let getEvents =  () => {
        console.log(1)
         axios.get(`${baseURL}/api/favouriteEvents?user_id=${user.id}`).then(response => {
            setEvents(response.data)
        })
        console.log(3)
    }
    const path_picture = props.event.path_picture
    const path = '../../' + {path_picture} + '.png'
    useLayoutEffect(() => {
        getEvents()
        let id = events?.map(event => event?.event_id)
            if (id.includes(props.event.id)) {
                setIsFavourite(true)
            }
    }, [events.length])
    console.log(isFavourite)
    function AddToFavourite() {
        axios({
            method: "post",
            url: `${baseURL}/api/favouriteEvents/`,
            /* headers: {
              Authorization: `Bearer ${token}`,
            }, */
            data:
            {
                user_id: user?.id,
                event_id: props.event.id
            }

        }).then((response) => {
            console.log(response);
        });
        setIsFavourite(true)
    }
    function DeleteFromFavourite() {
        axios.delete(`${baseURL}/api/favouriteEvents/${props.event?.id_fv}`)
        setIsFavourite(false)
    }

    return (
        <View style={styles.event}>
            <TouchableOpacity style={{ borderTopLeftRadius: 20 }} onPress={() =>
                props.navigation.navigate('Event', { id: props.event.id })}>
                <ImageBackground source={{uri: props.event.path_picture}} resizeMode="cover" style={{ height: 160, borderTopLeftRadius: 20 }} />
            </TouchableOpacity>
            {/* <Image source={require("../../assets/images/event.png")} /> */}
            <View style={styles.date}>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '700', color: colors.accentColor }}>{props.event.date_start?.slice(8, 10)}</Text>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '700', color: colors.accentColor }}>{props.event.date_start?.slice(5, 7)}</Text>
            </View>
            <View style={styles.textBlock}>
                <View>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, fontWeight: '500', paddingTop: 16 }}>{props?.event?.title}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, paddingTop: 8 }}>{props?.event?.city}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, paddingTop: 8 }}>, </Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, paddingTop: 8 }}>{props?.event?.address}</Text>
                    </View>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, paddingTop: 8 }}>{props?.event?.time_start?.slice(0, 5)} - {props?.event?.time_finish?.slice(0, 5)} </Text>
                </View>
                {user.role == 'user' && !isFavourite && <AntDesign name="hearto" size={30} color={colors.accentColor} onPress={AddToFavourite} />}
                {isFavourite && <AntDesign name="heart" size={30} color={colors.accentColor} onPress={DeleteFromFavourite}/>}
                {props.isPaid && <View style={{ position: 'absolute', top: '80%', left: '75%' }}>
                    {props.event.is_paid ? <Text style={[styles.isPaid, { backgroundColor: colors.accentColor }]}>Оплачено</Text> : <Text style={[styles.isPaid, { backgroundColor: colors.secondAccentColor }]}>Не оплачено</Text>}
                </View>}
            </View>
        </View>
    )
}