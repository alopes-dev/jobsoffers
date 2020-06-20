/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { IconButton, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { useAuth } from '~/contexts/auth';

const PersonalInformation = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.coverImage}>
        <Text style={{ color: '#fff' }}>Cima</Text>
      </View>
      <View style={styles.settingsDetails}>
        <View style={styles.settingsCard}>
          <View style={{ flex: 1 }}>
            <View style={styles.Image}>
              <Avatar.Image
                size={100}
                source={require('~/assets/avatar.jpg')}
              />
              <View style={styles.avatarIcon}>
                {/* <Avatar.Icon
                  size={24}
                  icon="camera"
                  // color={Colors.red500}
                  style={{ backgroundColor: 'black' }}
                /> */}
                <IconButton
                  icon="camera"
                  // color={Colors.grey500}
                  size={17}
                  onPress={() => console.log('Pressed')}
                />
              </View>
            </View>
          </View>
          <View style={styles.username}>
            <Text style={{ fontWeight: '600', fontSize: 15 }}>
              {user.UserName}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', marginVertical: 3 }}>
              <Icon
                name="ios-pin"
                size={14}
                color="#757575"
                // style={{ marginRight: 10, marginTop: 13 }}
              />
              <Text
                style={{
                  marginHorizontal: 5,
                  color: '#757575',
                  fontSize: 11,
                  flex: 2,
                }}
              >
                Cassenda, Luanda
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343530',
    color: '#fff',
  },
  coverImage: {
    flex: 1.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsDetails: {
    flex: 3,
    position: 'relative',
  },
  settingsCard: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    borderTopRightRadius: 38,
    borderTopLeftRadius: 38,
    flexDirection: 'row',
  },
  Image: {
    position: 'absolute',
    left: 28,
    top: -40,
    shadowColor: 'white',
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 5,
  },
  avatarIcon: {
    position: 'absolute',
    bottom: 3,
    right: -6,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 4,
  },
  username: {
    flex: 1.3,
    marginVertical: 10,
  },
});
export default PersonalInformation;
