/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View `
  flex: 1;
  background: white;
  justify-content: flex-end;
`;

export const SignInButton = styled.View `
  background: white;
  height: 50px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-left: 26px;
  margin-right: 26px;
`;

export const SignInButtonText = styled.Text `
  font-size: 20px;
  font-weight: bold;
`;