import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonIcon from '@material-ui/icons/Person'
import StarIcon from '@material-ui/icons/Star'
import VideocamIcon from '@material-ui/icons/Videocam'

const styles = {
}

class TBANavMoreMenu extends React.PureComponent {
  handleSignInClick = () => {
    this.props.handleClose()
    this.props.promptSignInOpen()
  }

  render() {
    const { anchorEl, open, handleClose, auth } = this.props
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div></div>{/* Captures focus to prevent ugly outline */}
        <MenuItem onClick={handleClose} component={Link} to='/mytba'>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText inset primary="myTBA" />
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/gameday'>
          <ListItemIcon>
            <VideocamIcon />
          </ListItemIcon>
          <ListItemText inset primary="GameDay" />
        </MenuItem>
        {auth.isEmpty ?
          <MenuItem
            button
            onClick={this.handleSignInClick}
          >
            <Avatar>
              <PersonIcon />
            </Avatar>
            <ListItemText primary='Sign In' />
          </MenuItem>
          :
          <MenuItem
            button
            onClick={handleClose}
            component={Link}
            to='/account'
          >
            <Avatar>
              <Avatar alt={auth.displayName} src={auth.photoURL} />
            </Avatar>
            <ListItemText primary='Account' />
          </MenuItem>
        }
      </Menu>
    )
  }
}

TBANavMoreMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TBANavMoreMenu)
