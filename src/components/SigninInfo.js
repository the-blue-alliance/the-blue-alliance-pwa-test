import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import NotificationsIcon from '@material-ui/icons/Notifications'
import StarIcon from '@material-ui/icons/Star'

const styles = theme => ({
  icon: {
    top: '0.125em',
    position: 'relative',
    fontSize: '14px',
  },
});

const titleText = 'Please sign in to The Blue Alliance'
const infoText = 'Your account settings will be accessible whenever you are signed into The Blue Alliance.'
const MyTBABody = props => (
  <React.Fragment>
    Signing in enables myTBA, which lets you customize your experience when using The Blue Alliance.
    <br />
    <StarIcon className={props.classes.icon}/> <strong>Favorites</strong> are used for personalized content and quick access.
    <br />
    <NotificationsIcon className={props.classes.icon}/> <strong>Subscriptions</strong> are used for push notifications (Android only).
  </React.Fragment>
)
const aboutGoogleAccountsBody = (
  <React.Fragment>
    The Blue Alliance uses <a href='https://myaccount.google.com/intro' target='_blank' rel='noopener noreferrer'>Google Accounts</a> to handle our sign in. Only your email address and name is shared with us and they will always be kept private.
  </React.Fragment>
)

const SigninInfo = (props) => {
  if (props.isDialog) {
    return (
      <React.Fragment>
        <DialogTitle>{titleText}</DialogTitle>
        <DialogContent>
          <Typography>{infoText}</Typography>
          <br />

          <Typography variant='h6'>myTBA</Typography>
          <Typography><MyTBABody classes={props.classes}/></Typography>

          <br />
          <Typography variant='h6'>About Google Accounts</Typography>
          <Typography>{aboutGoogleAccountsBody}</Typography>
        </DialogContent>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Typography variant='h4' gutterBottom>{titleText}</Typography>
        <Typography>{infoText}</Typography>
        <br />

        <Typography variant='h5' gutterBottom>myTBA</Typography>
        <Typography><MyTBABody classes={props.classes}/></Typography>
        <br />

        <Typography variant='h5' gutterBottom>About Google Accounts</Typography>
        <Typography>{aboutGoogleAccountsBody}</Typography>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SigninInfo)
