import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

class TBASnackbars extends React.PureComponent {
  state = {
    dialog: null,
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

  render() {
    const { classes } = this.props
    return (
      <div>
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
      </div>
    )
  }
}

TBASnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TBASnackbars)
