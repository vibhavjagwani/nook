import React, { useState, useRef, useEffect } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, ImageBackground, Animated, SafeAreaView, Image } from 'react-native';
import { Link } from 'react-router-native';
import { masterStyles, shuffleStyles, borderRadiusButton } from '../styles/master';
import ChevronButton from './ChevronButton';
import { SvgXml } from 'react-native-svg';


const LockButton: React.FC<{lockedState: boolean, onPress: Function }> = ({lockedState, onPress}) =>  {
    const lockedAnim = useRef(new Animated.Value(0)).current;
    // const interpolatedLockState: Animated.AnimatedInterpolation = lockedAnim.interpolate({inputRange: [0, 1], outputRange: [1, 0]});
    const locked = () => {
        Animated.timing(lockedAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false
        }).start();
    };

    const unlocked = () => {
        Animated.timing(lockedAnim, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: false
        }).start();
    };

    const xml = `
    <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.3853 9.31157V6.71296C16.3853 3.01157 13.2902 0 9.4862 0C5.68224 0 2.58715 3.01157 2.58715 6.71296V9.31157C1.12067 9.58287 0 10.9551 0 12.6065V21.6537C0 23.4986 1.39835 25 3.11708 25H15.8553C17.5741 25 18.9724 23.4986 18.9724 21.6532V12.606C18.9724 10.9551 17.8517 9.58287 16.3853 9.31157ZM3.44953 6.71296C3.44953 3.52176 6.15741 0.925926 9.4862 0.925926C12.815 0.925926 15.5229 3.52176 15.5229 6.71296V9.25926H3.44953V6.71296ZM18.11 21.6532C18.11 22.988 17.0984 24.0741 15.8553 24.0741H3.11708C1.87396 24.0741 0.862382 22.988 0.862382 21.6532V12.606C0.862382 11.2713 1.87396 10.1852 3.11708 10.1852H15.8553C17.0984 10.1852 18.11 11.2713 18.11 12.606V21.6532Z" fill="white" />
    <path d="M9.48599 12.9629C8.53479 12.9629 7.76123 13.7934 7.76123 14.8147V17.5925C7.76123 18.6138 8.53479 19.4444 9.48599 19.4444C10.4372 19.4444 11.2108 18.6138 11.2108 17.5925V14.8147C11.2108 13.7934 10.4372 12.9629 9.48599 12.9629ZM10.3484 17.5925C10.3484 18.1032 9.9616 18.5184 9.48599 18.5184C9.01039 18.5184 8.62361 18.1032 8.62361 17.5925V14.8147C8.62361 14.3041 9.01039 13.8888 9.48599 13.8888C9.9616 13.8888 10.3484 14.3041 10.3484 14.8147V17.5925Z" fill="white"/>
    </svg>
    `

    useEffect(() => {
        if(!lockedState) {
            unlocked()
        } else {
            locked()
        }
      },[lockedState])

    return (
        <SafeAreaView style ={{position: 'absolute', top: 10, right: 10, zIndex: 1}}>
            <Animated.View style={[{opacity: lockedAnim}]}>
            <TouchableOpacity style={[masterStyles.buttonDefault]} 
                            onPress={() => onPress()}>
                <SvgXml xml={xml} width="100%" height="100%" />
            </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    )
}

export interface CardInfo {
    id: number,
    name: string,
    info: string,
    backgroundImage: any,
    type: string,
    openTableId: string | null,
    yelpId: string | null,
    googlePlaceId: string | null,
    rating: number | null,
    phoneNumber: string | null,
    location: any | null
  }

export interface Props {
    card: CardInfo,
    setLockedInfo: Function,
    lockState: boolean
}

const ShuffleCard: React.FC<Props> = ({card, setLockedInfo, lockState}) => {

    const [selected, setSelected] = useState<boolean>(false);
    // const [lockedState, setLockedState] = useState<boolean>(false);

    const heightAnim = useRef(new Animated.Value(0)).current;
    const interpolatedHeight: Animated.AnimatedInterpolation = heightAnim.interpolate({inputRange: [0, 1], outputRange: ['40%', '100%']});

    const openTableResLink = card.openTableId ? `http://mobile.opentable.com/opentable/?restId=${card.openTableId}` : null;

    const heightUp = () => {
        Animated.timing(heightAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false
        }).start();
    };

    const heightDown = () => {
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        }).start();
    };

    useEffect(() => {
        if(!selected) {
            heightDown()
        } else {
            heightUp()
        }
      },[selected])


    const shuffleInternalStyles = StyleSheet.create({
        container: {
            // height: props.height,
            flexBasis: 175,
            flexDirection: 'column',
            borderRadius: borderRadiusButton
        },
        image: {
            // height: '100%',
            // position: 'absolute'
        },
        // shuffleCardTextContainer: {
        //     height: !selected ? 'auto' : interpolatedHeight
        // }
    })

    const handleOpenTableReservation = () => {
        if(openTableResLink){
            Linking.canOpenURL(openTableResLink).then(supported => {
                if (supported) {
                    Linking.openURL(openTableResLink);
                } else {
                    console.log("Don't know how to open URI: " + openTableResLink);
                }
                });
        }
    }

    const handlePhoneCall = () => {
        if(card.phoneNumber) {
            const phoneLink = `tel://+${card.phoneNumber}`;
            Linking.canOpenURL(phoneLink)
            .then(supported => {
                if (!supported) {
                  console.log(`not supported: ${card.phoneNumber}`)
                } else {
                  return Linking.openURL(phoneLink);
                }
              })
            .catch(err => console.log(err));
        }
    }
    

    return (
        <SafeAreaView>
            <View style={[shuffleStyles.shuffleCardContainer, shuffleInternalStyles.container]}>
                <ImageBackground source={card.backgroundImage} 
                                style={[ shuffleStyles.shuffleCardImage, shuffleInternalStyles.image]} 
                                imageStyle={{borderRadius: borderRadiusButton}}>
                <Animated.View
                    style={[shuffleStyles.shuffleCardTextContainer, {
                        height: interpolatedHeight
                    }]}>
                    <LockButton lockedState={lockState} onPress={() => {setLockedInfo(!lockState)}} />
                    <View style={shuffleStyles.chevronContainer}>
                        <ChevronButton onPress={() => setSelected(!selected)} selected={selected}/>
                    </View>
                    <Text style={[shuffleStyles.shuffleCardText, shuffleStyles.shuffleCardTextTitle]}> 
                        {card.name}
                    </Text>
                    <Text style={[shuffleStyles.shuffleCardText]}> 
                        {card.info}
                    </Text>
                    {
                        selected && card.rating && <Animated.View style = {[shuffleStyles.yelpInfoRow]}>
                            <View style={{width: '30%'}}>
                                {card.rating === 4 ? (<Image style={{resizeMode:'contain', width: '100%'}} source={require('../images/stars_regular_4.png')}></Image>) : 
                                card.rating === 4.5 ? (<Image style={{resizeMode:'contain', width: '100%'}} source={require('../images/stars_regular_4_half.png')}></Image>): 
                                card.rating === 5 ? (<Image style={{resizeMode:'contain', width: '100%'}} source={require('../images/stars_regular_5.png')}></Image>): <></>}
                            </View>
                            <View style={{width: '70%'}}>
                                <Image style={{resizeMode:'contain',  width: '25%'}} source={require('../images/yelp.png')}>
                                </Image>
                            </View>
                        </Animated.View>
                    }
                    {selected && openTableResLink && <Animated.View>
                                <TouchableOpacity style={[shuffleStyles.cardAction]} onPress={() => handleOpenTableReservation()}>
                                    <Text style={[]}>
                                        Make a reservation on Opentable
                                    </Text>
                                </TouchableOpacity>
                    </Animated.View>}
                  { selected && card.phoneNumber && <Animated.View>
                                <TouchableOpacity style={[shuffleStyles.cardAction]} onPress={() => handlePhoneCall()}>
                                    <Text style={[]}>
                                        Call to inquire about availability
                                    </Text>
                                </TouchableOpacity>
                    </Animated.View>}
                </Animated.View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default ShuffleCard;