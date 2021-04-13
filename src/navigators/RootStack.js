import React, { useState, createContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import Login from '../components/Login';
import Bet from '../components/Bet';
import DashboardBottomTab from './DashboardBottomTab';

import { getUserJwt } from '../services/user.service';

import { PRIMARY_COLOR, WHITE } from '../globals/colors';
import { mainStyles } from '../globals/styles';

import { shortenTeamName } from '../utils/team';
import { timeLeft } from '../utils/generalUtils';

export const loginContext = createContext();

export default function RootStack() {
  const Stack = createStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogin = async () => {
    const val = await getUserJwt();
    if (val) setIsLoggedIn(true);
    else setIsLoggedIn(false);
    SplashScreen.hide();
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <NavigationContainer>
      <loginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Dashboard"
                component={DashboardBottomTab}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Bet"
                component={Bet}
                options={({ route }) => ({
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: PRIMARY_COLOR,
                  },
                  headerTintColor: '#fff',

                  headerTitle: () => {
                    return (
                      <View style={mainStyles.flexColumn}>
                        <View style={mainStyles.flexRow}>
                          <Text style={styles.teamName}>
                            {shortenTeamName(
                              route.params.match.first_team[0].team_name,
                            )}
                          </Text>
                          <Text style={styles.Vs}>vs</Text>
                          <Text style={styles.teamName}>
                            {shortenTeamName(
                              route.params.match.second_team[0].team_name,
                            )}
                          </Text>
                        </View>
                        <Text style={styles.time}>
                          {timeLeft(
                            route.params.match.batting_start_date,
                            route.params.match.batting_start_time,
                          )}
                        </Text>
                      </View>
                    );
                  },
                  // headerRight: () => (
                  //   <TouchableOpacity>
                  //     <Icon
                  //       name="wallet"
                  //       style={{ marginRight: 10 }}
                  //       size={20}
                  //       color="white"
                  //     />
                  //   </TouchableOpacity>
                  // ),
                })}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        <Toast ref={ref => Toast.setRef(ref)} />
      </loginContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  teamName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: WHITE,
  },
  Vs: {
    fontSize: 14,
    color: WHITE,
    marginHorizontal: 4,
  },
  time: {
    fontSize: 12,
    color: WHITE,
  },
});
