import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, StyleSheet, TouchableHighlight, Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
//import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';



import CustomGoogleSignInButton from '../components/GoogleSignInScreen';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*
  GoogleSignin.configure({
    webClientId: '432850780027-f353h5r1s8t0r27drfpjtci3sb9a9qdc.apps.googleusercontent.com',
  });

  */

  const handleSignUpPress = () => {


    //navigation.navigate("SignUp")
    navigation.navigate("DashBoard")
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.43.93:8080/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);

        // Handle success, e.g., navigate to the next screen
        navigation.navigate("DashBoard");


      }
    } catch (error) {
      console.error('Login error:', error);

      // Handle login error, e.g., show an error message to the user
    }
  };

  /*
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Use userInfo to get user information if needed
      console.log('Google Sign-In Success', userInfo);

      // Handle successful authentication, e.g., navigate to the next screen
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User canceled the Google Sign-In window
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Google Sign-In is already in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play Services not available on the device
      } else {
        // Handle other sign-in errors
        console.log('Google Sign-In Error', error);
      }
    }
  };
  */

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        {/* Email */}
        <View style={styles.inputField}>
          <Icon name="envelope" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter your Email"
          />
        </View>

        {/* Password */}
        <View style={styles.inputField}>
          <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Enter your Password"
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View>
        <Text style={styles.title}>Google Sign-In</Text>
        <Button title="Sign in with Google" />
      </View>

      <TouchableHighlight
        underlayColor="transparent" // You can customize the underlay color
        onPress={handleSignUpPress}
      >
        <Text style={styles.youDontHaveContainer}>
          <Text style={styles.text}>
            You don't have an account yet?{' '}
            <Text style={styles.signUp}>Sign up</Text>
          </Text>
        </Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 100
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 300,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  // Add more styles as needed

  youDontHaveContainer: {
    backgroundColor: 'transparent', // Customize the background color as needed
    padding: 10, // Add padding if desired
    borderRadius: 5, // Add border radius if desired
  },
  text: {
    fontSize: 17,
    color: 'blue', // Customize the text color
    // Add more text styles as needed
  },
  signUp: {
    fontWeight: 'bold', // Customize font weight if desired
    textDecorationLine: 'underline', // Add underline styling
    color: 'green', // Customize the sign-up text color
    // Add more text styles as needed
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleSignInButton: {
    width: 200, // Customize the width as needed
    height: 50, // Customize the height as needed
    // Add more custom styles as needed
  },
});

export default Login;
