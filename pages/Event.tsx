import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { homeStyles, darkPrimary } from '../styles/master';

export interface Props {

}

const Event: React.FC<Props> = (props) => {
  return (
    <ScrollView style={homeStyles.homeContainer} contentContainerStyle = {homeStyles.scrollView}>
        <Text style={homeStyles.text}>Event Name</Text>
    </ScrollView>
  );
}

export default Event;
