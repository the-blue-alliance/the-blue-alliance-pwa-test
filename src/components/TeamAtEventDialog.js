// General
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'

// Components
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import { DialogContent } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Hidden from 'material-ui/Hidden'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'

// TBA Components
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'
import TeamAtEvent from '../components/TeamAtEvent'
import TeamAtEventMobile from './TeamAtEventMobile'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    paddingTop: theme.spacing.unit*2,
    paddingBottom: theme.spacing.unit*2,
  },
  contentMobile: {
    position: 'fixed',
    top: 64,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
  },
  flex: {
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  toolbar: {
    padding: 0,
  },
})

class TeamAtEventDialog extends PureComponent {
  state = {
    scrollRef: null,
  }

  reset = props => {
    props.resetModal({
    })
  }

  constructor(props) {
    super(props)
    this.reset(props)
  }

  componentDidMount() {
    this.refreshFunction()
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.reset(nextProps)
    }
  }

  handleClose = (e) => {
    e.stopPropagation()
    this.props.handleClose()
  }

  refreshFunction = () => {
    this.props.fetchEventAwards(this.props.eventKey)
    this.props.fetchEventMatches(this.props.eventKey)
    this.props.fetchEventTeams(this.props.eventKey)
    this.props.fetchEventTeamStatuses(this.props.eventKey)
  }

  render() {
    console.log("Render Team@Event Dialog")

    const { classes, isLoading, awards, event, eventKey, matches, status, team, teamNumber } = this.props

    let teamTitle = `Team ${teamNumber}`
    if (team) {
      teamTitle = `Team ${team.get('team_number')} - ${team.get('nickname')}`
    }

    return (
      <React.Fragment>
        <Hidden smDown>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.button} aria-label="Back" onClick={() => this.props.goBack()}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to={{pathname: `/event/${eventKey}`}}>{event.get('short_name')}</Link> | <Link to={{pathname: `/team/${teamNumber}/${event.get('year')}`, hash: eventKey}}>{teamTitle}</Link>
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
              teamKey={`frc${teamNumber}`}
              hideEventName={true}
            />
          </DialogContent>
        </Hidden>
        <Hidden mdUp>
          <AppBar color='default'>
            <Toolbar className={classes.toolbar}>
              <IconButton className={classes.button} aria-label="Back" onClick={() => this.props.goBack()}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                  <Button
                    color='primary'
                    component={Link}
                    to={{pathname: `/team/${teamNumber}/${event.get('year')}`, hash: eventKey}}
                  >
                    {teamTitle} <Icon>chevron_right</Icon>
                  </Button>
              </Typography>
              <IconButton className={classes.button} aria-label="Close" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent className={classes.contentMobile}>
            <ScrollRestoreContainer
              key={eventKey}
              scrollId={`${eventKey}_frc${teamNumber}`}
              className={classes.scrollContainer}
              contentRef={el => {
                if (!this.state.scrollRef) {
                  this.setState({scrollRef: el})
                }
              }}
            >
              <TeamAtEventMobile
                scrollElement={this.state.scrollRef}
                isLoading={isLoading}
                event={event}
                matches={matches}
                status={status}
                awards={awards}
                teamKey={`frc${teamNumber}`}
              />
            </ScrollRestoreContainer>
          </DialogContent>
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TeamAtEventDialog)
