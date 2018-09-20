import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Paper from '@material-ui/core/Paper'
import HomeIcon from '@material-ui/icons/Home'
import EventIcon from '@material-ui/icons/Event'
import PeopleIcon from '@material-ui/icons/People'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import TBANavMoreMenuContainer from '../containers/TBANavMoreMenuContainer'

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
}

class TBABottomNav extends React.PureComponent {
  state = {
    moreMenuOpen: false,
    anchorEl: null,
  }

  handleNavChange = (event, value) => {
    if (value !== 'more') {
      if (value === 'home') {
        this.props.push('/')
      } else {
        this.props.push(`/${value}`)
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

    const { classes, promptSignInOpen } = this.props

    return (
      <Paper className={classes.root} elevation={12}>
        <BottomNavigation
          value={this.props.navValue}
          onChange={this.handleNavChange}
          showLabels
        >
          <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Events" value="events" icon={<EventIcon />} />
          <BottomNavigationAction label="Teams" value="teams" icon={<PeopleIcon />} />
          <BottomNavigationAction label="More" value="more" icon={<MoreHorizIcon />}
            onClick={this.handleOpen} ref={el => this.moreRef = el} />
        </BottomNavigation>
        <TBANavMoreMenuContainer
          open={this.state.moreMenuOpen}
          handleClose={this.handleClose}
          anchorEl={this.state.anchorEl}
          promptSignInOpen={promptSignInOpen}
        />
      </Paper>
    )
  }
}

TBABottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TBABottomNav)
