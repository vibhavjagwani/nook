import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Animated, SafeAreaView } from 'react-native';
import { filterStyles } from '../styles/master';
import FilterOption from '../components/FilterOption';

export interface Props {
    visible: boolean,
    closeFilter: Function,
    filterSettings: any,
    setFilterSettings: Function
}

const Filters: React.FC<Props> = ({visible, closeFilter, filterSettings, setFilterSettings}) => {

//   const heightAnim = useRef(new Animated.Value(0)).current;

//   const interpolatedHeight: Animated.AnimatedInterpolation = heightAnim.interpolate({inputRange: [0, 1], outputRange: ['0%', '100%']});

//   const heightUp = () => {
//     Animated.timing(heightAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: false
//     }).start();
//   };

//     const heightDown = () => {
//         Animated.timing(heightAnim, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: false
//         }).start();
//     };

//     useEffect(() => {
//         if(!visible) {
//             heightDown()
//         } else {
//             heightUp()
//         }
//     },[visible])

  return (
    <SafeAreaView>
        <Animated.View style={[filterStyles.filterPageContainer]}>
            <View style={[filterStyles.filterHeaderContainer]}>
                <TouchableOpacity>
                    <Text style={filterStyles.filterHeaderText} onPress={() => closeFilter()}> Back </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={filterStyles.filterHeaderText}> Reset </Text>
                </TouchableOpacity>
            </View>
            <View style={[filterStyles.filterBodyContainer]}>
                <FilterOption 
                    filterInfo = {filterSettings['activities']} 
                    setFilterInfo = {(arr: string[]) => setFilterSettings({...filterSettings,['activities']: arr})}
                    filterType = 'activities'
                />
            </View>
        </Animated.View>
    </SafeAreaView>

  );
}

export default Filters;