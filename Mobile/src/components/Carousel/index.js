import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import CarouselItem, { CarouselItemVertical } from './items';

const { width } = Dimensions.get('window');

const Carousel = ({ data, listOrGrid, navigation }) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(_, index) => 'key' + index}
          horizontal={listOrGrid}
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return listOrGrid ? (
              <CarouselItem item={item} navigation={navigation} />
            ) : (
              <CarouselItemVertical
                item={item}
                index={index}
                navigation={navigation}
              />
            );
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: false },
          )}
        />
        {listOrGrid ? (
          <View style={styles.dotView}>
            {data.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
                useNativeDriver: true,
              });
              return (
                <Animated.View key={i} style={{ ...styles.views, opacity }} />
              );
            })}
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }

  console.log('Please provide Images');
  return null;
};

const styles = StyleSheet.create({
  dotView: { flexDirection: 'row', justifyContent: 'center' },
  views: {
    height: 5,
    width: 5,
    backgroundColor: '#595959',
    margin: 8,
    borderRadius: 5,
  },
});

export default Carousel;
