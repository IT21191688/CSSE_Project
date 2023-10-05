import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AdminHome from './src/screens/AdminHome';
import UserHome from './src/screens/UserHome';
import MainScreen from './src/screens/MainScreen';
import { useNavigation } from '@react-navigation/native';

function App() {
  const Stack = createNativeStackNavigator();
  const [isLoaded, setIsLoaded] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const retrieveUserRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        setRole(storedRole);
      } catch (error) {
        console.error('Error retrieving user role:', error);
      }
    };

    retrieveUserRole();
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoaded ? (role === 'admin' ? 'AdminHome' : 'UserHome') : 'LoginScreen'}>

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="UserHome" component={UserHome} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <MainScreen />
      )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
