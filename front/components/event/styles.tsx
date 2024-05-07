import { StyleSheet } from "react-native";
import { colors, paddings } from "@/styles/styles";

export const styles = StyleSheet.create({
    event: {
        backgroundColor: colors.secondColor,
        borderRadius: 20,
        marginBottom: paddings.bodyPadding
    },
    textBlock: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 8, },
    date: {
        position: 'absolute',
        left: 8,
        top: 140,
        backgroundColor: colors.secondColor,
        width: 40,
        height: 37,
        alignItems: 'center',
        borderRadius: 10,
        color: colors.accentColor,
        shadowColor: colors.accentColor,
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    isPaid: {
        borderRadius: 20,
        padding: 5,
        color: colors.secondColor
    }
})