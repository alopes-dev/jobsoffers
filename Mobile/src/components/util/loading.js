/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

export function isOnLoading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#0186ae" />
    </View>
  );
}

export function toast(visible, message, onDismiss, finaly) {
  const onDismissSnackBar = () => {
    onDismiss();
  };
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      style={{ backgroundColor: finaly === 'success' ? '#01a982' : '#f93d5c' }}
    >
      {message}
    </Snackbar>
  );
}
