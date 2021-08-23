import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Animated, SafeAreaView } from 'react-native';
import { filterStyles } from '../styles/master';
import ChevronButton from '../components/ChevronButton';
import ActivityButton from '../components/ActivityButton';


export interface Props {
    filterInfo: string[],
    setFilterInfo: Function,
    filterType: string
}

const FilterOption: React.FC<Props> = ({filterInfo, setFilterInfo, filterType}) => {
    const [selected, setSelected] = useState<boolean>(false);
    // const [activity1, setActivity1] = useState<string>('');
    // const [activity2, setActivity2] = useState<string>('');
    // const [activity3, setActivity3] = useState<string>('');

    const activity1:string = filterInfo[0];
    const activity2:string = filterInfo[1];
    const activity3:string = filterInfo[2];

    const setActivity1 = (new_filter:string) => {
        setFilterInfo([new_filter, activity2, activity3]);
    }

    const setActivity2 = (new_filter:string) => {
        setFilterInfo([activity1, new_filter, activity3]);
    }

    const setActivity3 = (new_filter:string) => {
        setFilterInfo([activity1, activity2, new_filter]);
    }

    const heightAnim = useRef(new Animated.Value(0)).current;
    const interpolatedHeight: Animated.AnimatedInterpolation = heightAnim.interpolate({inputRange: [0, 1], outputRange: ['0%', '30%']});

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
        console.log(filterInfo)
        if(!selected) {
            heightDown()
        } else {
            heightUp()
        }
      },[selected])

    const activityRightHeader = (<><View style={[filterStyles.filterActivityButtonContainer]}>
            <ActivityButton type={activity1 ? activity1 : ''} onPress={()=> console.log('nuhuh')}/>
            </View>
            <View style={[filterStyles.filterActivityButtonContainer]}>
                <ActivityButton type={activity2} onPress={()=> console.log('nuhuh')}/>
            </View>
            <View style={[filterStyles.filterActivityButtonContainer]}>
                <ActivityButton type={activity3} onPress={()=> console.log('nuhuh')}/>                            
            </View></>);

   const activityBody = (<>
   { selected ? (
                        <View style={filterStyles.filterActivityBodyContainer}>
                            <View style = {[{flexDirection: 'row', justifyContent: 'center'}, , filterStyles.filterActivityBodyContainerCol]}>
                            <Text>1</Text>
                            </View>
                            <View style={[filterStyles.filterActivityBodyOptions, filterStyles.filterActivityBodyContainerCol]}>
                                <ActivityButton type='restaurant' selected={activity1 === 'restaurant'} onPress={() => setActivity1('restaurant')}/>
                                <ActivityButton type='activity' selected={activity1 === 'activity'} onPress={() => setActivity1('activity')}/>
                                <ActivityButton type='drinks' selected={activity1 === 'drinks'} onPress={() => setActivity1('drinks')}/>  
                                <ActivityButton type='dessert' selected={activity1 === 'dessert'} onPress={() => setActivity1('dessert')}/>
                            </View>
                            <View style = {[{flexDirection: 'row', justifyContent: 'center'}, filterStyles.filterActivityBodyContainerCol]}>
                                <TouchableOpacity onPress={() => {setActivity1('any')}}>
                                    <Text>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>) : <></>
                    }
                    { selected ? (
                        <View style={filterStyles.filterActivityBodyContainer}>
                            <View style = {[{flexDirection: 'row', justifyContent: 'center'}, filterStyles.filterActivityBodyContainerCol]}>
                                <Text>2</Text>
                            </View>
                            <View style={[filterStyles.filterActivityBodyOptions, filterStyles.filterActivityBodyContainerCol]}>
                                <ActivityButton type='restaurant' selected={activity2 === 'restaurant'} onPress={() => setActivity2('restaurant')}/>
                                <ActivityButton type='activity' selected={activity2 === 'activity'} onPress={() => setActivity2('activity')}/>
                                <ActivityButton type='drinks' selected={activity2 === 'drinks'} onPress={() => setActivity2('drinks')}/>  
                                <ActivityButton type='dessert' selected={activity2 === 'dessert'} onPress={() => setActivity2('dessert')}/>
                            </View>
                            <View style = {[{flexDirection: 'row', justifyContent: 'center'}, filterStyles.filterActivityBodyContainerCol]}>
                                <TouchableOpacity onPress={() => {setActivity2('any')}}>
                                    <Text>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>) : <></>
                    }
                    { selected ? (
                        <View style={filterStyles.filterActivityBodyContainer}>
                            <View style = {[{flexDirection: 'row', justifyContent: 'center'}, filterStyles.filterActivityBodyContainerCol]}>
                                <Text>3</Text>
                            </View>
                            <View style={[filterStyles.filterActivityBodyOptions, filterStyles.filterActivityBodyContainerCol]}>
                                <ActivityButton type='restaurant' selected={activity3 === 'restaurant'} onPress={() => setActivity3('restaurant')}/>
                                <ActivityButton type='activity' selected={activity3 === 'activity'} onPress={() => setActivity3('activity')}/>
                                <ActivityButton type='drinks' selected={activity3 === 'drinks'} onPress={() => setActivity3('drinks')}/>  
                                <ActivityButton type='dessert' selected={activity3 === 'dessert'} onPress={() => setActivity3('dessert')}/>
                            </View>
                            <View style = {[{flexDirection: 'row', justifyContent: 'center'}, filterStyles.filterActivityBodyContainerCol]}>
                                <TouchableOpacity onPress={() => {setActivity3('any')}}>
                                    <Text>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>) : <></>
                    }
   </>)
    
    const activityFilter = {
        'leftHeader': <Text style={[filterStyles.filterOptionTitle]}>ACTIVITIES</Text>,
        'rightHeader': activityRightHeader,
        'body': activityBody
    }

    const filterObject = filterType === 'activities' ? activityFilter : {
        'leftHeader': <></>,
        'rightHeader': <></>,
        'body': <></>
    }
    
    return (
        <SafeAreaView>
            <Animated.View style={[filterStyles.filterOptionContainer]}>
                <View style={[filterStyles.filterOptionHeaderContainer]}>
                {/* header */}
                    <View style={[filterStyles.filterOptionHeaderTitleContainer]}>
                    {/* left */}
                        {filterObject['leftHeader']}
                    </View>
                    <View style={[filterStyles.filterOptionDropdownContainer]}>
                    {/* right */}
                        <View style={[filterStyles.filterOptionSummaryContainer]}>
                            {/* summary container*/}
                            {filterObject['rightHeader']}
                        </View>
                        <View style={[filterStyles.filterOptionDropdownChevronContainer]}>
                            {/* chevron container */}
                            <ChevronButton
                                onPress={() => setSelected(!selected)}
                                selected={selected}
                                black={true}/>
                        </View>
                    </View>
                </View>
                <Animated.View style={[{height: interpolatedHeight}, filterStyles.filterOptionBodyContainer]}>
                {/* Body */}
                    {filterObject['body']}
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    );
}

export default FilterOption;