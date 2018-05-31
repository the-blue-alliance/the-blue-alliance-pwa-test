// General
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { push } from 'connected-react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { withFirebase } from 'react-redux-firebase'

// Actions
import {
  resetPage,
  setNav,
} from '../actions'

// Selectors

// Components
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

// TBA Components
import TBAUniversalPage from '../components/TBAUniversalPage'

const mapStateToProps = (state, props) => ({
  auth: state.get('firebase').auth,
})

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setNav: (value) => dispatch(setNav(value)),
  push: (path) => dispatch(push(path)),
})

const styles = theme => ({
  signOutButton: {
    float: 'right',
  },
})

class AccountPageBase extends PureComponent {
  state = {
    signOutPromptOpen: false,
  }

  promptSignOutOpen = () => {
    this.setState({signOutPromptOpen: true})
  }

  promptSignOutClose = () => {
    this.setState({signOutPromptOpen: false})
  }

  signOut = () => {
    this.promptSignOutClose()
    this.props.firebase.logout()
    this.props.push('/')
  }

  refreshFunction = () => {
  }

  componentDidMount() {
    this.props.resetPage()
    this.props.setNav('account')

    // Fetch data async
    ReactDOM.unstable_deferredUpdates(() => this.refreshFunction())
  }

  render() {
    console.log("Render AccountPageBase")

    const {
      classes,
      auth,
      location,
    } = this.props

    if (auth.isLoaded && auth.isEmpty) {
      return <Redirect to={`signin_required?redirect=${location.pathname + location.search + location.hash}`} />
    }

    return (
      <TBAUniversalPage
        title='Account Overview'
        metaDescription='Your TBA account overview'
        refreshFunction={this.refreshFunction}
      >
        {auth.isLoaded &&
          <React.Fragment>
            <Button
              className={classes.signOutButton}
              onClick={this.promptSignOutOpen}
              color='default'
              variant='raised'
            >
              Sign Out
            </Button>
            <h1>Welcome back!</h1>
            <h2>Profile</h2>
            <Card>
              <CardContent>
                <p><b>Name:</b> {auth.displayName}</p>
                <p><b>Email:</b> {auth.email}</p>
              </CardContent>
            </Card>
            <h2>myTBA</h2>
            <Card>
              <CardContent>
                <p>TODO</p>
              </CardContent>
            </Card>
            <Dialog
              open={this.state.signOutPromptOpen}
              onClose={this.promptSignOutClose}
            >
              <DialogTitle>Sign out?</DialogTitle>
              <DialogContent>
                <Typography variant='body1'>
                  You are currently signed in as {auth.displayName} ({auth.email}).
                  Are you sure you want to sign out of The Blue Alliance?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.promptSignOutClose} color='default' variant='raised' autoFocus>
                  No
                </Button>
                <Button onClick={this.signOut} color='primary' variant='raised'>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        }
      </TBAUniversalPage>
    )
  }
}

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountPageBase)))
