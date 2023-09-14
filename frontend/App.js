
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useState } from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import MainScreen from './src/screens/MainScreen';



function App() {


  const [isLoaded, setIsLoaded] = useState(false)


  setTimeout(() => {

    setIsLoaded(true)


  }, 2000)

  return (

    <View style={styles.container}>
      {isLoaded ? (
        <AppNavigator />
      ) : (
        <MainScreen />
      )}
    </View>



  );

}

const styles = StyleSheet.create({


  container: {

    flex: 1,
    backgroundColor: "#fff",

  }

});

export default App;