import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Hidden from '@material-ui/core/Hidden'

import TBASideNavContainer from '../containers/TBASideNavContainer'
import TBABottomNavContainer from '../containers/TBABottomNavContainer'
import SigninInfo from '../components/SigninInfo'

const styles = theme => ({
})

class TBANav extends PureComponent {
  state = {
    signInPromptOpen: false,
  }

  promptSignInOpen = () => {
    this.setState({signInPromptOpen: true})
  }

  promptSignInClose = () => {
    this.setState({signInPromptOpen: false})
  }

  signIn = () => {
    this.promptSignInClose()
    this.props.firebase.login({
      provider: 'google',
      type: window.matchMedia('(display-mode: standalone)').matches ? 'redirect' : 'popup',
    })
  }

  signOut = () => {
    this.promptSignInClose()
    this.props.firebase.logout()
  }

  render() {
    console.log('Render TBANav')

    return (
      <React.Fragment>
        <Hidden smDown implementation='css'>
          <TBASideNavContainer promptSignInOpen={this.promptSignInOpen} />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <TBABottomNavContainer promptSignInOpen={this.promptSignInOpen} />
        </Hidden>
        <Dialog
          open={this.state.signInPromptOpen}
          onClose={this.promptSignInClose}
        >
          <React.Fragment>
            <SigninInfo isDialog />
            <DialogActions>
              <Button onClick={this.promptSignInClose} color='default' variant='raised'>
                No thanks
              </Button>
              <Button onClick={this.signIn} color='primary' variant='raised' autoFocus>
                Sign in
              </Button>
            </DialogActions>
          </React.Fragment>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TBANav)
