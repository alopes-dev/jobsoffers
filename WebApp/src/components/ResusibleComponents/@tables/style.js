import styled from 'styled-components';
import { isEmpty } from '../../../helpers';

export const Input = styled.input `
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || 'palevioletred'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export const Container = styled.div `
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

export const Text2 = styled.h2 `
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
`;

export const ResponsiveTable = styled.ul `
  padding-left: 0;
  li {
    border-radius: 3px;
    padding: 14px 30px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 6px;
  }
`;
export const TableHeader = styled.li `
  background: rgba(88, 103, 221, 0.8);
  font-size: 12px !important;
  color: white !important;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  @media (max-width: 767px) {
    display: none !important;
  }
`;

export const TableRow = styled.li `
  background-color: #ffffff;
  font-size: 13px !important;
  box-shadow: 2px 2px 1px -1px rgba(0, 0, 0, 0.1),
    2px 2px 1px -1px rgba(0, 0, 0, 0.1), 2px 2px 1px -1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    box-shadow: 20px 20px 20px 10px rgba(69, 65, 78, 0.1);
  }
  @media (max-width: 767px) {
    padding: 0 !important;
    display: block !important;
  }
`;

export const Col = styled.div `
  flex-basis: ${props => ` ${getColSize(props.size)}`}!important;
  text-align: center;
  cursor: pointer;
  i.actions-icon {
    cursor: pointer !important;
    color: #8d9498;
    margin-left: 8px;
  }

  @media (max-width: 767px) {
    flex-basis: 100% !important;
    display: flex !important;
    padding: 7px 0 !important;
    &:before {
      color: #6c7a89 !important;
      padding-right: 10px !important;
      content: attr(data-label) !important;
      flex-basis: 30% !important;
      text-align: right !important;
    }
  }
`;

const getColSize = size => {
  if (!isEmpty(size)) return '100%';
  if (size === 1) return '10%';
  if (size === 2) return '40%';
  if (size === 3) return '25%';
  if (size === 4) return '25%';
  return '100%';
};
// export const Col = styled
//   .col-1 {
//     flex-basis: 10%;
//   }
//   .col-2 {
//     flex-basis: 40%;
//   }
//   .col-3 {
//     flex-basis: 25%;
//   }
//   .col-4 {
//     flex-basis: 25%;
//   }
// @media all and (max-width: 767px) {
//   .col {

//     flex-basis: 100%;

//   }
//   .col {
//     display: flex;
//     padding: 10px 0;
//     &:before {
//       color: #6C7A89;
//       padding-right: 10px;
//       content: attr(data-label);
//       flex-basis: 50%;
//       text-align: right;
//     }
//   }
// }

// }