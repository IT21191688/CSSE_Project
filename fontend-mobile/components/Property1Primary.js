import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1Primary = ({
  next,
  property1PrimaryPosition,
  property1PrimaryBorderRadius,
  property1PrimaryBackgroundColor,
  property1PrimaryMarginTop,
  property1PrimaryMarginLeft,
  property1PrimaryTop,
  property1PrimaryLeft,
  property1PrimaryHeight,
}) => {
  const property1PrimaryStyle = useMemo(() => {
    return {
      ...getStyleValue("position", property1PrimaryPosition),
      ...getStyleValue("borderRadius", property1PrimaryBorderRadius),
      ...getStyleValue("backgroundColor", property1PrimaryBackgroundColor),
      ...getStyleValue("marginTop", property1PrimaryMarginTop),
      ...getStyleValue("marginLeft", property1PrimaryMarginLeft),
      ...getStyleValue("top", property1PrimaryTop),
      ...getStyleValue("left", property1PrimaryLeft),
      ...getStyleValue("height", property1PrimaryHeight),
    };
  }, [
    property1PrimaryPosition,
    property1PrimaryBorderRadius,
    property1PrimaryBackgroundColor,
    property1PrimaryMarginTop,
    property1PrimaryMarginLeft,
    property1PrimaryTop,
    property1PrimaryLeft,
    property1PrimaryHeight,
  ]);

  return (
    <View style={[styles.property1primary, property1PrimaryStyle]}>
      <Text style={styles.next}>{next}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  next: {
    fontSize: FontSize.semibold16_size,
    letterSpacing: -0.2,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: FontFamily.medium14,
    color: "white",
    textAlign: "center",
  },
  property1primary: {
    borderRadius: 16,
    backgroundColor: Color.greenPure,
    width: 156,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_29xl,
    paddingVertical: Padding.p_base,
  },
});

export default Property1Primary;
