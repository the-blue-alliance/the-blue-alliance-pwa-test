import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Fade from '@material-ui/core/Fade'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import SearchPageMobileContainer from '../containers/SearchPageMobileContainer'

function Transition(props) {
  return <Fade {...props} />
}

const ModalRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      let props = Object.assign(routeProps, rest)
      return React.createElement(component, props)
    }}/>
  )
}

const styles = theme => ({
})

class SearchModal extends React.Component {
  render() {
    const { classes, isModal, open, fullScreen, handleClose } = this.props
    return (
      <Dialog
        open={open && isModal}
        onBackdropClick={handleClose}
        maxWidth='md'
        fullWidth
        fullScreen={fullScreen}
        TransitionComponent={Transition}
      >
        {isModal &&
          <React.Fragment>
            <ModalRoute path='/search' component={SearchPageMobileContainer} handleClose={handleClose} />
          </React.Fragment>
        }
      </Dialog>
    )
  }
}

SearchModal.propTypes = {
  isModal: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default withMobileDialog()(withStyles(styles)(SearchModal))
