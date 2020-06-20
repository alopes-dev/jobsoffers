/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { List } from 'react-native-paper';
import { Avatar, Snackbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import DetailsForm from './components/details.form.js';
import HobbesForm from './components/hobbes.form.js';
import IdiomaForm from './components/idioma.form.js';
import CompetenciaForm from './components/competencias.form.js';
import api from '~/services/service';
import { isOnLoading, toast } from '~/components/util/loading';

const ProfileEditing = () => {
  const [timing, setTiming] = useState(false);
  const [finaly, setFinaly] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const onDismissSnackBar = () => setTiming(false);

  return (
    <>
      {toast(timing, message, onDismissSnackBar, finaly)}
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
      >
        <List.Section>
          <List.Accordion
            title="Informação Curricular"
            left={(props) => (
              <SimpleLineIcons
                {...props}
                style={{ marginLeft: 18, marginRight: 18 }}
                size={25}
                name="info"
              />
            )}
          >
            <View style={styles.formInput}>
              <DetailsForm
                result={(res) => {
                  setFinaly(res.ok);
                  setMessage(res.message);
                  setTiming(true);
                }}
              />
            </View>
          </List.Accordion>

          <List.Accordion
            title="Competências"
            left={(props) => (
              <FontAwesome
                {...props}
                style={{ marginLeft: 18, marginRight: 18 }}
                size={25}
                name="grav"
              />
            )}
          >
            <View style={styles.formInput}>
              <CompetenciaForm
                result={(res) => {
                  setFinaly(res.ok);
                  setMessage(res.message);
                  setTiming(true);
                }}
              />
            </View>
          </List.Accordion>

          <List.Accordion
            title="Idiomas"
            left={(props) => (
              <Icon
                {...props}
                style={{ marginLeft: 18, marginRight: 18 }}
                size={25}
                name="md-globe"
              />
            )}
          >
            <View style={styles.formInput}>
              <IdiomaForm
                result={(res) => {
                  setFinaly(res.ok);
                  setMessage(res.message);
                  setTiming(true);
                }}
              />
            </View>
          </List.Accordion>

          <List.Accordion
            title="Hobbes"
            left={(props) => <List.Icon {...props} icon="folder" />}
          >
            <View style={styles.formInput}>
              <HobbesForm
                result={(res) => {
                  setFinaly(res.ok);
                  setMessage(res.message);
                  setTiming(true);
                }}
              />
            </View>
          </List.Accordion>
        </List.Section>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ProfileEditing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  formInput: {
    width: Dimensions.get('window').width - 40,
  },
  select: {
    height: 30,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 15,
    marginVertical: 6,

    // border: 1px solid "#eee",
    justifyContent: 'center',
  },
});
