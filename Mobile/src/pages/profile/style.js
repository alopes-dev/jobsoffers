/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Colores from '~/config/Colores';

export const Container = styled.View `
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const Header = styled.View `
  flex: 1;
  width: ${(props) => `${props.width}px`};
  justify-content: center;
  align-items: center;
`;

export const User = styled.View`
  width: 92px;
  height: 92px;
  border-radius: 46px;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
  margin-left: 30px;
`;

export const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 46px;
  background-color: #eee;
`;

export const Name = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin-top: 15px;
  margin-left: 40px;
`;

export const Bio = styled.Text`
  font-size: 12px;
  color: #fff;
  margin-top: 5px;
  margin-left: 40px;
`;

export const Details = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 25px;
`;

export const Score = styled.View`
  width: 65px;
  margin-top: 20px;
`;

export const Value = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const Description = styled.Text`
  font-size: 9px;
  color: #fff;
  text-align: center;
`;

export const Body = styled.View`
  flex: 2;
  width: 100%;
  padding: 0 25px;
`;

export const ListContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.View`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
`;
export const TextItem = styled.Text`
  margin-left: 40px;
  color: #000;
  font-weight: 600;
`;
export const Input = styled.TextInput`
  height: 30px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  margin: 6px 0;
  border: 1px solid #eee;
`;
export const InputTexarea = styled.TextInput`
  height: 100px;
  background: #eee;
  border-radius: 4px;
  padding: 0 10px;
  margin: 6px 0;
  border: 1px solid #eee;
`;
export const InputDisabled = styled.View`
  height: 30px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  margin: 6px 0;
  border: 1px solid #eee;
  justify-content: center;
`;
export const Button = styled(RectButton)`
  height: 30px;
  background: #0186ae;
  border-radius: 4px;
  padding: 0 15px;
  margin: 15px 0;
  border: 1px solid #eee;
  justify-content: center;
  width: 150px;
  align-items: center;
`;

export const InputDisabledText = styled.Text`
  color: #333;
`;

export const SectionContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: white;
  padding: 20px;
`;
export const Section = styled.View`
  background: #eee;
  border-radius: 4px;
  width: 100%;
  padding: 4px;
  margin: 6px 0;
`;

export const SectionHeader = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
`;

export const SectionIcon = styled.View`
  margin-left: 5px;
  /* background: grey; */
  height: 30px;
  width: 30px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const SectionText = styled.Text`
  margin-left: 5px;
  font-size: 19px;
`;

export const SectionBody = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const ListItem = styled.View`
  padding: 5px 35px 5px 40px;
  flex-direction: row;
  justify-content: space-between;
`;
export const ListText = styled.Text`
  font-size: 13px;
`;
export const Username = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;
export const UserJobs = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-left: 20px;
`;

export const ListTextPercentage = styled.Text`
  font-size: 12px;
  color: green;
`;

export const DetailsItem = styled.View``;

export const DetailTitle = styled.Text`
  font-size: 15px;
`;
export const DetailDesignacao = styled.Text`
  font-size: 12px;
  margin-left: 14px;
  font-weight: bold;
`;
export const DetailTime = styled.Text`
  font-size: 12px;
  margin-left: 14px;
  margin-top: 5px;
  color: green;
`;