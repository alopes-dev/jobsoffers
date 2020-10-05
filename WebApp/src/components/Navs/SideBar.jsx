import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import { isEmpty } from '../../helpers';

export default function SideBarMenu(props) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const { UserName, Email } = JSON.parse(localStorage.getItem('@jobs:user'));

    setUserName(UserName);
  });

  function getChildren(child) {
    if (!isEmpty(child)) {
      return child.map((c, i) => {
        if (c.show === false) return '';
        return (
          <li key={c + i}>
            <a href={c.path}>
              <span className="sub-item">{c.name}</span>
            </a>
          </li>
        );
      });
    }
  }

  function renderRoutes() {
    if (!isEmpty(routes)) {
      return routes.map((r, i) => {
        const { collapse, children, icon, name, path, show } = r;
        if (show === false) return '';
        if (collapse !== undefined && collapse === true) {
          return (
            <li className="nav-item" key={r + i}>
              <a
                data-toggle="collapse"
                href={`#${name}`}
                className="collapsed"
                aria-expanded="false"
              >
                <i className={icon}></i>
                <p>{name}</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id={name}>
                <ul className="nav nav-collapse">{getChildren(children)}</ul>
              </div>
            </li>
          );
        } else {
          return (
            <li className="nav-item" key={r + i}>
              <a href={path}>
                <i className={icon}></i>
                <p>{name}</p>
              </a>
            </li>
          );
        }
      });
    }
  }

  return (
    <div className="sidebar sidebar-style-2" data-background-color="dark">
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <div className="user">
            <div className="avatar-sm float-left mr-2">
              <img
                src="./img/profile.jpg"
                alt="..."
                className="avatar-img rounded-circle"
              />
            </div>
            <div className="info">
              <a
                data-toggle="collapse"
                href="#collapseExample"
                aria-expanded="true"
              >
                <span>
                  {userName}
                  <span className="user-level">Administrator</span>
                  <span className="caret"></span>
                </span>
              </a>
              <div className="clearfix"></div>

              <div className="collapse in" id="collapseExample">
                <ul className="nav">
                  <li>
                    <a href="/enterprise">
                      <span className="link-collapse">Meu Perfil</span>
                    </a>
                  </li>
                  <li>
                    <a href="#edit">
                      <span className="link-collapse">Editar Perfil</span>
                    </a>
                  </li>
                  <li>
                    <a href="#settings">
                      <span className="link-collapse">Definições</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="nav nav-primary">{renderRoutes()}</ul>
        </div>
      </div>
    </div>
  );
}
