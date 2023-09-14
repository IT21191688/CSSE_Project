import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";


import logo from '../assets/todoLogo.png'


const MainPage = () => {

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Image source={logo} style={styles.innerImg} />
                <Text style={styles.innerText}>Login App</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {

        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FF5757',
        alignItems: "center",
        justifyContent: 'center'



    },
    inner: {


        width: 100,
        height: 100,
        backgroundColor: 'inherit'


    },

    innerImg: {
        width: 100,
        height: 100,
        alignItems: "center"
    },

    innerText: {
        alignItems: 'center',
        fontWeight: '800',
        fontSize: 20

    }




})

export default MainPage