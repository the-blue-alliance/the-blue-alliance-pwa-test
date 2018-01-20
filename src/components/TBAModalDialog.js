import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Dialog, { withMobileDialog } from 'material-ui/Dialog';

import MatchDialogContainer from '../containers/MatchDialogContainer'
import TeamAtEventDialogContainer from '../containers/TeamAtEventDialogContainer'

const ModalRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      let props = Object.assign(routeProps, rest)
      return React.createElement(component, props)
    }}/>
  )
}

class TBAModalDialog extends React.Component {
  render() {
    const { fullScreen, handleClose } = this.props

    return (
      <Dialog
        open={true}
        onClose={handleClose}
        maxWidth='md'
        fullWidth
        fullScreen={fullScreen}
      >
        <ModalRoute path='/match/:matchKey' component={MatchDialogContainer} handleClose={handleClose} />
        <ModalRoute path='/team/:teamNumber/:year?' component={TeamAtEventDialogContainer} handleClose={handleClose} />
      </Dialog>
    )
  }
}

TBAModalDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default withMobileDialog()(TBAModalDialog)
