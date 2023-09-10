import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'


let sHeight = Dimensions.get('window').height;
let sWidth = Dimensions.get('window').width;
export default function ProdCompact({ details }) {
    return (
        <View style={{ height: sHeight * 0.12, width: sWidth * 0.8, flexDirection: "row", marginBottom: 20 }}>
            <Image source={{ uri: details.img }} style={{ height: sHeight * 0.12, resizeMode: "contain", aspectRatio: 1 }} />
            <View style={{ flexDirection: "column", justifyContent: "center", marginLeft: 8 }}>
                <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>{details.name}</Text>
                <Text style={styles.price}>&#x20B9; {details.price}</Text>
                {
                    (Number(details.isOnSale) > new Date()) ?
                        <Text style={styles.price}>Discounted Price: {details.price - details.discount}</Text> :
                        <></>
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    price: {
        color: "green",
        fontWeight: "600",
        fontSize: 15
    }
})