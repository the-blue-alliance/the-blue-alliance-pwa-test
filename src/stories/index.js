import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import { Set } from 'immutable';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { store } from '../store';
import { match } from './data';

import TBAThemeProvider from '../components/TBAThemeProvider'
import MatchListItem from '../components/MatchList/MatchListItem';

storiesOf('MatchListItem', module)
  .addDecorator(story => (
    <Provider store={store}>
      <TBAThemeProvider>
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
      </TBAThemeProvider>
    </Provider>
  ))
  .add('default', () => (
    <MatchListItem
      match={match}
      favoriteTeamKeys={Set(['frc254'])}
    />
  ));
