import { StyleSheet } from "react-native";
import { colors, fonts, paddings } from "@/styles/styles";

export const styles = StyleSheet.create({
    block: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: paddings.elementPadding
    },
    item: {
        borderRadius: 20,
        backgroundColor: colors.secondColor,
        paddingTop: paddings.elementPadding,
        paddingBottom: paddings.elementPadding,
        paddingLeft: paddings.bodyPadding,
        paddingRight: paddings.bodyPadding,
        marginRight: paddings.bodyPadding,
        marginBottom: paddings.elementPadding
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: fonts.descriptionFont,
        color: colors.accentColor
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: paddings.bodyPadding,
        marginBottom: 30
    },
    active: {
        backgroundColor: colors.accentColor,
        color: colors.secondColor
    }
})