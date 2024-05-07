import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik'
import { stylesSheet, colors, fonts } from '@/styles/styles'
import { styles } from './styles'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'
import { baseURL } from '@/constants/constants'
import { AuthContext } from '@/app/authContext'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import { RadioButton } from 'react-native-paper'

export default function AddEventPage({ navigation }) {
  const { user } = useContext(AuthContext)
  const [selectedValue, setSelectedValue] = useState("one");
  const [id, setId] = useState()
  useEffect(() => {
    axios.get(`${baseURL}/api/organizers/${user.id}`).then(response => setId(response.data[0].id))
  }, [])
  console.log(id)
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  }
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' })
    console.log(result)
  }
  const handleCameraLaunch = () => {
    console.log('camera')
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      console.log('launch')
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        /* setSelectedImage(imageUri); */
        console.log(imageUri);
      }
    });
  }
  function AddEvent(values) {
    axios
      .post(
        `${baseURL}/api/events/`,
        {
          title: values.title,
          date_start: values.date,
          time_start: values.time_start,
          time_finish: values.time_finish,
          city: values.city,
          address: values.address,
          description: values.description,
          link: values.link,
          cost: values.cost,
          path_picture: 'https://cs6.livemaster.ru/storage/65/8d/3a856a70b2e27ef0897d361ff0py.jpg',
          organizer_id: id,
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
        navigation.goBack()
      })
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

   // Stores the selected image URI 
   const [file, setFile] = useState(null); 
  
   // Stores any error message 
   const [error, setError] = useState(null); 
 
   // Function to pick an image from  
   //the device's media library 
   const pickImage = async () => { 
       const { status } = await ImagePicker. 
           requestMediaLibraryPermissionsAsync(); 
 
       if (status !== "granted") { 
 
           // If permission is denied, show an alert 
           Alert.alert( 
               "Permission Denied", 
               `Sorry, we need camera  
                roll permission to upload images.` 
           ); 
       } else { 
 
           // Launch the image library and get 
           // the selected image 
           const result = 
               await ImagePicker.launchImageLibraryAsync(); 
 
           if (!result.cancelled) { 
 
               // If an image is selected (not cancelled),  
               // update the file state variable 
               setFile(result.uri); 
 
               // Clear any previous errors 
               setError(null); 
           } 
       } 
   }; 
 
  return (
    <ScrollView style={stylesSheet.container}>
      <View style={styles.topPanel}>
        <TouchableOpacity style={stylesSheet.back} onPress={() =>
          navigation.goBack()
        }>
          <FontAwesome6 name="angle-left" size={24} color={colors.accentColor} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 'auto', marginLeft: 10 }}>
          <Text style={stylesSheet.title}>Создать событие</Text>
        </View>

      </View>
      <Formik
        initialValues={{
          title: "",
          date_start: "",
          time_start: "",
          time_finish: "",
          city: "",
          address: "",
          description: "",
          link: "",
          cost: 0,
          path_picture: "",
          count_masters: 0
        }}
        onSubmit={(values) => AddEvent(values)}
      >
        {({ handleChange, handleSubmit, values }) => (

          <View>
            <View style={styles.inputBlock}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont}}>
                Название события
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("title")}
                value={values.title}
                placeholder="Название события"
              />
            </View>
            <View style={styles.radioButton}>
              <TouchableOpacity style={[styles.radio, selectedValue == 'one' && styles.active]} onPress={() => setSelectedValue("one")}></TouchableOpacity>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: 16 }}>
                Событие в один день
              </Text>
            </View>
            <View style={styles.radioButton}>
            <TouchableOpacity style={[styles.radio, selectedValue == 'many' && styles.active]} onPress={() => setSelectedValue("many")}></TouchableOpacity>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: 16 }}>
                Событие в несколько дней
              </Text>
            </View>
            <View style={[styles.inputBlock, styles.dateTimeBlock]}>
              <View style={{ width: '50%', marginRight: 30 }}>
                <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                  Дата
                </Text>
                <TextInput
                  style={[stylesSheet.input, styles.dateInput]}
                  onChangeText={handleChange("date")}
                  value={values.date}
                  placeholder="ДД/ММ/ГГ"
                />
              </View>
              <View>
                <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                  Время
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    style={[stylesSheet.input, styles.timeInput]}
                    onChangeText={handleChange("time_start")}
                    value={values.time_start}
                    placeholder="00:00"
                  />
                  <Text> - </Text>
                  <TextInput
                    style={[stylesSheet.input, styles.timeInput]}
                    onChangeText={handleChange("time_finish")}
                    value={values.time_finish}
                    placeholder="00:00"
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                Город
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("city")}
                value={values.city}
                placeholder="Город"
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                Место проводения
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("address")}
                value={values.address}
                placeholder="Место проведения"
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont}}>
                Стоимость участия
              </Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={[stylesSheet.input, { width: '45%' }]}
                  onChangeText={handleChange("cost")}
                  value={values.cost}
                  placeholder="Стоимость участия"
                />
                <TextInput
                  style={[stylesSheet.input, { width: '45%' }]}
                  onChangeText={handleChange("cost")}
                  /* value={values.cost} */
                  placeholder="В день"
                />
              </View>

            </View>
            <View style={styles.inputBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont}}>
                Описание
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("description")}
                value={values.description}
                placeholder="Описание"
                multiline
                numberOfLines={5}
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                Основной ресурс продвижения
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("link")}
                value={values.link}
                placeholder="Сайт, страничка ВКонтакте и тд."
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                Ожидаемое количество мастеров
              </Text>
              <TextInput
                style={stylesSheet.input}
                onChangeText={handleChange("count_masters")}
                value={values.count_masters}
                placeholder="Ожидаемое количество мастеров"
              />
            </View>
            <View style={styles.imageBlock}>
              <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont }}>
                Загрузить изображение
              </Text>
              <TouchableOpacity style={styles.addImage} onPress={pickImage}>
                <MaterialCommunityIcons name="file-image-plus-outline" size={30} color={colors.accentColor} />
              </TouchableOpacity>

            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={[stylesSheet.button, stylesSheet.mainButton, {paddingLeft: 30, paddingRight: 30}]} onPress={() => navigation.navigate('OrgEvents')}>
                <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont, color: colors.accentColor }}>ОТМЕНИТЬ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[stylesSheet.button ,stylesSheet.accentButton, {paddingLeft: 30, paddingRight: 30}]} onPress={handleSubmit}>
                <Text style={{fontFamily: 'Montserrat-Medium',  fontSize: fonts.descriptionFont, color: colors.secondColor }}>СОХРАНИТЬ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}