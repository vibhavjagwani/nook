import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Animated, SafeAreaView, Image} from 'react-native';
import { mapStyles, filterStyles } from '../styles/master';
import MapView, {Marker} from 'react-native-maps';
import { CardInfo } from '../components/ShuffleCard';

export interface Props {
    closeMap: Function,
    cards: CardInfo[]
}

const Map: React.FC<Props> = ({closeMap, cards}) => {
  let averageLongitude = cards && cards.length > 0 ? cards.reduce((x, y) => x + parseFloat(y.location.longitude), 0) / cards.length : -73.9960
  let averageLatitude = cards && cards.length > 0 ? cards.reduce((x, y) => x + parseFloat(y.location.latitude), 0) / cards.length : 40.7428



  return (
    <SafeAreaView style={{height: '80%'}}>
        <Animated.View style={[mapStyles.mapContainer, {height: '100%'}]}>
            <View style={[filterStyles.filterHeaderContainer]}>
                    <TouchableOpacity>
                        <Text style={filterStyles.filterHeaderText} onPress={() => closeMap()}> Back </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={filterStyles.filterHeaderText}> Reset </Text>
                    </TouchableOpacity>
            </View>
            <MapView key={'map'} style={{width: '100%', height: '90%', borderRadius: 10}}
                region={{
                    latitude: averageLatitude,
                    longitude: averageLongitude,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0121,
                }}>

                {cards.map((card, index) => (
                    <Marker
                        key={`${card.name}-${index}-1`}
                        coordinate={{latitude: parseFloat(card.location.latitude), longitude: parseFloat(card.location.longitude)}}
                        title={card.name}
                    >
                    <Image
                        source={card.backgroundImage}
                        style={{width: 100, height: 60, borderRadius: 10}}
                        resizeMode="center"
                        resizeMethod="resize"
                    />
                    </Marker>
                ))}
            </MapView>
        </Animated.View>
    </SafeAreaView>

  );
}

export default Map;