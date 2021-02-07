import React, { Component } from 'react';
import { useAuth } from '../../contexts/auth';

export default function NavBarHeader() {
  const { signOut } = useAuth();

  return (
    <nav
      className="navbar navbar-header navbar-expand-lg nvas"
      data-background-color="dark"
    >
      <div className="container-fluid">
        <div className="collapse" id="search-nav d-none">
          <form className="navbar-left navbar-form nav-search mr-md-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <button type="submit" className="btn btn-search pr-1">
                  <i className="fas fa-search search-icon"></i>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search ..."
                className="form-control"
              />
            </div>
          </form>
        </div>
        <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
          <li className="nav-item toggle-nav-search hidden-caret">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#search-nav"
              role="button"
              aria-expanded="false"
              aria-controls="search-nav"
            >
              <i className="fa fa-search"></i>
            </a>
          </li>

          <li className="nav-item dropdown hidden-caret">
            <a
              className="nav-link dropdown-toggle"
              href="#d"
              id="notifDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-bell"></i>
              <span className="notification">4</span>
            </a>
            <ul
              className="dropdown-menu notif-box animated fadeIn"
              aria-labelledby="notifDropdown"
            >
              <li>
                <div className="dropdown-title">
                  You have 4 new notification
                </div>
              </li>
              <li>
                <div className="notif-scroll scrollbar-outer">
                  <div className="notif-center">
                    <a href="#d">
                      <div className="notif-icon notif-primary">
                        {' '}
                        <i className="fa fa-user-plus"></i>{' '}
                      </div>
                      <div className="notif-content">
                        <span className="block">New user registered</span>
                        <span className="time">5 minutes ago</span>
                      </div>
                    </a>
                    <a href="#d">
                      <div className="notif-icon notif-success">
                        {' '}
                        <i className="fa fa-comment"></i>{' '}
                      </div>
                      <div className="notif-content">
                        <span className="block">Rahmad commented on Admin</span>
                        <span className="time">12 minutes ago</span>
                      </div>
                    </a>
                    <a href="#d">
                      <div className="notif-img">
                        <img src="./img/profile2.jpg" alt="Img Profile" />
                      </div>
                      <div className="notif-content">
                        <span className="block">Reza send messages to you</span>
                        <span className="time">12 minutes ago</span>
                      </div>
                    </a>
                    <a href="#d">
                      <div className="notif-icon notif-danger">
                        {' '}
                        <i className="fa fa-heart"></i>{' '}
                      </div>
                      <div className="notif-content">
                        <span className="block">Farrah liked Admin</span>
                        <span className="time">17 minutes ago</span>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a className="see-all" href="#javascript ">
                  See all notifications<i className="fa fa-angle-right"></i>{' '}
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown hidden-caret">
            <a
              className="nav-link"
              data-toggle="dropdown"
              href="#d"
              aria-expanded="false"
            >
              <i className="fas fa-layer-group"></i>
            </a>
            <div className="dropdown-menu quick-actions quick-actions-info animated fadeIn">
              <div className="quick-actions-header">
                <span className="title mb-1">Acesso Rápido</span>
                <span className="subtitle op-8">Atalhos</span>
              </div>
              <div className="quick-actions-scroll scrollbar-outer">
                <div className="quick-actions-items">
                  <div className="row m-0">
                    <a className="col-6 col-md-4 p-0" href="#d">
                      <div className="quick-actions-item">
                        <i className="flaticon-file-1"></i>
                        <span className="text">Gerar Relatório</span>
                      </div>
                    </a>
                    <a className="col-6 col-md-4 p-0" href="#d">
                      <div className="quick-actions-item">
                        <i className="flaticon-database"></i>
                        <span className="text">Criar Oportunidade</span>
                      </div>
                    </a>
                    <a className="col-6 col-md-4 p-0" href="#d">
                      <div className="quick-actions-item">
                        <i className="flaticon-pen"></i>
                        <span className="text">Editar Curriculo</span>
                      </div>
                    </a>
                    <a className="col-6 col-md-4 p-0" href="#d">
                      <div className="quick-actions-item">
                        <i className="flaticon-search"></i>
                        <span className="text">Procurar Oportunidade</span>
                      </div>
                    </a>
                    <a className="col-6 col-md-4 p-0" href="#d">
                      <div className="quick-actions-item">
                        <i className="flaticon-list"></i>
                        <span className="text">Criar Curriculo</span>
                      </div>
                    </a>
                    <a className="col-6 col-md-4 p-0" href="#d">
                      <div className="quick-actions-item">
                        <i className="flaticon-file"></i>
                        <span className="text">Ver Históricos</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown hidden-caret">
            <a
              className="dropdown-toggle profile-pic"
              data-toggle="dropdown"
              href="#d"
              aria-expanded="false"
            >
              <div className="avatar-sm">
                <img
                  src="./img/profile.jpg"
                  alt="...i"
                  className="avatar-img rounded-circle"
                />
              </div>
            </a>
          </li>
          <li
            className="nav-item dropdown hidden-caret text-danger"
            onClick={signOut}
          >
            <a
              className="nav-link text-danger"
              data-toggle="dropdown"
              href="#d"
              title="Sair"
              aria-expanded="false"
            >
              <i className="flaticon-arrow "></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
