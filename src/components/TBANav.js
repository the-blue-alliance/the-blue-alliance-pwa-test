import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Hidden from '@material-ui/core/Hidden'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

import TBASideNavContainer from '../containers/TBASideNavContainer'
import TBABottomNavContainer from '../containers/TBABottomNavContainer'

const styles = theme => ({
})

class TBANav extends PureComponent {
  state = {
    signInOutPromptOpen: false,
  }

  promptSignInOutOpen = () => {
    this.setState({signInOutPromptOpen: true})
  }

  promptSignInOutClose = () => {
    this.setState({signInOutPromptOpen: false})
  }

  signIn = () => {
    this.promptSignInOutClose()
    this.props.firebase.login({
      provider: 'google',
      type: window.matchMedia('(display-mode: standalone)').matches ? 'redirect' : 'popup',
    })
  }

  signOut = () => {
    this.promptSignInOutClose()
    this.props.firebase.logout()
  }

  render() {
    console.log('Render TBANav')

    const { auth } = this.props

    return (
      <React.Fragment>
        <Hidden smDown implementation='css'>
          <TBASideNavContainer promptSignInOutOpen={this.promptSignInOutOpen} />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <TBABottomNavContainer promptSignInOutOpen={this.promptSignInOutOpen} />
        </Hidden>
        <Dialog
          open={this.state.signInOutPromptOpen}
          onClose={this.promptSignInOutClose}
        >
          {auth.isEmpty ?
            <React.Fragment>
              <DialogTitle>Please sign in to your The Blue Alliance account</DialogTitle>
              <DialogContent>
                <Typography variant='body1'>
                  Your account settings will be accessible whenever you are signed into The Blue Alliance.
                </Typography>
                <br />
                <Typography variant='title'>
                  myTBA
                </Typography>
                <Typography variant='body1'>
                  Signing in enables myTBA, which lets you customize your experience when using The Blue Alliance.
                  <br />
                  <Icon>star</Icon> <b>Favorites</b> are used for personalized content and quick access.
                  <br />
                  <Icon>notifications</Icon> <b>Subscriptions</b> are used for push notifications (Android only).
                </Typography>
                <br />
                <Typography variant='title'>
                  About Google Accounts
                </Typography>
                <Typography variant='body1'>
                  The Blue Alliance uses <a href='https://myaccount.google.com/intro' target='_blank' rel='noopener noreferrer'>Google Accounts</a> to handle our sign in. Only your email address and name is shared with us and they will always be kept private.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.promptSignInOutClose} color='default' variant='raised'>
                  No thanks
                </Button>
                <Button onClick={this.signIn} color='primary' variant='raised' autoFocus>
                  Sign in
                </Button>
              </DialogActions>
            </React.Fragment>
            :
            <React.Fragment>
              <DialogTitle>Sign out?</DialogTitle>
              <DialogContent>
                <Typography variant='body1'>
                  You are currently signed in as {auth.displayName} ({auth.email}).
                  Are you sure you want to sign out of The Blue Alliance?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.promptSignInOutClose} color='default' variant='raised' autoFocus>
                  No
                </Button>
                <Button onClick={this.signOut} color='primary' variant='raised'>
                  Yes
                </Button>
              </DialogActions>
            </React.Fragment>
          }
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TBANav)
