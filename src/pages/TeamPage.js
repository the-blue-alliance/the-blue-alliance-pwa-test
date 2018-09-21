// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

// Actions
import { push } from 'connected-react-router'
import {
  resetPage,
  setPageState,
  setNav,
  fetchTeamYears,
  fetchTeamInfo,
  fetchTeamYearAwards,
  fetchTeamYearEvents,
  fetchTeamYearMatches,
  fetchTeamYearEventStatuses,
  fetchTeamYearMedia,
} from '../actions'

// Selectors
import { getCurrentPageState, getYear } from '../selectors/CommonPageSelectors'
import {
  getTeamNumber,
  getTeamModel,
  getTeamYears,
  getSortedTeamYearEvents,
  getTeamYearMedias,
} from '../selectors/TeamPageSelectors'

// Components
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import EventIcon from '@material-ui/icons/Event'
import InfoIcon from '@material-ui/icons/Info'
import LinkIcon from '@material-ui/icons/Link'
import PhotoIcon from '@material-ui/icons/Photo'
import PlaceIcon from '@material-ui/icons/Place'

// TBA Components
import TBAPage from '../components/TBAPage'
import Skeleton from '../components/Skeleton'
import PageTabs from '../components/PageTabs'
import TeamAtEvent from '../components/TeamAtEvent'

const mapStateToProps = (state, props) => ({
  // Params
  teamNumber: getTeamNumber(state, props),
  year: getYear(state, props),
  // States
  tabIdx: getCurrentPageState(state, props).get('tabIdx'),
  yearMenuOpen: getCurrentPageState(state, props).get('yearMenuOpen'),
  // Data
  team: getTeamModel(state, props),
  validYears: getTeamYears(state, props),
  teamYearEvents: getSortedTeamYearEvents(state, props),
  teamYearMedias: getTeamYearMedias(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  pushHistory: (path) => dispatch(push(path)),
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setNav: (value) => dispatch(setNav(value)),
  fetchTeamYears: (teamNumber) => dispatch(fetchTeamYears(teamNumber)),
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearAwards: (teamNumber, year) => dispatch(fetchTeamYearAwards(teamNumber, year)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
  fetchTeamYearMatches: (teamNumber, year) => dispatch(fetchTeamYearMatches(teamNumber, year)),
  fetchTeamYearEventStatuses: (teamNumber, year) => dispatch(fetchTeamYearEventStatuses(teamNumber, year)),
  fetchTeamYearMedia: (teamNumber, year) => dispatch(fetchTeamYearMedia(teamNumber, year)),
})

const styles = theme => ({
  icon: {
    top: '0.125em',
    position: 'relative',
  },
  mainRobotImage: {
    margin: `${theme.spacing.unit}px auto`,
    height: 150,
    width: 150,
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

class TeamPage extends PureComponent {
  static fetchData({ store, params }) {
    let { teamNumber, year } = params
    if (year === undefined) {
      year = 2018  // TODO don't hardcode
    } else {
      year = parseInt(year, 10)
    }
    return Promise.all([
      store.dispatch(fetchTeamYears(teamNumber)),
      store.dispatch(fetchTeamInfo(teamNumber)),
      store.dispatch(fetchTeamYearAwards(teamNumber, year)),
      store.dispatch(fetchTeamYearEvents(teamNumber, year)),
      store.dispatch(fetchTeamYearMatches(teamNumber, year)),
      store.dispatch(fetchTeamYearEventStatuses(teamNumber, year)),
      store.dispatch(fetchTeamYearMedia(teamNumber, year)),
    ])
  }

  refreshFunction = () => {
    this.props.fetchTeamYears(this.props.teamNumber)
    this.props.fetchTeamInfo(this.props.teamNumber)
    this.props.fetchTeamYearAwards(this.props.teamNumber, this.props.year)
    this.props.fetchTeamYearEvents(this.props.teamNumber, this.props.year)
    this.props.fetchTeamYearMatches(this.props.teamNumber, this.props.year)
    this.props.fetchTeamYearEventStatuses(this.props.teamNumber, this.props.year)
    this.props.fetchTeamYearMedia(this.props.teamNumber, this.props.year)
  }

  tabHandleChange = (event, tabIdx) => {
    this.props.setPageState({tabIdx})
  }

  setYearMenuOpen = (isOpen) => {
    this.props.setPageState({ yearMenuOpen: isOpen })
  }

  componentDidMount() {
    this.props.resetPage({
      tabIdx: 0,
      yearMenuOpen: false,
    })
    this.props.setNav('teams')

    requestIdleCallback(() => this.refreshFunction())
  }

  render() {
    console.log("Render TeamPage")

    const {
      classes,
      teamNumber,
      team,
      validYears,
      year,
      teamYearEvents,
      teamYearMedias,
      tabIdx,
    } = this.props

    let safeTabIdx = tabIdx
    if (safeTabIdx === undefined) {
      safeTabIdx = 0
    }

    let teamTitle = `Team ${teamNumber}`
    if (team && team.nickname && teamTitle !== team.nickname) {  // Default nickname is "Team XXX"
      teamTitle += ` - ${team.nickname}`
    }
    const images = teamYearMedias ? teamYearMedias.filter(m => m.isImage()) : undefined
    const mainRobotImage = images ? images.filter(i => i.preferred).toList().get(0) : undefined

    return (
      <TBAPage
        title={`${teamTitle} (${year})`}
        metaDescription={team && `Team information and competition results for ${teamTitle}` + (team.getCityStateCountry() ? ` from ${team.getCityStateCountry()}.` : '.')}
        metaImage={mainRobotImage && mainRobotImage.getThumbnailURL()}
        refreshFunction={this.refreshFunction}
      >
        <Grid container spacing={16}>
          <Grid item xs={12} md={3}>
            <Avatar alt={`Team ${teamNumber}'s ${year} robot`} src={mainRobotImage ? mainRobotImage.getThumbnailURL() : null} className={classes.mainRobotImage}>
              {mainRobotImage ? null : <PhotoIcon />}
            </Avatar>
            <Hidden implementation='css' mdUp>
              <Typography variant='display1' align='center'>{team ?
                <React.Fragment>
                  {`Team ${teamNumber}`}
                  {team.nickname && <React.Fragment><br/>{team.nickname}</React.Fragment>}
                </React.Fragment>
                :
                <Skeleton width='75%'/>
              }</Typography>
            </Hidden>
          </Grid>

          <Grid item xs={12} md={9}>
            <Hidden implementation='css' smDown>
              <Typography variant='display1' gutterBottom>{team ? teamTitle : <Skeleton width='75%'/>}</Typography>
            </Hidden>
            {(!team || team.getCityStateCountry()) && <Typography variant='body1'>
              <PlaceIcon fontSize='inherit' className={classes.icon} /> {team ?
                <React.Fragment>
                  From <a
                    href={`https://www.google.com/maps?q=${team.getCityStateCountry()}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {team.getCityStateCountry()}
                  </a>
                </React.Fragment>
                :
                <Skeleton width='200px'/>
              }
            </Typography>}
            {(!team || team.getTeamNameWithBreaks()) && <Typography variant='body1'>
              <InfoIcon fontSize='inherit' className={classes.icon} /> {team ?
                `aka ${team.getTeamNameWithBreaks()}`
                :
                <Skeleton width='50%' rows={3}/>
              }
            </Typography>}
            {(!team || team.rookie_year) && <Typography variant='body1'>
              <EventIcon fontSize='inherit' className={classes.icon} /> {team ?
                `Rookie Year: ${team.rookie_year}`
                :
                <Skeleton width='125px'/>}
              </Typography>
            }
            {(!team || team.website) && <Typography variant='body1'>
              <LinkIcon fontSize='inherit' className={classes.icon} /> {team ?
                <a href={team.website} target='_blank' rel='noopener noreferrer'>{team.website}</a>
                :
                <Skeleton width='200px'/>}
              </Typography>
            }
          </Grid>
          <Grid item xs={12}>
            <PageTabs
              value={safeTabIdx}
              onChange={this.tabHandleChange}
            >
              <Tab label='Event Results' />
              <Tab label='Media' />
              <Tab label='Robot' />
            </PageTabs>
            <div hidden={safeTabIdx !== 0}>
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
                return (
                  <Paper key={event.key} id={event.get('event_code')} className={classes.eventCard} elevation={4}>
                    <TeamAtEvent
                      teamKey={`frc${teamNumber}`}
                      event={event}
                    />
                  </Paper>
                )
              })}
            </div>
          </Grid>
        </Grid>
      </TBAPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamPage))
