/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const AuthSignIn = () => {
  return (
    <View style={{ marginTop: 30 }}>
      <TextInput
        placeholder="E-mail / Username"
        style={styles.textInput}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Palavra Passe"
        secureTextEntry
        style={styles.textInput}
        placeholderTextColor="white"
      />
    </View>
  );
};

export default AuthSignIn;

const styles = StyleSheet.create({
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
});
