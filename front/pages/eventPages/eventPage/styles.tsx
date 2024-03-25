import { StyleSheet } from "react-native";
import { colors, paddings, fonts } from "@/styles/styles";

export const styles = StyleSheet.create({
    topButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: paddings.bodyPadding,
        paddingRight: paddings.bodyPadding
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: colors.mainColor,
        borderRadius: 50,
        top: -240
    },
    iconBlock: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: paddings.elementPadding,
        marginRight: paddings.bodyPadding
    },
    textBlock: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: paddings.elementPadding,
    },
    accentText: {
        fontFamily: 'Montserrat-Medium',
        color: colors.accentColor,
        fontSize: fonts.descriptionFont,
        fontWeight: '400'
    },
    mainText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: fonts.descriptionFont,
        fontWeight: '500'
    },
    mastersBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: paddings.bodyPadding,
        marginBottom: paddings.bodyPadding
    },
    circleBlock: {
        display: 'flex',
        flexDirection: 'row'
    },
    circlePurple: {
        width: 50,
        height: 50,
        backgroundColor: colors.mainColor,
        borderRadius: 50,
    },
    circleGrey: {
        width: 50,
        height: 50,
        backgroundColor: '#D9D9D9',
        borderRadius: 50,
    },
    circlePink: {
        width: 50,
        height: 50,
        backgroundColor: colors.secondAccentColor,
        borderRadius: 50
    },
    firstCircle: {

    },
    secondCircle: {
        left: -25
    },
    thirdCircle: {
        left: -50
    },
    fourthCircle: {
        left: -75
    },
    fifthCircle: {
        left: -100
    },
    detail: {
        backgroundColor: colors.mainColor,
        left: -80,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 25
    }
})