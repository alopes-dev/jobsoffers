import styled from 'styled-components';

export const Candidatotos = styled.div `
  height: 274px;
  display: flex;
  flex-direction: column;
`;

export const Candidatoto = styled.div `
  background-color: rgba(54, 59, 76, 0.9) !important;
  margin: 8px 0;
  height: 55px;
  border-radius: 4px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  &:first-of-type {
    margin: 0px;
  }
`;

export const ActionsButton = styled.div `
  background-color: rgba(54, 59, 76, 0.9) !important;
  /* margin: 8px 0 8px 10px; */
  height: 24px;
  position: absolute;
  right: 30px;
  width: 230px;
  float: right;
  border-radius: 4px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
`;
export const Button = styled.div `
  color: white;
  font-size: 12px;
  &:last-child {
    :hover {
      color: #dc3545;
      transition: 1.3 ease-in-out;
    }
  }
  &:first-child {
    :hover {
      color: #20c997;
      transition: 1.3 ease-in-out;
    }
  }
  &:nth-child(2) {
    :hover {
      color: #ffae6f;
      transition: 1.3 ease-in-out;
    }
    i {
      color: #ffae6f;
      margin-right: 5px;
    }
  }
  i {
    color: #20c997;
    margin-right: 5px;
  }
  i.flaticon-cross {
    font-size: 11px;
    color: #dc3545;
    margin: 0 2px;
  }
`;

export const Name = styled.h5 `
  font-size: 14px;
  font-weight: 600;
  color: #fff !important;
  margin: 3px 0 0 20px;
`;