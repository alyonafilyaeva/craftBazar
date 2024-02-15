import { StyleSheet } from "react-native";
import { colors, paddings, fonts } from "@/styles/styles";

export const styles = StyleSheet.create({
    productBlock: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.mainColor,
        borderRadius: 50,
        padding: 10,
        marginBottom: paddings.elementPadding
    }
})