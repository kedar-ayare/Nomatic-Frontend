import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from '@react-native-community/blur';
import ProdCompact from '../components/prodCompact';
import { getServerURL } from '../../utilities/data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


let sHeight = Dimensions.get('window').height;
let sWidth = Dimensions.get('window').width;
export default function CartModal({ cart, setViewCart }) {

    const [orderMsg, setOrderMsg] = useState("");

    // Function to display cart items in list form using "ProdCompact" component
    function displayCart() {
        var prods = []
        for (var i = 0; i < cart.length; i += 1) {
            prods.push(
                <ProdCompact key={i} details={cart[i]} />
            );
        }
        return <ScrollView>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
                {prods}
            </View>

        </ScrollView>
    }

    // Function to handle "Confirm Order" btn click
    async function placeOrder() {
        const prices = cart.map(prod => {
            if (Number(prod.isOnSale) > new Date()) {
                return prod.price - prod.discount
            }
            return prod.price
        })
        const prodsIds = cart.map(prod => prod._id)
        let url = getServerURL() + "/api/order/"
        await axios.post(
            url,
            {
                prodsIds,
                prices
            },
            {
                headers: {
                    "token": await AsyncStorage.getItem("userToken")
                }
            }
        ).then((response) => {
            if (response.data.msg === "Confirmed") {
                setOrderMsg("Order Confirmed. Press above arrow for home page.")
            }
        })
    }

    return (
        <BlurView>
            <View style={{ height: sHeight, width: sWidth, alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: sWidth * 0.85, height: sHeight * 0.85, backgroundColor: "white", borderRadius: 10 }}>
                    {/* If cart empty - Show respective message. */}
                    {/* If cart has items - display items in list form */}
                    {
                        (cart.length == 0) ?
                            <View style={{ marginTop: sHeight * 0.15 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setViewCart(false)
                                    }}
                                    style={{ height: sHeight * 0.1, marginTop: sHeight * 0.025 }}
                                >
                                    <Image source={require("../../assets/images/arrow.png")} style={{ height: sHeight * 0.04, resizeMode: "contain" }}></Image>
                                </TouchableOpacity>
                                <Text style={{ color: "black", fontWeight: "600", textAlign: "center", fontSize: 20 }}>No Items in Cart</Text>
                            </View> :
                            <View>

                                {/* Back Button */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setViewCart(false)
                                    }}
                                    style={{ height: sHeight * 0.1, marginTop: sHeight * 0.025 }}
                                >
                                    <Image source={require("../../assets/images/arrow.png")} style={{ height: sHeight * 0.04, resizeMode: "contain" }}></Image>
                                </TouchableOpacity>

                                {/* List of Cart Items */}
                                {
                                    displayCart()
                                }




                                {/* Confirm Order Button */}
                                <TouchableOpacity
                                    disabled={(orderMsg !== "")}
                                    style={{ backgroundColor: "#228c22", width: "80%", marginLeft: "10%", height: sHeight * 0.06, justifyContent: "center", alignItems: "center" }}
                                    onPress={() => {
                                        placeOrder()
                                    }}
                                >
                                    <Text style={{ color: "white", fontWeight: "800" }}>Confirm Order</Text>
                                </TouchableOpacity>


                                <Text style={{ color: "green", textAlign: "center", fontSize: 15, marginTop: sHeight * 0.05, fontWeight: "600" }}>{orderMsg}</Text>
                            </View>
                    }
                </View>
            </View>
        </BlurView>

    )
}

const styles = StyleSheet.create({
})
