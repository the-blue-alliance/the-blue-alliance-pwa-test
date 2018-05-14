import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import StarIcon from '@material-ui/icons/Star'
import SettingsIcon from '@material-ui/icons/Settings'
import VideocamIcon from '@material-ui/icons/Videocam'

const styles = {
}

class TBANavMoreMenu extends React.PureComponent {
  render() {
    return (
      <Menu
        anchorEl={this.props.anchorEl}
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <div></div>{/* Captures focus to prevent ugly outline */}
        <MenuItem onClick={this.props.handleClose} component={Link} to='/mytba'>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText inset primary="myTBA" />
        </MenuItem>
        <MenuItem onClick={this.props.handleClose} component={Link} to='/gameday'>
          <ListItemIcon>
            <VideocamIcon />
          </ListItemIcon>
          <ListItemText inset primary="GameDay" />
        </MenuItem>
        <MenuItem onClick={this.props.handleClose} component={Link} to='/settings'>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
        </MenuItem>
      </Menu>
    )
  }
}

TBANavMoreMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TBANavMoreMenu)
