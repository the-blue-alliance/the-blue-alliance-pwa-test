// General
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

// Components
import Grid from 'material-ui/Grid'
import { DialogContent } from 'material-ui/Dialog'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import CloseIcon from 'material-ui-icons/Close'

// TBA Components
import TeamAtEvent from '../components/TeamAtEvent'

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

    let teamTitle = `Team ${teamNumber}`
    if (team) {
      teamTitle = `Team ${team.get('team_number')} - ${team.get('nickname')}`
    }

    return (
      <div>
        <Toolbar>
          <IconButton className={classes.button} aria-label="Back" onClick={() => window.history.back()}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            <Link to={{pathname: `/team/${teamNumber}/${event.get('year')}`, hash: eventKey.substring(4)}}>{teamTitle}</Link>
          </Typography>
          <IconButton className={classes.button} aria-label="Close" onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <DialogContent>
          <TeamAtEvent
            // awards={awardsByEvent.get(eventKey)}
            event={event}
            matches={matches}
            // status={statusByEvent && statusByEvent.get(eventKey)}
          />
        </DialogContent>
      </div>
    )
  }
}

export default withStyles(styles)(TeamAtEventDialog)
