import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
import {
  SubmitButton,
  ButtonText,
  Container,
  CardView,
  CardImage,
  CardDesc,
  CardText,
  CardTitle,
} from './style';
const CarouselItem = ({ item, navigation }) => {
  const navigateToDetail = () => {
    navigation.navigate('Details', {
      itemId: item && item.id,
    });
  };
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={{ uri: item.url }} />
      <View style={styles.textView}>
        <Text style={styles.itemTitle}> {item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <View style={styles.Actions}>
        <SubmitButton>
          <ButtonText onPress={navigateToDetail}>Detalhe</ButtonText>
        </SubmitButton>
      </View>
    </View>
  );
};

export const CarouselItemVertical = ({ item, index, navigation }) => {
  const navigateToDetail = () => {
    navigation.navigate('Details', {
      itemId: item?.id,
    });
  };
  console.log(item);
  return (
    <Animatable.View animation="fadeInLeftBig" delay={600 * index}>
      <TouchableOpacity onPress={navigateToDetail}>
        <Container>
          <CardView style={{ width: width - 40, ...styles.CardViewIncr }}>
            <CardImage source={{ uri: item.url }} />
            <CardDesc>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.description.substr(0, 50)}...</CardText>
            </CardDesc>
          </CardView>
        </Container>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 1.4,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  CardViewIncr: {
    shadowColor: '#ccc',
    elevation: 2,
  },
  textView: {
    margin: 10,
    left: 5,
  },
  Actions: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    width: width - 50,
    left: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  itemTitle: {
    color: '#0a0b57',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
  itemDescription: {
    color: 'black',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default CarouselItem;
