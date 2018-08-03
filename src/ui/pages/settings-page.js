import React, { Component } from 'react';
import { Container } from '../base-kits';
import { MainMenu, TopMenuBar } from '../components';

class SettingsPage extends Component {
  render() {
    return (
      <Container pl="60px" pt="50px">
        <MainMenu />
        <TopMenuBar pageTitle="Settings" />
        <p>Settings</p>
      </Container>
    );
  }
}

export default SettingsPage;
