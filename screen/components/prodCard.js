import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


let sHeight = Dimensions.get('window').height;
let sWidth = Dimensions.get('window').width;

export default function ProdCard({ details, addCart, removeCart, isInCart }) {

    return (
        <View style={styles.mainCard}>
            <Image source={{ uri: details.img }} style={styles.prodImg} resizeMode='contain' />
            <View style={styles.prodDets}>
                <Text style={styles.prodName}>{details.name}</Text>


                <Text style={styles.price}>Price: {details.price}</Text>

                {
                    (Number(details.isOnSale) > new Date()) ?
                        <Text style={styles.price}>Discounted Price: {details.price - details.discount}</Text> : <></>
                }




                {
                    (Number(details.isOnSale) > new Date()) ? <View style={{ width: sWidth * 0.42, alignItems: "center", marginTop: 10 }}>
                        <Text style={{ width: sWidth * 0.25, color: "yellow", textAlign: "center", backgroundColor: "blue" }}>On Sale</Text>
                    </View> : <></>
                }


                <View style={styles.divider}></View>

                <TouchableOpacity
                    style={styles.cart}
                    onPress={() => {
                        console.log(isInCart)
                        if (isInCart) {
                            removeCart(details._id)
                        } else {
                            addCart(details._id)
                        }

                    }}
                >
                    {
                        (isInCart) ?
                            <><Text style={{ color: "black", fontWeight: "400" }}>Remove from Cart</Text></> :
                            <><Text style={{ color: "black", fontWeight: "400" }}>Add to Cart</Text>
                                <Image style={{ height: 20, resizeMode: "contain" }} source={require("../../assets/images/shopping-cart.png")} /></>
                    }

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCard: {
        width: sWidth * 0.42,
        backgroundColor: "white",
        borderRadius: 20,
        height: "auto",
        alignItems: "center",
        marginTop: sHeight * 0.02,
        marginBottom: sHeight * 0.02
    },
    prodImg: {
        width: sWidth * 0.42,
        aspectRatio: 1,
        // backgroundColor: "",
        maxWidth: sWidth * 0.42
    },
    prodDets: {
        width: sWidth * 0.38
    },
    prodName: {
        color: "black",
        fontWeight: "bold",
        fontFamily: "RobotoSlab-Bold"
    },
    rupee: {
        height: 15,
        aspectRatio: 1,
        resizeMode: "contain"
    },
    price: {
        color: "green",
        fontWeight: "700"
    },
    divider: {
        width: sWidth * 0.30,
        borderBottomColor: "#DBF0F8",
        borderBottomWidth: 1,
        marginLeft: sWidth * 0.06,
        marginTop: 15,
        marginBottom: 15
    },
    cart: {
        width: sWidth * 0.42,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 15
    }
})