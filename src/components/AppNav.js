import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import TBAAppBar from './TBAAppBar'
import NavDrawer from '../containers/NavDrawerContainer'

const DRAWER_WIDTH = 200  // TODO put in global constants
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      height: '100%',
      margin: 0,
    },
    'div[id=root]': {
      height: '100%'
    },
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - ' + DRAWER_WIDTH + 'px)',
    },
  },
  appFrame: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100%',
    width: '100%',
  },
  content: {
    position: 'absolute',
    top: 56,
    right: 0,
    bottom: 0,
    left: 0,
    overflowX: 'hidden',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      top: 64,
      padding: theme.spacing.unit * 3,
    },
    [theme.breakpoints.up('lg')]: {
      left: DRAWER_WIDTH,
    },
  },
  tabbedContent: {
    top: 56 + 48,
    [theme.breakpoints.up('sm')]: {
      top: 64 + 48,
    },
  }
})

class AppNav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobileDrawerOpen: false,
    };
  }

  handleDrawerClose = () => {
    this.setState({ mobileDrawerOpen: false });
  }
  handleDrawerToggle = () => {
    this.setState({ mobileDrawerOpen: !this.state.mobileDrawerOpen });
  }

  render() {
    console.log("Render AppNav")

    return (
      <div className={this.props.classes.appFrame}>
        <AppBar className={this.props.classes.appBar}>
          <TBAAppBar
            title={this.props.title}
            handleDrawerToggle={this.handleDrawerToggle}
            isLoading={this.props.isLoading}
            refreshFunction={this.props.refreshFunction}
            filterFunction={this.props.filterFunction}
          />
          {this.props.tabs}
        </AppBar>
        <NavDrawer
          mobileOpen={this.state.mobileDrawerOpen}
          closeHandler={this.handleDrawerClose}
        />
        <div className={classNames({
          [this.props.classes.tabbedContent]: this.props.tabs !== undefined,
          [this.props.classes.content]: true,
        })}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

AppNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNav);
