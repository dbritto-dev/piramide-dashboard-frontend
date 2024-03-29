import React from 'react';
import lodash from 'lodash';
import { useAppState } from './AppContext';
import { Button, Icon } from '@salesforce/design-system-react';

function Notifications() {
  const [state, dispatch] = useAppState();

  return (
    <div className="slds-notification-container">
      {lodash.map(state.notifications, (notification, index) => (
        <section className="slds-notification" role="dialog" key={index}>
          <div className="slds-notification__body">
            <div className="slds-notification__target slds-media">
              <Icon
                containerClassName="slds-media__figure"
                category="standard"
                name={notification.type}
                size="small"
              />
              <div className="slds-media__body">
                <h2 className="slds-text-heading_small slds-m-bottom_xx-small">
                  {notification.title}
                </h2>
                {!!notification.description && <p>{notification.description}</p>}
              </div>
            </div>
            <Button
              className="slds-notification__close"
              iconCategory="utility"
              iconName="close"
              iconVariant="container"
              variant="icon"
              onClick={() =>
                dispatch({
                  type: 'REMOVE_NOTIFICATION',
                  payload: notification,
                })
              }
            />
          </div>
        </section>
      ))}
    </div>
  );
}

export default Notifications;
