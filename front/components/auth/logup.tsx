import { colors, fonts, paddings } from "@/styles/styles";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LogupUser from "./logupUser";
import LogupOrg from "./logupOrg";
import LogupMaster from "./logupMaster";

export default function Logup() {
    const [role, setRole] = useState<string>()
    return (
        <View>
            {!role && <View>
                <TouchableOpacity style={{ borderRadius: 20, padding: 10, backgroundColor: colors.accentColor, marginBottom: paddings.bodyPadding }} onPress={() => setRole('org')}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor, textAlign: 'center' }}>ХОЧУ ОРГАНИЗОВАТЬ МЕРОПРИЯТИЕ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ borderRadius: 20, padding: 10, backgroundColor: colors.secondAccentColor, marginBottom: paddings.bodyPadding }} onPress={() => setRole('master')}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: fonts.descriptionFont, color: colors.secondColor, textAlign: 'center' }}>ХОЧУ ПРЕДСТАВЛЯТЬ СВОЙ ТОВАР</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ borderRadius: 20, padding: 10, backgroundColor: "#D9D9D9" }} onPress={() => setRole('user')}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, color: colors.secondColor, textAlign: 'center' }}>ХОЧУ УЗНАВАТЬ О СОБЫТИЯХ И МАСТЕРАХ</Text>
                </TouchableOpacity>
            </View>}
            {role == 'org' && <LogupOrg />}
            {role == 'master' && <LogupMaster />}
            {role == 'user' && <LogupUser />}
        </View>
    )
}