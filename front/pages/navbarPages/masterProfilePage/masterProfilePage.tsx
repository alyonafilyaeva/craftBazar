import { View, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { colors, fonts, stylesSheet } from '@/styles/styles'
import { styles } from './styles'
import { AuthContext } from '@/app/authContext'
import { baseURL } from '@/constants/constants'
import axios from 'axios'
import { IMaster, IProduct } from '@/models/models'
import Product from '@/components/product/product'
import { QualifiedSlot } from 'expo-router/build/views/Navigator'
import { AntDesign, Ionicons } from '@expo/vector-icons'

export default function MasterProfilePage({ navigation }) {
    let isFocused = useIsFocused()
    const { user } = useContext(AuthContext)
    const [master, setMaster] = useState<IMaster>({})
    let [products, setProducts] = useState<Array<IProduct>>([])
    console.log(user)
    let getMaster = async () => {
        await axios.get(`${baseURL}/api/masters?user_id=${user.id}`).then(response => setMaster(response.data[0]))
    }
    let getProducts = async () => {
        await axios.get(`${baseURL}/api/products?master_id=3`).then(response => setProducts(response.data))
    }
    useEffect(() => {
        if (isFocused) {
            getMaster()
        }
    }, [isFocused])
    useEffect(() => {
        if (isFocused) {
            getProducts()
        }

    }, [isFocused])
    return (
        <View style={stylesSheet.container}>
            <View style={styles.topPanel}>
                <Text style={stylesSheet.title}>Профиль</Text>
                <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton]} onPress={() =>
                    navigation.navigate('EditMasterProfile', { id: master.id })
                }>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor }}>Редактировать</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>{master?.title_master}</Text>
            <ImageBackground source={{uri: master?.picture_path}} resizeMode="cover" style={{ height: 200, borderRadius: 20 }} />
            <View style={styles.iconBlock}>
                <View style={[stylesSheet.icon, { borderColor: colors.accentColor, borderWidth: 1 }]}>
                    <AntDesign name="enviromento" size={24} color={colors.accentColor} />
                </View>
                <View style={styles.textBlock}>
                    <Text style={styles.mainText}>Город</Text>
                    <Text style={styles.accentText}>{master?.city}</Text>
                </View>
            </View>
            <View style={styles.iconBlock}>
                <View style={[stylesSheet.icon, { borderColor: colors.accentColor, borderWidth: 1 }]}>
                    <Ionicons name="time-outline" size={24} color={colors.accentColor} />
                </View>
                <View style={styles.textBlock}>
                    <Text style={styles.mainText}>Сроки изготовления</Text>
                    <Text style={styles.accentText}>{master?.time}До 7 дней</Text>
                </View>
            </View>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont }}>{master?.description}</Text>
            <Text style={stylesSheet.title}>Мои товары</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Product', { id: item.id })}
                    >
                        <Product product={item} color='secondColor' />
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, { width: '50%', marginLeft: '25%' }]} onPress={() =>
                navigation.navigate('AddProduct')
            }>
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor, textAlign: 'center' }}>Добавить товар</Text>
            </TouchableOpacity>
        </View>
    )
}