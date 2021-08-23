import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { masterStyles, shuffleStyles } from '../styles/master';


export interface Props {
    onPress: Function,
    src: any,
    backgroundColor?: string,
    height?: number
}

const ShufflePageOption: React.FC<Props> = ({onPress, src, backgroundColor, height}) => {
    let internalStyles = StyleSheet.create({
        button: {
            backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF'
        }
    })

    let imageHeight = height? height : 55;

    return (
        <TouchableOpacity 
            style={[masterStyles.buttonDefault, shuffleStyles.shufflePageOption, internalStyles.button]} 
            onPress={() => onPress()}>
            <Image source={src} style={shuffleStyles.shufflePageOption} height={imageHeight}>
            </Image>
        </TouchableOpacity>
    )
}

export default ShufflePageOption;