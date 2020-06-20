import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
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

const HobbesForm = (props) => {
  const [formData, setFormData] = useState({});
  const [curriculoId, setCurriculoId] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const user = await AsyncStorage.getItem('@jobs:user');
      const { PessoaId } = JSON.parse(user);
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

  const handleChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    formData.CurriculoId = curriculoId;

    const response = await api.store({
      table: 'Hobes',
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
      message: 'Hobbes adicionada.',
    });
  };

  return (
    <View style={styles.formInput}>
      <Input
        placeholder="Designação"
        onChangeText={(e) => {
          handleChange({ name: 'Designacao', value: e });
        }}
      />
      <Input
        style={{ width: 160 }}
        placeholder="Percentagem %"
        onChangeText={(e) => {
          handleChange({ name: 'Percentagem', value: e });
        }}
      />

      <InputTexarea
        multiline={true}
        returnKeyType="done"
        onChangeText={(e) => {
          handleChange({ name: 'Descricao', value: e });
        }}
      />
      <Button onPress={handleSubmit}>
        {isLoading ? (
          isOnLoading()
        ) : (
          <Text style={{ color: 'white' }}>Salvar</Text>
        )}
      </Button>
    </View>
  );
};

export default HobbesForm;

const styles = StyleSheet.create({
  formInput: {
    // justifyContent: 'center',
  },
});
