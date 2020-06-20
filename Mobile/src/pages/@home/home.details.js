/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Colores from '~/config/Colores';
import {
  Paragraph,
  Caption,
  Subheading,
  Divider,
  FAB,
  IconButton,
  Colors,
} from 'react-native-paper';
import Icons from 'react-native-vector-icons/Ionicons';
import { Oportunities } from './home.schemma';

import { isEmpty, numberFormater } from '~/generics';
import { isOnLoading, toast } from '~/components/util/loading';

import { subscribeOportunity } from './home.services';
import { useAuth } from '~/contexts/auth';

const GET_OPORTUNIDADE = gql`
  query Oportunidade($id: String) {
    oportunidadeById(Id: $id) {
      ${Oportunities}
    }
  }
`;

const { width } = Dimensions.get('window');

const renderMore = (data, name) => {
  if (isEmpty(data)) {
    return 'Não Definida';
  }
  return data.map((i, j) => {
    let ln = '\n';
    if (j === data.length - 1) {
      ln = '';
    }
    return i[name] && i[name].Designacao + ln;
  });
};
const renderBeneficio = (data) => {
  if (isEmpty(data)) {
    return <Caption style={styles.TextCaption}>Não Definida</Caption>;
  }
  return data.map((i, j) => {
    return (
      <Caption style={styles.TextCaption} key={j}>
        {i.Beneficio && `${j + 1}º ${i.Beneficio.Designacao}`}
      </Caption>
    );
  });
};

export default function HomeDetails({ navigation, route }) {
  const { user } = useAuth();
  const [timing, setTiming] = useState(false);
  const [icon, setIcon] = useState('ios-add');
  const [finaly, setFinaly] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const onDismissSnackBar = () => {
    setTiming(false);
    navigation.pop();
  };

  useEffect(() => {}, []);
  const {
    params: { itemId },
  } = route;
  const { loading, error, data } = useQuery(GET_OPORTUNIDADE, {
    variables: { id: itemId },
  });

  if (loading) {
    return <View style={styles.container}>{isOnLoading()}</View>;
  }

  if (error) {
    return <Text>Erro...</Text>;
  }
  const {
    Id,
    TipoEmprego,
    DataLimite,
    TipoFuncao,
    Detalhes,
    Cargo,
    NumVagas,
    TipoFormacao,
    Nacionalidade,
    Experiencia,
    CargaHoraria,
    Salario,
    Estado,
    OportunidadeIIdiomas,
    OportunidadeBeneficios,
    OportunidadeCompetencias,
  } = data?.oportunidadeById;

  async function handleCandidatura() {
    setIsLoading(true);
    const res = await subscribeOportunity({
      OportunidadeId: Id,
      CandidatoId: user.PessoaId,
    });

    setIsLoading(false);

    if (res.errors) {
      setFinaly('error');
      setMessage(res.errors[0].message);
      setTiming(true);
      return;
    }
    setFinaly('success');
    setIcon('ios-done-all');
    setMessage('A sua candidatura foi efeturada com successo...');
    setTiming(true);

    setTimeout(() => navigation.pop(), 2000);
  }

  return (
    <SafeAreaView>
      <Modal visible={true} animationType="slide">
        <View style={styles.container}>
          {toast(timing, message, onDismissSnackBar, finaly)}
          <View style={{ ...styles.Remove }}>
            <Icons
              name="ios-close"
              size={38}
              color={Colores.Primary}
              onPress={() => {
                navigation.pop();
              }}
              style={{ marginTop: 10, marginRight: 15 }}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cardContainer}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.2 }}>
                  <Icons
                    name="ios-contacts"
                    size={30}
                    color={Colores.Primary}
                  />
                </View>
                <View style={{ flex: 1.2 }}>
                  <Subheading style={{ color: Colores.TextColor }}>
                    Contrato
                  </Subheading>
                  <View style={{ height: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Tipo contrato:
                      </Text>
                      <Caption style={styles.TextCaption}>
                        {TipoEmprego && TipoEmprego.Designacao}
                      </Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Oferta aberta até :
                      </Text>
                      <Caption style={styles.TextCaption}>{DataLimite}</Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>Salário :</Text>
                      <Caption style={styles.TextCaption}>
                        {numberFormater(
                          typeof (Salario * 1) === 'number' ? Salario * 1 : 0,
                        )}
                      </Caption>
                    </View>
                  </View>
                </View>
              </View>

              <Divider
                style={{
                  borderColor: '#ccc',
                  borderWidth: StyleSheet.hairlineWidth,
                  marginVertical: 10,
                }}
              />

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.2 }}>
                  <Icons name="ios-heart" size={30} color={'#6ce3a3'} />
                </View>
                <View style={{ flex: 1.2 }}>
                  <Subheading style={{ color: '#6ce3a3' }}>
                    Beneficios
                  </Subheading>
                  <View style={{ height: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      {renderBeneficio(OportunidadeBeneficios)}
                    </View>
                  </View>
                </View>
              </View>

              <Divider
                style={{
                  borderColor: '#ccc',
                  borderWidth: StyleSheet.hairlineWidth,
                  marginVertical: 10,
                }}
              />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.2 }}>
                  <Icons name="ios-paper" size={30} color={'#ff7d8b'} />
                </View>
                <View style={{ flex: 1.2 }}>
                  <Subheading style={{ color: '#ff7d8b' }}>
                    Descrição
                  </Subheading>
                  <View style={{ height: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>Cargo:</Text>
                      <Caption style={styles.TextCaption}>
                        {Cargo && Cargo.Designacao}
                      </Caption>
                    </View>
                  </View>
                  <View style={{ height: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>Indústria :</Text>
                      <Caption style={styles.TextCaption}>17/05/2020</Caption>
                    </View>
                  </View>
                  <View style={{ height: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Número de vagas :
                      </Text>
                      <Caption style={styles.TextCaption}>{NumVagas}</Caption>
                    </View>
                  </View>

                  <View>
                    <Text style={{ marginBottom: 5, color: Colores.TextColor }}>
                      Descrição da função :
                    </Text>
                    <Paragraph>
                      At least three years of experience working in developing
                      countries 10 years of experience in water utilities with
                      at least 50,000
                    </Paragraph>
                    <Paragraph>
                      customers, with at least four years in managerial position
                      in commercial area. Fluency in Portuguese or Spanish and
                      working knowledge of English
                    </Paragraph>
                  </View>
                </View>
              </View>

              <Divider
                style={{
                  borderColor: '#ccc',
                  borderWidth: StyleSheet.hairlineWidth,
                  marginVertical: 10,
                }}
              />

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.2 }}>
                  <Icons name="ios-pricetags" size={30} color={'#73deed'} />
                </View>
                <View style={{ flex: 1.2 }}>
                  <Subheading style={{ color: '#73deed' }}>
                    Requisitos
                  </Subheading>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Titulação mínima:
                      </Text>
                      <Caption style={styles.TextCaption}>
                        {TipoFormacao && TipoFormacao.Designacao}
                      </Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Experiência exigida :
                      </Text>
                      <Caption style={styles.TextCaption}>
                        {Experiencia}
                      </Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Carga Horária :
                      </Text>
                      <Caption style={styles.TextCaption}>
                        {CargaHoraria}
                      </Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Nacionalidades :
                      </Text>
                      <Caption style={styles.TextCaption}>
                        {Nacionalidade && Nacionalidade.Designacao}
                      </Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>Línguas :</Text>
                      <Caption style={styles.TextCaption}>
                        {renderMore(OportunidadeIIdiomas, 'Idioma')}
                      </Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Area funcional :
                      </Text>
                      <Caption style={styles.TextCaption}>
                        {TipoFuncao && TipoFuncao.Designacao}
                      </Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Competências :
                      </Text>
                      <Caption style={styles.TextCaption}>
                        {renderMore(OportunidadeCompetencias, 'Competencia')}
                      </Caption>
                    </View>
                  </View>
                  <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.TextCaptionSmall}>
                        Estado da Vaga :
                      </Text>
                      <Caption style={styles.TextCaption}>
                        {Estado && Estado.Designacao}
                      </Caption>
                    </View>
                  </View>

                  <View>
                    <Text style={{ marginBottom: 5, color: Colores.TextColor }}>
                      Detalhes / Aptidões necessárias :
                    </Text>
                    <Paragraph>{Detalhes}</Paragraph>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <FAB
            style={{
              ...styles.fab,
              backgroundColor: isLoading ? 'white' : Colores.Primary,
            }}
            small
            icon={() => {
              return isLoading ? (
                isOnLoading()
              ) : (
                <Icons
                  name={icon}
                  size={32}
                  style={{ textAlign: 'center', color: 'white', marginTop: -3 }}
                />
              );
            }}
            onPress={handleCandidatura}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Remove: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    width: width - 30,
    marginVertical: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  surface: {
    padding: 8,
    height: 80,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  TextInfo: {
    flex: 0.5,
    textAlign: 'right',
    marginRight: 3,
    color: Colores.TextColor,
  },
  TextCaptionSmall: {
    flex: 0.6,
    textAlign: 'right',
    marginRight: 3,
    color: Colores.TextColor,
  },
  TextCaption: { flex: 1, marginLeft: 5 },
});
