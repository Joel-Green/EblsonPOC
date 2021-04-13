import React, { useState, createContext, useEffect } from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import Login from '../components/Login';
import Bet from '../components/Bet';
import DashboardBottomTab from './DashboardBottomTab';

import { getUserJwt } from '../services/user.service';


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

                  // headerTitle: () => {
                  //   return (
                  //     <View style={styles.flexColumn}>
                  //       <View style={styles.flexRow}>
                  //         <Text style={[styles.txtWhite, styles.heading]}>
                  //           {route.params.match.first_team}
                  //         </Text>
                  //         <Text style={[styles.txtWhite, styles.vsTxt]}>
                  //           vs
                  //         </Text>
                  //         <Text style={[styles.txtWhite, styles.heading]}>
                  //           {route.params.second_team}
                  //         </Text>
                  //       </View>
                  //       <Text style={styles.txtWhite}>{route.params.time}</Text>
                  //     </View>
                  //   );
                  // },
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
  teamName:{

  },
  Vs:{

  },
  time:{

  }
})
