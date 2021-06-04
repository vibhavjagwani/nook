import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { masterStyles } from './styles/master';
import Home from './pages/Home';
import Shuffle from './pages/Shuffle';
import Login from './pages/Login';
import { NativeRouter, Route, Link } from "react-router-native";

export default function App() {
  return (
      <View style={masterStyles.masterContainer}>
        <NativeRouter>
          <Route exact path="/login" component={Home} />
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/event/:id" component={Event} /> */}
          <Route exact path="/shuffle" component={Shuffle} ></Route>
        </NativeRouter>
      </View>
  );
}
