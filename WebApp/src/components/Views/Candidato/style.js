import styled from 'styled-components';

export const Header = styled.div `
  display: flex;
  margin-left: 20px;
`;

export const SubHeader = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;

export const Title = styled.h4 `
  margin: 0;
  color: #575962;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.6;
`;

export const SubTitle = styled.h5 `
  font-size: 11px;
  color: #7d7b7b;
`;

export const DetailsContent = styled.div `
  display: flex;
  margin-left: 20px;
`;

export const Item = styled.div `
  display: flex;
  flex-direction: column;
`;

export const ItemSingle = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
`;
export const Icon = styled.div `
  margin: 10px 0;
`;
export const ItemContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const ItemTitle = styled.div `
  margin: 10px 10px 0 10px;
  color: #575962;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
`;

export const ItemTitleSmall = styled.div `
  margin: 0px 10px 0 10px;
  color: #575962;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  small {
    font-size: 11px;
    font-weight: 400;
    color: #6c757d !important;
  }
`;

export const ItemDescription = styled.div `
  font-size: 12px;
  color: #7d7b7b;
  margin: 6px 10px;
`;
export const ItemValue = styled.div `
  font-size: 11px;
  color: #7d7b7b;
  margin: 5px 10px;
  display: flex;
  position: relative;
  width: 200px;
`;
export const ItemValueAsEmail = styled.div `
  font-size: 12px;
  color: #6861ce;
  margin: 0px 10px;
`;

export const Small = styled.div `
  font-size: 11px;
  color: #6861ce;
  position: absolute;
  right: -20px;
`;

export const ActionsButton = styled.div `
  background-color: rgba(54, 59, 76, 0.9) !important;
  height: 24px;
  right: 30px;
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
`;

export const Button = styled.div `
  color: white;
  font-size: 12px;
  cursor: pointer;
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

  i {
    color: #20c997;
    margin-right: 5px;
  }
  i.flaticon-cross {
    font-size: 11px;
    color: #dc3545;
    margin: 0 6px;
  }
`;