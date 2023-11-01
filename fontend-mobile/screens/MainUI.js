import React from "react";
import { View, Text, Image, TouchableOpacity,StyleSheet ,TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border, Padding, } from "../GlobalStyles";
const MainUI = () => {
  const navigation = useNavigation();

  const handleComponentPress = (componentName) => {
    // Navigate to the selected component screen
    navigation.navigate(componentName);
  };

  return (
    <View style={styles.container}>
             {/* Rectangle */}
      <Image
        style={[styles.myNewsChild, styles.searchPosition]}
        contentFit="cover"
        source={require("../assets/rectangle-5.png")}
      />

      <View style={styles.AppoinmentTextAndProfile}>
        <Image
          style={styles.ellipseIcon}
          contentFit="cover"
          source={require("../assets/ellipse.png")}
        />
        <View style={styles.headlineParent}>
          <TouchableOpacity >
            <Text style={[styles.headline1, styles.headlineFlexBox]} >
              Appointments
            </Text>
          </TouchableOpacity>

        </View>
      </View>



      {/*profile*/}

      <View style={styles.header}>

        <View >
          <Image
            style={styles.filterIcon}
            contentFit="cover"
            source={require("../assets/filter.png")}
          />
        </View>
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
          <TextInput
            style={[styles.search1]}
            placeholder="Search"
            placeholderTextColor="rgba(13, 1, 64, 0.6)"
          />
        </View>
      </View>
      {/* Header */}
      <TouchableOpacity
        style={styles.component}
        onPress={() => handleComponentPress("Appointment")}
      >
        <Image
          source={require("../assets/icon.png")}
          style={styles.image}
        />
        <Text style={styles.label}>Appointment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.component}
        onPress={() => handleComponentPress("Appointment")}
      >
        <Image
          source={require("../assets/icon.png")}
          style={styles.image}
        />
        <Text style={styles.label}>Certificates</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.component}
        onPress={() => handleComponentPress("CerificateList")}
      >
        <Image
          source={require("../assets/icon.png")}
          style={styles.image}
        />
        <Text style={styles.label}>Jobs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.component}
        onPress={() => handleComponentPress("Appointment")}
      >
        <Image
          source={require("../assets/icon.png")}
          style={styles.image}
        />
        <Text style={styles.label}>News</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.component}
        onPress={() => handleComponentPress("Appointment")}
      >
        <Image
          source={require("../assets/icon.png")}
          style={styles.image}
        />
        <Text style={styles.label}>Chat</Text>
      </TouchableOpacity>
      {/* Repeat the above structure for other components */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    top: 80,
  },
  component: {
    alignItems: "center",
    margin: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
  },
  scrollableSectionScrollViewContent: {
    flexDirection: "column",
    paddingBottom: 100, // Updated paddingBottom for responsiveness
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollableSectionPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  searchPosition: {
    left: 0,
    top: 0,
  },
  headlineFlexBox: {
    display: "flex",
    color: Color.pureWhite,
    alignItems: "center",
    textAlign: "left",
    width: "100%", // Updated width for responsiveness
    left: 0,
    position: "absolute",
  },
  headerLayout: {
    height: 40,
    position: "absolute",
  },
  type8Typo: {
    fontFamily: FontFamily.medium14,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.1,
    fontSize: FontSize.medium14_size,
  },
  scrollableSection: {
    marginTop: -100, // Updated marginTop for responsiveness
    marginLeft: -50, // Updated marginLeft for responsiveness
    width: "100%", // Updated width for responsiveness
    flex: 1,
    height: "100%",
  },
  menuBarIcon: {
    bottom: -100, // Updated bottom for responsiveness
    left: -50, // Updated left for responsiveness
    width: "100%", // Updated width for responsiveness
    height: 100, // Updated height for responsiveness
    position: "absolute",
  },
  myNewsChild: {
    width: "100%",
    height: 221,
    position: "absolute",
  },
  ellipseIcon: {
    left: "80%", // Updated left for responsiveness
    width: 54,
    height: 54,
    top: 55,
    position: "absolute",
  },
  headline: {
    alignItems: "center",
    fontFamily: FontFamily.medium14,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.1,
    fontSize: FontSize.medium14_size,
    top: 0,
    display: "flex",
    color: Color.pureWhite,
  },
  headline1: {
    top: 22,
    fontSize: FontSize.bold22_size,
    letterSpacing: -0.3,
    lineHeight: 26,
    fontWeight: "700",
    fontFamily: FontFamily.bold22,
    alignItems: "center",
  },
  headlineParent: {
    height: 48,
    width: "100%", // Updated width for responsiveness
    left: 40,
    top: 45,
    position: "absolute",
  },
  filterIcon: {
    top: -110, // Updated top for responsiveness
    // Updated left for responsiveness
    width: 300,
    left: 170, // Updated width for responsiveness
    height: 300, // Updated height for responsiveness
    position: "absolute",

  },
  searchChild: {
    top: -50, // Updated top for responsiveness
    left: -50, // Updated left for responsiveness
    borderRadius: Border.br_3xs,
    width: "100%", // Updated width for responsiveness
    height: 164,
    position: "absolute",
  },
  iconSearch: {
    top: 17,
    left: -20,
    width: 24,
    height: 24,
    position: "absolute",
  },
  search1: {
    top: 15,
    left: 20,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorDarkgray_100,
    textAlign: "left",
    position: "absolute",
  },
  search: {
    width: "90%", // Updated width for responsiveness
    left: 45,
    top: 28,
  },
  header: {
    top: 100, // Updated top for responsiveness
    width: "100%", // Updated width for responsiveness
    left: 0,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'

  },
  type8: {
    color: Color.colorDarkgray_200,
    textAlign: "left",
  },
  type8Wrapper: {
    borderRadius: Border.br_78xl,
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_200,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_5xs,
    marginLeft: 10,
    alignItems: "center",
  },
  component32Parent: {
    marginTop: -206,
    marginLeft: -189,
    width: "100%",
  },
  myNews: {
    backgroundColor: Color.colorWhitesmoke,
    height: "100%", // Updated height for responsiveness
    width: "100%",
    flex: 1,
  },

  buttonTextAdd: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 97,
    backgroundColor: '#130160',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  btnsetcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    top: 250
  },
  button: {
    flex: 1,
    borderRadius: 97,
    backgroundColor: '#130160',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
  componentContainer: {
    width: 335,
    height: 134,
    top: -250,
    left: 10,
    flexShrink: 0,
    backgroundColor: 'blue',//#fff
    shadowColor: 'rgba(153, 171, 198, 0.18)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 62,
    shadowOpacity: 1,
    elevation: 8, // For Android shadow
    borderRadius: 8,
  },
  circularImage: {
    width: 52,
    height: 52,
    left: 20,
    top: 20,
    borderRadius: 26, // Half of the width and height to make it a circle
    marginRight: 16,
    backgroundColor: 'green' // Spacing between the image and content
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left: 90,
    top: -20,
  },
  text: {
    color: '#0D0D26', // Change to your desired text color
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 18.2,
    letterSpacing: -0.14,
    width: 238,
    height: 38,
  },


  circularImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  selectedButton: {
    backgroundColor: 'white', // Background color when selected
  },
  selectedButtonText: {
    color: 'black', // Text color when selected
  }
});

export default MainUI;
