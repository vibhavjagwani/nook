import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { masterStyles } from '../styles/master';
import { SvgXml } from 'react-native-svg';


export interface Props {
    onPress: Function
}

const FilterButton: React.FC<Props> = ({onPress}) => {
    const xml = `
    <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.8235 15.0054L22.5835 15.0596" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.02033 14.9264L7.08496 14.9639" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.08501 14.9636C7.07369 16.7948 8.57298 18.2886 10.4338 18.3001C12.2945 18.3117 13.8122 16.8365 13.8235 15.0052C13.8348 13.174 12.3355 11.6801 10.4748 11.6686C8.61397 11.6571 7.09633 13.1323 7.08501 14.9636Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.2799 4.42741L22.6492 4.44824" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.08608 4.31493L12.5415 4.38574" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.5413 4.38641C12.53 6.21766 14.0293 7.7115 15.8901 7.723C17.7508 7.7345 19.2685 6.25931 19.2798 4.42807C19.2911 2.59682 17.7918 1.10298 15.9311 1.09148C14.0703 1.07997 12.5526 2.55517 12.5413 4.38641Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
    return (
        <TouchableOpacity style={[masterStyles.buttonDefault, masterStyles.filterButton]} onPress={() => onPress()}>
            <SvgXml xml={xml} width="100%" height="100%"/>
        </TouchableOpacity>
    )
}

export default FilterButton;