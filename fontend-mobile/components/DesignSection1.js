import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontSize, FontFamily, Padding, Border, Color } from "../GlobalStyles";

const DesignSection1 = () => {
  return (
    <View style={styles.scrollableSectionInner}>
      <View style={styles.rectangleParent}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/rectangle-594.png")}
        />
        <View style={styles.frameParent}>
          <View style={[styles.generalNewsParent, styles.groupParentFlexBox]}>
            <Text style={[styles.generalNews, styles.daysAgoTypo]}>
              GENERAL NEWS
            </Text>
            <Text style={[styles.daysAgo, styles.daysAgoTypo]}>2 days ago</Text>
          </View>
          <View style={styles.exploringTheArtAndScienceParent}>
            <Text style={styles.exploringTheArt}>
              Exploring the Art and Science of Design
            </Text>
            <View style={[styles.frameGroup, styles.groupParentFlexBox]}>
              <View style={[styles.groupParent, styles.groupParentFlexBox]}>
                <View style={styles.ellipseParent}>
                  <Image
                    style={styles.groupChild}
                    contentFit="cover"
                    source={require("../assets/ellipse-11.png")}
                  />
                </View>
                <Text style={styles.cnnNews}>CNN News</Text>
              </View>
              <View style={styles.frameContainer}>
                <Pressable
                  style={[
                    styles.xnixlinepencilWrapper,
                    styles.wrapperShadowBox,
                  ]}
                >
                  <Image
                    style={styles.xnixlinepencilIcon}
                    contentFit="cover"
                    source={require("../assets/xnixlinepencil.png")}
                  />
                </Pressable>
                <Pressable
                  style={[
                    styles.xnixlinetrash2Wrapper,
                    styles.wrapperShadowBox,
                  ]}
                >
                  <Image
                    style={styles.xnixlinetrash2Icon}
                    contentFit="cover"
                    source={require("../assets/xnixlinetrash-21.png")}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  daysAgoTypo: {
    textAlign: "center",
    fontSize: FontSize.textXsRegular_size,
    fontFamily: FontFamily.textXsRegular,
    lineHeight: 18,
  },
  wrapperShadowBox: {
    elevation: 10,
    shadowRadius: 10,
    shadowColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 40,
    height: 28,
    top: 0,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 1,
    shadowOffset: {
      width: 30.30687713623047,
      height: 30.30687713623047,
    },
  },
  frameChild: {
    borderRadius: Border.br_lg,
    maxHeight: "100%",
    width: 326,
    flex: 1,
  },
  generalNews: {
    color: Color.colorTomato,
  },
  daysAgo: {
    color: Color.colorDarkgray_100,
  },
  generalNewsParent: {
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  exploringTheArt: {
    fontSize: FontSize.displayXsMedium_size,
    lineHeight: 32,
    fontWeight: "500",
    fontFamily: FontFamily.displayXsMedium,
    color: Color.colorBlack,
    textAlign: "left",
    alignSelf: "stretch",
  },
  groupChild: {
    left: 0,
    top: 0,
    position: "absolute",
    height: 23,
    width: 23,
  },
  cnn: {
    top: 5,
    left: 1,
    fontSize: FontSize.size_3xs,
    letterSpacing: -0.9,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.archivoExtraBoldItalic,
    color: Color.pureWhite,
    width: 20,
    height: 13,
    position: "absolute",
    textAlign: "center",
  },
  ellipseParent: {
    height: 23,
    width: 23,
  },
  cnnNews: {
    fontSize: FontSize.size_4xs,
    color: Color.gray900,
    marginLeft: 8,
    textAlign: "left",
    fontFamily: FontFamily.textXsRegular,
    lineHeight: 18,
    flex: 1,
  },
  groupParent: {
    flex: 1,
  },
  xnixlinepencilIcon: {
    width: 24,
    height: 24,
  },
  xnixlinepencilWrapper: {
    backgroundColor: Color.colorRoyalblue,
    width: 28,
    left: 0,
  },
  xnixlinetrash2Icon: {
    height: 31,
    width: 29,
  },
  xnixlinetrash2Wrapper: {
    left: 39,
    backgroundColor: Color.colorRed,
    width: 29,
  },
  frameContainer: {
    width: 68,
    marginLeft: 11,
    height: 28,
  },
  frameGroup: {
    marginTop: 4,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  exploringTheArtAndScienceParent: {
    alignSelf: "stretch",
    marginTop: 8,
    justifyContent: "center",
  },
  frameParent: {
    marginTop: 8,
    width: 326,
  },
  rectangleParent: {
    flex: 1,
    width: 380,
    marginLeft: 53
  },
  scrollableSectionInner: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.pureWhite,
    shadowColor: "rgba(52, 64, 84, 0.08)",
    shadowRadius: 60.61,
    elevation: 60.61,
    width: 380,
    height: 300,
    overflow: "hidden",
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_xs,
    paddingBottom: Padding.p_base,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 1,
    shadowOffset: {
      width: 30.30687713623047,
      height: 30.30687713623047,
    },
    marginBottom: 15
  },
});

export default DesignSection1;
