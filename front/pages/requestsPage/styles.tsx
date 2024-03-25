import { StyleSheet } from "react-native";
import { colors, paddings, fonts } from "@/styles/styles";

export const styles = StyleSheet.create({
    switch: {
        borderRadius: 30,
        borderColor: colors.accentColor,
        borderWidth: 1,
        color: colors.accentColor,
        padding: paddings.elementPadding,
        fontFamily: 'Montserrat-Medium',
        fontSize: fonts.descriptionFont,
        marginRight: paddings.elementPadding
    }
})