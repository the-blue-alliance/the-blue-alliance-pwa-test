import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';
import RefreshIcon from 'material-ui-icons/Refresh';
import Drawer from 'material-ui/Drawer';
import { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';


const styles = {
  toolbar: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  flex: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
};

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
    };
  }

  toggleDrawer = (open) => {
    this.setState({ drawer: open });
  };
  handleDrawerOpen = () => this.toggleDrawer(true);
  handleDrawerClose = () => this.toggleDrawer(false);

  render() {
    console.log("Render AppNav");
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={this.props.classes.toolbar}>
            <IconButton color="contrast" aria-label="Menu" onClick={this.handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={this.props.classes.flex}>
              {this.props.title}
            </Typography>
            {!this.props.isFetching && <IconButton color="contrast" onClick={this.props.refreshFunction}>
              <RefreshIcon />
            </IconButton>}
            {this.props.isFetching &&  <IconButton color="contrast" disabled>
              <CircularProgress color="accent" size={20} />
            </IconButton>}
            <IconButton color="contrast">
              <SearchIcon />
            </IconButton>
          </Toolbar>
          {this.props.tabs}
        </AppBar>
        <div className={this.props.classes.container} style={{top: this.props.tabs === undefined ? '64px' : '112px'}}>
          {this.props.children}
        </div>
        <Drawer
          open={this.state.drawer}
          onRequestClose={this.handleDrawerClose}
          onClick={this.handleDrawerClose}
        >
          <div>
            <LinkContainer to="/">
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
            </LinkContainer>
            <LinkContainer to="/events">
              <ListItem button>
                <ListItemText primary="Events" />
              </ListItem>
            </LinkContainer>
            <LinkContainer to="/teams">
              <ListItem button>
                <ListItemText primary="Teams" />
              </ListItem>
            </LinkContainer>
          </div>
        </Drawer>
      </div>
    );
  }
}

AppNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNav);
