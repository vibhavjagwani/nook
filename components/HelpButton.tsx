import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { masterStyles } from '../styles/master';
import { SvgXml } from 'react-native-svg';


export interface Props {
    onPress: Function
}

const HelpButton: React.FC<Props> = ({onPress}) => {
    const xml = `
    <svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.3821 11.11L9.36211 11.83C8.62211 12.33 8.10211 12.92 7.80211 13.6C7.50211 14.28 7.39211 15.12 7.47211 16.12H5.55211C5.47211 14.76 5.61211 13.65 5.97211 12.79C6.35211 11.93 7.03211 11.15 8.01211 10.45L9.33211 9.52C10.1921 8.9 10.8021 8.33 11.1621 7.81C11.5221 7.27 11.7021 6.66 11.7021 5.98C11.7021 5.06 11.2721 4.29 10.4121 3.67C9.57211 3.05 8.55211 2.74 7.35211 2.74C6.37211 2.74 5.44211 2.97 4.56211 3.43C3.70211 3.89 2.93211 4.56 2.25211 5.44L0.512109 4.3C1.37211 3.16 2.40211 2.29 3.60211 1.69C4.80211 1.07 6.09211 0.76 7.47211 0.76C8.39211 0.76 9.24211 0.889999 10.0221 1.15C10.8021 1.41 11.4721 1.77 12.0321 2.23C12.6121 2.69 13.0621 3.24 13.3821 3.88C13.7221 4.52 13.8921 5.21 13.8921 5.95C13.8921 6.97 13.6321 7.86 13.1121 8.62C12.6121 9.36 11.7021 10.19 10.3821 11.11ZM6.51211 19.12C6.93211 19.12 7.29211 19.27 7.59211 19.57C7.89211 19.87 8.04211 20.23 8.04211 20.65C8.04211 21.07 7.89211 21.43 7.59211 21.73C7.29211 22.03 6.93211 22.18 6.51211 22.18C6.09211 22.18 5.73211 22.03 5.43211 21.73C5.13211 21.43 4.98211 21.07 4.98211 20.65C4.98211 20.23 5.13211 19.87 5.43211 19.57C5.73211 19.27 6.09211 19.12 6.51211 19.12Z" fill="black"/>
    </svg>
    `
    return (
        <TouchableOpacity style={[masterStyles.buttonDefault, masterStyles.helpButton]} onPress={() => onPress()}>
            <SvgXml xml={xml} width="100%" height="100%"/>
        </TouchableOpacity>
    )
}

export default HelpButton;