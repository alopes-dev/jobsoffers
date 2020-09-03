import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  max-height: calc(80vh);
  margin-bottom: 10px;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
`;

export const ScrollView = styled.div`
  height: calc(80vh);
  width: 100%;
  overflow-y: scroll;
`;

export const Footer = styled.div`
  width: 100%;
  min-height: 6vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  box-shadow: 0 0 5px rgba(18, 23, 39, 0.5);
`;

export const TabIcons = styled.div`
  height: 50%;
  width: 100px;
  text-align: center;
  i {
    font-size: 1.4rem;
  }
  i.active {
    color: var(--primary);
  }
`;
