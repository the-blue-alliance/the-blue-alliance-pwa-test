import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';
import FilterListIcon from 'material-ui-icons/FilterList';
import RefreshIcon from 'material-ui-icons/Refresh';
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress';
import classNames from 'classnames';
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
  appFrame: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100%',
    width: '100%',
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - ' + DRAWER_WIDTH + 'px)',
    },
  },
  appBarTitle: {
    flex: 1,
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
          <Toolbar>
            <Hidden lgUp implementation="css">
              <IconButton color="contrast" aria-label="Menu" onClick={this.handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className={this.props.classes.appBarTitle}>
              {this.props.title}
              <Hidden lgUp implementation="css">{this.props.smallTitle}</Hidden>
            </Typography>
            {this.props.filterFunction && <IconButton color="contrast" onClick={this.props.filterFunction}>
              <FilterListIcon />
            </IconButton>}
            {!this.props.isLoading && this.props.refreshFunction &&
              <IconButton color="contrast" onClick={this.props.refreshFunction}>
                <RefreshIcon />
              </IconButton>
            }
            {this.props.isLoading &&  <IconButton color="contrast" disabled>
              <CircularProgress color="accent" size={20} />
            </IconButton>}
            <IconButton color="contrast">
              <SearchIcon />
            </IconButton>
          </Toolbar>
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
