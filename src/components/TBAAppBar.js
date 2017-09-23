import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';
import FilterListIcon from 'material-ui-icons/FilterList';
import RefreshIcon from 'material-ui-icons/Refresh';
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress';

const styles = {
  appBarTitle: {
    flex: 1,
  },
}

class TBAAppBar extends PureComponent {
  render() {
    console.log("Render TBAAppBar")

    return (
      <Toolbar>
        <Hidden lgUp implementation="css">
          <IconButton color="contrast" aria-label="Menu" onClick={this.props.handleDrawerToggle}>
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
    );
  }
}

TBAAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TBAAppBar);
