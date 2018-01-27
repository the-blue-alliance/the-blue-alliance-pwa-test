// General
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'

// Components
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import CloseIcon from 'material-ui-icons/Close'
import { DialogContent } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

// TBA Components
import MatchBreakdownTable from './MatchBreakdownTable'
import MatchVideos from './MatchVideos'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    paddingTop: theme.spacing.unit*2,
    paddingBottom: theme.spacing.unit*2,
  },
  flex: {
    flex: 1,
    textAlign: 'center',
  },
})

class MatchDialog extends PureComponent {
  handleClose = (e) => {
    e.stopPropagation()
    this.props.handleClose()
  }

  render() {
    console.log("Render Match Dialog")

    const { classes } = this.props

    return (
      <React.Fragment>
        <Toolbar>
          <IconButton className={classes.button} aria-label="Back" onClick={() => window.history.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            {this.props.matchObj.getDisplayName()}
          </Typography>
          <IconButton className={classes.button} aria-label="Close" onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <DialogContent className={classes.content}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <MatchBreakdownTable match={this.props.matchObj}/>
            </Grid>
            <Grid item xs={6}>
              <MatchVideos match={this.props.matchObj}/>
            </Grid>
          </Grid>
        </DialogContent>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(MatchDialog)
