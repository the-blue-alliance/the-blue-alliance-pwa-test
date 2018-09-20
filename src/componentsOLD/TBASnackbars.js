import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

class TBASnackbars extends React.PureComponent {
  state = {
    dialog: null,
    triggeredOnce: false,
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.props.closeSnackbar()
  }

  closeSnackbarAndOpenDialog = () => {
    this.props.closeSnackbar()
    this.setState({dialog: this.props.snackbar})
  }

  handleDialogClose = () => {
    this.setState({dialog: null})
  }

  static getDerivedStateFromProps(props, state) {
    if (props.snackbar !== null) {
      return {triggeredOnce: true}
    }
    return null
  }

  render() {
    const { classes } = this.props
    if (!this.state.triggeredOnce) {
      return null
    }
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.snackbar === 'readyForOffline'}
          onClose={this.handleSnackbarClose}
          message={<span>Ready for use offline!</span>}
          action={[
            <Button key="info" color="secondary" onClick={this.closeSnackbarAndOpenDialog}>
              More Info
            </Button>,
            <IconButton
              key="close"
              color="inherit"
              className={classes.close}
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <Dialog
          open={this.state.dialog === 'readyForOffline'}
          onClose={this.handleDialogClose}
        >
          <DialogTitle>The Blue Alliance works offline!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Previously loaded content and data will work, even without internet.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary" autoFocus>
              Ok, Cool!
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.snackbar === 'newContentAvailable'}
          onClose={this.handleSnackbarClose}
          message={<span>The Blue Alliance has been updated! Please refresh for the latest content.</span>}
          action={[
            <Button key="refresh" color="secondary" onClick={() => window.location.reload()}>
              Refresh Now
            </Button>,
            <IconButton
              key="close"
              color="inherit"
              className={classes.close}
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    )
  }
}

TBASnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TBASnackbars)
