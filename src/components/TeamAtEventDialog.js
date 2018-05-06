// General
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { ordinal } from '../utils'

// Components
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import { DialogContent } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Hidden from 'material-ui/Hidden'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import List, { ListItem } from 'material-ui/List'
import Tabs, { Tab } from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'

// TBA Components
import MatchList from './MatchList'
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'
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
  scrollContainer: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  toolbar: {
    padding: 0,
  },
  list: {
    padding: 0,
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
      // this.props.fetchTeamEventStatus(nextProps.teamNumber, nextProps.eventKey)
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
    // this.props.fetchTeamEventStatus(this.props.teamNumber, this.props.eventKey)
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
            <Typography variant="title" color="inherit" className={classes.flex}>
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
          </AppBar>
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
              <ScrollRestoreContainer
                scrollId='summary'
                className={classes.scrollContainer}
              >
                <List className={classes.list}>
                  {status && status.getIn(['qual', 'ranking', 'rank']) &&
                    <React.Fragment>
                      <ListItem>
                        <Typography variant='subheading'>
                          Rank: <b>{status.getIn(['qual', 'ranking', 'rank'])}/{status.getIn(['qual', 'num_teams'])}</b>
                        </Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  }
                  {status && status.getIn(['qual', 'ranking', 'record']) &&
                    <React.Fragment>
                      <ListItem>
                        <Typography variant='subheading'>
                          Qual Record: <b>{status.getIn(['qual', 'ranking', 'record', 'wins'])}-{status.getIn(['qual', 'ranking', 'record', 'losses'])}-{status.getIn(['qual', 'ranking', 'record', 'ties'])}</b>
                        </Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  }
                  {status && status.getIn(['alliance']) &&
                    <React.Fragment>
                      <ListItem>
                        <Typography variant='subheading'>
                          Alliance: <b>{status.getIn(['alliance', 'pick']) === 0 ? 'Captain' : `${ordinal(status.getIn(['alliance', 'pick']))} Pick`}</b> of <b>{status.getIn(['alliance', 'name'])}</b>
                        </Typography>
                      </ListItem>
                        <Divider />
                    </React.Fragment>
                  }
                  {status && status.getIn(['playoff', 'record']) &&
                    <React.Fragment>
                      <ListItem>
                        <Typography variant='subheading'>
                          Playoff Record: <b>{status.getIn(['playoff', 'record', 'wins'])}-{status.getIn(['playoff', 'record', 'losses'])}-{status.getIn(['playoff', 'record', 'ties'])}</b>
                        </Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  }
                </List>
              </ScrollRestoreContainer>
              <MatchList matches={matches} scrollId='matches' />
              <ScrollRestoreContainer
                scrollId='awards'
                className={classes.scrollContainer}
              >
                {awards &&
                  <List className={classes.list}>
                  {awards.map(award => {
                    return (
                      <React.Fragment key={award.key}>
                        <ListItem>
                          <Typography variant='subheading'>
                            {award.name}
                          </Typography>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    )
                  })}
                  </List>
                }
              </ScrollRestoreContainer>
            </SwipeableViews>
          </DialogContent>
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TeamAtEventDialog)
