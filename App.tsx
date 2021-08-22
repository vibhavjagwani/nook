import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { masterStyles } from './styles/master';
import Home from './pages/Home';
import Shuffle from './pages/Shuffle';
import Login from './pages/Login';
import { NativeRouter, Route, Link } from "react-router-native";

import { useFonts, Signika_600SemiBold,Signika_400Regular } from '@expo-google-fonts/signika';
import { RedHatDisplay_400Regular,RedHatDisplay_500Medium } from '@expo-google-fonts/red-hat-display';
// import {useSelector, useDispatch } from 'react-redux';
// import { Snackbar } from 'react-native-paper';

import {Provider} from 'react-redux';
import store from './store/store';


export default function App() {
  let [fontsLoaded] = useFonts({
    Signika_400Regular,
    Signika_600SemiBold,
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium
  });
  
  if (!fontsLoaded) {
    return <></>
  } else {
    return (
        <Provider store={store} >
          <View style={masterStyles.masterContainer}>
            <NativeRouter>
              <Route exact path="/login" component={Home} />
              <Route exact path="/" component={Login} />
              {/* <Route exact path="/event/:id" component={Event} /> */}
              <Route exact path="/shuffle" component={Shuffle} ></Route>
            </NativeRouter>
          </View>
        </Provider>
        );
      }
    }
    