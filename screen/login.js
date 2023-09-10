import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getServerURL } from '../utilities/data';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login({ setLoggedIn, setRole }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [errorText, setErrorText] = useState("")


    // Function for user validation
    const handleLogin = () => {
        if (email === "") {
            setErrorText("Email Required")
        } else if (password === "") {
            setErrorText("Password Required")
        } else {
            let url = getServerURL() + "/api/users/login/"
            axios.post(url, {
                email,
                password
            }).then(async (response) => {
                if (response.err === undefined || response.err === null) {
                    await AsyncStorage.setItem("userToken", response.data.token)
                    setRole(response.data.role)
                    setLoggedIn(true)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }}
                onPress={() => {
                    setShowPassword(!showPassword)
                }}
            >
                {
                    (showPassword) ? <Text>Hide Password</Text> : <Text>Show Password</Text>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <View>
                {
                    (errorText !== "") ? <></> : <Text style={{ color: "red" }}>{errorText}</Text>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: "80%"
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
})