import { StyleSheet } from 'react-native';
// import { RedHatDisplay_400Regular,RedHatDisplay_500Medium } from '@expo-google-fonts/red-hat-display';
// import { useFonts, Signika_600SemiBold } from '@expo-google-fonts/signika';

const primary1 = '#FFFFFF';
const primary2 = '#FCEFD4';
const secondary1 = '#606060';
const secondary2 = '#FFA55C';
const borderRadius = 5;
export const borderRadiusButton = 20;

export const darkPrimary = '#ABC4FF';
export const burntOrange = '#FF7D56';
export const lightOrange = '#FDAB4D';
const fadedOrange = "#FFC392";
const lightGrey = '#EDEDED';

const defaultFontWeight = '400';

const tinyFont = 12
const smallFont = 14
const regularFontSize = 18
const headerFontSize = 24
const titleFontSize = 36

const horizontalPadding = '5%';
const verticalPadding = '12%';


export const masterStyles = StyleSheet.create({
  masterContainer: {
      // backgroundColor: primary1,
      height: '100%'
  },
  header: {
    fontSize: headerFontSize,
    color: 'white',
  },
  logo: {
    fontFamily: 'Signika_400Regular'
  },
  buttonDefault: {
    height: 25,
    width: 25,
    zIndex: 1
  },
  backButton: {
    borderRadius: 50,
    height: 25,
    backgroundColor: primary2,
    width: 25,
    padding: 5,
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex:1
  },
  snackbarWarning: {
    backgroundColor: fadedOrange,
    color: 'black'
  },
  snackbarWarningText: {
    color: 'black',
    fontFamily: 'RedHatDisplay_400Regular'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: verticalPadding,
    paddingHorizontal: horizontalPadding,
    height: '10%'
  },
  headerContainerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '25%'
  },
  headerContainerButton: {
    marginHorizontal: '5%'
  },
  filterButton: {
    height: 25,
    width: 25,
    zIndex: 1
  },
  searchButton: {
    height: 25,
    width: 25,
    zIndex: 1
  },
  helpButton: {
    height: 25,
    width: 25,
    zIndex: 1
  },
  appTitle: {
    fontSize: titleFontSize,
    color: secondary2
  },
  headerTitleContainer: {
    // width: '50%'
  },
  headerHelpContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  appTabContainer: {
    backgroundColor: lightGrey,
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  appTabButtonContainer: {
    height: 40,
    width: 40
  },
  appTabButton: {
    color: 'blue'
  },
  smallImage: {
    height: 15,
    width: 15
  }
})

export const loginStyles = StyleSheet.create({
  linearBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  loginContainer: {
      // backgroundColor: primary1,
      height: '100%',
      // paddingVertical: '15%',
      // paddingHorizontal: '10%',
      display: 'flex',
      flexDirection: 'column',
  },
  loginText: {
    color: 'white',
    fontSize: regularFontSize,
    textAlign: 'center',
    fontFamily: 'RedHatDisplay_400Regular'
  },
  loginView : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 50,
    // textDecorationStyle: 'solid',
    // textDecorationColor: secondary2,
    // textDecorationLine:'underline'
  },
  logoView: {
    height: '30%',
    alignItems: "flex-end",
    marginVertical: 10
  },
  optionsView : {
    height: '15%',
    alignItems: "center"
  },
  sloganText: {
    textAlign: "center"
  },
  optionsButton: {
    padding: 10,
    borderRadius: borderRadius,
    marginHorizontal: 20
  },
  optionsButtonSelected : {
    backgroundColor: secondary1,
  },
  emailInput :{
    backgroundColor: primary2,
    width: 200,
    borderWidth: 1,
    borderColor: primary2,
    borderRadius: borderRadius,
    padding: 10,
    marginVertical: 10,
    textAlign: 'left',
    color: 'black',
    fontWeight: defaultFontWeight
  },
  actionView :{
    marginVertical: 30
  },
  loginButton: {
    backgroundColor: primary1,
    padding: 10,
    borderRadius: borderRadiusButton,
    paddingHorizontal: 40
  },
  loginButtonText: {
    fontSize: regularFontSize,
    color: 'black',
    fontFamily: 'RedHatDisplay_400Regular'
  },
  termsView : {
    height: '20%',
    alignItems: 'flex-end'
  },
  loginInput : {
    marginTop: '2%'
  },
  loginInfoText : {
    color: 'black'
  },
  signupText : {
    fontFamily: 'RedHatDisplay_500Medium'
  },
  disclaimerText : {
    fontSize: tinyFont,
    fontFamily: 'RedHatDisplay_500Medium'
  }
});

export const filterStyles = StyleSheet.create({
  filterPageContainer: {
    backgroundColor: lightGrey
  },
  filterHeaderContainer: {
    backgroundColor: primary1,
    height: '5%',
    paddingHorizontal: horizontalPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: '2%'
  },
  filterHeaderText: {
    color: 'black',
    fontFamily: 'RedHatDisplay_400Regular',
    fontSize: smallFont
  },
  filterBodyContainer: {
    height: '95%'
  },
  filterOptionContainer: {
    backgroundColor: primary1,
    marginVertical: '5%',
    marginHorizontal: '2%',
    borderRadius: borderRadius
  },
  filterOptionHeaderTitleContainer: {
    paddingHorizontal: horizontalPadding,
    paddingVertical: '5%',
    alignItems: 'center'
  },
  filterOptionTitle: {
    fontSize: headerFontSize,
    fontFamily: 'RedHatDisplay_400Regular',
  },
  filterOptionHeaderContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  filterOptionDropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: horizontalPadding,
    paddingVertical: '5%',
  },
  filterOptionDropdownChevronContainer: {
    flexDirection: 'row',
  },
  filterOptionSummaryContainer: {
    flexDirection: 'row'
  },
  filterActivityButtonContainer: {
    paddingHorizontal: '3%'
  },
  filterOptionBodyContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  filterActivityBodyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  filterActivityBodyContainerCol: {
    // marginVertical: verticalPadding
  },
  filterActivityBodyOptions: {
    flexDirection: 'row',
    paddingVertical: verticalPadding
  },
  activityOptions: {
    paddingHorizontal: '3.5%'
  }

})

export const shuffleStyles = StyleSheet.create({
  shuffleContainer: {
    backgroundColor: primary1,
    // paddingVertical: '12%',
    // marginHorizontal: '5%'
    // color: 'black'
  },
  planBodyContainer: {
    height: '70%',
    paddingHorizontal: horizontalPadding,
    paddingVertical: '5%'
  },
  shuffleCardContainer: {
    backgroundColor: 'black',
    // paddingVertical: '2%',
    justifyContent: "center",
    marginVertical: '2%'
  },
  shuffleCardImage: {
    // borderRadius: 50,
    // paddingVertical: '2%',
    flex: 1, 
    resizeMode: 'contain',
    width: undefined,
    height: undefined,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  planOptionsContainer: {
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: horizontalPadding
  },
  shufflePageOption: {
    borderRadius: 30,
    height: 55,
    width: 55,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  shuffleCardTextContainer: {
    backgroundColor: 'rgba(89, 88, 88, 0.7)',
    // opacity: 0.3,
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    borderRadius: borderRadiusButton
  },
  shuffleCardText: {
    color: primary1,
    fontFamily: 'RedHatDisplay_400Regular'
  },
  shuffleCardTextTitle: {
    color: primary1,
    fontFamily: 'RedHatDisplay_500Medium'
  },
  chevronContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  yelpInfoRow: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    height: '10%',
    width: '100%',
    marginVertical: '2%'
  },
  cardAction: {
    backgroundColor: fadedOrange,
    borderRadius: borderRadiusButton,
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '1%'
  }
});

export const homeStyles = StyleSheet.create({
  homeContainer: {
      backgroundColor: primary1,
      height: '70%',
      paddingVertical: '12%',
      paddingHorizontal: '10%'
  },
  scrollView: {
    justifyContent: 'flex-start',
    alignItems: "flex-start",
  },
  eventContainer: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "flex-start",
    height: '100%',
  },
  newEventView: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: '100%'
  },
  eachEventView: {
    display: 'flex',
    flexDirection: "row",
    alignItems:'baseline'
  },
  liveText: { 
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 5
  },
  textInput: {
    fontSize: 24,
    paddingHorizontal: 10,
    color: darkPrimary
  },
  text: { 
    color: darkPrimary,
    fontSize: 24,
  }
});

export const mapStyles = StyleSheet.create({
  mapContainer: {
    marginHorizontal: horizontalPadding,
    borderRadius: borderRadius
  }
})