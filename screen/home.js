import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import BottomNav from './components/bottomNav';
import ProdCard from './components/prodCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getServerURL } from '../utilities/data';
import CartModal from './modals/cartModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


let sHeight = Dimensions.get('window').height;
let sWidth = Dimensions.get('window').width;


export default function Home() {

    const [products, setProducts] = useState([]);
    const [navOpt, setNavOpt] = useState("home");
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [cartDets, setCartDets] = useState([])
    const [viewCart, setViewCart] = useState(false)
    useEffect(() => {
        fetchProducts()
    }, [viewCart])


    async function addCart(id) {
        let newCart = [...cart]
        newCart.push(id)
        const url = getServerURL() + "/api/users/addCart"
        const header = {
            token: await AsyncStorage.getItem("userToken")
        }

        axios.post(url, { prodId: id }, {
            headers: header
        }).then((response) => {
            // console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
        setCart(newCart)
    }

    async function removeCart(id) {
        let oldCart = [...cart]
        let newCart = oldCart.filter(item => item !== id)
        const url = getServerURL() + "/api/users/deleteCart"
        const header = {
            token: await AsyncStorage.getItem("userToken")
        }

        axios.post(url, { prodId: id }, {
            headers: header
        }).then((response) => {
            // console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
        setCart(newCart)
    }

    function navBtnClick(option) {
        if (option != navOpt) {
            setNavOpt(option)
        }
    }

    async function fetchProducts() {
        let url = getServerURL() + "/api/products/"
        let headers = {
            token: await AsyncStorage.getItem("userToken")
        }
        const products = await axios.get(url, { headers })
        setProducts(products.data)

        url = getServerURL() + "/api/users/cart"
        const userCart = await axios.get(url, { headers })
        setCart(userCart.data)

        url = getServerURL() + "/api/order/"
        const userOrders = await axios.get(url, { headers })
        setOrders(userOrders.data.orders)
    }

    function displayProducts() {
        let leftCol = []
        let rightCol = []
        if (products != undefined && products != null && products.length >= 0) {
            for (let i = 0; i < products.length; i++) {


                let isInCart = (cart.indexOf(products[i]._id) !== -1)
                if (i % 2 == 0) {
                    leftCol.push(
                        <ProdCard
                            key={i}
                            details={products[i]}
                            addCart={addCart}
                            removeCart={removeCart}
                            isInCart={isInCart}
                        />)
                } else {
                    rightCol.push(
                        <ProdCard
                            key={i}
                            details={products[i]}
                            addCart={addCart}
                            removeCart={removeCart}
                            isInCart={isInCart}
                        />)
                }
            }
            return <View style={{ flexDirection: "row" }}>
                <View style={styles.leftCol}>{leftCol}</View>
                <View style={styles.leftCol}>{rightCol}</View>
            </View>
        }
        return <ProdCard />


    }

    function displayOrders() {

        var userOrders = []
        console.log(orders)
        for (var i = 0; i < orders.length; i++) {
            userOrders.push(<View key={i} style={styles.orderCard}>
                <Text style={{ color: "black" }}>{orders[i].datetime}</Text>
                <Text style={{ color: "green", fontWeight: "600" }}>Amount: {orders[i].totalAmount}</Text>
            </View>)
        }
        console.log(userOrders)
        return userOrders
    }

    return (
        <View>
            <View style={{ height: sHeight * 0.08, backgroundColor: "#DBF0F8" }}>
                <View style={{ width: sWidth * 0.9, height: sHeight * 0.08, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}
                        onPress={() => {
                            const newCartDets = products.filter(product => cart.includes(product._id))
                            setCartDets(newCartDets)
                            setViewCart(true)
                        }}
                    >
                        <Image style={{ height: sHeight * 0.04, resizeMode: "contain" }} source={require("../assets/images/cart.png")} />
                        <View style={{ backgroundColor: "red", height: sHeight * 0.03, width: sHeight * 0.03, alignItems: "center", justifyContent: "center", borderRadius: sHeight * 0.03 }}>
                            <Text style={{ color: "white" }}>{cart.length}</Text>
                        </View>

                    </TouchableOpacity>

                    <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}> Nomatic</Text>
                    <Image style={{ height: sHeight * 0.04, resizeMode: "contain", borderRadius: sHeight * 0.02 }} source={{ uri: "https://img.freepik.com/premium-vector/symbol-male-user-icon-circle-profile-icon-vector-illustration_276184-154.jpg?w=2000" }} />
                </View>
            </View>

            <ScrollView style={styles.content}>
                {
                    (navOpt === "home") ? displayProducts() : displayOrders()

                }
            </ScrollView>

            <BottomNav navBtnClick={navBtnClick} navOpt={navOpt}></BottomNav>

            <Modal
                animationType='slide'
                visible={viewCart}
            >
                <CartModal cart={cartDets} setViewCart={setViewCart} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        height: sHeight * 0.82,
        width: sWidth,
        backgroundColor: "#DBF0F8",

    },
    leftCol: {
        width: sWidth * 0.5,
        flexDirection: "column",
        alignItems: "center",
    },
    rightCol: {
        width: sWidth * 0.5,
        flexDirection: "column",
        alignItems: "center",
    },
    orderCard: {
        flexDirection: "column",
        marginTop: sHeight * 0.025,
        backgroundColor: "white",
        width: "90%",
        marginLeft: "5%",
        padding: 10,
        borderRadius: 8,
    }

})