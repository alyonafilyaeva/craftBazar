import { StyleSheet } from "react-native";
import { colors, paddings } from "@/styles/styles";

export const styles = StyleSheet.create({
    master: {
        backgroundColor: colors.secondColor,
        borderRadius: 20,
        marginBottom: paddings.bodyPadding
    },
    textBlock: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 8, },

})