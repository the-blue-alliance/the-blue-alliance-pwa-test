import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper';
import HomeIcon from 'material-ui-icons/Home'
import EventIcon from 'material-ui-icons/Event'
import PeopleIcon from 'material-ui-icons/People'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'

import TBANavMoreDialog from './TBANavMoreDialog'

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
    moreDialogOpen: false,
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

  handleOpen = () => {
    this.setState({ moreDialogOpen: true })
  }

  handleClose = () => {
    this.setState({ moreDialogOpen: false })
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
          <BottomNavigationButton label="More" value="more" icon={<MoreHorizIcon />} onClick={this.handleOpen} />
        </BottomNavigation>
        <TBANavMoreDialog open={this.state.moreDialogOpen} handleClose={this.handleClose} />
      </Paper>
    )
  }
}

TBABottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TBABottomNav)
