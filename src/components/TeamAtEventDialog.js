// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components
import AppBar from '@material-ui/core/AppBar'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloseIcon from '@material-ui/icons/Close'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom'

// TBA Components
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'
import TeamAtEvent from '../components/TeamAtEvent'
import TeamAtEventMobile from './TeamAtEventMobile'

const styles = theme => ({
  content: {
    paddingTop: theme.spacing.unit*2,
    paddingBottom: theme.spacing.unit*2,
  },
  contentMobile: {
    position: 'fixed',
    top: 56,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
  },
  flex: {
    flex: 1,
    textAlign: 'center',
    overflow: 'hidden',
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
    menuAnchorEl: null,
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

  handleCloseDialog = e => {
    e.stopPropagation()
    this.props.handleClose()
  }

  handleClickMenu = e => {
    this.setState({ menuAnchorEl: e.currentTarget })
  }

  handleCloseMenu = () => {
    this.setState({ menuAnchorEl: null })
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
      teamTitle = `${team.team_number} | ${team.nickname}`
    }

    return (
      <React.Fragment>
        <Hidden smDown>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.button} aria-label="Back" onClick={() => this.props.goBack()}>
              <ChevronLeftIcon />
            </IconButton>
            <div className={classes.flex}>
              <Typography variant='title' noWrap>
                <Link to={{pathname: `/team/${teamNumber}/${event.year}`, hash: eventKey}}>{teamTitle}</Link>
              </Typography>
              <Typography variant='subheading' noWrap>
                <Link to={{pathname: `/event/${eventKey}`}}>@ {event.year} {event.name}</Link>
              </Typography>
            </div>
            <IconButton className={classes.button} aria-label="Close" onClick={this.handleCloseDialog}>
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
              hideEventName
            />
          </DialogContent>
        </Hidden>
        <Hidden mdUp>
          <AppBar color='default'>
            <Toolbar className={classes.toolbar}>
              <IconButton className={classes.button} aria-label="Back" onClick={() => this.props.goBack()}>
                <ChevronLeftIcon />
              </IconButton>
              <div className={classes.flex}>
                <Typography variant='title' noWrap>
                  {teamTitle}
                </Typography>
                <Typography variant='subheading' noWrap>
                  @ {event.year} {event.name}
                </Typography>
              </div>
              <IconButton
                className={classes.button}
                onClick={this.handleClickMenu}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={this.state.menuAnchorEl}
                open={Boolean(this.state.menuAnchorEl)}
                onClose={this.handleCloseMenu}
              >
                <MenuItem component={Link} to={{pathname: `/team/${teamNumber}/${event.year}`, hash: eventKey}}>View Team</MenuItem>
                <MenuItem component={Link} to={{pathname: `/event/${eventKey}`}}>View Event</MenuItem>
              </Menu>
              <IconButton className={classes.button} aria-label="Close" onClick={this.handleCloseDialog}>
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
                hideEventName
              />
            </ScrollRestoreContainer>
          </DialogContent>
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TeamAtEventDialog)
