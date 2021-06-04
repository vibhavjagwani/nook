import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { homeStyles } from '../styles/master';

export interface Props {

}

const Shuffle: React.FC<Props> = (props) => {
  return (
    <ScrollView style={homeStyles.homeContainer} contentContainerStyle = {homeStyles.scrollView}>
        <Text style={homeStyles.text}>Shuffle page</Text>
    </ScrollView>
  );
}

export default Shuffle;
