import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { masterStyles } from '../styles/master';
import HeartButton from '../components/HeartButton';
import ShuffleButton from '../components/ShuffleButton';
import PersonButton from '../components/PersonButton';


export interface Props {
}

const AppTab: React.FC<Props> = (props) => {

    const [tabNum, setTabNum] = React.useState<number>(1);

    const tabStyles = StyleSheet.create({
        tabViewContainer: {
            // width: '33%',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingTop: '5%'
            // alignItems: 'center'
            // height: '100%'
        }
    })

    let shuffleSelected = tabNum == 1 ? true : false;
    let heartSelected = tabNum == 2 ? true : false;
    let personSelected = tabNum == 3 ? true : false;

    return (
        <View style={[masterStyles.appTabContainer]}>
            <View style={[tabStyles.tabViewContainer]}>
                <ShuffleButton onPress={() => console.log('s')} selected={shuffleSelected}/>
            </View>
            <View style={[tabStyles.tabViewContainer]}>
                <HeartButton onPress={() => console.log('h')} selected={heartSelected}/>
            </View>
            <View style={[tabStyles.tabViewContainer]}>
                <PersonButton onPress={() => console.log('p')} selected={personSelected}/>
            </View>
        </View>
    )
}

export default AppTab;