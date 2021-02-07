import React from 'react';
import { useMobileApp } from '../../mobile/contexts/app';

const TopMenu = () => {
  const { handleBackScreenOnClick } = useMobileApp();
  return (
    <div className="logo-header" data-background-color="dark">
      {/* <button className="topbar-toggler" > */}
      <i
        className="flaticon-left-arrow backScreen"
        onClick={handleBackScreenOnClick}
      ></i>
      {/* </button> */}

      <a href="/" className="logo">
        <img
          src="./img/jobsNoBackGround.png"
          alt="navbar brand"
          className="navbar-brand"
          style={{ height: '100%' }}
        />
      </a>
      <button
        className="navbar-toggler sidenav-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">
          <i className="icon-menu"></i>
        </span>
      </button>
      <button className="topbar-toggler more">
        <i className="icon-options-vertical"></i>
      </button>
      {/* <div className="nav-toggle">
                    <button className="btn btn-toggle toggle-sidebar">
						<i className="icon-menu"></i>
					</button>
                </div> */}
    </div>
  );
};

export default TopMenu;
