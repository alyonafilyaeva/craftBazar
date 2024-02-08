import { View, Text, Button } from 'react-native'
import React from 'react'

export default function EventPage({navigation}) {
  return (
    <View>
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