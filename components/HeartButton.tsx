import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { masterStyles } from '../styles/master';
import { SvgXml } from 'react-native-svg';


export interface Props {
    onPress: Function,
    selected: boolean
}

const HeartButton: React.FC<Props> = ({onPress, selected}) => {
    const xml = `
    <svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.7279 7.26755C24.2279 -0.232447 35.7574 -0.70301 40.7279 4.26755C45.5381 9.07777 45.2278 17.2707 40.7279 22.2676L22.7279 40.2676L4.72792 22.2676C-0.242641 17.297 -0.242641 9.23812 4.72792 4.26755C9.3778 -0.382329 21.2279 -0.232447 22.7279 7.26755V7.26755Z" stroke="#8B8B8B" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `

    return (
        <TouchableOpacity style={[masterStyles.buttonDefault, masterStyles.appTabButtonContainer]} onPress={() => onPress()}>
            <SvgXml xml={xml} width="100%" height="100%" />
        </TouchableOpacity>
    )
}

export default HeartButton;