import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { toggleTheme, toggleAPI, toggleIDB } from '../../actions'
import { withFirebase } from 'react-redux-firebase'

import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'
import VideocamIcon from '@material-ui/icons/Videocam'
import EventIcon from '@material-ui/icons/Event'
import PeopleIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'

import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'

import PageState from './PageState'

const styles = theme => ({
  root:  {
    zIndex: 1,
    position: 'absolute',
  },
  content: {
    width: 190,
    marginTop: 64,
    overflowY: 'auto',
  },
  activeIcon: {
    color: theme.palette.primary.main,
  },
  activeText: {
    fontWeight: 600,
  },
})

class TBASideNavContent extends PureComponent {
  render() {
    console.log("Render TBASideNavContent")

    const {
      classes,
      auth,
      navValue,
      toggleTheme,
      darkTheme,
      apiEnabled,
      idbEnabled,
      toggleAPI,
      toggleIDB,
      promptSignInOpen,
    } = this.props

    return (
    <Drawer className={classes.root} variant="permanent">
      <div className={classes.content}>
        <List component='div'>
          <ListItem button component={Link} to="/">
            <ListItemIcon className={classNames({[classes.activeIcon]: navValue === 'home'})}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" classes={{primary: classNames({[classes.activeText]: navValue === 'home'})}}/>
          </ListItem>
          <ListItem button component={Link} to="/mytba">
            <ListItemIcon className={classNames({[classes.activeIcon]: navValue === 'mytba'})}>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="myTBA" classes={{primary: classNames({[classes.activeText]: navValue === 'mytba'})}}/>
          </ListItem>
          <ListItem button component={Link} to="/gameday">
            <ListItemIcon className={classNames({[classes.activeIcon]: navValue === 'gameday'})}>
              <VideocamIcon />
            </ListItemIcon>
            <ListItemText primary="GameDay" classes={{primary: classNames({[classes.activeText]: navValue === 'gameday'})}}/>
          </ListItem>
          <ListItem button component={Link} to="/events">
            <ListItemIcon className={classNames({[classes.activeIcon]: navValue === 'events'})}>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" classes={{primary: classNames({[classes.activeText]: navValue === 'events'})}}/>
          </ListItem>
          <ListItem button component={Link} to="/teams">
            <ListItemIcon className={classNames({[classes.activeIcon]: navValue === 'teams'})}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Teams" classes={{primary: classNames({[classes.activeText]: navValue === 'teams'})}}/>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader>Temp for testing</ListSubheader>
          <ListItem>
            <ListItemText primary={darkTheme ? "Dark Theme" : "Light Theme"} />
            <ListItemSecondaryAction>
              <Switch
                onClick={toggleTheme}
                checked={!darkTheme}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={apiEnabled ? "API Enabled" : "API Disabled"} />
            <ListItemSecondaryAction>
              <Switch
                onClick={toggleAPI}
                checked={apiEnabled}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={idbEnabled ? "IDB Enabled" : "IDB Disabled"} />
            <ListItemSecondaryAction>
              <Switch
                onClick={toggleIDB}
                checked={idbEnabled}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <LinearProgress style={{width: '100%'}}/>
          </ListItem>
          <ListItem disableGutters>
            <PageState />
          </ListItem>
        </List>
        <Divider />
        <List component='div'>
          {auth.isEmpty ?
            <ListItem
              button
              component='div'
              onClick={promptSignInOpen}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Sign In' />
            </ListItem>
            :
            <ListItem
              button
              component={Link}
              to='/account'
            >
              <ListItemAvatar>
                <Avatar>
                  {auth.isEmpty ? <PersonIcon /> : <Avatar alt={auth.displayName} src={auth.photoURL} />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Account' classes={{primary: classNames({[classes.activeText]: navValue === 'account'})}} />
            </ListItem>
          }
        </List>
      </div>
    </Drawer>
    )
  }
}

const mapStateToProps = (state, props) => ({
  navValue: state.getIn(['appState', 'navValue']),
  darkTheme: state.getIn(['appState', 'darkTheme']),
  apiEnabled: state.getIn(['appState', 'apiEnabled']),
  idbEnabled: state.getIn(['appState', 'idbEnabled']),
  auth: state.get('firebase').auth,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTheme: () => dispatch(toggleTheme()),
  toggleAPI: () => dispatch(toggleAPI()),
  toggleIDB: () => dispatch(toggleIDB()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(withStyles(styles)(TBASideNavContent)))
