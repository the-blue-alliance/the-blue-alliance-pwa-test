import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import FilterListIcon from 'material-ui-icons/FilterList';
import RefreshIcon from 'material-ui-icons/Refresh';
import { CircularProgress } from 'material-ui/Progress';
import TBALamp from '../icons/tba_lamp';
import HideableBadge from '../components/HideableBadge'

const styles = theme => ({
  appBarTitle: {
    flex: 1,
  },
  logo: {
    height: 48,
    width: 48,
  },
})

class TBAToolbar extends PureComponent {
  render() {
    return (
      <Toolbar>
        {!this.props.title && <TBALamp className={this.props.classes.logo} />}
        <Typography type="title" color="inherit" className={this.props.classes.appBarTitle}>
          {this.props.title ? this.props.title : 'The Blue Alliance'}
        </Typography>
        {this.props.filterFunction && <IconButton color="inherit" onClick={this.props.filterFunction}>
          <HideableBadge
            badgeContent={this.props.filterCount}
            color='secondary'
            hidden={this.props.filterCount === 0}
            style={{height: 24, width: 24}}
          >
            <FilterListIcon />
          </HideableBadge>
        </IconButton>}
        {!this.props.isLoading && this.props.refreshFunction &&
          <IconButton color="inherit" onClick={this.props.refreshFunction}>
            <RefreshIcon />
          </IconButton>
        }
        {this.props.isLoading &&  <IconButton color="inherit" disabled>
          <CircularProgress color="secondary" size={20} thickness={5}/>
        </IconButton>}
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    )
  }
}

class TBAAppBar extends PureComponent {
  render() {
    console.log("Render TBAAppBar")
    const {tabs, ...otherProps} = this.props
    return (
      <AppBar>
        <TBAToolbar {...otherProps} />
        {tabs}
      </AppBar>
    );
  }
}

TBAAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TBAAppBar);
