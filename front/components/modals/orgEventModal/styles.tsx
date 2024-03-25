import { StyleSheet } from "react-native";
import { colors, paddings } from "@/styles/styles";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        width: '50%',
        borderRadius: 35,
        padding: paddings.elementPadding,
        position: 'absolute',
        top: 5,
        left: '46%',
        zIndex: 1
    },
    block: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 5,
        paddingTop: 5,
        
    },
    underline: {
        borderBottomColor: colors.accentColor,
        borderBottomWidth: 1
    }
})