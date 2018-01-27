// General
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

// Components
import { DialogContent } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
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
  content: {
    paddingTop: theme.spacing.unit*2,
    paddingBottom: theme.spacing.unit*2,
  },
  flex: {
    flex: 1,
    textAlign: 'center',
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

  componentDidUpdate() {
    // Needed because not all statuses for an event are loaded
    this.props.fetchTeamEventStatus(this.props.teamNumber, this.props.eventKey)
  }

  refreshFunction = () => {
    this.props.fetchEventAwards(this.props.eventKey)
    this.props.fetchEventMatches(this.props.eventKey)
    this.props.fetchEventTeams(this.props.eventKey)
    this.props.fetchTeamEventStatus(this.props.teamNumber, this.props.eventKey)
  }

  render() {
    console.log("Render Team@Event Dialog")

    const { classes, awards, event, eventKey, matches, status, team, teamNumber } = this.props

    let teamTitle = `Team ${teamNumber}`
    if (team) {
      teamTitle = `Team ${team.get('team_number')} - ${team.get('nickname')}`
    }

    return (
      <React.Fragment>
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
        <Divider />
        <DialogContent className={classes.content}>
          <TeamAtEvent
            awards={awards}
            event={event}
            matches={matches}
            status={status}
          />
        </DialogContent>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TeamAtEventDialog)
