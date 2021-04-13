import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Animated,
  Easing,
  Button,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';

import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WHITE,
  BLACK,
} from '../globals/colors';
import { mainStyles } from '../globals/styles';

import { login, storeUserJwt } from '../services/user.service';

import { showToast } from '../utils/toast';
import { loginContext } from '../navigators/RootStack'

export default function Login({ navigation, ...props }) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef('');
  const [isLoggedIn, setIsLoggedIn] = useContext(loginContext)
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const isFocused = useIsFocused();

  const slideToPassword = () => {
    setShowPassword(true);
    Animated.timing(slideAnim, {
      toValue: -wp(100),
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const slideToLogin = () => {
    setShowPassword(false);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = async () => {
    try {
      const res = await login({
        email: email,
        password: password,
        phone: parseInt(phone),
      });
      if (res.data.success) {
        // console.log(res.data.data.token)
        showToast({
          text1: 'Success',
          text2: 'Login Successfull',
          type: 'success',
        });
        await storeUserJwt(res.data.data.token);
        setIsLoggedIn(true)
      } else {
        console.log(res.data);
        // showToast({text1:'Error', text2:error.response.data.error, type:'error'})
        for (const property in res.data.error) {
          for (el of res.data.error[property]) {
            console.log(el);
            showToast({ text1: 'Error', text2: el, type: 'error' });
            break;
          }
          break;
        }
        slideToLogin();
      }
    } catch (error) {
      console.error(error.response.data.error);
      showToast({
        text1: 'Error',
        text2: error.response.data.error,
        type: 'error',
      });
      slideToLogin();
      // console.log(typeof error)
      // if(typeof error[0] == 'string')
      // console.log("str")
    }
  };

  useEffect(() => {
    const backAction = () => {
      console.log('BACK HANDLER');
      console.log(showPassword);
      if (showPassword) slideToLogin();
      return true;
    };

    let backHandler;

    if (isFocused)
      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    if (!isFocused) {
      backHandler?.remove();
      setShowPassword(false)
      Animated.timing(slideAnim).reset();
    }

    return () => {
      backHandler?.remove();
      setShowPassword(false)
      Animated.timing(slideAnim).reset();
    };
  }, [isFocused]);

  return (
    <View style={mainStyles.container}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
        <Image source={require('../assets/svg_top.png')} style={styles.image} />
      </View>

      <View style={{ flex: 2, flexBasis: 100 }}>
        <View style={{ padding: 15 }}>
          <Text
            style={{ color: PRIMARY_COLOR, fontSize: 18, fontWeight: 'bold' }}>
            LOGIN
          </Text>
        </View>
        <Animated.View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: wp(200),
            transform: [{ translateX: slideAnim }],
          }}>
          <View style={{ width: wp(100), padding: 15 }}>
            <KeyboardAvoidingView enabled={true}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Your Email"
                value={email}
                keyboardType='email-address'
                returnKeyType="next"
                onSubmitEditing={()=>{slideToPassword(); passwordRef.current.focus()}}
                onChangeText={val => setEmail(val)}
              />
            </KeyboardAvoidingView>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 30,
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Or</Text>
            </View>
            <KeyboardAvoidingView enabled={true}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Your Phone"
                value={phone}
                onChangeText={val => setPhone(val)}
                returnKeyType="next"
                onSubmitEditing={()=>{slideToPassword(); passwordRef.current.focus()}}
                keyboardType="numeric"
              />
            </KeyboardAvoidingView>
          </View>

          <View
            style={{
              width: wp(100),
              height: '100%',
              padding: 15,
            }}>
            <KeyboardAvoidingView enabled={true}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Your Password"
                value={password}
                onChangeText={val => setPassword(val)}
                onSubmitEditing={()=>{handleLogin()}}
                secureTextEntry={true}
                ref={passwordRef}
              />
            </KeyboardAvoidingView>
          </View>
        </Animated.View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: 30,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => (showPassword ? handleLogin() : slideToPassword())}
              style={{
                backgroundColor: PRIMARY_COLOR,
                color: WHITE,
                paddingHorizontal: 40,
                paddingVertical: 10,
                borderRadius: 5,
              }}>
              <Text style={{ color: WHITE }}>
                {showPassword ? 'Login' : 'Next'}
              </Text>
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.register}>Not a Member? </Text>
              <TouchableOpacity>
                <Text style={[styles.register, { color: PRIMARY_COLOR }]}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1.2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}>
        <Image
          source={require('../assets/svg_bottom.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    paddingVertical: 2,
    marginTop: 0,
    color:BLACK
  },
  image: {
    maxHeight: '100%',
    resizeMode: 'stretch',
  },
  register:{
    fontSize:11,
  },
});
