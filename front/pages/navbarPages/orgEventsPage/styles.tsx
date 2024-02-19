import { paddings } from "@/styles/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    topPanel: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: paddings.bodyPadding
    }
})