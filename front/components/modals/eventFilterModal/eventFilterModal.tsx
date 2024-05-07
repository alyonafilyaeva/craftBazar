import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, stylesSheet } from '@/styles/styles'
import { styles } from './styles'
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { baseURL } from '@/constants/constants';

export default function EventFilterModal({ filterModal, setFilterModal, setEvents, filters, setFilters }) {
    const [data, setData] = useState()
    const [city, setCity] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [cost, setCost] = useState(5000)

    useEffect(() => { axios.get(`${baseURL}/api/events`).then(response => setData(response.data)) }, [])
    function filterEvents() {
        console.log('data', data)
        if (city) {
            setEvents(data?.filter(
                (item) => item.city == city
            ))
            setFilters([...filters, city])
        }
        if (date) {
            if (date == "today") {
                setEvents(data?.filter(
                    (item) => item.date_start.slice(0, 10) == new Date().toISOString().slice(0, 10)
                ))
                setFilters([...filters, 'Сегодня'])
            } else if (date == "week") {
                let today = new Date();
                let dayOfWeek = today.getDay();
                let firstDay = new Date();
                firstDay.setDate(today.getDate() + (1 - dayOfWeek));
                let lastDay = new Date();
                lastDay.setDate(today.getDate() + (7 - dayOfWeek));
                setEvents(data?.filter(
                    (item) =>
                        new Date(item.date_start).getTime() > firstDay &&
                        new Date(item.date_start).getTime() < lastDay
                ))
                setFilters([...filters, 'На этой неделе'])
            } else if (date == "month") {
                let today = new Date();
                let month = today.getMonth();
                let firstDay = new Date();
                firstDay.setMonth(month, 1);
                let lastDay = new Date();
                lastDay.setMonth(month + 1, 1);
                setEvents(data?.filter(
                    (item) =>
                        new Date(item.date).getTime() > firstDay &&
                        new Date(item.date).getTime() < lastDay
                ))
                setFilters([...filters, 'В этом месяце'])
            } else {
                setEvents(data?.filter((item) => item.date == date))
            }
        }
        if (time) {
            if (time == "morning") {
                setEvents(data?.filter(
                    (item) => item.time_start.split(":")[0] <= 12
                ))
                setFilters([...filters, 'Утро'])
            }
            if (time == "afternoon") {
                setEvents(data?.filter(
                    (item) =>
                        item.time_start.split(":")[0] >= 12 &&
                        item.time_start.split(":")[0] <= 16
                ))
                setFilters([...filters, 'День'])
            }
            if (time == "evening") {
                setEvents(data?.filter(
                    (item) => item.time_start.split(":")[0] >= 16
                ))
                setFilters([...filters, 'Вечер'])
            }
        }

        if (cost) {
            setEvents(data?.filter(
                (item) => item.cost <= cost
            ))
            setFilters([...filters, cost])
        }
        setFilterModal(false)
        setCost('')
        setDate('')
        setTime('')
        setCity('')
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
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Дата</Text>
                        <View style={styles.block}>
                            <TouchableOpacity style={[styles.item, date == 'today' && styles.active]} onPress={() => setDate('today')}>
                                <Text style={[styles.text, date == 'today' && styles.active]}>Сегодня</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.item, date == 'week' && styles.active]} onPress={() => setDate('week')}>
                                <Text style={[styles.text, date == 'week' && styles.active]}>На этой неделе</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.item, date == 'month' && styles.active]} onPress={() => setDate('month')}>
                                <Text style={[styles.text, date == 'month' && styles.active]}>В этом месяце</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <Text style={styles.text}>Выбрать дату</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Время</Text>
                        <View style={styles.block}>
                            <TouchableOpacity style={[styles.item, time == 'morning' && styles.active]} onPress={() => setTime('morning')}>
                                <Text style={[styles.text, time == 'morning' && styles.active]}>Утро</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.item, time == 'afternoon' && styles.active]} onPress={() => setTime('afternoon')}>
                                <Text style={[styles.text, time == 'afternoon' && styles.active]}>День</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.item, time == 'evening' && styles.active]} onPress={() => setTime('evening')}>
                                <Text style={[styles.text, time == 'evening' && styles.active]}>Вечер</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.mainFont }}>Стоимость участия до {cost}</Text>
                        <Slider
                            style={{ width: '100%', height: 40, borderColor: colors.accentColor }}
                            minimumValue={0}
                            maximumValue={5000}
                            step={100}
                            value={cost}
                            onValueChange={setCost}
                            minimumTrackTintColor={colors.accentColor}
                            maximumTrackTintColor="#000000"
                        />
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
                        <TouchableOpacity style={[stylesSheet.button, stylesSheet.accentButton, { paddingLeft: 30, paddingRight: 30 }]} onPress={filterEvents}>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor }}>ПРИМЕНИТЬ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}