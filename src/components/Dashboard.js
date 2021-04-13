import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SliderBox } from 'react-native-image-slider-box';

import { mainStyles } from '../globals/styles';
import { GOLD, LIGHT_GREY, WHITE, PRIMARY_COLOR, BROWN } from '../globals/colors';

import { getBanner } from '../services/banner.service';
import { getMatches } from '../services/match.service';

import { shortenTeamName } from '../utils/team';

import VsLeft from '../assets/vs_left.svg';
import VsRight from '../assets/vs_right.svg';
import { timeLeft } from '../utils/generalUtils';

export default function Dashboard(props) {
  const isFocused = useIsFocused();

  const [bannerArr, setBannerArr] = useState([]);
  const [matchArr, setMatchArr] = useState([]);

  const getBannerArr = async () => {
    try {
      const res = await getBanner();
      setBannerArr(res.data.banner.map(el => el.banner_img));
    } catch (error) {
      console.log(error);
    }
  };

  const getMatchArr = async () => {
    try {
      const res = await getMatches();
      console.log(JSON.stringify(res.data.match, null, 2));
      setMatchArr(res.data.match);
    } catch (error) {
      console.log(error);
    }
  };

  const Vs = () => {
    return (
      <View
        style={[
          mainStyles.flexRow,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <View style={[styles.vsImgContainer, { alignItems: 'flex-end' }]}>
          <Image
            source={require('../assets/vs_left.png')}
            style={styles.vsImg}
          />
        </View>
        <View style={styles.vsTextContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <View style={[styles.vsImgContainer, { alignItems: 'flex-start' }]}>
          <Image
            source={require('../assets/vs_right.png')}
            style={styles.vsImg}
          />
        </View>
      </View>
    );
  };

  const renderMatch = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.matchContainer} onPress={()=>props.navigation.navigate('Bet', {match:item})}>
        <View style={styles.matchContainerInner}>
          <View>
            <Text style={styles.matchSeriesText}>{item.league_name}</Text>
          </View>
          <View
            style={[
              mainStyles.flexRow,
              { alignItems: 'center', justifyContent: 'center' },
            ]}>
            <View
              style={[styles.teamContainer, { justifyContent: 'flex-start' }]}>
              <View>
                <Image
                  source={{ uri: item.first_team[0]?.team_logo }}
                  style={styles.teamLogo}
                />
              </View>
              <View style={styles.teamNameContainer}>
                <Text style={styles.teamNameText}>
                  {shortenTeamName(item.first_team[0]?.team_name)}
                </Text>
              </View>
            </View>

            <View style={{ flex: 2 }}>
              <Vs />
            </View>

            <View
              style={[styles.teamContainer, { justifyContent: 'flex-end' }]}>
              <View style={styles.teamNameContainer}>
                <Text style={styles.teamNameText}>
                  {shortenTeamName(item.second_team[0]?.team_name)}
                </Text>
              </View>
              <View>
                <Image
                  source={{ uri: item.second_team[0]?.team_logo }}
                  style={styles.teamLogo}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.matchTime}>{timeLeft(item.batting_start_date, item.batting_start_time)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (isFocused) {
      getBannerArr();
      getMatchArr();
    }
  }, [isFocused]);

  return (
    <View style={mainStyles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View
              style={{
                ...mainStyles.flexColumn,
                backgroundColor: PRIMARY_COLOR,
              }}>
              <View style={styles.headerRow}>
                <View>
                  <MIcon name="account-circle" color={WHITE} size={25} />
                </View>
                <View style={{ maxHeight: 50 }}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                  />
                </View>
                <View>
                  <MCIcon name="bell" color={WHITE} size={23} />
                </View>
              </View>

              <View style={styles.headerRow}>
                <View>
                  <Text style={[styles.headerText, styles.headerTextActive]}>
                    CRICKET
                  </Text>
                </View>
                <View>
                  <Text style={styles.headerText}>KABBADI</Text>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', marginHorizontal: 20 }}>
              <SliderBox
                images={bannerArr}
                parentWidth={wp(100) - 40}
                sliderBoxHeight={150}
              />
            </View>

            <View style={styles.upcomingMatchesContainer}>
              <Text style={styles.upcomingMatchesText}>Upcoming Matches</Text>
            </View>
          </>
        }
        data={matchArr}
        renderItem={renderMatch}
        scrollEnabled={true}
        keyExtractor={(item, index) => `${item.id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: LIGHT_GREY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTextActive: {
    color: GOLD,
    borderBottomColor: GOLD,
    borderBottomWidth: 4,
  },
  headerRow: {
    ...mainStyles.flexRow,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    padding: 0,
    marginTop: 10,
  },
  logo: {
    resizeMode: 'contain',
    maxHeight: 50,
  },
  teamLogo: {
    height: 30,
    width: 30,
  },

  matchContainer: {
    marginHorizontal: 20,
    marginVertical: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,

    // backgroundColor:'red'
  },
  matchContainerInner: {
    ...mainStyles.flexColumn,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },

  teamContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamNameContainer: {
    margin: 5,
  },
  teamNameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  vsImgContainer: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
  },
  vsImg: {
    maxWidth: '100%',
    marginHorizontal: 5,
  },
  vsTextContainer: {
    flex: 1,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: BROWN,
  },

  upcomingMatchesContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 5,
  },
  upcomingMatchesText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  matchSeriesContainer: {
    
  },
  matchSeriesText: {
    fontSize:10,
    color:BROWN
  },
  matchTimeContainer: {

  },
  matchTime:{
    fontSize:10,
    color:PRIMARY_COLOR,
    fontWeight:'bold'
  }
});
