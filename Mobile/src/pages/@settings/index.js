/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import Colores from '~/config/Colores';
import { List, RadioButton, Avatar } from 'react-native-paper';
const { height, width } = Dimensions.get('window');

import { useAuth } from '~/contexts/auth';

const SettingsItems = ({ navigation, route }) => {
  const [checked, setchecked] = useState(true);
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colores.backgroundColor,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colores.Primary} />
      <View style={styles.settingHeader}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 20,
              marginHorizontal: 13,
              color: 'white',
              fontWeight: '200',
            }}
          >
            António Lopes
          </Text>
          <Text
            style={{
              marginTop: 2,
              marginHorizontal: 13,
              fontSize: 21,
              color: 'white',
              fontWeight: '700',
            }}
          >
            Configurações
          </Text>
        </View>

        <Avatar.Image
          size={58}
          style={{
            alignItems: 'flex-end',
            marginVertical: 20,
            marginHorizontal: 14,
          }}
          source={require('~/assets/avatar.jpg')}
        />
      </View>
      {/* <ScrollView> */}
      <View style={styles.settingBody}>
        <View style={styles.Item}>
          <Text style={{ marginBottom: 5, paddingLeft: 2 }}>Conta</Text>
          <List.Section style={{ ...styles.Section, borderLeftColor: 'blue' }}>
            <List.Item
              onPress={() => {
                // navigation.navigate('PersonalInfo');
                signOut();
              }}
              title="Personal Information"
              style={{ marginBottom: 0, padding: 0 }}
              right={() => (
                <Image
                  source={require('~/assets/chevron_right.png')}
                  style={{ width: 30, height: 30, tintColor: 'black' }}
                />
              )}
            />
            <List.Item title="Pais" style={{ marginTop: 0, padding: 0 }} />
            <List.Item title="Línguas" style={{ marginTop: 0, padding: 0 }} />
          </List.Section>
        </View>
        <View style={styles.Item}>
          <Text style={{ marginBottom: 5, paddingLeft: 2 }}>
            Privacidade e Segurança
          </Text>
          <List.Section
            style={{ ...styles.Section, borderLeftColor: '#451f6b' }}
          >
            <List.Item
              title="Conta Privada"
              style={{ marginBottom: 0, padding: 0 }}
              right={() => {
                return (
                  <RadioButton
                    value="first"
                    status={checked === true ? 'checked' : 'unchecked'}
                    color={Colores.Primary}
                    onPress={() => {
                      setchecked(!checked);
                    }}
                  />
                );
              }}
            />
            <List.Item
              title="Estado da Actividade"
              style={{ marginTop: 0, padding: 0 }}
              right={() => {
                return (
                  <RadioButton
                    value="first"
                    status={checked === true ? 'unchecked' : 'checked'}
                    color={Colores.Primary}
                    onPress={() => {
                      setchecked(!checked);
                    }}
                  />
                );
              }}
            />
            <List.Item
              title="Contas Bloqueadas"
              style={{ marginTop: 0, padding: 0 }}
              right={() => (
                <Image
                  source={require('~/assets/chevron_right.png')}
                  style={{ width: 30, height: 30, tintColor: 'black' }}
                />
              )}
            />
          </List.Section>
        </View>
        <View style={styles.Item}>
          <Text style={{ marginBottom: 5, paddingLeft: 2 }}>
            Privacidade e Segurança
          </Text>
          <List.Section
            style={{ ...styles.Section, borderLeftColor: '#8e1af8' }}
          >
            <List.Item
              title="Modo Escuro"
              style={{ marginBottom: 0, padding: 0 }}
              right={() => {
                return (
                  <RadioButton
                    value="first"
                    status={checked === true ? 'unchecked' : 'checked'}
                    color={Colores.Primary}
                    onPress={() => {
                      setchecked(!checked);
                    }}
                  />
                );
              }}
            />
            <List.Item
              title="Notificações"
              style={{ marginTop: 0, padding: 0 }}
              right={() => {
                return (
                  <RadioButton
                    value="first"
                    status={checked === true ? 'checked' : 'unchecked'}
                    color={Colores.Primary}
                    onPress={() => {
                      setchecked(!checked);
                    }}
                  />
                );
              }}
            />
          </List.Section>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  settingHeader: {
    backgroundColor: Colores.Primary,
    flex: 0.23,
    flexDirection: 'row',
    width: width,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  settingBody: {
    flex: 1,

    width: width - 40,
    margin: 10,
  },
  Item: {
    marginTop: 8,
    marginBottom: 8,
  },
  Section: {
    borderLeftWidth: 2,

    backgroundColor: 'white',
    marginBottom: 0,
    padding: 8,
    // borderColor: 'white',
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 4,
    // borderWidth: 1,
  },
});

export default SettingsItems;
