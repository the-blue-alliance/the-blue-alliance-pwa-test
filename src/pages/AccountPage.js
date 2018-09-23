// General
import React, { PureComponent } from 'react'
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
import TBAPage from '../components/TBAPage'
import MyTBASettingsContainer from '../containers/MyTBASettingsContainer'

const mapStateToProps = (state, props) => ({
  auth: state.get('firebase').auth,
})

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setNav: (value) => dispatch(setNav(value)),
  push: (path) => dispatch(push(path)),
})

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 3,
  },
  signOutButton: {
    float: 'right',
  },
})

class AccountPage extends PureComponent {
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

    requestAnimationFrame(() => this.refreshFunction())
  }

  render() {
    console.log("Render AccountPage")

    const {
      classes,
      auth,
      location,
    } = this.props

    if (auth.isLoaded && auth.isEmpty) {
      return <Redirect to={`signin_required?redirect=${location.pathname + location.search + location.hash}`} />
    }

    return (
      <TBAPage
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
            <Typography variant='display1' gutterBottom>Welcome back!</Typography>
            <Typography variant='title'>Profile</Typography>
            <Card className={classes.card}>
              <CardContent>
                <Typography><strong>Name:</strong> {auth.displayName}</Typography>
                <Typography><strong>Email:</strong> {auth.email}</Typography>
              </CardContent>
            </Card>
            <Typography variant='title'>myTBA</Typography>
            <Card className={classes.card}>
              <CardContent>
                <MyTBASettingsContainer />
              </CardContent>
            </Card>
            <Dialog
              open={this.state.signOutPromptOpen}
              onClose={this.promptSignOutClose}
            >
              <DialogTitle>Sign out?</DialogTitle>
              <DialogContent>
                <Typography>
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
      </TBAPage>
    )
  }
}

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountPage)))
