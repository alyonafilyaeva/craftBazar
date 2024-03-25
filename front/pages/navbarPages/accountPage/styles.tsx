import { colors, paddings } from "@/styles/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    block: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: paddings.elementPadding},
    icon: {
        backgroundColor: colors.secondColor,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.accentColor,
        borderWidth: 1
    },
})

