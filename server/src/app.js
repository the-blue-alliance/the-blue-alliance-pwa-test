const path = require('path');

const React = require('react');
const { createReactAppExpress, handleUniversalRender } = require('create-react-app-express');

const {default: TBASSApp} = require('../../src/TBASSApp');
const clientBuildPath = path.resolve(__dirname, 'client');
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender(<TBASSApp />)
});

module.exports = app;
