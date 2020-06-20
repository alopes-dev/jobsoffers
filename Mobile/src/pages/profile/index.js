/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  Container,
  Header,
  Body,
  Avatar,
  User,
  Name,
  Bio,
  Details,
  Score,
  Value,
  Description,
  ListContainer,
  Item,
  TextItem,
} from './style';
import Colores from '~/config/Colores';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function Profile({ navigation }) {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={'#0186ae'} />
      <Header width={width}>
        <ImageBackground
          resizeMode="cover"
          source={require('~/assets/headerJobs.png')}
          style={styles.image}
        >
          <View style={{ flex: 2 }}>
            <Name>António Lopes</Name>
            <Bio>Eng. Informatico, 3 anos de Experiência</Bio>
            <Details>
              <Score>
                <Value>21</Value>
                <Description>Vagas</Description>
              </Score>
              <Score>
                <Value>66</Value>
                <Description>Vagas</Description>
              </Score>
              <Score>
                <Value>101</Value>
                <Description>Vagas</Description>
              </Score>
            </Details>
          </View>
          <View style={{ flex: 1 }}>
            <User>
              <Avatar source={require('~/assets/avatar.jpg')} />
            </User>
          </View>
        </ImageBackground>
      </Header>
      <Body>
        <ListContainer>
          <TouchableWithoutFeedback
            onPress={(e) => {
              navigation.navigate('ProfileEditing');
            }}
          >
            <Item>
              <SimpleLineIcons name="user" size={22} color={Colores.Primary} />
              <TextItem>Configuração de Perfil</TextItem>
            </Item>
          </TouchableWithoutFeedback>
          <Item>
            <AntDesign name="folder1" size={22} color={Colores.Primary} />
            <TextItem>Document management</TextItem>
          </Item>
          <Item>
            <Icon
              name="ios-notifications-outline"
              size={30}
              color={Colores.Primary}
            />
            <TextItem>Message</TextItem>
          </Item>
          <Item>
            <Icon name="ios-cog" size={28} color={Colores.Primary} />
            <TextItem>Settings</TextItem>
          </Item>
          <Item>
            <AntDesign
              name="customerservice"
              size={26}
              color={Colores.Primary}
            />
            <TextItem>Recycle bin</TextItem>
          </Item>
          <Item>
            <Icon
              name="ios-help-circle-outline"
              size={28}
              color={Colores.Primary}
            />
            <TextItem>Helper Center</TextItem>
          </Item>
        </ListContainer>
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'row',
  },
});
