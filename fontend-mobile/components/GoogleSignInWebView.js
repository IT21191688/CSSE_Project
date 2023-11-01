import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const GoogleSignInWebView = ({ route, navigation }) => {
  const { authUrl } = route.params;
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: authUrl }}
        javaScriptEnabled={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
        }}
        onMessage={(event) => {
          // Handle messages from the WebView (e.g., extract the access token)
          const message = event.nativeEvent.data;

          // Check if the message contains the access token
          if (message.includes('access_token=')) {
            // Extract the access token (you may need to parse the URL)
            const accessToken = message.split('access_token=')[1];

            // Store the access token and perform further actions (e.g., navigate to the next screen)
            console.log('Access Token:', accessToken);

            // Close the WebView and navigate to the next screen
            navigation.goBack();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GoogleSignInWebView;
