import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { masterStyles } from '../styles/master';
import { SvgXml } from 'react-native-svg';


export interface Props {
    onPress: Function,
    selected: boolean
}

const ShuffleButton: React.FC<Props> = ({onPress, selected}) => {
    const xml = `
    <svg width="37" height="30" viewBox="0 0 37 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.0952 11.5309H35.5714V1.05469" stroke="#8B8B8B" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35.5712 11.5309C29.6277 4.54675 23.6912 1.05469 17.7616 1.05469C11.8321 1.05469 6.59404 3.14993 2.04736 7.3404" stroke="#8B8B8B" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.4756 18.8646H0.999395V29.3408" stroke="#8B8B8B" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M0.99963 18.8646C6.94313 25.8488 12.8796 29.3408 18.8092 29.3408C24.7387 29.3408 29.9768 27.2456 34.5234 23.0551" stroke="#8B8B8B" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `

    return (
        <TouchableOpacity style={[masterStyles.buttonDefault, masterStyles.appTabButtonContainer]} onPress={() => onPress()}>
            <SvgXml xml={xml} width="100%" height="100%" />
        </TouchableOpacity>
    )
}

export default ShuffleButton;