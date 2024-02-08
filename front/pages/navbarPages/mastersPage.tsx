import { View, Text, Button } from 'react-native'
import React from 'react'

export default function MastersPage({navigation}) {
  return (
    <View>
      <Text>MastersPage</Text>
      <Button
            title="Go to AuthPage"
            onPress={() =>
                navigation.navigate('AddEvent', {
                    name: 'Jane',
                })
            }
        />
    </View>
  )
}