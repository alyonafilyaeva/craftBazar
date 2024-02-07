import { StyleSheet } from "react-native"

export let colors = {
    mainColor: '#EDEDFD',
    secondColor: '#FFF',
    accentColor: '#5F4BC4',
    secondAccentColor: '#F8B1C3',
    greyColor: '#575757'
}

export let fonts = {
    titleFont: 24,
    mainFont: 20,
    descriptionFont: 18
}

export let paddings = {
    bodyPadding: 20,

}

export const stylesSheet = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        padding: paddings.bodyPadding,
        fontFamily: 'Montserrat'
    }
})