import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 10px;
`;

export const FloatingButton = styled.div`
  width: 80%;
  text-align: center;
  position: fixed;
  bottom: 0;
  transform: translateX(-50%);
  left: 50%;
  /* padding: 0.6rem; */
  background-color: #1a2035 !important;
  font-size: 1rem;
  border-radius: 0.3rem;
`;
