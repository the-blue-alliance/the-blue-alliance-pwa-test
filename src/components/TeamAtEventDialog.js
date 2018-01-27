// General
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

// Components
import Button from 'material-ui/Button'
import { DialogContent } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Hidden from 'material-ui/Hidden'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import Tabs, { Tab } from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import CloseIcon from 'material-ui-icons/Close'
import SwipeableViews from 'react-swipeable-views'

// TBA Components
import MatchList from './MatchList'
import TeamAtEvent from '../components/TeamAtEvent'

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
    top: 64 + 48,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
  },
  flex: {
    flex: 1,
    textAlign: 'center',
  },
  toolbar: {
    padding: 0,
  },
  containerStyle: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
})

class TeamAtEventDialog extends PureComponent {
  reset = props => {
    props.resetModal({
      tabIdx: 0,
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
      // Needed because not all statuses for an event are loaded
      this.props.fetchTeamEventStatus(nextProps.teamNumber, nextProps.eventKey)
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
    this.props.fetchTeamEventStatus(this.props.teamNumber, this.props.eventKey)
  }

  tabHandleChange = (event, value) => {
    this.props.setModalState({tabIdx: value})
  }

  tabHandleChangeIndex = index => {
    this.props.setModalState({tabIdx: index})
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
        <Hidden smDown>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.button} aria-label="Back" onClick={() => this.props.goBack()}>
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
              disableVisibilityRenderer
            />
          </DialogContent>
        </Hidden>
        <Hidden mdUp>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.button} aria-label="Back" onClick={() => window.history.back()}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
                <Button
                  color='primary'
                  component={Link}
                  to={{pathname: `/team/${teamNumber}/${event.get('year')}`, hash: eventKey.substring(4)}}
                >
                  {teamTitle} <Icon>chevron_right</Icon>
                </Button>
            </Typography>
            <IconButton className={classes.button} aria-label="Close" onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Tabs
            value={this.props.tabIdx}
            onChange={this.tabHandleChange}
            indicatorColor='primary'
            scrollable
            scrollButtons='auto'
            className='hide-scrollbar'
          >
            <Tab value={0} label='Summary' />
            <Tab value={1} label='Matches' />
            <Tab value={2} label='Awards' />
          </Tabs>
          <Divider />
          <DialogContent className={classes.contentMobile}>
            <SwipeableViews
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              index={this.props.tabIdx}
              onChangeIndex={this.tabHandleChangeIndex}
            >
              <div>{JSON.stringify(status)}</div>
              <MatchList matches={matches} />
              <div>{JSON.stringify(awards)}</div>
            </SwipeableViews>
          </DialogContent>
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TeamAtEventDialog)
