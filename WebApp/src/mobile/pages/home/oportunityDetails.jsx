import React from "react";

import { Container, FloatingButton } from "./styles";
import { Card, CardBody, Col } from "reactstrap";

function MobileOportunityDetails() {
  return (
    <>
      <Container>
        <h4>Trabalho remoto em programação</h4>
      </Container>
      <FloatingButton>
        <div className="anchor-button subscribe">
          <span className="subscribe">
            <i className="flaticon-arrow"></i>
          </span>
          <strong className="subscribe">Candidatar-se</strong>
        </div>
      </FloatingButton>
    </>
  );
}

export default MobileOportunityDetails;
