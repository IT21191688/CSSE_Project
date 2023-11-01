import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const SearchFormContainer = () => {
  return (
    <View style={[styles.header, styles.headerLayout]}>
      <Image
        style={styles.filterIcon}
        contentFit="cover"
        source={require("../assets/filter.png")}
      />
      <View style={[styles.search, styles.headerLayout]}>
        <Image
          style={styles.searchChild}
          contentFit="cover"
          source={require("../assets/rectangle-3.png")}
        />
        <Image
          style={styles.iconSearch}
          contentFit="cover"
          source={require("../assets/icon-search.png")}
        />
        <Text style={styles.search1}>Search</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLayout: {
    height: 40,
    position: "absolute",
  },
  filterIcon: {
    top: -146,
    left: 145,
    width: 340,
    height: 340,
    position: "absolute",
  },
  searchChild: {
    top: -58,
    left: -62,
    borderRadius: Border.br_3xs,
    width: 404,
    height: 164,
    position: "absolute",
  },
  iconSearch: {
    top: 8,
    left: 15,
    width: 24,
    height: 24,
    position: "absolute",
  },
  search1: {
    top: 12,
    left: 49,
    fontSize: FontSize.textXsRegular_size,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorDarkgray_100,
    textAlign: "left",
    position: "absolute",
  },
  search: {
    top: 0,
    left: 0,
    width: 280,
  },
  header: {
    top: 134,
    left: 22,
    width: 335,
  },
});

export default SearchFormContainer;
