import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { masterStyles, homeStyles, darkPrimary } from '../styles/master';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { useHistory } from "react-router-native";
import {Camera} from 'expo-camera';
import CameraView from './Camera';

interface Props {}

const Home: React.FC<Props> = (props) => {
    const [eventName, onChangeEventName] = React.useState<string>('');
    const [allEvents, onChangeEvents] = React.useState<Array<string>>([]);
    const [startCamera,setStartCamera] = React.useState(false)

    let history = useHistory();
    
    const __startCamera = async () => {
        const {status} = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
          // start the camera
          setStartCamera(true)
        } else {
          alert('Access denied');
        }
    }

    const addEvent = () => {
        onChangeEvents([eventName, ...allEvents]);
        onChangeEventName('');
        // history.push('/event/1');
    }

    const newEventView = (
        <View style={homeStyles.eventContainer}>
            {/* <Text style={homeStyles.text}>New Event</Text> */}
            <View style={homeStyles.newEventView}>
                <TextInput
                    placeholder={"New occasion, fam?"}
                    placeholderTextColor={'white'}
                    style={homeStyles.textInput}
                    onChangeText={text => onChangeEventName(text)}
                    value={eventName}
                    />
                <TouchableOpacity
                    onPress={addEvent}
                    >
                    <AntDesign name="pluscircle" size={24} color={darkPrimary} />
                </TouchableOpacity>
            </View>
        </View>
    )
    
    const currentEventView = allEvents.length > 0 ? (
        <View style={homeStyles.eventContainer}>
            <Text style={masterStyles.header}>Events</Text>
            {
                allEvents.map((eventTag, i) => {
                    return (
                        <View style = {homeStyles.eachEventView} key={i}>
                            <Text style = {homeStyles.text}>
                            {eventTag}
                            </Text>
                            {i === 0 ? 
                            (<Text style = {homeStyles.liveText}>
                               live
                            </Text>)
                                 : null
                                }
                            {i == 0 ? <FontAwesome name="camera" size={30} color="white" onPress={__startCamera}/> : null}
                        </View>
                    )
                })
            }
        </View>
    ) : null;
    
    const upcomingEventView = (
        <View style={homeStyles.eventContainer}>
            {/* <Text style={homeStyles.text}>Upcoming Events</Text> */}
        </View>
    )


  return (
    <>
    {startCamera ? 
    <CameraView/>
    :
    <ScrollView style={homeStyles.homeContainer} contentContainerStyle = {homeStyles.scrollView}>
        {newEventView}
        {currentEventView}
        {upcomingEventView}
      {/* <Text style={homeStyles.text}>Start Event</Text> */}
    </ScrollView>
    }
  </>
  );
}

export default Home;
