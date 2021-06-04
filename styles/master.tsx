import { StyleSheet } from 'react-native';


const primary1 = '#FFFFFF';
const primary2 = '#FFA55C';
const secondary1 = '#606060';
const secondary2 = '#0E4C89';
const borderRadius = 5;

export const darkPrimary = '#ABC4FF';

export const masterStyles = StyleSheet.create({
  masterContainer: {
      backgroundColor: primary1,
      height: '100%'
  },
  header: {
    fontSize: 24,
    color: 'white'
  }
})

export const loginStyles = StyleSheet.create({
  loginContainer: {
      backgroundColor: primary1,
      height: '100%',
      paddingVertical: '15%',
      paddingHorizontal: '10%',
      display: 'flex',
      flexDirection: 'column',
  },
  loginText: {
    color: primary2,
    fontSize: 16,
    textAlign: 'center'
  },
  loginView : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 50,
    textDecorationStyle: 'solid',
    textDecorationColor: secondary2,
    textDecorationLine:'underline'
  },
  logoView: {
    height: '20%',
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
    backgroundColor: primary1,
    width: 200,
    borderColor: primary2,
    borderWidth: 1,
    borderRadius: borderRadius,
    padding: 10,
    marginVertical: 10
  },
  actionView :{
    marginVertical: 30
  },
  loginButton: {
    backgroundColor: primary2,
    padding: 10,
    borderRadius: borderRadius,
    marginHorizontal: 30
  },
  loginButtonText: {
    fontSize: 16,
    color: 'white'
  },
  termsView : {
    height: '20%',
    alignItems: 'flex-end'
  },
  loginInput : {
    marginTop: '25%'
  },
  loginInfoText : {
    color: 'black'
  }
});

export const homeStyles = StyleSheet.create({
  homeContainer: {
      backgroundColor: primary1,
      height: '70%',
      paddingVertical: '15%',
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
  },
});