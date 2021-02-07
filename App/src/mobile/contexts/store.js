import React from 'react';
import MobileOportunityDetails from '../pages/home/oportunityDetails';
import ViewNotification from '../pages/notifications/viewNotification';

export const SCREENSTACK_INITIAL_VALUES = {
  home: [
    {
      name: 'Details',
      components: <MobileOportunityDetails />,
    },
  ],
  notifications: [
    {
      name: 'Details',
      components: <ViewNotification />,
    },
  ],
};
