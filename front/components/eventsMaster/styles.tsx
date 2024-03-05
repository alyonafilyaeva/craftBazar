import { StyleSheet } from "react-native";
import { colors, paddings, fonts } from "@/styles/styles";

export const styles = StyleSheet.create({
    block: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.secondColor,
        alignItems: 'center',
        borderRadius: 30,
        padding: paddings.bodyPadding,
        marginBottom: paddings.bodyPadding
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