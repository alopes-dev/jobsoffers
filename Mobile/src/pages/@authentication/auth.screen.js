/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  StatusBar,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import { Avatar, Snackbar } from 'react-native-paper';

import AuthRegister from './auth.register';
import AuthSignIn from './auth.signIn';

import { useAuth } from '~/contexts/auth';

import { Form } from '@unform/mobile';
import * as yup from 'yup';
import unFormValidator from '~/components/Fields/validation';

const { height, width } = Dimensions.get('window');

const AuthenticationScreen = () => {
  const { signIn, signUp, isProcessing, flag } = useAuth();
  const formRef = useRef(null);
  const [timer, setTimer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [signInAnimation, setSignInAnimation] = useState('fadeInRightBig');
  const [registerAnimation, setRegisterAnimation] = useState('fadeInRightBig');

  const { isOpen, message } = flag;

  function handleClick() {
    // signIn();
    formRef.current.submitForm();
  }

  function haveACount() {
    return (
      <Text style={{ color: '#fff' }}>
        Já tem uma conta.{'  '}
        <Text
          style={{ color: '#3464B0' }}
          onPress={() => {
            setRegisterAnimation('fadeOutLeftBig');
            setSignInAnimation('fadeInRightBig');
            setTimeout(() => {
              setTimer(false);
            }, 500);
          }}
        >
          Entrar.
        </Text>
      </Text>
    );
  }

  function haveNotACount() {
    return (
      <Text style={{ color: '#fff' }}>
        Não tem uma connta?{'  '}
        <Text
          style={{ color: '#3464B0' }}
          onPress={() => {
            setSignInAnimation('fadeOutLeftBig');
            setRegisterAnimation('fadeInRightBig');
            setTimeout(() => {
              setTimer(true);
            }, 500);
          }}
        >
          Registra-se.
        </Text>
      </Text>
    );
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onDismissSnackBar = () => setVisible(false);

  async function handleSubmit(data, { reset }) {
    // let schema = {
    //   Email: yup.string().required().email(),
    //   Has_PassWord: yup.string().required(),
    //   NomeCompleto: yup.string().required(),
    // };
    let schema = {
      PassWord: yup.string().required(),
      UserName: yup.string().required(),
    };

    let { success, data: values } = await unFormValidator(
      formRef,
      { data, reset },
      schema,
    );

    if (!success) {
      return setVisible(true);
    }

    // signUp(values);
    signIn(values);
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0186ae" />
      <Snackbar visible={isOpen} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
      <LinearGradient
        colors={['#0186ae', '#3fb3aa']}
        style={styles.linearGradient}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <View style={styles.inputContainer}>
            <View style={styles.logo}>
              <Avatar.Image
                size={140}
                style={{ backgroundColor: 'transparent' }}
                source={require('~/assets/jobs.png')}
              />
            </View>
            {timer ? (
              <Animatable.View animation={registerAnimation}>
                <AuthRegister />
              </Animatable.View>
            ) : (
              <Animatable.View animation={signInAnimation}>
                <AuthSignIn />
              </Animatable.View>
            )}

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              {timer ? haveACount() : haveNotACount()}
            </View>
          </View>
          <Animatable.View
            style={{ flex: 1.1 }}
            duration={500}
            animation={isKeyboardVisible ? 'fadeOutDownBig' : 'fadeInUpBig'}
          >
            <ImageBackground
              resizeMode="cover"
              duration={500}
              source={require('~/assets/Elipse.png')}
              style={styles.image}
            >
              <View
                style={{
                  width: width,
                  flex: 1,
                  height: height,
                }}
              >
                <TouchableWithoutFeedback onPress={handleClick}>
                  <View style={styles.signIn}>
                    {isProcessing ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <ActivityIndicator size="large" color="#0186ae" />
                      </View>
                    ) : (
                      <Avatar.Icon
                        size={24}
                        icon={() => (
                          <Icons
                            name="ios-arrow-round-forward"
                            size={32}
                            style={{
                              textAlign: 'center',
                              color: '#0186ae',
                              zIndex: 9,
                            }}
                          />
                        )}
                        style={{ backgroundColor: 'white' }}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width,
                    position: 'absolute',
                    bottom: '40%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: '#000' }}>
                    Também pode entrar com :{' '}
                  </Text>
                </View>
                <View style={styles.bottomActions}>
                  <Avatar.Icon
                    size={48}
                    icon="facebook"
                    style={styles.action}
                  />
                  <Avatar.Icon size={48} icon="gmail" style={styles.action} />
                  <Avatar.Icon size={48} icon="outlook" style={styles.action} />
                </View>
              </View>
            </ImageBackground>
          </Animatable.View>
        </Form>
      </LinearGradient>
    </View>
  );
};

export default AuthenticationScreen;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  inputContainer: {
    height: 460,
    flex: 2,
  },
  bottomOptions: {
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    flex: 1,
  },
  signIn: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#0186ae',
    shadowOpacity: 0.2,
    elevation: 4,
    borderColor: '#0186ae',
    // borderWidth: 1,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 45,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 20,
    marginVertical: 8,
    backgroundColor: '#33a4b1',
    color: 'white',
    borderColor: '#33a4b1',
  },
  bottomActions: {
    flexDirection: 'row',
    width: width,
    // bottom: '-40%',
    height: height - 620 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    marginHorizontal: 10,
    backgroundColor: '#0186ae',
  },
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
});
