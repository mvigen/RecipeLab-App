import CookieManager from '@react-native-cookies/cookies';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../navigation/types';
import {statusType, userContext} from '../../userContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Snackbar} from 'react-native-paper';
import {Colors} from '../../enums/enums';
import {useTranslation} from 'react-i18next';

const LoginButton = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    setIsSignedin,
    user,
    setStatus,
    isSignedIn,
  } = useContext(userContext);
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await axios
        .get(`https://www.api.recipelab.dk/google/verify-token`, {
          headers: {
            Authorization: 'Bearer' + ' ' + userInfo.idToken ?? '',
          },
          timeout: 1000,
        })
        .then(response => {
          setIsSignedin(true);
        })
        .catch(error => {
          setStatus({
            showToast: true,
            statusMsg: error.message,
            type: statusType.ERROR,
          });
          const signOut = async () => {
            try {
              await GoogleSignin.signOut();
              CookieManager.clearAll();
              navigation.navigate('Recipe');
            } catch (error) {
              console.error(error);
            }
          };
          signOut();
        });
    } catch (error) {
      setStatus({
        showToast: true,
        statusMsg: error,
        type: statusType.ERROR,
      });
    }
  };
  return (
    <View>
      {isSignedIn ? (
        <Icon
          style={{marginRight: 20}}
          size={25}
          name="menu"
          onPress={() => {
            setIsDrawerOpen(!isDrawerOpen);
          }}></Icon>
      ) : (
        <Button
          style={{marginRight: 20}}
          icon="login"
          color={Colors.PRIMARY}
          onPress={() => {
            signIn();
          }}>
          {t('drawer.Login')}
        </Button>
      )}
    </View>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  toast: {
    margin: 0,
    transform: [{translateY: 645, translateX: -190}],
  },
});
