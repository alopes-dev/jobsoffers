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

const DetailsForm = (props) => {
  const [formData, setFormData] = useState({});
  const [curriculoId, setCurriculoId] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState('');

  const [modeFinal, setModeFinal] = useState('date');
  const [dateFinal, setDateFinal] = useState(new Date(1598051730000));
  const [finalShow, setFinalShow] = useState(false);
  const [showFinalDate, setShowFinalDate] = useState('');

  const [tipoDetalhe, setTipoDetalhe] = useState([]);

  useEffect(() => {
    async function loadData() {
      const detalhes = await api.fetch({
        table: 'TipoDetalhes',
        properties: `Id
      Designacao`,
      });

      if (!detalhes.ok) {
        return;
      }

      const { data } = detalhes;

      setTipoDetalhe(
        data.map((detalhe) => {
          return {
            value: detalhe.Id,
            label: detalhe.Designacao,
          };
        }),
      );
    }

    loadData();
  }, []);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    handleChange({
      name: 'DataInicio',
      value: new Date(currentDate).toLocaleDateString(),
    });
    setShowDate(new Date(selectedDate).toLocaleDateString());
  };

  const onChangeFinal = (_, selectedDate) => {
    const currentDate = selectedDate || dateFinal;
    setFinalShow(Platform.OS === 'ios');
    setDateFinal(currentDate);
    handleChange({
      name: 'DataFim',
      value: new Date(currentDate).toLocaleDateString(),
    });
    setShowFinalDate(new Date(selectedDate).toLocaleDateString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showModeFinal = (currentMode) => {
    setFinalShow(true);
    setModeFinal(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const showDatepickerFinal = () => {
    showModeFinal('date');
  };

  const handleChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    formData.CurriculoId = curriculoId;

    const response = await api.store({
      table: 'Detalhe',
      type: 'STORE',
      useExclamation: false,
      properties: 'Ids',
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
      message: 'Informação adicionada.',
    });
  };

  return (
    <View style={styles.formInput}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#0186ae" /> */}

      <InputDisabled>
        <RNPickerSelect
          onValueChange={(value) =>
            handleChange({ name: 'TipoDetalheId', value })
          }
          items={tipoDetalhe}
        />
      </InputDisabled>
      <Input
        placeholder="Designação"
        onChangeText={(e) => {
          handleChange({ name: 'Designacao', value: e });
        }}
      />
      <Input
        placeholder="Nome da instituicao"
        onChangeText={(e) => {
          handleChange({ name: 'NomeDaInstituicao', value: e });
        }}
      />
      <Input
        placeholder="Local da Instituição"
        onChangeText={(e) => {
          handleChange({ name: 'LocalDaInstituicao', value: e });
        }}
      />
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <InputDisabled>
          <InputDisabledText>
            {showDate === '' ? 'Data Início' : showDate}
          </InputDisabledText>
        </InputDisabled>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={showDatepickerFinal}>
        <InputDisabled>
          <InputDisabledText>
            {showFinalDate === '' ? 'Data Final' : showFinalDate}
          </InputDisabledText>
        </InputDisabled>
      </TouchableWithoutFeedback>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {finalShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateFinal}
          mode={modeFinal}
          is24Hour={true}
          display="default"
          onChange={onChangeFinal}
        />
      )}

      <InputTexarea
        multiline={true}
        returnKeyType="done"
        onChangeText={(e) => {
          handleChange({ name: 'DescricaoDaInstituicao', value: e });
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

export default DetailsForm;

const styles = StyleSheet.create({
  formInput: {
    // justifyContent: 'center',
  },
});
