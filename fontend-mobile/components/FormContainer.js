import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import JobTitle from "./JobTitle";

const FormContainer = () => {
  return (
    <View style={[styles.jobTitleParent, styles.jobTitleParentPosition]}>
      <JobTitle
        typeOfJob="Category"
        writeTheTitleOfYourPostHe="Select the news category"
        jobTitlePosition="absolute"
        jobTitleMarginTop={-33}
        jobTitleMarginLeft={-167.5}
        jobTitleTop="50%"
        jobTitleLeft="50%"
        jobTitleWidth={335}
        jobTitleHeight={66}
      />
      <Image
        style={[styles.xnixlinesortDownIcon, styles.jobTitleParentPosition]}
        contentFit="cover"
        source={require("../assets/xnixlinesort-down1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  jobTitleParentPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  xnixlinesortDownIcon: {
    marginTop: 3,
    marginLeft: 100,
    width: 29,
    height: 22,
  },
  jobTitleParent: {
    marginTop: -229.5,
    marginLeft: -125,
    width: 335,
    height: 66,
  },
});

export default FormContainer;
