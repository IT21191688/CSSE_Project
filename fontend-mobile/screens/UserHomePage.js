import * as React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Pressable, FlatList } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');


const UserHomePage = () => {

    const navigation = useNavigation();
    const handleNavigate = () => {
        navigation.navigate("CertificateList"); // Replace "OtherScreen" with the name of the screen you want to navigate to
    };

    const handleAppoinmentView = () => {
        navigation.navigate('Appointments')
    };

    const handleJobSView = () => {
        //navigation.navigate('Appointments')
    };
    const handleNewsView = () => {
        //navigation.navigate('Appointments')
    };
    const handleCetificateView = () => {
        navigation.navigate('CertificateList')
    };


    return (
        <View style={styles.myNews}>
            {/* Rectangle */}
            <Image
                style={[styles.myNewsChild, styles.searchPosition]}
                contentFit="cover"
                source={require("../assets/rectangle-5.png")}
            />

            <View style={styles.AppoinmentTextAndProfile}>
                <Image
                    style={styles.ellipseIcon}
                    contentFit="cover"
                    source={require("../assets/ellipse.png")}
                />
                <View style={styles.headlineParent}>
                    <TouchableOpacity>
                        <Text style={[styles.headline1, styles.headlineFlexBox]} >
                            User Home
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>



            {/*profile*/}

            <View style={styles.header}>

                <View >
                    <Image
                        style={styles.filterIcon}
                        contentFit="cover"
                        source={require("../assets/filter.png")}
                    />
                </View>
                <View style={[styles.search, styles.headerLayout]}>
                    <Image
                        style={styles.searchChild}
                        contentFit="cover"
                        source={require("../assets/rectangle-3.png")}
                    />
                    <Image
                        style={styles.iconSearch}
                        contentFit="cover"
                        source={require("../assets/icon-search.png")}
                    />
                    <TextInput
                        // Handle search on text input change
                        //value={searchQuery}
                        style={[styles.search1]}
                        placeholder="Search"
                        placeholderTextColor="rgba(13, 1, 64, 0.6)"
                    />
                </View>
            </View>
            {/* Header */}

            <View style={styles.grid}>
                <TouchableOpacity style={styles.gridItem} onPress={handleJobSView}>
                    <Text style={styles.text}>Jobs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridItem} onPress={handleNewsView}>
                    <Text style={styles.text}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridItem} onPress={handleAppoinmentView}>
                    <Text style={styles.text}>Appoinments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridItem} onPress={handleCetificateView}>
                    <Text style={styles.text}>Cetificates</Text>
                </TouchableOpacity>
            </View>




        </View>
    );
};


const styles = StyleSheet.create({
    scrollableSectionScrollViewContent: {
        flexDirection: "column",
        paddingBottom: 100, // Updated paddingBottom for responsiveness
        alignItems: "center",
        justifyContent: "flex-start",
    },
    frameScrollViewContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    scrollableSectionPosition: {
        left: "50%",
        top: "50%",
        position: "absolute",
    },
    searchPosition: {
        left: 0,
        top: 0,
    },
    headlineFlexBox: {
        display: "flex",
        color: Color.pureWhite,
        alignItems: "center",
        textAlign: "left",
        width: "100%", // Updated width for responsiveness
        left: 0,
        position: "absolute",
    },
    headerLayout: {
        height: 40,
        position: "absolute",
    },
    type8Typo: {
        fontWeight: "500",
        lineHeight: 21,
        letterSpacing: -0.1,
        fontSize: FontSize.medium14_size,
    },
    scrollableSection: {
        marginTop: -100, // Updated marginTop for responsiveness
        marginLeft: -50, // Updated marginLeft for responsiveness
        width: "100%", // Updated width for responsiveness
        flex: 1,
        height: "100%",
    },
    menuBarIcon: {
        bottom: -100, // Updated bottom for responsiveness
        left: -50, // Updated left for responsiveness
        width: "100%", // Updated width for responsiveness
        height: 100, // Updated height for responsiveness
        position: "absolute",
    },
    myNewsChild: {
        width: "100%",
        height: 221,
        position: "absolute",
    },
    ellipseIcon: {
        left: "80%", // Updated left for responsiveness
        width: 54,
        height: 54,
        top: 55,
        position: "absolute",
    },
    headline: {
        alignItems: "center",
        fontWeight: "500",
        lineHeight: 21,
        letterSpacing: -0.1,
        fontSize: FontSize.medium14_size,
        top: 0,
        display: "flex",
        color: Color.pureWhite,
    },
    headline1: {
        top: 22,
        fontSize: FontSize.bold22_size,
        letterSpacing: -0.3,
        lineHeight: 26,
        fontWeight: "700",
        alignItems: "center",
    },
    headlineParent: {
        height: 48,
        width: "100%", // Updated width for responsiveness
        left: 40,
        top: 45,
        position: "absolute",
    },
    filterIcon: {
        top: -110, // Updated top for responsiveness
        // Updated left for responsiveness
        width: 300,
        left: 170, // Updated width for responsiveness
        height: 300, // Updated height for responsiveness
        position: "absolute",

    },
    searchChild: {
        top: -50, // Updated top for responsiveness
        left: -50, // Updated left for responsiveness
        borderRadius: Border.br_3xs,
        width: "100%", // Updated width for responsiveness
        height: 164,
        position: "absolute",
    },
    iconSearch: {
        top: 17,
        left: -20,
        width: 24,
        height: 24,
        position: "absolute",
    },
    search1: {
        top: 15,
        left: 20,
        textAlign: "left",
        position: "absolute",
        height: 30,
        width: 200
    },
    search: {
        width: "90%", // Updated width for responsiveness
        left: 45,
        top: 28,
    },
    header: {
        top: 100, // Updated top for responsiveness
        width: "100%", // Updated width for responsiveness
        left: 0,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'

    },
    type8: {
        color: Color.colorDarkgray_200,
        textAlign: "left",
    },
    type8Wrapper: {
        borderRadius: Border.br_78xl,
        borderStyle: "solid",
        borderColor: Color.colorDarkgray_200,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: Padding.p_xl,
        paddingVertical: Padding.p_5xs,
        marginLeft: 10,
        alignItems: "center",
    },
    component32Parent: {
        marginTop: -206,
        marginLeft: -189,
        width: "100%",
    },
    myNews: {
        backgroundColor: Color.colorWhitesmoke,
        height: "100%", // Updated height for responsiveness
        width: "100%",
        flex: 1,
    },
    AppoinmentTextAndProfileRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    AppoinmentTextAndProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newAppointment: {
        width: 320,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 97,
        backgroundColor: "#D1E1FE",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        position: "absolute",
        bottom: 450, // Adjust the bottom position as needed
        alignSelf: "center", // Center it horizontally
        zIndex: 1, // Ensure it's above other elements
    },
    buttonTextAdd: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
        flex: 1,
    },
    buttonContainer: {
        borderRadius: 97,
        backgroundColor: '#130160',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    }, container: {
        width: 160,
        height: 180,
        flexShrink: 0,
        borderRadius: 25,
        backgroundColor: '#130160',

    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 200,
        padding: 20
    },
    gridItem: {
        width: '48%', // Adjust as needed for spacing
        height: 200,
        marginVertical: 10,
        padding: 20,
        backgroundColor: '#130160',
        borderRadius: 10,
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18, // Adjust line height as needed
    },


});


export default UserHomePage;
