import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, ImageSourcePropType } from "react-native";
import { Color, FontSize, FontFamily, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const NewsCard = ({
  articleImageUrl,
  newsImageUrl,
  newsTitle,
  imageDimensions,
  newsDescription,
  timeAgo,
  philippinesMilitaryConducMarginTop,
  rapplerTop,
  fmIconLeft,
  fmIconTextAlign,
}) => {
  const newsCardStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", philippinesMilitaryConducMarginTop),
    };
  }, [philippinesMilitaryConducMarginTop]);

  const philippinesMilitaryConductsStyle = useMemo(() => {
    return {
      ...getStyleValue("top", rapplerTop),
    };
  }, [rapplerTop]);

  const rplStyle = useMemo(() => {
    return {
      ...getStyleValue("left", fmIconLeft),
      ...getStyleValue("textAlign", fmIconTextAlign),
    };
  }, [fmIconLeft, fmIconTextAlign]);

  return (
    <View style={[styles.newsCard, newsCardStyle]}>
      <Image
        style={styles.newsCardChild}
        contentFit="cover"
        source={articleImageUrl}
      />
      <Text
        style={[
          styles.philippinesMilitaryConducts,
          philippinesMilitaryConductsStyle,
        ]}
      >
        {newsImageUrl}
      </Text>
      <View style={[styles.rapplerParent, styles.parentLayout]}>
        <Text style={[styles.rappler, styles.rapplerLayout]}>{newsTitle}</Text>
        <View style={[styles.ellipseParent, styles.parentLayout]}>
          <Image
            style={[styles.ellipseParent, styles.parentLayout]}
            contentFit="cover"
            source={imageDimensions}
          />
        </View>
      </View>
      <Text style={[styles.hoursAgo, styles.rapplerLayout]}>{timeAgo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parentLayout: {
    height: 29,
    position: "absolute",
  },
  rapplerLayout: {
    width: 112,
    color: Color.pureWhite,
    textAlign: "left",
    position: "absolute",
  },
  newsCardChild: {
    top: 15,
    borderRadius: 14,
    width: 350,
    height: 167,
    left: 15,
    position: "absolute",
  },
  philippinesMilitaryConducts: {
    top: 194,
    fontSize: FontSize.size_xl,
    letterSpacing: -0.9,
    fontWeight: "700",
    fontFamily: FontFamily.archivoBold,
    color: Color.colorGray,
    width: 350,
    textAlign: "left",
    left: 15,
    position: "absolute",
  },
  rappler: {
    top: 4,
    left: 38,
    fontSize: FontSize.medium14_size,
    fontWeight: "800",
    fontFamily: FontFamily.sFProText,
    letterSpacing: -0.6,
    width: 112,
  },
  ellipseParent: {
    top: 0,
    left: 0,
    width: 29,
  },
  rpl: {
    top: 6,
    left: 4,
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "900",
    fontFamily: FontFamily.archivoBlackItalic,
    color: Color.pureWhite,
    letterSpacing: -0.6,
    textAlign: "left",
    position: "absolute",
  },
  rapplerParent: {
    top: 30,
    width: 150,
    left: 28,
  },
  fmIcon: {
    width: 26,
    height: 19,
  },
  forumFollow: {
    top: 32,
    left: 285,
    width: 32,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_11xs,
    paddingVertical: Padding.p_9xs,
    position: "absolute",
    overflow: "hidden",
  },
  hoursAgo: {
    top: 155,
    fontSize: FontSize.size_xs,
    letterSpacing: -0.5,
    fontFamily: FontFamily.sFPro,
    left: 28,
  },
  newsCard: {
    borderRadius: 18,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    width: 380,
    height: 278,
    overflow: "hidden",
  },
});

export default NewsCard;
