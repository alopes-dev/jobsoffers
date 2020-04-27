import React, { Component } from 'react';
import routes from '../../routes';
import { isEmpty } from '../../helpers';

export default class SideBarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getChildren(child) {
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

  renderRoutes() {
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
                <ul className="nav nav-collapse">
                  {this.getChildren(children)}
                </ul>
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

  render() {
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
                    António Lopes
                    <span className="user-level">Administrator</span>
                    <span className="caret"></span>
                  </span>
                </a>
                <div className="clearfix"></div>

                <div className="collapse in" id="collapseExample">
                  <ul className="nav">
                    <li>
                      <a href="#profile">
                        <span className="link-collapse">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a href="#edit">
                        <span className="link-collapse">Edit Profile</span>
                      </a>
                    </li>
                    <li>
                      <a href="#settings">
                        <span className="link-collapse">Settings</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ul className="nav nav-primary">{this.renderRoutes()}</ul>
          </div>
        </div>
      </div>
    );
  }
}
