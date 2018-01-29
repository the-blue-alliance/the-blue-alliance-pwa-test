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
  render() {
    const { isModal, open, fullScreen, handleClose } = this.props
    return (
      <Dialog
        open={open}
        onBackdropClick={handleClose}
        maxWidth='md'
        fullWidth
        fullScreen={fullScreen}
        transition={Transition}
      >
        {isModal &&
          <React.Fragment>
            <ModalRoute path='/match/:matchKey' component={MatchDialogContainer} handleClose={handleClose} />
            <ModalRoute path='/team/:teamNumber/:year?' component={TeamAtEventDialogContainer} handleClose={handleClose} />
          </React.Fragment>
        }
      </Dialog>
    )
  }
}

TBAModalDialog.propTypes = {
  isModal: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default withMobileDialog()(TBAModalDialog)
