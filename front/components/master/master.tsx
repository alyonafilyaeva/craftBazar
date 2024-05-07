import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import { colors, paddings } from "@/styles/styles";
import { IMaster } from '@/models/models';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { baseURL } from '@/constants/constants';
import { AuthContext } from '@/app/authContext';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';

interface MasterProps {
    master: IMaster,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default function Master(props: MasterProps) {
    let { user } = useContext(AuthContext)
    const [isFavourite, setIsFavourite] = useState<boolean>()
    let [masters, setMasters] = useState([])
    let [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get(`${baseURL}/api/favouriteMasters?user_id=${user.id}`).then(response => setMasters(response.data))
        axios.get(`${baseURL}/api/categories`).then(response => setCategories(response.data))
        let id = masters?.map(master => master.master_id)
        if (id.includes(props.master.id)) {
            setIsFavourite(true)
        }
        console.log(masters)
    }, [masters.length])
    function AddToFavourite() {
        axios({
            method: "post",
            url: `${baseURL}/api/favouriteMasters/`,
            /* headers: {
              Authorization: `Bearer ${token}`,
            }, */
            data:
            {
                user_id: user?.id,
                master_id: props.master.id
            }

        }).then((response) => {
            console.log(response);
        });
        setIsFavourite(true)
    }
    return (
        <View style={styles.master}>
            <TouchableOpacity style={{ borderTopLeftRadius: 20 }} onPress={() =>
                props.navigation.navigate('Master', { id: props.master.id })}>
                <View style={{ backgroundColor: colors.mainColor, padding: 5, borderRadius: 20, position: 'absolute', right: '3%', top: '5%', zIndex: 10}}>
                    <Text style={{ color: colors.accentColor }}>#{categories?.filter(item => item.category_id == props.master?.category_id)[0]?.category_title}</Text>
                </View>
                <ImageBackground source={{ uri: props.master.picture_path }} resizeMode="cover" style={{ height: 160, borderTopLeftRadius: 20 }} />
            </TouchableOpacity>
            <View style={styles.textBlock}>
                <View>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, fontWeight: '500', paddingTop: 16 }}>{props?.master?.title_master}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, paddingTop: 8, color: colors.greyColor }}>{props?.master?.nickname}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, paddingTop: 8, color: colors.greyColor }}>{props?.master?.city}</Text>
                </View>
                {user?.role == 'user' && !isFavourite && <AntDesign name="hearto" size={30} color={colors.accentColor} onPress={AddToFavourite} />}
                {isFavourite && <AntDesign name="heart" size={30} color={colors.accentColor} />}
            </View>
        </View>
    )
}

