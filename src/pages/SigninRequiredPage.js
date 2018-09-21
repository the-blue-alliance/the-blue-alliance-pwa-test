// General
import React, { PureComponent } from 'react'
import { goBack } from 'connected-react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import qs from 'qs'

// Actions
import {
  resetPage,
  setNav,
} from '../actions'

// Selectors

// Components
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

// TBA Components
import TBAPage from '../components/TBAPage'
import SigninInfo from '../components/SigninInfo'

const mapStateToProps = (state, props) => ({
  auth: state.get('firebase').auth,
})

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setNav: (value) => dispatch(setNav(value)),
  goBack: () => dispatch(goBack()),
})

class SigninRequiredPage extends PureComponent {
  signIn = () => {
    this.props.firebase.login({
      provider: 'google',
      type: window.matchMedia('(display-mode: standalone)').matches ? 'redirect' : 'popup',
    })
  }

  refreshFunction = () => {
  }

  componentDidMount() {
    this.props.resetPage()
    this.props.setNav('account')

    requestIdleCallback(() => this.refreshFunction())
  }

  render() {
    console.log("Render SigninRequiredPage")

    const {
      auth,
      location,
    } = this.props

    if (auth.isLoaded && !auth.isEmpty) {
      const parsed = qs.parse(location.search, { ignoreQueryPrefix: true })
      return <Redirect to={parsed.redirect ? parsed.redirect : 'account'} />
    }

    return (
      <TBAPage
        title='Sign In'
        metaDescription='The Blue Alliance account sign in'
      >
        {auth.isLoaded &&
          <React.Fragment>
            <SigninInfo />
            <DialogActions>
              <Button onClick={this.props.goBack} color='default' variant='raised'>
                No thanks, take me back
              </Button>
              <Button onClick={this.signIn} color='primary' variant='raised' autoFocus>
                Sign in
              </Button>
            </DialogActions>
          </React.Fragment>
        }
      </TBAPage>
    )
  }
}

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(SigninRequiredPage))
