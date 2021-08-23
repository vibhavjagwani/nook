import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, RotateXTransform, Animated, SafeAreaView } from 'react-native';
import { masterStyles } from '../styles/master';
import { SvgXml } from 'react-native-svg';


export interface Props {
    onPress: Function,
    selected: boolean,
    black?: boolean
}

const ChevronButton: React.FC<Props> = ({onPress, selected, black}) => {
    const xml = `
    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8.23809L8.23809 1L15.4762 8.23809" stroke="${black? 'black' : 'white'}" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `

    const rotateAnim = useRef(new Animated.Value(0)).current;

    const rotateUp = () => {
        Animated.timing(rotateAnim, {
          toValue: 3,
          duration: 500,
          useNativeDriver: true
        }).start();
    };

    const rotateDown = () => {
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start();
    };


    let transformStyle: any = {rotateX: rotateAnim.interpolate({
        inputRange: [0, 3],
        outputRange: ['0', '3']
    })};

    const chevronStyles = StyleSheet.create({
        container: {
            transform: [transformStyle],
        }
    })


    useEffect(() => {
        if(!selected) {
            rotateDown()
        } else {
            rotateUp()
        }
      },[selected])

    return (
        <SafeAreaView>
            <Animated.View>
            <TouchableOpacity style={[masterStyles.buttonDefault, masterStyles.smallImage, chevronStyles.container]} 
                            onPress={() => onPress()}>
                <SvgXml xml={xml} width="100%" height="100%" />
            </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    )
}

export default ChevronButton;