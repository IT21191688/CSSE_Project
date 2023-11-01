import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontSize, Border, FontFamily, Color } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const JobTitle = ({
  typeOfJob,
  writeTheTitleOfYourPostHe,
  jobTitlePosition,
  jobTitleMarginTop,
  jobTitleMarginLeft,
  jobTitleTop,
  jobTitleLeft,
  jobTitleWidth,
  jobTitleHeight,
}) => {
  const jobTitleStyle = useMemo(() => {
    return {
      ...getStyleValue("position", jobTitlePosition),
      ...getStyleValue("marginTop", jobTitleMarginTop),
      ...getStyleValue("marginLeft", jobTitleMarginLeft),
      ...getStyleValue("top", jobTitleTop),
      ...getStyleValue("left", jobTitleLeft),
      ...getStyleValue("width", jobTitleWidth),
      ...getStyleValue("height", jobTitleHeight),
    };
  }, [
    jobTitlePosition,
    jobTitleMarginTop,
    jobTitleMarginLeft,
    jobTitleTop,
    jobTitleLeft,
    jobTitleWidth,
    jobTitleHeight,
  ]);

  return (
    <View style={[styles.jobTitle, jobTitleStyle]}>
      <Image
        style={styles.jobTitleChild}
        contentFit="cover"
        source={require("../assets/rectangle-591.png")}
      />
      <Text style={[styles.typeOfJob, styles.typeOfJobTypo]}>{typeOfJob}</Text>
      <Text style={[styles.writeTheTitle, styles.typeOfJobTypo]}>
        {writeTheTitleOfYourPostHe}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typeOfJobTypo: {
    textAlign: "left",
    fontSize: FontSize.textXsRegular_size,
    position: "absolute",
  },
  jobTitleChild: {
    height: "248.48%",
    width: "119%",
    top: "-48.48%",
    right: "-18.51%",
    bottom: "-100%",
    left: "-17%",
    borderRadius: Border.br_3xs,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  typeOfJob: {
    top: "-10%",
    left: "-8%",
    fontWeight: "600",
    fontFamily: FontFamily.openSansSemiBold,
    color: Color.colorMidnightblue_100,
  },
  writeTheTitle: {
    width: "89.85%",
    top: "58%",
    left: "-2%",
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorDarkgray_100,
  },
  jobTitle: {
    width: 335,
    height: 66,
  },
});

export default JobTitle;
