const path = require('path');

const React = require('react');
import { createReactAppExpress, handleUniversalRender } from '@cra-express/core';

const {default: TBASSApp} = require('../../src/TBASSApp');
const clientBuildPath = path.resolve(__dirname, 'client');
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender(<TBASSApp />)
});

module.exports = app;
