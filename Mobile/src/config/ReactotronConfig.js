/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
    const tron = Reactotron.configure().useReactNative().connect();

    tron.clear();

    console.tron = tron;
}