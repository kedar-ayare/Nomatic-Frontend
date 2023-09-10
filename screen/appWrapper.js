import React from 'react';
import Login from './login';
import Home from './home';
import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Admin from './admin';


function AppWrapper() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState("")

    return (
        <>
            {
                (!isLoggedIn) ?
                    <Login setLoggedIn={setLoggedIn} setRole={setRole} /> :
                    (role == "admin") ?
                        <Admin /> :
                        <Home />
            }
        </>
    )
}

export default AppWrapper;
