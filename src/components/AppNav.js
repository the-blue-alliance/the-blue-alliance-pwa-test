import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import StarIcon from 'material-ui-icons/Star';
import VideocamIcon from 'material-ui-icons/Videocam';
import EventIcon from 'material-ui-icons/Event';
import PeopleIcon from 'material-ui-icons/People';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';
import FilterListIcon from 'material-ui-icons/FilterList';
import RefreshIcon from 'material-ui-icons/Refresh';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import Divider from 'material-ui/Divider';
import classNames from 'classnames';
import TBAlogo from '../icons/tba_icon_blue.svg';

const DRAWER_WIDTH = 200
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
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: DRAWER_WIDTH,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    height: '100px',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    height: '50%',
    margin: '0 10px',
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

class AppNav extends Component {
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

    const drawer = (
      <div>
        <div className={this.props.classes.drawerHeader}>
          <img src={TBAlogo} className={this.props.classes.logo} alt="logo" />
          <Typography type="title" color="inherit">
            The Blue Alliance
          </Typography>
        </div>
        <Divider />
        <List>
          <LinkContainer to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </LinkContainer>
          <LinkContainer to="/">
            <ListItem button>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="myTBA" />
            </ListItem>
          </LinkContainer>
          <LinkContainer to="/">
            <ListItem button>
              <ListItemIcon>
                <VideocamIcon />
              </ListItemIcon>
              <ListItemText primary="GameDay" />
            </ListItem>
          </LinkContainer>
          <LinkContainer to="/events">
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
          </LinkContainer>
          <LinkContainer to="/teams">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Teams" />
            </ListItem>
          </LinkContainer>
        </List>
      </div>
    )

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
        <div className={this.props.classes.drawer}>
          <Hidden lgUp>
            <Drawer
              classes={{
                paper: this.props.classes.drawerPaper,
              }}
              type="temporary"
              open={this.state.mobileDrawerOpen}
              onRequestClose={this.handleDrawerClose}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden lgDown implementation="css">
            <Drawer
              classes={{
                paper: this.props.classes.drawerPaper,
              }}
              type="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </div>
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
