import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { DialogContent } from 'material-ui/Dialog';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import CloseIcon from 'material-ui-icons/Close';
import MatchTable from './MatchTable'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  flex: {
    flex: 1,
  },
})

class TeamAtEventDialog extends PureComponent {
  handleClose = (e) => {
    e.stopPropagation()
    this.props.handleClose()
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchEventMatches(this.props.eventKey)
    this.props.fetchEventTeams(this.props.eventKey)
  }

  render() {
    console.log("Render Team@Event Dialog")

    const { classes, event, eventKey, matches, team, teamNumber } = this.props

    let title = `Team ${teamNumber}`
    if (team) {
      title = `Team ${team.get('team_number')} - ${team.get('nickname')}`
    }
    if (event.get('name')) {
      title += ` @ ${event.get('name')}`
    } else {
      title += ` @ ${eventKey}`
    }

    return (
      <div>
        <Toolbar>
          <IconButton className={classes.button} aria-label="Back" onClick={() => window.history.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            {title}
          </Typography>
          <IconButton className={classes.button} aria-label="Close" onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <DialogContent>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            Status, Ranking, Awards, etc.
          </Grid>
          <Grid item xs={8}>
            <MatchTable matches={matches} />
          </Grid>
        </Grid>
        </DialogContent>
      </div>
    )
  }
}

export default withStyles(styles)(TeamAtEventDialog)
