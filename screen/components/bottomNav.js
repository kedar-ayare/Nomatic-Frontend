import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'


let sHeight = Dimensions.get('window').height;
let sWidth = Dimensions.get('window').width;


export default function BottomNav({ navBtnClick, navOpt }) {
    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity
                style={[
                    styles.navBtn,
                    navOpt === "home" && styles.selectedBtn
                ]}
                onPress={() => {
                    navBtnClick("home")
                }}
            >
                <Image source={require("../../assets/images/home.png")} style={styles.navImg}></Image>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.navBtn,
                    navOpt === "orders" && styles.selectedBtn
                ]}
                onPress={() => {
                    navBtnClick("orders")
                }}
            >
                <Image source={require("../../assets/images/history.png")} style={styles.navImg}></Image>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNav: {
        height: sHeight * 0.1,
        width: sWidth,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row"
    },
    navBtn: {
        width: sWidth * 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    navImg: {
        height: sHeight * 0.035,
        aspectRatio: 1,
    },
    selectedBtn: {
        backgroundColor: "#F7F6F6"
    }
})