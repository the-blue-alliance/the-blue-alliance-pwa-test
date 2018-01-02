import React from 'react'
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper';
import HomeIcon from 'material-ui-icons/Home'
import EventIcon from 'material-ui-icons/Event'
import PeopleIcon from 'material-ui-icons/People'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'

import TBANavMoreMenu from './TBANavMoreMenu'

const styles = {
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
}

class TBABottomNav extends React.PureComponent {
  state = {
    moreMenuOpen: false,
    anchorEl: null,
  }

  handleNavChange = (event, value) => {
    if (value !== 'more' && value !== this.props.bottomNavValue) {
      if (value === 'home') {
        this.props.history.push('/')
      } else {
        this.props.history.push(`/${value}`)
      }
    }
  }

  handleOpen = event => {
    this.setState({ moreMenuOpen: true, anchorEl: findDOMNode(this.moreRef) })
  }

  handleClose = () => {
    this.setState({ moreMenuOpen: false })
  }

  render() {
    console.log("Render TBABottomNav")

    const { classes } = this.props

    return (
      <Paper className={classes.root} elevation={4}>
        <BottomNavigation
          value={this.props.bottomNavValue}
          onChange={this.handleNavChange}
          showLabels
        >
          <BottomNavigationButton label="Home" value="home" icon={<HomeIcon />} />
          <BottomNavigationButton label="Events" value="events" icon={<EventIcon />} />
          <BottomNavigationButton label="Teams" value="teams" icon={<PeopleIcon />} />
          <BottomNavigationButton label="More" value="more" icon={<MoreHorizIcon />}
            onClick={this.handleOpen} ref={el => this.moreRef = el} />
        </BottomNavigation>
        <TBANavMoreMenu open={this.state.moreMenuOpen} handleClose={this.handleClose} anchorEl={this.state.anchorEl} />
      </Paper>
    )
  }
}

TBABottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TBABottomNav)
