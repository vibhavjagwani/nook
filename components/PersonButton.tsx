import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { masterStyles } from '../styles/master';
import { SvgXml } from 'react-native-svg';


export interface Props {
    onPress: Function,
    selected: boolean
}

const PersonButton: React.FC<Props> = ({onPress, selected}) => {
    const xml = `
    <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 1C25.1155 1 28.8571 4.67127 28.8571 9.2V14.6667C28.8571 19.1954 25.1155 22.8667 20.5 22.8667C15.8845 22.8667 12.1429 19.1954 12.1429 14.6667V9.2C12.1429 4.67127 15.8845 1 20.5 1ZM40 39.2667V37.2763C40 28.5668 29.731 22.8667 20.5 22.8667C11.269 22.8667 1 28.5668 1 37.2763V39.2667C1 40.7762 2.24721 42 3.78571 42H37.2143C38.7528 42 40 40.7762 40 39.2667Z" stroke="#8B8B8B" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
    
    return (
        <TouchableOpacity style={[masterStyles.buttonDefault, masterStyles.appTabButtonContainer]} onPress={() => onPress()}>
            <SvgXml xml={xml} width="100%" height="100%"/>
        </TouchableOpacity>
    )
}

export default PersonButton;