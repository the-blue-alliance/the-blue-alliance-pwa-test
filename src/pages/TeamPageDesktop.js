// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'

// Components
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import EventIcon from 'material-ui-icons/Event'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import LocalMoviesIcon from 'material-ui-icons/LocalMovies'
import Menu, { MenuItem } from 'material-ui/Menu'
import Paper from 'material-ui/Paper'
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary'
import Typography from 'material-ui/Typography'
import Select from 'material-ui/Select'
import { Link } from 'react-router-dom'

// TBA Components
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from '../components/ResponsiveLayout'
import EventListCard from '../components/EventListCard'
import HideableBadge from '../components/HideableBadge'
import NestedScrollspy from '../components/NestedScrollspy'
import TeamAtEvent from '../components/TeamAtEvent'

const sideNavWidth = 160
const styles = theme => ({
  sideNav: {
    position: 'fixed',
    width: '100%',
    maxWidth: sideNavWidth,
    marginTop: theme.spacing.unit*3,
  },
  yearButton: {
    marginBottom: theme.spacing.unit*3,
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit*3,
  },
  infoIcon: {
    fontSize: 'inherit',
  },
  zeroDataContainer: {
    paddingTop: theme.spacing.unit*3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataIcon: {
    width: '15%',
    height: 'auto',
    margin: '0 auto',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
  eventCard: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3,
  }),
})

class TeamPageDesktop extends PureComponent {
  state = {
    contentRef: null,
    yearMenuAnchorEl: null,
  }

  handleYearOpen = event => {
    this.setState({ yearMenuAnchorEl: event.currentTarget });
    this.props.setYearMenuOpen(true)
  }

  handleYearSelect = year => {
    this.props.setYearMenuOpen(false)
    if (year !== this.props.year) {
      this.props.pushHistory(`/team/${this.props.teamNumber}/${year}`)
    }
  }

  render() {
    console.log("Render TeamPageDesktop")

    const { classes, year, validYears, isLoading, yearMenuOpen, teamNumber, team, teamYearEvents, awardsByEvent, matchesByEvent, statusByEvent } = this.props

    return (
      <TBAPageContainer
        documentTitle={this.props.documentTitle}
        contentRef={el => this.setState({contentRef: el})}
        refreshFunction={this.props.refreshFunction}
      >
        <ResponsiveLayout>
          <Grid container spacing={24}>
            <Grid item xs={3} lg={2}>
              <div className={classes.sideNav}>
                <Button
                  color='primary'
                  raised
                  fullWidth
                  onClick={this.handleYearOpen}
                  className={classes.yearButton}
                >
                  {`${year} Season`}<Icon className={classes.rightIcon}>arrow_drop_down</Icon>
                </Button>
                <Menu
                  anchorEl={this.state.yearMenuAnchorEl}
                  open={yearMenuOpen}
                  onClose={() => this.props.setYearMenuOpen(false)}
                  PaperProps={{
                    style: {
                      width: sideNavWidth,
                    },
                  }}
                >
                  {validYears.map(y =>
                    <MenuItem
                      key={y}
                      selected={y === year}
                      onClick={() => this.handleYearSelect(y)}
                    >
                      {y} Season
                    </MenuItem>
                  )}
                </Menu>

                {this.state.contentRef &&
                  <NestedScrollspy
                    contentRef={this.state.contentRef}
                    sections={['team-info', 'event-results', 'media', 'robot-profile']}
                    sectionLabels={{
                      'team-info': 'Team Info',
                      'event-results': 'Event Results',
                      'media': 'Media',
                      'robot-profile': 'Robot Profile',
                    }}
                    sectionItems={{
                      'event-results': teamYearEvents.map(event => {
                        return ({
                          'id': event.get('event_code'),
                          'label': event.get('short_name'),
                        })
                      }).toJS(),
                      'media': [
                        {
                          'id': 'photos',
                          'label': 'Photos',
                        },
                        {
                          'id': 'videos',
                          'label': 'Videos',
                        },
                      ],
                    }}
                  />
                }
              </div>
            </Grid>
            <Grid item xs={9} lg={10}>
              <div id='team-info'>
                <h1>Team {teamNumber}{team && team.nickname && ` - ${team.nickname}`}</h1>
                {team && team.getCityStateCountry() &&
                  <Typography type='body1'>
                    <Icon className={classes.infoIcon}>location_on</Icon> From <a target='_blank' href={`https://www.google.com/maps?q=${team.getCityStateCountry()}`}>{team.getCityStateCountry()}</a>
                  </Typography>
                }
                {team && team.name &&
                  <Typography type='body1'>
                    <Icon className={classes.infoIcon}>info</Icon> aka <i>{team.name}</i>
                  </Typography>
                }
                {team && team.rookie_year &&
                  <Typography type='body1'>
                    <Icon className={classes.infoIcon}>event</Icon> Rookie Year: {team.rookie_year}
                  </Typography>
                }
                {team && team.website &&
                  <Typography type='body1'>
                    <Icon className={classes.infoIcon}>public</Icon> <a target='_blank' href={team.website}>{team.website}</a>
                  </Typography>
                }
              </div>
              <div id='event-results'>
                <h2>Event Results</h2>
                {teamYearEvents.size === 0 &&
                  <div className={classes.zeroDataContainer}>
                    {isLoading ?
                      <CircularProgress color='secondary' size='15%' className={classes.zeroDataSpinner} />
                      :
                      <EventIcon className={classes.zeroDataIcon} />
                    }
                    <Typography type='subheading'>{isLoading ? 'Events loading' : 'No events found'}</Typography>
                  </div>
                }

                {teamYearEvents.valueSeq().map(function(event) {
                  const eventKey = event.key
                  return (
                    <Paper key={event.key} id={event.get('event_code')} className={classes.eventCard} elevation={4}>
                      <TeamAtEvent
                        awards={awardsByEvent.get(eventKey)}
                        event={event}
                        matches={matchesByEvent.get(eventKey)}
                        status={statusByEvent && statusByEvent.get(eventKey)}
                      />
                    </Paper>
                  )
                })}
              </div>
              <div id='media'>
                <h2>Media</h2>
                <div id='photos'>
                  <Typography type='title' gutterBottom>Photos</Typography>
                  {true &&
                    <div className={classes.zeroDataContainer}>
                      {isLoading ?
                        <CircularProgress color='secondary' size='15%' className={classes.zeroDataSpinner} />
                        :
                        <PhotoLibraryIcon className={classes.zeroDataIcon} />
                      }
                      <Typography type='subheading'>{isLoading ? 'Photos loading' : 'No photos found'}</Typography>
                    </div>
                  }
                </div>
                <div id='videos'>
                  <Typography type='title' gutterBottom>Videos</Typography>
                  {true &&
                    <div className={classes.zeroDataContainer}>
                      {isLoading ?
                        <CircularProgress color='secondary' size='15%' className={classes.zeroDataSpinner} />
                        :
                        <LocalMoviesIcon className={classes.zeroDataIcon} />
                      }
                      <Typography type='subheading'>{isLoading ? 'Videos loading' : 'No videos found'}</Typography>
                    </div>
                  }
                </div>
              </div>
              <div id='robot-profile'>
                <h2>Robot Profile</h2>
              </div>
            </Grid>
          </Grid>
        </ResponsiveLayout>
      </TBAPageContainer>
    )
  }
}

TeamPageDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  setYearMenuOpen: PropTypes.func.isRequired,
  setPageState: PropTypes.func.isRequired,
  yearMenuOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
}

export default withStyles(styles)(TeamPageDesktop)
