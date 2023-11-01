import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Property1Primary from "./Property1Primary";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const SectionUploadForm = () => {
  return (
    <View style={styles.groupParent}>
      <View style={[styles.rectangleParent, styles.groupChildPosition]}>
        <View style={[styles.groupChild, styles.groupChildPosition]} />
        <Text style={[styles.uploadNewsBanner, styles.bannerPosition]}>
          Upload news banner
        </Text>
        <Property1Primary
          next="Upload"
          property1PrimaryPosition="absolute"
          property1PrimaryBorderRadius={5}
          property1PrimaryBackgroundColor="#130160"
          property1PrimaryMarginTop={-3.5}
          property1PrimaryMarginLeft={-83.21}
          property1PrimaryTop="50%"
          property1PrimaryLeft="50%"
          property1PrimaryHeight={37}
        />
      </View>
      <Text style={[styles.banner, styles.bannerPosition]}>Banner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    height: 107,
    width: 338,
    left: "50%",
    top: "50%",
    marginLeft: -169,
    position: "absolute",
  },
  bannerPosition: {
    lineHeight: 21,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  groupChild: {
    marginTop: -53.5,
    borderRadius: Border.br_5xl,
    borderStyle: "dashed",
    borderColor: Color.colorSteelblue,
    borderWidth: 1,
  },
  uploadNewsBanner: {
    marginTop: -31.24,
    marginLeft: -114.22,
    fontSize: FontSize.medium13_size,
    letterSpacing: -0.1,
    fontWeight: "500",
    fontFamily: FontFamily.medium14,
    color: Color.colorDarkgray_200,
    textAlign: "center",
    width: 218,
    height: 33,
  },
  rectangleParent: {
    marginTop: -38.5,
  },
  banner: {
    marginTop: -68.5,
    marginLeft: -165.9,
    fontSize: FontSize.semibold16_size,
    letterSpacing: -0.2,
    fontWeight: "600",
    fontFamily: FontFamily.semibold16,
    color: Color.black,
    textAlign: "left",
    width: 117,
    height: 26,
  },
  groupParent: {
    marginTop: 142.5,
    height: 137,
    width: 338,
    left: "55%",
    top: "50%",
    marginLeft: -169,
    position: "absolute",
  },
});

export default SectionUploadForm;
