import React, { useCallback, useState } from "react";
import { useMobileApp } from "../../contexts/app";
import { Animated } from "react-animated-css";

// import { Container } from './styles';

const MobileHomeScreen = () => {
  const {
    appCurrentStack,
    activeScreen,
    setActiveScreen,
    startAnimation,
    setAppCurrentStack,
    screenStack,
  } = useMobileApp();

  const handleOportunityClicked = (oportunity) => {
    console.log(oportunity);
    setActiveScreen("Details");
    setAppCurrentStack([
      ...appCurrentStack,
      { parent: "mobile-home", backScreen: true },
    ]);
  };

  const renderOportunities = useCallback(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1].map((oportunity, index) => {
      return (
        <div
          className="col-sm-6 col-md-6"
          key={Math.random() + Math.random() + index}
          onClick={() => handleOportunityClicked(oportunity)}
        >
          <div className="card card-stats card-round">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-left">
                    <i
                      style={{ color: "#1a2035" }}
                      className={`flaticon-interface-6`}
                    ></i>
                  </div>
                </div>
                <div className="col-7 col-stats">
                  <div className="numbers">
                    <p className="card-category">op.name</p>
                    <h4 className="card-title">op.value</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, []);

  return activeScreen !== ""
    ? screenStack.home
        .filter((screen) => screen.name === activeScreen)
        .map((screen) => (
          <Animated
            style={{ height: "100%" }}
            key={Math.random()}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            animationInDuration={700}
            animationOutDuration={700}
            isVisible={startAnimation}
          >
            {screen.components}
          </Animated>
        ))
    : renderOportunities();
};

export default MobileHomeScreen;
