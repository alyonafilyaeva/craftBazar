import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, stylesSheet } from '@/styles/styles'
import { styles } from './styles'
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { baseURL } from '@/constants/constants';
import { SelectList } from 'react-native-dropdown-select-list';

export default function MasterFilterModal({ filterModal, setFilterModal, setMasters, filters, setFilters }) {
    const [data, setData] = useState()
    const [city, setCity] = useState()
    const [time, setTime] = useState()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState()

    useEffect(() => {
        axios.get(`${baseURL}/api/masters`).then(response => setData(response.data))
        axios.get(`${baseURL}/api/categories`).then(response => {
            setCategories(response.data)
        })
    }, [])

    let categoryData = categories.map((item) => ({ key: item.category_id, value: item.category_title }))
    function filterMasters() {
        console.log('category', category)
        if (city) {
            setMasters(data?.filter(
                (item) => item.city == city
            ))
            setFilters([...filters, city])
        }

        if (category) {
            setMasters(data?.filter(
                (item) => item.category_id == category
            ))
            console.log(categories.filter((item) => item.category_id == category)[0].category_title)
            setFilters([...filters, categories.filter((item) => item.category_id == category)[0].category_title])
        }
        
        if (time) {
            if (time == "week") {
                setMasters(data?.filter(
                    (item) => item.time <= 7
                ))
                setFilters([...filters, 'До 7 дней'])
            }
            if (time == "month") {
                setMasters(data?.filter(
                    (item) =>
                        item.time <= 30
                ))
                setFilters([...filters, 'До 30 дней'])
            }
            if (time == "more_month") {
                setEvents(data?.filter(
                    (item) => item.time > 30
                ))
                setFilters([...filters, 'Больше 30 дней'])
            }
        }

        setFilterModal(false)
        setTime()
        setCity()
    }
    return (
        <View>
            <Modal
                visible={filterModal}
                animationType="slide"
                transparent={true}
                style={{ zIndex: 10 }}
            >
                <View style={stylesSheet.container}>
                    <Text style={stylesSheet.title}>Фильтрация</Text>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Город</Text>
                        <TextInput style={stylesSheet.input} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Город</Text>
                        <SelectList
                            setSelected={(key) => setCategory(key)}
                            data={categoryData}
                            placeholder="Категория"
                            searchPlaceholder="Найти категорию"
                            save="key"
                            boxStyles={{ borderRadius: 20, borderColor: colors.secondColor, backgroundColor: colors.secondColor }}
                            dropdownItemStyles={{
                                borderRadius: 20,
                                borderColor: colors.secondColor,
                            }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Сроки изготовления</Text>
                        <View style={styles.block}>
                            <TouchableOpacity style={[styles.item, time == 'week' && styles.active]} onPress={() => setTime('week')}>
                                <Text style={[styles.text, time == 'week' && styles.active]}>До 7 дней</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.item, time == 'month' && styles.active]} onPress={() => setTime('month')}>
                                <Text style={[styles.text, time == 'month' && styles.active]}>До 30 дней</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.item, time == 'more_month' && styles.active]} onPress={() => setTime('more_month')}>
                                <Text style={[styles.text, time == 'more_month' && styles.active]}>Больше 30 дней</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <Text style={stylesSheet.title}>Сортировка</Text>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>По популярности</Text>
                        <TextInput style={stylesSheet.input} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>По новизне</Text>
                        <TextInput style={stylesSheet.input} />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[stylesSheet.button, stylesSheet.mainButton, { paddingLeft: 30, paddingRight: 30 }]} onPress={() => setFilterModal(false)}>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.accentColor }}>ОТМЕНИТЬ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, { paddingLeft: 30, paddingRight: 30 }]} onPress={filterMasters}>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor }}>ПРИМЕНИТЬ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}