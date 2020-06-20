/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';

import Input from '~/components/Fields/input';

const AuthRegister = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <ScrollView>
        <Input
          name="NomeCompleto"
          placeholder="Nome Completo"
          style={styles.textInput}
          placeholderTextColor="white"
        />
        <Input
          name="Email"
          placeholder="E-mail"
          style={styles.textInput}
          placeholderTextColor="white"
        />
        <Input
          name="Has_PassWord"
          placeholder="Palavra Passe"
          secureTextEntry
          style={styles.textInput}
          placeholderTextColor="white"
        />
      </ScrollView>
    </View>
  );
};

export default AuthRegister;

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
