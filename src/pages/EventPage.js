// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

// Actions
import { resetPage, setPageState, setNav, fetchEventInfo, fetchEventMatches, fetchEventAlliances, fetchEventRankings } from '../actions'

// Selectors
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import { getEventKey, getEventModel } from '../selectors/EventPageSelectors'

// Components
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import EventIcon from '@material-ui/icons/Event'
import LinkIcon from '@material-ui/icons/Link'
import PlaceIcon from '@material-ui/icons/Place'

// TBA Components
import TBAHelmet from '../components/TBAHelmet'
import TBAPageContainer from '../containers/TBAPageContainer'
import AllianceTableContainer from '../containers/AllianceTableContainer'
import MatchTableContainer from '../containers/MatchTableContainer'
import EventPageSectionHeader from '../components/EventPageSectionHeader'
import EventRankingsTableContainer from '../containers/EventRankingsTableContainer'
import Skeleton from '../components/Skeleton'

const mapStateToProps = (state, props) => ({
  // Params
  eventKey: getEventKey(state, props),
  // States
  tabIdx: getCurrentPageState(state, props).get('tabIdx'),
  // Data
  event: getEventModel(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setNav: (value) => dispatch(setNav(value)),
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchEventMatches: (eventKey) => dispatch(fetchEventMatches(eventKey)),
  fetchEventAlliances: (eventKey) => dispatch(fetchEventAlliances(eventKey)),
  fetchEventRankings: (eventKey) => dispatch(fetchEventRankings(eventKey)),
})

const styles = theme => ({
  icon: {
    top: '0.125em',
    position: 'relative',
  },
  tabs: {
    position: 'sticky',
    top: 56 - 1,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48 - 1,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64 - 1,
    },
    marginLeft: -theme.spacing.unit,
    marginRight: -theme.spacing.unit,
    marginBottom: theme.spacing.unit*2,
    zIndex: theme.zIndex.appBar-1,
  },
  sectionCard: {
    marginBottom: theme.spacing.unit*2,
  },
})

class EventPage extends PureComponent {
  static fetchData({ store, params }) {
    return Promise.all([
      store.dispatch(fetchEventInfo(params.eventKey)),
      store.dispatch(fetchEventMatches(params.eventKey)),
      store.dispatch(fetchEventAlliances(params.eventKey)),
      store.dispatch(fetchEventRankings(params.eventKey)),
    ])
  }

  refreshFunction = () => {
    this.props.fetchEventInfo(this.props.eventKey)
    this.props.fetchEventMatches(this.props.eventKey)
    this.props.fetchEventAlliances(this.props.eventKey)
    this.props.fetchEventRankings(this.props.eventKey)
  }

  tabHandleChange = (event, tabIdx) => {
    this.props.setPageState({tabIdx})
  }

  componentDidMount() {
    this.props.resetPage({
      tabIdx: 0,
    })
    this.props.setNav('events')

    // Fetch data async
    this.refreshFunction()
  }

  render() {
    console.log('Render EventPage')

    const { classes, eventKey, event, tabIdx } = this.props

    var name = null
    var shortName = null
    var year = undefined
    if (event) {
      year = event.year
      name = `${event.name} ${year}`
      shortName = event.safeShortName()
    }

    return (
      <React.Fragment>
        <TBAHelmet>
          <title>{name}</title>
          {event &&
            <meta
              name='description'
              content={`Videos and match results for the ${year} ${event.name} FIRST Robotics Competition in ${event.getCityStateCountry()}.`}
            />
          }
        </TBAHelmet>
        <TBAPageContainer
          // history={this.props.history}
          // refreshFunction={this.refreshFunction}
          // contentRef={el => this.contentRef = el}
        >
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant='display1' gutterBottom>{event ? name : <Skeleton width='75%'/>}</Typography>
              <Typography variant='body1'><EventIcon fontSize='inherit' className={classes.icon} /> {event ? event.getDateString() : <Skeleton width='200px'/>}</Typography>
              <Typography variant='body1'><PlaceIcon fontSize='inherit' className={classes.icon} /> {event ?
                <React.Fragment>
                  <a href={event.gmaps_url} target='_blank' rel='noopener noreferrer'>{event.location_name}</a><span>{` in ${event.getCityStateCountry()}`}</span>
                </React.Fragment>
                :
                <Skeleton width='200px'/>
              }</Typography>
              <Typography variant='body1'><LinkIcon fontSize='inherit' className={classes.icon} /> {event ? <a href={event.website} target='_blank' rel='noopener noreferrer'>{event.website}</a> : <Skeleton width='200px'/>}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.tabs} square>
                <Tabs
                  value={tabIdx ? tabIdx : 0}
                  onChange={this.tabHandleChange}
                  fullWidth
                  scrollable
                  className='hide-scrollbar'
                >
                  <Tab label='Results' />
                  <Tab label='Rankings' />
                  <Tab label='Awards' />
                  <Tab label='Teams' />
                  <Tab label='Insights' />
                  <Tab label='Media' />
                </Tabs>
              </Paper>
              {tabIdx === 0 && <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                  <Paper id='qual'>
                    <EventPageSectionHeader label='Qualification Results'/>
                    <MatchTableContainer eventKey={eventKey} qual/>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper id='alliances' className={classes.sectionCard}>
                    <EventPageSectionHeader label='Alliances'/>
                    <AllianceTableContainer eventKey={eventKey} />
                  </Paper>
                  <Paper id='playoff' className={classes.sectionCard}>
                    <EventPageSectionHeader label='Playoff Results'/>
                    <MatchTableContainer eventKey={eventKey} playoff/>
                  </Paper>
                </Grid>
              </Grid>}
              {tabIdx === 1 && <EventRankingsTableContainer eventKey={eventKey} />}
            </Grid>
          </Grid>
        </TBAPageContainer>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventPage))
