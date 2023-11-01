import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const SeniorManagementAppointmentCon2 = () => {
  return (
    <View style={styles.groupParent}>
      <View style={styles.spotigyWrapper}>
        <Image
          style={styles.spotigyWrapper}
          contentFit="cover"
          source={require("../assets/spotigy1.png")}
        />
      </View>
      <View
        style={[styles.seniorManagementAppointmentParent, styles.seniorLayout]}
      >
        <Text
          style={[styles.seniorManagementAppointment, styles.spotifyPosition]}
        >
          Senior management appointment
        </Text>
        <Text style={[styles.spotify, styles.spotifyPosition]}>Spotify</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seniorLayout: {
    width: 259,
    top: 0,
  },
  spotifyPosition: {
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  spotigyWrapper: {
    width: 64,
    left: 0,
    top: 0,
    height: 64,
    position: "absolute",
  },
  seniorManagementAppointment: {
    fontSize: FontSize.medium14_size,
    letterSpacing: -0.1,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: FontFamily.semibold14,
    color: Color.colorBlack,
    display: "flex",
    alignItems: "center",
    height: 38,
    width: 259,
    top: 12,
  },
  spotify: {
    top: 31,
    fontSize: FontSize.medium13_size,
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
    color: Color.colorDarkgray_200,
    width: 153,
    height: 16,
  },
  seniorManagementAppointmentParent: {
    left: 73,
    height: 47,
    position: "absolute",
    width: 259,
  },
  groupParent: {
    top: 104,
    left: 21,
    width: 332,
    height: 64,
    position: "absolute",
  },
});

export default SeniorManagementAppointmentCon2;
