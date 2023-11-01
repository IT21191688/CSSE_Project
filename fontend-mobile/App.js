const Stack = createNativeStackNavigator();
import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";

import DashBoard from "./screens/DashBoard";
import SuppliyerHome from "./screens/SuppliyerHome";



import UserHomePage from "./screens/UserHomePage";
//import AdminHomePage from "./screens/AdminHomePage";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import GoogleSignInScreen from "./components/GoogleSignInScreen";
import GoogleSignInWebView from "./components/GoogleSignInWebView";
import InvoiceCreatePage from "./screens/InvoiceCreatePage";
import InvoiceForm from "./screens/InvoiceForm";


const App = () => {



  const [isLoaded, setIsLoaded] = useState(false);


  const [showSplashScreens, setShowSplashScreens] = useState(true);

  useEffect(() => {
    async function checkAppOpened() {
      try {
        const hasAppOpenedBefore = await AsyncStorage.getItem('appOpenedBefore');
        if (hasAppOpenedBefore) {
          setShowSplashScreens(false);
        } else {
          await AsyncStorage.setItem('appOpenedBefore', 'true');
        }
      } catch (error) {
        console.error('Error checking app open status:', error);
      }
    }

    checkAppOpened();
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  const [token, setToken] = useState(null); // Initialize the token state

  // Check if the token is already stored in AsyncStorage when the app starts
  useEffect(() => {
    const getTokenFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
      }
    };

    getTokenFromStorage();
  }, []);


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={showSplashScreens ? 'SplashScreenAppointments' : 'Login'}
          screenOptions={{ headerShown: false }}
        >


          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GoogleSignInScreen"
            component={GoogleSignInScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GoogleSignInWebView"
            component={GoogleSignInWebView}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SuppliyerHome"
            component={SuppliyerHome}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="InvoiceCreatePage"
            component={InvoiceCreatePage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="InvoiceForm"
            component={InvoiceForm}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="UserHomePage"
            component={UserHomePage}
            options={{ headerShown: false }}
          />





        </Stack.Navigator>
      </NavigationContainer>
      { /*
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            // initialRouteName="SplashScreenJobs"
            screenOptions={{ headerShown: false }}
          >



     <Stack.Screen
            name="AdminHomePage"
            component={AdminHomePage}
            options={{ headerShown: false }}
          />


            <Stack.Screen
              name="AppointmentView"
              component={AppointmentView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Appointments"
              component={Appointments}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="AddAppointments"
              component={AddAppointments}
              options={{ headerShown: false }}
            />









            <Stack.Screen
              name="CreateNews"
              component={CreateNews}
              options={{ headerShown: false }}
            />

       

            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="SplashScreenAppointments"
              component={SplashScreenAppointments}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SplashScreenCertificates"
              component={SplashScreenCertificates}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SplashScreenJobs"
              component={SplashScreenJobs}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="AdminNews"
              component={AdminNews}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Sample"
              component={Sample}
              options={{ headerShown: false }}
            />


          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
      */}
    </>
  );
};
export default App;
