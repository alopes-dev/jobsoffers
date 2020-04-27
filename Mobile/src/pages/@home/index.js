/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import Categories from '~/components/home/categories';
import OportunitiesCards from './components/home.oportunities';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Colores from '~/config/Colores';

const Home = ({ navigation, data, ...rest }) => {
  let startHeaderHeight = 80;
  useEffect(() => {
    if (Platform.OS === 'android') {
      startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }, []);

  const renderOportunities = () => {
    const { loading, error, allOportunidades } = data;
    if (loading) {
      return (
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
        >
          <Text>Erro...</Text>
        </View>
      );
    }

    return allOportunidades.map((item, i) => {
      const { Designacao } = item.TipoFuncao && item.TipoFuncao;
      return (
        <OportunitiesCards
          item={item}
          key={i}
          navigation={navigation}
          title={Designacao}
          source={require('~/assets/experiences.jpg')}
          subTitle="Recurso à radiação electromagnética em gamas de frequência"
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, backgroundColor: Colores.backgroundColor }}>
        <View
          style={{
            height: startHeaderHeight,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          }}
        >
          <View style={styles.inputContainer}>
            <Icon
              name="ios-search"
              size={20}
              style={{ marginRight: 10, marginTop: 13 }}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Oportunidades"
              placeholderTextColor="grey"
              style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
            />
          </View>
        </View>
        <ScrollView scrollEventThrottle={16}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingTop: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                marginHorizontal: 20,
                marginBottom: 20,
              }}
            >
              What can we help you find, Varun
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Categories
                navigation={navigation}
                source={require('~/assets/home.jpg')}
              />
              <Categories
                navigation={navigation}
                source={require('~/assets/experiences.jpg')}
              />
              <Categories
                navigation={navigation}
                source={require('~/assets/experiences.jpg')}
              />
              <Categories
                navigation={navigation}
                source={require('~/assets/experiences.jpg')}
              />
              <Categories
                navigation={navigation}
                source={require('~/assets/restaurant.jpg')}
              />
            </ScrollView>
          </View>

          {renderOportunities()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 2.4,
    marginTop: Platform.OS === 'android' ? 1 : null,
  },
});
export default graphql(
  gql`
    query {
      allOportunidades {
        Id
        TipoFuncao {
          Designacao
        }
      }
    }
  `,
)(Home);
