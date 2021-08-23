import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { masterStyles } from '../styles/master';
import { SvgXml } from 'react-native-svg';


export interface Props {
    onPress: Function
}

const SearchButton: React.FC<Props> = ({onPress}) => {
    const xml = `
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.38095 15.7619C12.4573 15.7619 15.7619 12.4573 15.7619 8.38095C15.7619 4.30456 12.4573 1 8.38095 1C4.30456 1 1 4.30456 1 8.38095C1 12.4573 4.30456 15.7619 8.38095 15.7619Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.7715 21.6669L13.5476 13.5479" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
    return (
        <TouchableOpacity style={[masterStyles.buttonDefault, masterStyles.searchButton]} onPress={() => onPress()}>
            <SvgXml xml={xml} width="100%" height="100%"/>
        </TouchableOpacity>
    )
}

export default SearchButton;