/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Input,
  InputTexarea,
  InputDisabled,
  InputDisabledText,
  Button,
} from '../style';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { Text } from 'react-native-animatable';
import api from '~/services/service';
import AsyncStorage from '@react-native-community/async-storage';
import { isOnLoading, toast } from '~/components/util/loading';

const IdiomaForm = (props) => {
  const [formData, setFormData] = useState({});
  const [curriculoId, setCurriculoId] = useState({});
  const [candidatoId, setCandidatoId] = useState('');
  const [idiomas, setIdiomas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const user = await AsyncStorage.getItem('@jobs:user');
      const { PessoaId } = JSON.parse(user);
      setCandidatoId(PessoaId);
      if (user) {
        const response = await api.fetch({
          getById: {
            value: PessoaId,
            field: 'Id',
            consts: 'CandidatoId',
          },
          table: 'Curriculo',
          properties: 'Id',
        });

        if (response.ok) {
          const { data } = response;
          setCurriculoId(data.Id);
        }
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const idioma = await api.fetch({
        table: 'Idiomas',
        properties: `Id
      Designacao`,
      });

      if (!idioma.ok) {
        return;
      }

      const { data } = idioma;

      setIdiomas(
        data.map((idio) => {
          return {
            value: idio.Id,
            label: idio.Designacao,
          };
        }),
      );
    }

    loadData();
  }, []);

  const handleChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    formData.PessoaId = candidatoId;

    const response = await api.store({
      table: 'Pessoaidiomas',
      type: 'STORE',
      useExclamation: false,
      properties: 'Id',
      value: formData,
    });
    setIsLoading(false);
    if (response.errors) {
      return props.result({
        ok: 'error',
        message: response.errors[0].message,
      });
    }

    props.result({
      ok: 'success',
      message: 'Idioma adicionada.',
    });
  };

  return (
    <View style={styles.formInput}>
      <InputDisabled>
        <RNPickerSelect
          onValueChange={(value) => handleChange({ name: 'IdiomaId', value })}
          items={idiomas}
        />
      </InputDisabled>
      <Input
        style={{ width: 160 }}
        placeholder="Percentagem %"
        onChangeText={(e) => {
          handleChange({ name: 'Percentagem', value: e });
        }}
      />
      <Button onPress={handleSubmit}>
        {isLoading ? (
          isOnLoading()
        ) : (
          <Text style={{ color: 'white' }}> Salvar </Text>
        )}
      </Button>
    </View>
  );
};

export default IdiomaForm;

const styles = StyleSheet.create({
  formInput: {
    // justifyContent: 'center',
  },
});
