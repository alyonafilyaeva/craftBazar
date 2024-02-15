import { View, Text, Image } from 'react-native'
import React from 'react'
import { IProduct } from '@/models/models'
import { styles } from './style'
import { colors, fonts, paddings } from '@/styles/styles'

interface ProductProps {
    product: IProduct
}

export default function Product(props: ProductProps) {
    return (
        <View style={styles.productBlock}>
            <Image source={require('../../assets/images/product.png')} />
            <View style={{marginLeft: paddings.elementPadding}}>
                <Text style={{fontSize: fonts.descriptionFont}}>{props.product.title}</Text>
                <Text style={{fontSize: fonts.descriptionFont, color: colors.accentColor}}>{props.product.cost}₽</Text>
            </View>
        </View>
    )
}