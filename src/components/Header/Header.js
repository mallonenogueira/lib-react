import React, { Component } from 'react';
import classNames from 'classnames';
import { FaTimes, FaBars, FaUserAlt } from 'react-icons/fa';

import { getInverseLogo } from '../../defaults/values';
import { Thumbnail } from '../';

const logo = getInverseLogo();

export default class Header extends Component {
  state = {
    menuVisible: false,
    userOptionsVisible: false,
  };

  getMenuIcon() {
    const { menuVisible } = this.state;

    if (menuVisible) {
      return <FaTimes />;
    }

    return <FaBars />;
  }

  getVersion() {
    const versionNumber = undefined;

    return (
      versionNumber && (
        <div className="header__action header__action--readonly version-number">
          {versionNumber}
        </div>
      )
    );
  }

  getUserName() {
    return 'Usuário GIX';
  }

  toggleUserOptions = () => {
    this.setState({
      userOptionsVisible: !this.state.userOptionsVisible,
    });
  };

  getUserOptionsClass = () => {
    return classNames('user-options', {
      visible: this.state.userOptionsVisible,
    });
  };

  render() {
    return (
      <header>
        <div className="navigation">
          <div className="header__action">{this.getMenuIcon()}</div>

          <a href="/">
            <img className="logo--full" src={logo} alt="GIX Logo" />
          </a>

          {this.getVersion()}
        </div>

        <div className="toolbar">
          <div
            className="header__action user"
            tabIndex="1"
            onClick={this.toggleUserOptions}
          >
            <FaUserAlt />

            <div className="thumbnail mr-2">
              <Thumbnail />
            </div>

            <div className="username">{this.getUserName()}</div>
          </div>
        </div>

        <ul className={this.getUserOptionsClass()}>
          <li key="change-user-data">Alterar dados do usuário</li>
          <li key="logout">Logout</li>
        </ul>
      </header>
    );
  }
}
