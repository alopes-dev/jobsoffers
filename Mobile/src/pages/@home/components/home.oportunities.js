/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const OportunitiesCards = ({ title, subTitle, source, navigation, item }) => {
  const navigateToDetail = () => {
    navigation.navigate('Details', {
      itemId: item && item.Id,
    });
  };

  return (
    <View style={styles.oportunidadeCard}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '700',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontWeight: '100',
          marginTop: 10,
        }}
      >
        {subTitle}
      </Text>
      <View>
        <TouchableOpacity
          style={styles.opacityButton}
          onPress={navigateToDetail}
        >
          <Image source={source} style={styles.imageView} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OportunitiesCards;

const styles = StyleSheet.create({
  opacityButton: {
    width: width - 75,
    height: 200,
    marginTop: 20,
  },
  imageView: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    height: null,
    width: null,
    resizeMode: 'cover',
  },
  oportunidadeCard: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 8,
  },
});
