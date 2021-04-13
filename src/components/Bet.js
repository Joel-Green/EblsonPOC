import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {} from '../globals/colors';
import { mainStyles } from '../globals/styles';

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
  return (
    <View style={mainStyles.container}>
      <Text>Bet</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
