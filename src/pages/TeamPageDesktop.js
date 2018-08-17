// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import EventIcon from '@material-ui/icons/Event'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Icon from '@material-ui/core/Icon'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import Typography from '@material-ui/core/Typography'
import PhotoIcon from '@material-ui/icons/Photo'

// TBA Components
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from '../components/ResponsiveLayout'
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
  mainRobotImage: {
    float: 'right',
    margin: theme.spacing.unit,
    height: 150,
    width: 150,
    boxShadow: theme.shadows[4],
  },
  photosContainer: {
    marginBottom: theme.spacing.unit * 3,
  },
  imageGridItem: {
    margin: theme.spacing.unit,
    boxShadow: theme.shadows[4],
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

    const {
      classes,
      year,
      validYears,
      yearMenuOpen,
      teamNumber,
      team,
      teamYearEvents,
      awardsByEvent,
      matchesByEvent,
      statusByEvent,
      images,
      mainRobotImage,
    } = this.props

    return (
      <TBAPageContainer
        contentRef={el => this.setState({contentRef: el})}
        refreshFunction={this.props.refreshFunction}
      >
        <ResponsiveLayout>
          <Grid container spacing={24}>
            <Grid item xs={3} lg={2}>
              <div className={classes.sideNav}>
                <Button
                  color='primary'
                  variant="raised"
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
                  {validYears ?
                    validYears.map(y =>
                      <MenuItem
                        key={y}
                        selected={y === year}
                        onClick={() => this.handleYearSelect(y)}
                      >
                        {y} Season
                      </MenuItem>
                    ).reverse()
                    :
                    <MenuItem
                        key={year}
                        selected={true}
                        onClick={() => this.handleYearSelect(year)}
                      >
                      {year} Season
                    </MenuItem>
                  }
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
                      'event-results': teamYearEvents && teamYearEvents.map(event => {
                        return ({
                          'id': event.event_code,
                          'label': event.safeShortName(),
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
                <Avatar alt={`Team ${teamNumber}`} src={mainRobotImage ? mainRobotImage.getThumbnailURL() : null} className={classes.mainRobotImage}>
                  {mainRobotImage ? null : <PhotoIcon />}
                </Avatar>
                {team && team.getCityStateCountry() &&
                  <Typography variant='body1'>
                    <Icon className={classes.infoIcon}>location_on</Icon> From <a target='_blank' href={`https://www.google.com/maps?q=${team.getCityStateCountry()}`}>{team.getCityStateCountry()}</a>
                  </Typography>
                }
                {team && team.name &&
                  <Typography variant='body1'>
                    <Icon className={classes.infoIcon}>info</Icon> aka <i>{team.name}</i>
                  </Typography>
                }
                {team && team.rookie_year &&
                  <Typography variant='body1'>
                    <Icon className={classes.infoIcon}>event</Icon> Rookie Year: {team.rookie_year}
                  </Typography>
                }
                {team && team.website &&
                  <Typography variant='body1'>
                    <Icon className={classes.infoIcon}>public</Icon> <a target='_blank' href={team.website}>{team.website}</a>
                  </Typography>
                }
              </div>
              <div id='event-results'>
                <h2>Event Results</h2>
                {!teamYearEvents &&
                  <div className={classes.zeroDataContainer}>
                    <CircularProgress color='secondary' size={120} className={classes.zeroDataSpinner} />
                    <Typography variant='subheading'>Events loading</Typography>
                  </div>
                }
                {teamYearEvents && teamYearEvents.size === 0 &&
                  <div className={classes.zeroDataContainer}>
                    <EventIcon className={classes.zeroDataIcon} />
                    <Typography variant='subheading'>No events</Typography>
                  </div>
                }
                {teamYearEvents && teamYearEvents.valueSeq().map(function(event) {
                  const eventKey = event.key
                  return (
                    <Paper key={event.key} id={event.get('event_code')} className={classes.eventCard} elevation={4}>
                      <TeamAtEvent
                        awards={awardsByEvent.get(eventKey)}
                        event={event}
                        matches={matchesByEvent.get(eventKey)}
                        status={statusByEvent && statusByEvent.get(`${eventKey}_frc${teamNumber}`)}
                        teamKey={`frc${teamNumber}`}
                      />
                    </Paper>
                  )
                })}
              </div>
              <div id='media'>
                <h2>Media</h2>
                <div id='photos' className={classes.photosContainer}>
                  <Typography variant='title' gutterBottom>Photos</Typography>
                  {images ?
                    <GridList cols={5}>
                      {images.map(img => (
                        <GridListTile key={img.key} cols={1} className={classes.imageGridItem}>
                          <img src={img.getThumbnailURL()} />
                        </GridListTile>
                      ))}
                    </GridList>
                    :
                    <div className={classes.zeroDataContainer}>
                      <PhotoLibraryIcon className={classes.zeroDataIcon} />
                      <Typography variant='subheading'>No photos</Typography>
                    </div>
                  }
                </div>
                <div id='videos'>
                  <Typography variant='title' gutterBottom>Videos</Typography>
                  {true &&
                    <div className={classes.zeroDataContainer}>
                      <LocalMoviesIcon className={classes.zeroDataIcon} />
                      <Typography variant='subheading'>No videos</Typography>
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
  refreshFunction: PropTypes.func.isRequired,
  setYearMenuOpen: PropTypes.func.isRequired,
  setPageState: PropTypes.func.isRequired,
  yearMenuOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
}

export default withStyles(styles)(TeamPageDesktop)
