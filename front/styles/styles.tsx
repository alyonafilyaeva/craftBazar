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
    descriptionFont: 16
}

export let paddings = {
    bodyPadding: 20,
    elementPadding: 10
}

export const stylesSheet = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        padding: paddings.bodyPadding,
        fontFamily: 'Montserrat',
        height: '100%'
    },
    containerWhite :{
        backgroundColor: colors.secondColor,
        padding: paddings.bodyPadding,
        fontFamily: 'Montserrat',
        paddingBottom: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -50
    },
    title: {
        fontSize: fonts.titleFont,
        fontWeight: '700',
    },
    accentButton: {
        backgroundColor: colors.accentColor,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50
    },
    mainButton: {
        backgroundColor: colors.mainColor,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.accentColor
    },
    back: {
        backgroundColor: colors.secondColor,
        borderRadius: 50,
        /* padding: 10, */
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    icon: {
        backgroundColor: colors.mainColor,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.secondColor,
        borderRadius: 50,
        paddingTop: paddings.elementPadding,
        paddingBottom: paddings.elementPadding,
        paddingLeft: paddings.elementPadding,
        fontSize: fonts.descriptionFont,
        marginTop: paddings.elementPadding
    },
})