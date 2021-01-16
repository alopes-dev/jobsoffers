import React, { useCallback, useState } from 'react';
import { Container, Content, Footer, TabIcons, ScrollView } from './styles';
import MobileHomeScreen from './pages/home';
import MobileProfileScreen from './pages/profiles';
import MobileSettingsScreen from './pages/settings';
import MobileNotificationsScreen from './pages/notifications';
import { useMobileApp } from './contexts/app';

function MobileCore() {
  const [tabActive, setTabActive] = useState('');

  const handleIconClick = (tabIconId) => {
    Array.from(document.querySelectorAll('.tab-icons')).forEach((tab) =>
      tab.querySelector('i').classList.remove('active')
    );
    setTabActive(tabIconId);

    document.querySelector(`#${tabIconId} i`).classList.add('active');
  };

  const mobileBodyRender = useCallback(() => {
    switch (tabActive) {
      case 'mobile-home':
        return <MobileHomeScreen />;
      case 'mobile-profile':
        return <MobileProfileScreen />;
      case 'mobile-alarm':
        return <MobileNotificationsScreen />;
      case 'mobile-settings':
        return <MobileSettingsScreen />;
      default:
        return <MobileHomeScreen />;
    }
  }, [tabActive]);

  return (
    <Container>
      <Content>
        <ScrollView>{mobileBodyRender()}</ScrollView>
      </Content>
      <Footer>
        <TabIcons
          onClick={() => handleIconClick('mobile-favorite')}
          className="tab-icons"
          id="mobile-favorite"
        >
          <i className="flaticon-like-1"></i>
        </TabIcons>
        <TabIcons
          onClick={() => handleIconClick('mobile-profile')}
          className="tab-icons"
          id="mobile-profile"
        >
          <i className="flaticon-profile"></i>
        </TabIcons>
        <TabIcons
          onClick={() => handleIconClick('mobile-home')}
          className="tab-icons"
          id="mobile-home"
        >
          <i className="flaticon-home active"></i>
        </TabIcons>
        <TabIcons
          onClick={() => handleIconClick('mobile-alarm')}
          className="tab-icons"
          id="mobile-alarm"
        >
          <i className="flaticon-alarm"></i>
        </TabIcons>
        <TabIcons
          onClick={() => handleIconClick('mobile-settings')}
          className="tab-icons"
          id="mobile-settings"
        >
          <i className="flaticon-settings"></i>
        </TabIcons>
      </Footer>
    </Container>
  );
}

export default MobileCore;
