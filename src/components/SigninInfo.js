import React from 'react'

import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

const titleText = 'Please sign in to The Blue Alliance'
const infoText = 'Your account settings will be accessible whenever you are signed into The Blue Alliance.'
const myTBABody = (
  <React.Fragment>
    Signing in enables myTBA, which lets you customize your experience when using The Blue Alliance.
    <br />
    <Icon>star</Icon> <strong>Favorites</strong> are used for personalized content and quick access.
    <br />
    <Icon>notifications</Icon> <strong>Subscriptions</strong> are used for push notifications (Android only).
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
          <Typography variant='body1'>{infoText}</Typography>
          <br />

          <Typography variant='title'>myTBA</Typography>
          <Typography variant='body1'>{myTBABody}</Typography>

          <br />
          <Typography variant='title'>About Google Accounts</Typography>
          <Typography variant='body1'>{aboutGoogleAccountsBody}</Typography>
        </DialogContent>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h1>{titleText}</h1>
        <p>{infoText}</p>

        <h2>myTBA</h2>
        <p>{myTBABody}</p>

        <h2>About Google Accounts</h2>
        <p>{aboutGoogleAccountsBody}</p>
      </React.Fragment>
    )
  }
}

export default SigninInfo
