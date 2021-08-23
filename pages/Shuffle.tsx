import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, SafeAreaView } from 'react-native';
import { homeStyles, masterStyles, shuffleStyles } from '../styles/master';
import SearchButton from '../components/SearchButton';
import Filterbutton from '../components/FilterButton';
import HelpButton from '../components/HelpButton';
import ShuffleCard from '../components/ShuffleCard';
import AppTab from '../components/AppTab';
import ShufflePageOption from '../components/ShufflePageOption';
import CardInfo from '../components/ShuffleCard';
import Filters from '../pages/Filters';
import Map from '../pages/Map';
import { getShuffleRoute } from '../routes';


export interface Props {

}

const Shuffle: React.FC<Props> = (props) => {

  const [shuffleCount, setShuffleCount] = useState<number>(0);
  const [filtersOn, setFiltersOn] = useState<boolean>(false);
  const [mapOn, setMapOn] = useState<boolean>(false);
  const [filterSettings, setFilterSettings] = useState<any>({'activities': ['any','any','any'], 
                                                             'info':[{'locked': false},{'locked': false},{'locked': false}]
                                                            })

  const sampleImage = '../images/sample_image.png';
  
  const [cardInfos, setCardInfos]  = useState([]);

  const onShufflePress = () => {
    const shuffleSearch = filterSettings['activities'];
    const shuffleInfo = filterSettings['info'];
    let lockString = ''
    for (let index = 0; index < shuffleInfo.length; index++) {
      const element = shuffleInfo[index];
      if(element['locked']) {
        lockString += cardInfos[index]['id'] + ','
      } else {
        lockString += ','
      }
    }
    getShuffleRoute(shuffleSearch[0], shuffleSearch[1], shuffleSearch[2], lockString).then((data: any) => {
      let cardData = data['data'];
      setCardInfos(
        cardData.map((cData: any, idx:number) => {
          let openTableId = null;
          let yelpId = null;
          let googlePlaceId = null;
          let rating = null;
          let phoneNumber = null;
          let location = null;
          if (cData.hasOwnProperty('google_place_id')) {
            // google activity
            googlePlaceId = cData['google_place_id'];
          } else if (cData.hasOwnProperty('yelp_id')){
            // yelp
            yelpId = cData['yelp_id'];
            rating = parseFloat(cData['rating'])
            let openTidNum =  parseFloat(cData['open_table_id'])
            if (openTidNum > 1) {
              openTableId = cData['open_table_id']
            }
          }
          if (cData.hasOwnProperty('phone_number') && cData['phone_number']) {
            phoneNumber = cData['phone_number']
          }
          if (cData.hasOwnProperty('location') && cData['location']) {
            location = cData['location']
          }
          return({
            id: `${cData['id']}`,
            name: cData['name'],
            info: `${cData['tag_one']} ${cData['price']}`,
            backgroundImage: {'uri': cData['image_url']},
            type: shuffleSearch[idx],
            googlePlaceId,
            openTableId,
            yelpId,
            rating,
            phoneNumber,
            location: location
          })
      }));
    }).catch((err: any) => {
      console.log(err);
    });
  }

  useEffect(() => {
    onShufflePress();
  },[shuffleCount])

  
  const mapImage = '../images/map.png';
  const planeImage = '../images/paper_plane_alt.png';
  const heartImage = '../images/heart.png';
  const checkboxImage = '../images/checkbox.png';
  const shuffleImage = '../images/shuffle.png';

  const setFilterSettingsInfo = (arr: any) => {
    setFilterSettings({...filterSettings,['info']: arr})
  }


  return filtersOn ?
      (<Filters visible={filtersOn} closeFilter={() => setFiltersOn(false)} filterSettings={filterSettings} setFilterSettings={setFilterSettings}/>)
      : 
      (<View style={shuffleStyles.shuffleContainer}>
        {mapOn ? 
          <><Map closeMap={() => setMapOn(false)} cards={cardInfos}>
          </Map></>
          :
          <>
            <View style={masterStyles.headerContainer}>
              <View style={masterStyles.headerContainerButtonsContainer}>
                <View style={masterStyles.headerContainerButton}>
                  <Filterbutton onPress={() => setFiltersOn(true)}/>
                </View>
                <View style={masterStyles.headerContainerButton}>
                  <SearchButton onPress={() => console.log('search')}/>
                </View>
              </View>
            <View style={masterStyles.headerTitleContainer}>
              <Text style={[masterStyles.logo, masterStyles.appTitle]}>NOOKS</Text>
            </View>
              <View style={masterStyles.headerHelpContainer}>
                <HelpButton onPress={() => console.log('question')}/>
              </View>
            </View>
            <View style={shuffleStyles.planBodyContainer}>
              {cardInfos.map((x, i) => {
                return (<ShuffleCard
                  key={`${x['id']}-${i}`}
                  card={x}
                  lockState={filterSettings['info'][i]['locked']}
                  setLockedInfo={(bool: boolean) => {
                    let infos = filterSettings['info'];
                    infos[i]['locked'] = bool
                    setFilterSettingsInfo(infos)
                  }}
                  />)
                })
              }
            </View> 
            </>
          }
          <View style={[shuffleStyles.planOptionsContainer]}>
            <ShufflePageOption onPress={() => setMapOn(true)} src={require(mapImage)}/>
            <ShufflePageOption onPress={() => console.log('2')} src={require(planeImage)} backgroundColor='#50A6FD' height={40}/>
            <ShufflePageOption onPress={() => console.log('3')} src={require(heartImage)} backgroundColor='#FF795C' height={35}/>
            <ShufflePageOption onPress={() => console.log('4')} src={require(checkboxImage)} backgroundColor='#FFA55C' height={35}/>
            <ShufflePageOption onPress={() => {setShuffleCount(shuffleCount + 1)}} src={require(shuffleImage)} backgroundColor='#FFD274' height={30}/>
          </View>
        <AppTab />
      </View>)
    }
    
    export default Shuffle;
    