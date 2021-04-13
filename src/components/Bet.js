import React from 'react';
import { StyleSheet, View, Text, SectionList, Image } from 'react-native';

import {
  PRIMARY_COLOR,
  DARK_GRAY,
  LIGHTER_GRAY,
  LIGHT_GRAY,
  WHITE,
  BLACK,
  DARKER_GRAY
} from '../globals/colors';
import { mainStyles } from '../globals/styles';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import { shortenTeamName } from '../utils/team';
import { timeLeft } from '../utils/generalUtils';

const DATA = [
  {
    title: 'Mega Contest',
    data: [
      {
        totalWinning: 'Rs.50 Lakh',
        winners: 100000,
        teams: 200000,
        teamsLeft: 166970,
        joinFee: 34,
      },
      {
        totalWinning: 'Rs.15 Lakh',
        winners: 115000,
        teams: 200000,
        teamsLeft: 154899,
        joinFee: 10,
      },
    ],
  },
  {
    title: 'Hot Contest',
    data: [
      {
        totalWinning: 'Rs.50 Lakh',
        winners: 100000,
        teams: 200000,
        teamsLeft: 166970,
        joinFee: 34,
      },
      {
        totalWinning: 'Rs.15 Lakh',
        winners: 115000,
        teams: 200000,
        teamsLeft: 154899,
        joinFee: 10,
      },
    ],
  },
];

export default function Bet(props) {
  const renderSectionHeading = ({ section }) => {
    return (
      <View style={styles.sectionheadingContainer}>
        <View style={styles.sectionheadingImageContainer}>
          <Image
            source={require('../assets/police_badge.png')}
            style={styles.sectionheadingImage}
          />
        </View>
        <View style={styles.sectionheadingTextContainer}>
          <Text style={styles.sectionheadingMainText}>{section.title}</Text>
          <Text style={styles.sectionheadingSubText}>
            Get ready for mega winnings!
          </Text>
        </View>
      </View>
    );
  };

  const renderItems = ({ item }) => {
    return (
      <View style={[mainStyles.flexColumn, styles.boxesContainer]}>
        <View style={[mainStyles.flexColumn, styles.mainBoxContainer]}>
          <View style={[mainStyles.flexRow, styles.justifySpaceBetween]}>
            <View style={[mainStyles.flexColumn, ]}>
              <Text style={styles.smallerGreyText}>Total Winning</Text>
              <Text style={styles.boldDarkGreyText}>{item.totalWinning}</Text>
            </View>
            <View style={[mainStyles.flexColumn, styles.alignEnd]}>
              <Text style={styles.smallGreyText}>Winners</Text>
              <View style={[mainStyles.flexRow, mainStyles.flexCenter]}>
                <Text style={styles.smallBlueText}>{item.winners}</Text>
                <MIcon name="keyboard-arrow-down" size={12} />
              </View>
            </View>
          </View>

          <View style={[mainStyles.flexRow, styles.progressbarContainer]}>
            <View
              style={[
                styles.progressbarFilled,
                { flex: (item.teams - item.teamsLeft) / item.teams },
              ]}></View>
            <View
              style={[
                styles.progressbarLeft,
                { flex: item.teamsLeft / item.teams },
              ]}></View>
          </View>

          <View style={[mainStyles.flexRow, styles.justifySpaceBetween]}>
            <Text  style={styles.smallGreyText}>{item.teamsLeft} left</Text>
            <Text style={styles.smallDarkGreyText}>{item.teams} teams</Text>
          </View>
        </View>
        <View style={[mainStyles.flexRow, styles.subBoxContainer, styles.justifySpaceBetween]}>
          <View style={[mainStyles.flexRow, mainStyles.flexCenter]}>
            <Text style={styles.boxText}>C</Text>
            <Text style={styles.boxText}>M</Text>
          </View>

          <View style={[mainStyles.flexRow, mainStyles.flexCenter]}>
            <Text style={styles.smallGreyText}> Join Fees</Text>
            <Text style={styles.blueBoxText}>₹{item.joinFee}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[mainStyles.container, { backgroundColor: LIGHTER_GRAY }]}>
      <View style={styles.allContestsContainer}>
        <Text style={styles.allContestsText}>All Contexts</Text>
        <MIcon name="arrow-forward-ios" size={10} color={WHITE} />
      </View>

      <View style={{ flex: 1 }}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItems}
          renderSectionHeader={renderSectionHeading}
        />
      </View>

      <View style={[mainStyles.flexRow, styles.bottomContainer]}>
        <View style={[mainStyles.flexRow, styles.bottomSections]}>
          <Text style={styles.bottomText}>My Contests</Text>
          <Text style={styles.bottomText}>(2)</Text>
        </View>
        <View
          style={[
            mainStyles.flexRow,
            styles.bottomSections,
            styles.bottomBorderLeft,
          ]}>
          <Text style={styles.bottomText}>My Play</Text>
          <Text style={styles.bottomText}>(2)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    padding: 5,
    backgroundColor: PRIMARY_COLOR,
  },

  bottomSections: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  bottomBorderRight: {
    borderRightWidth: 1,
    borderRightColor: WHITE,
  },
  bottomBorderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: WHITE,
  },
  bottomText: {
    color: LIGHT_GRAY,
  },
  allContestsContainer: {
    ...mainStyles.flexRow,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    padding: 7,
    borderRadius: 5,
  },
  allContestsText: {
    flex: 1,
    color: WHITE,
  },
  sectionheadingContainer: {
    ...mainStyles.flexRow,
    margin: 10,
  },
  sectionheadingImageContainer: {
    display: 'flex',
  },
  sectionheadingImage: {
    width: 30,
    height: 30,
  },
  sectionheadingTextContainer: {
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sectionheadingMainText: {
    // fontSize:14,
    fontWeight: 'bold',
    color: DARK_GRAY,
  },
  sectionheadingSubText: {
    fontSize: 9,
    color: LIGHT_GRAY,
  },

  boxesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  mainBoxContainer: {
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
    borderRadius: 10,
    padding:7,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },

  justifySpaceBetween:{
    justifyContent:'space-between'
  },

  progressbarContainer: {
    marginVertical:4
  },
  progressbarFilled: {
    height: 4,
    backgroundColor: PRIMARY_COLOR,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  progressbarLeft: {
    height: 4,
    backgroundColor: LIGHTER_GRAY,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },


  subBoxContainer: {
    borderColor: 'transparent',
    borderWidth: 1,
    marginHorizontal: 90,
    backgroundColor: LIGHTER_GRAY,
    paddingHorizontal:7,
    paddingVertical:4,
    width: '95%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  smallGreyText:{
    color:DARK_GRAY,
    fontSize:10
  },
  smallerGreyText:{
    color:DARK_GRAY,
    fontSize:8
  },

  smallDarkGreyText:{
    color:DARKER_GRAY,
    fontSize:10
  },
  boldDarkGreyText:{
    color:DARKER_GRAY,
    fontWeight:'bold'
  },
  alignEnd:{
    alignItems:'flex-end'
  },
  boxText:{
    color:DARK_GRAY,
    paddingHorizontal:4,
    paddingVertical:1,
    borderRadius:2,
    fontSize:8,
    marginRight:5,
    borderColor:DARK_GRAY,
    borderWidth:1,
    textAlign:'center',
    textAlignVertical:'center'
  },
  smallBlueText:{
    color:PRIMARY_COLOR,
    fontSize:12,
    fontWeight:'bold'
  },
  blueBoxText:{
    backgroundColor:PRIMARY_COLOR,
    color:WHITE,
    padding:1,
    marginLeft:3,
    paddingHorizontal:10,
    fontSize:10,
    borderRadius:4
    
  }

});
