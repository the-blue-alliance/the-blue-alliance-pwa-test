import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Dialog, { withMobileDialog } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import MatchDialogContainer from '../containers/MatchDialogContainer'
import TeamAtEventDialogContainer from '../containers/TeamAtEventDialogContainer'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ModalRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      let props = Object.assign(routeProps, rest)
      return React.createElement(component, props)
    }}/>
  )
}

class TBAModalDialog extends React.Component {
  state = {
    open: true,
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const { fullScreen, restoreBackState } = this.props

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        maxWidth='md'
        fullWidth
        fullScreen={fullScreen}
        transition={Transition}
        onExited={restoreBackState}
      >
        <ModalRoute path='/match/:matchKey' component={MatchDialogContainer} handleClose={this.handleClose} />
        <ModalRoute path='/team/:teamNumber/:year?' component={TeamAtEventDialogContainer} handleClose={this.handleClose} />
      </Dialog>
    )
  }
}

TBAModalDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  restoreBackState: PropTypes.func.isRequired,
}

export default withMobileDialog()(TBAModalDialog)
