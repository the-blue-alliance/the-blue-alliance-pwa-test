import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { DialogContent } from 'material-ui/Dialog';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import CloseIcon from 'material-ui-icons/Close';
import MatchBreakdownTable from './MatchBreakdownTable'
import MatchVideos from './MatchVideos'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  flex: {
    flex: 1,
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
      <div>
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
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <MatchBreakdownTable match={this.props.matchObj}/>
            </Grid>
            <Grid item xs={6}>
              <MatchVideos match={this.props.matchObj}/>
            </Grid>
          </Grid>
        </DialogContent>
      </div>
    )
  }
}

export default withStyles(styles)(MatchDialog)
