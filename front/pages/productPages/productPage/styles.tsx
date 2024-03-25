import { colors, fonts, paddings } from "@/styles/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    topPanel: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: paddings.bodyPadding
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
    back: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        /* backgroundColor: colors.mainColor, */
        borderRadius: 50,
        top: -240
    },
})