/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image } from 'react-native';

const Categories = ({ source }) => {
  return (
    <View
      style={{
        height: 130,
        width: 130,
        marginLeft: 20,
        borderWidth: 0.5,
        borderColor: '#ddd',
      }}
    >
      <View style={{ flex: 2 }}>
        <Image
          source={source}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
        <Text>Something </Text>
      </View>
    </View>
  );
};

export default Categories;
