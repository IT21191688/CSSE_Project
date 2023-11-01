import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1Unselected = ({
  type8,
  property1UnselectedPosition,
  property1UnselectedBorderStyle,
  property1UnselectedBorderColor,
  property1UnselectedBorderWidth,
  property1UnselectedBackgroundColor,
  property1UnselectedMarginLeft,
  type8Color,
}) => {
  const property1UnselectedStyle = useMemo(() => {
    return {
      ...getStyleValue("position", property1UnselectedPosition),
      ...getStyleValue("borderStyle", property1UnselectedBorderStyle),
      ...getStyleValue("borderColor", property1UnselectedBorderColor),
      ...getStyleValue("borderWidth", property1UnselectedBorderWidth),
      ...getStyleValue("backgroundColor", property1UnselectedBackgroundColor),
      ...getStyleValue("marginLeft", property1UnselectedMarginLeft),
    };
  }, [
    property1UnselectedPosition,
    property1UnselectedBorderStyle,
    property1UnselectedBorderColor,
    property1UnselectedBorderWidth,
    property1UnselectedBackgroundColor,
    property1UnselectedMarginLeft,
  ]);

  const type8Style = useMemo(() => {
    return {
      ...getStyleValue("color", type8Color),
    };
  }, [type8Color]);

  return (
    <View style={[styles.property1unselected, property1UnselectedStyle]}>
      <Text style={[styles.type8, type8Style]}>{type8}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  type8: {
    fontSize: FontSize.medium14_size,
    letterSpacing: -0.1,
    lineHeight: 21,
    fontWeight: "500",
    fontFamily: FontFamily.medium14,
    color: Color.colorDarkgray_200,
    textAlign: "left",
  },
  property1unselected: {
    borderRadius: Border.br_78xl,
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_200,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_5xs,
  },
});

export default Property1Unselected;
