import { StyleSheet } from "react-native";
import { colors, fonts, paddings } from "@/styles/styles";

export const styles = StyleSheet.create({
    searchPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: paddings.bodyPadding
    },
    filerIcon: {
        width: 50,
        height: 50,
        backgroundColor: colors.secondColor,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterItem: {
        borderRadius: 20,
        backgroundColor: colors.accentColor,
        paddingTop: paddings.elementPadding,
        paddingBottom: paddings.elementPadding,
        paddingLeft: paddings.bodyPadding,
        paddingRight: paddings.bodyPadding,
        marginBottom: paddings.bodyPadding,
        marginRight: paddings.elementPadding,
        height: 40
    }
})