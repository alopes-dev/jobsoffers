/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import {
  SafeArea,
  Container,
  Header,
  Title,
  Actions,
  SwitchBar,
} from './styles';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Carousel from '~/components/Carousel';

const dummyData = [
  {
    title: 'Anise Aroma Art Bazar',
    url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 1,
  },
  {
    title: 'Food inside a Bowl',
    url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 2,
  },
  {
    title: 'Vegatable Salad',
    url:
      'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 3,
  },
  {
    title: 'Vegatable Salad',
    url:
      'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 3,
  },
];

function Oportunities({ navigation, data, ...rest }) {
  const [listOrGrid, setListOrGrid] = useState(true);

  const [oportunidade, SetOportunidade] = useState([]);

  const renderOportunities = () => {
    const { loading, error, vagasDisponiveis } = data;
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

    return vagasDisponiveis.map((item) => {
      const { Designacao } = item.TipoFuncao && item.TipoFuncao;
      return {
        title: Designacao,
        url:
          'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
        description: item.Detalhes,
        id: item.Id,
      };
    });
  };
  // renderOportunities();

  return (
    <SafeArea>
      <Container>
        <Header>
          <Actions>
            <Title>Vagas Disponíveis</Title>
            <SwitchBar>
              <TouchableOpacity>
                <Ionicons
                  onPress={() => {
                    setListOrGrid(false);
                  }}
                  style={{
                    ...styles.Icon,
                    color: listOrGrid ? 'white' : '#305561',
                  }}
                  name="ios-list"
                  size={23}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons
                  onPress={() => {
                    setListOrGrid(true);
                  }}
                  style={{
                    ...styles.Icon,
                    color: listOrGrid ? '#305561' : 'white',
                  }}
                  name="ios-square"
                  size={23}
                />
              </TouchableOpacity>
            </SwitchBar>
          </Actions>
        </Header>
        <View>
          <Carousel
            navigation={navigation}
            data={renderOportunities()}
            listOrGrid={listOrGrid}
          />
        </View>
      </Container>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  Icon: {
    marginLeft: 10,
    marginBottom: 15,
  },
});

export default graphql(
  gql`
    query {
      vagasDisponiveis {
        Id
        Detalhes
        TipoFuncao {
          Designacao
        }
      }
    }
  `,
)(Oportunities);
