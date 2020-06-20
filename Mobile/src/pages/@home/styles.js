/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView `
  flex: 1;
`;
export const Container = styled.View `
  flex: 1;
  /* background: #fff; */
`;

export const Header = styled.View `
  background: #0186ae;
  height: 55px;
  padding: 0 20px;
`;
export const Title = styled.Text `
  font-size: 22px;
  color: #cccccc;
  margin-top: 10px;
`;
export const Actions = styled.View `
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const SearchBar = styled.View `
  flex: 1;
`;

export const Input = styled.TextInput `
  height: 30px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SwitchBar = styled.View `
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ScrollContainer = styled.View `
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
`;