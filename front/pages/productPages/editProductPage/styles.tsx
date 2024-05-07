import { StyleSheet } from "react-native";
import { colors, fonts, paddings } from "@/styles/styles";

export const styles = StyleSheet.create({
    topPanel: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: paddings.bodyPadding
    },
    inputBlock: {
        marginBottom: paddings.bodyPadding
    },
    dateTimeBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateInput: {
        width: '100%'
    },
    timeInput: {
        width: '30%'
    },
    imageBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addImage: {
        backgroundColor: colors.secondColor,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: paddings.bodyPadding,
        marginBottom: 30
    },
    radioButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: paddings.elementPadding
    },
    radio: {
        width: 24,
        height: 24,
        borderColor: colors.accentColor,
        borderWidth: 1,
        borderRadius: 10,
        marginRight: paddings.elementPadding
    },
    active: {
        backgroundColor: colors.accentColor
    }
})