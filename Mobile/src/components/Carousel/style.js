/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const SubmitButton = styled(RectButton)
`
  justify-content: center;
  align-items: center;
  background: #0186ae;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  height: 35px;
`;

export const ButtonText = styled.Text `
  color: #fff;
  font-size: 15px;
`;

export const Container = styled.View `
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CardView = styled.View `
  flex: 1;
  flex-direction: row;
  background: #fff;
  margin: 8px 10px;
  border-radius: 4px;
  padding: 10px;
  height: 100px;
`;

export const CardImage = styled.Image `
  width: 40px;
  flex: 1;
  border-radius: 4px;
`;
export const CardDesc = styled.View `
  flex: 2;
  padding: 0 10px;
  justify-content: flex-start;
  align-items: flex-start;
  
`;
export const CardText = styled.Text ``;
export const CardTitle = styled.Text `
  color: #0a0b57;
  font-size: 18px;
`;