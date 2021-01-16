/* eslint-disable eol-last */
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';

// import api from '../services/service';
import { toast } from 'react-toastify';
import { SCREENSTACK_INITIAL_VALUES } from './store';

const MobileAppContextData = {
  appCurrentStack: [],
  activeScreen: null,
  startAnimation: true,
  setStartAnimation: () => {},
  setActiveScreen: () => {},
  screenStack: SCREENSTACK_INITIAL_VALUES,
  SetScreenStack: () => {},
  handleBackScreenOnClick: () => {},
  setAppCurrentStack: () => {},
};

const MobileAppContext = createContext(MobileAppContextData);

export const MobileAppProvider = ({ children }) => {
  const [appCurrentStack, setAppCurrentStack] = useState([]);
  const [activeScreen, setActiveScreen] = useState('');
  const [startAnimation, setStartAnimation] = useState(true);
  const [screenStack, setScreenStack] = useState(SCREENSTACK_INITIAL_VALUES);

  const handleActionScreen = useCallback(() => {
    setStartAnimation(false);
    setTimeout(() => {
      setActiveScreen('');
      setStartAnimation(true);
    }, 300);
  });

  const handleBackScreenOnClick = useCallback(() => {
    const currentStack = appCurrentStack;
    handleActionScreen();
    currentStack.pop(currentStack[currentStack.length - 1]);
    if (currentStack.length === 0) {
      document
        .querySelector('.logo-header')
        .querySelector('.backScreen')
        .classList.remove('on');
    }
    setAppCurrentStack(currentStack);
  }, [appCurrentStack]);

  useEffect(() => {
    const activeStack = appCurrentStack[appCurrentStack.length - 1];

    if (!activeStack) return;
    const backScreen = document
      .querySelector('.logo-header')
      .querySelector('.backScreen');

    if (activeStack.length === 0) backScreen.classList.remove('on');
    if (activeStack.backScreen) backScreen.classList.add('on');
  }, [appCurrentStack]);

  const MobileAppValues = useMemo(
    () => ({
      appCurrentStack,
      screenStack,
      activeScreen,
      handleActionScreen,
      setActiveScreen,
      startAnimation,
      setStartAnimation,
      setAppCurrentStack,
      setScreenStack,
      handleBackScreenOnClick,
    }),
    [
      appCurrentStack,
      setAppCurrentStack,
      setActiveScreen,
      activeScreen,
      handleActionScreen,
      startAnimation,
      setStartAnimation,
      setScreenStack,
      screenStack,
    ]
  );

  return (
    <MobileAppContext.Provider value={MobileAppValues}>
      {children}
    </MobileAppContext.Provider>
  );
};

export function useMobileApp() {
  return useContext(MobileAppContext);
}
