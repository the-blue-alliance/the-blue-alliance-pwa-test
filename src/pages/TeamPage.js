// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

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
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import EventIcon from '@material-ui/icons/Event'
import InfoIcon from '@material-ui/icons/Info'
import LinkIcon from '@material-ui/icons/Link'
import PhotoIcon from '@material-ui/icons/Photo'
import PlaceIcon from '@material-ui/icons/Place'

// TBA Components
import TBAPage from '../components/TBAPage'
import Skeleton from '../components/Skeleton'
import PageTabs from '../components/PageTabs'
import NestedScrollspy from '../components/NestedScrollspy'
import SectionHeaderWithScrollto from '../components/SectionHeaderWithScrollto'
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
  yearMenuButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing.unit,
  },
  sideNavContainer: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  sideNav: {
    position: 'sticky',
    top: 56 + 48 + theme.spacing.unit,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48 + 48 + theme.spacing.unit,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64 + 48 + theme.spacing.unit,
    },
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
  eventCard: {
    marginBottom: theme.spacing.unit*2,
  },
})

class TeamPage extends PureComponent {
  state = {
    yearMenuAnchorEl: null,
  }

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

  handleYearOpen = event => {
    this.setState({ yearMenuAnchorEl: event.currentTarget });
  }

  handleYearClose = event => {
    this.setState({ yearMenuAnchorEl: null });
  }

  handleYearSelect = year => {
    this.handleYearClose()
    if (year !== this.props.year) {
      requestAnimationFrame(() => this.props.pushHistory(`/team/${this.props.teamNumber}/${year}`))
    }
  }

  componentDidMount() {
    this.props.resetPage({
      tabIdx: 0,
      yearMenuOpen: false,
    })
    this.props.setNav('teams')

    requestAnimationFrame(() => this.refreshFunction())
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
    const { yearMenuAnchorEl } = this.state

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

    let sections
    if (teamYearEvents) {
      sections = teamYearEvents.map(event => ({key: event.event_code, label: event.safeShortName()}))
    }

    return (
      <TBAPage
        title={`${teamTitle} (${year})`}
        metaDescription={team && `Team information and competition results for ${teamTitle}` + (team.getCityStateCountry() ? ` from ${team.getCityStateCountry()}.` : '.')}
        metaImage={mainRobotImage && mainRobotImage.getThumbnailURL()}
        refreshFunction={this.refreshFunction}
      >
        <Grid container spacing={16}>
          <Grid item xs={12} md={3} className={classes.titleArea}>
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
                <Skeleton width='75%' rows={2}/>
              }</Typography>
            </Hidden>
            <div className={classes.yearMenuButtonContainer}>
              <Button
                variant='raised'
                color='primary'
                onClick={this.handleYearOpen}
              >
                {`${year} Season`} <ArrowDropDownIcon />
              </Button>
              {validYears && <Menu
                anchorEl={yearMenuAnchorEl}
                open={Boolean(yearMenuAnchorEl)}
                onClose={this.handleYearClose}
              >
                {validYears.map(y =>
                  <MenuItem
                    key={y}
                    selected={y === year}
                    onClick={() => this.handleYearSelect(y)}
                  >
                    {y} Season
                  </MenuItem>
                ).reverse()}
              </Menu>}
            </div>
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
              <Grid container spacing={8}>
                <Grid item xs={12} md={3} lg={2} className={classes.sideNavContainer}>
                  <div className={classes.sideNav}>
                    {teamYearEvents && <NestedScrollspy
                      sections={teamYearEvents.map(event => {
                        return event.event_code
                      }).toJS()}
                      sectionLabels={teamYearEvents.map(event => {
                        return event.safeShortName()
                      }).toJS()}
                      scrollOffset={-48}
                    />}
                  </div>
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
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
                      <Paper key={event.key} id={event.event_code} className={classes.eventCard}>
                        <SectionHeaderWithScrollto
                          sectionKey={event.event_code}
                          label={
                            <React.Fragment>
                              <Typography variant='title'><Link to={{pathname: `/event/${event.key}`}}>{event.name}</Link></Typography>
                              <Typography variant='caption'>{event.getDateString()}</Typography>
                            </React.Fragment>
                          }
                          sections={sections}
                          withSpace
                        />
                        <TeamAtEvent
                          teamKey={`frc${teamNumber}`}
                          event={event}
                        />
                      </Paper>
                    )
                  })}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </TBAPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamPage))
