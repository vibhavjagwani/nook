import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { masterStyles } from '../styles/master';
import { SvgXml } from 'react-native-svg';


export interface Props {
    onPress: Function
}

const BackButton: React.FC<Props> = ({onPress}) => {
    const xml = `
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.499 1.49707L0.5 5.49907L4.5 9.50007" stroke="#595858" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.5 5.5H0.5" stroke="#595858" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `
    return (
        <TouchableOpacity style={[masterStyles.buttonDefault, masterStyles.backButton]} onPress={() => onPress()}>
            <SvgXml xml={xml} width="100%" height="100%"/>
        </TouchableOpacity>
    )
}

export default BackButton;