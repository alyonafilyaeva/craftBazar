import { StyleSheet } from "react-native";
import { colors, paddings, fonts } from "@/styles/styles";

export const styles = StyleSheet.create({
    topPanel: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: paddings.bodyPadding
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: colors.secondColor,
        borderRadius: 50,
        marginRight: paddings.bodyPadding
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
        fontFamily: 'Montserrat_100Thin'
    },
    accentText: {
        color: colors.accentColor,
        fontSize: fonts.descriptionFont,
        fontWeight: '400'
    },
    mainText: {
        fontSize: fonts.descriptionFont,
        fontWeight: '400'
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
})