// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Actions
import { push } from 'connected-react-router'
import {
  resetPage,
  setPageState,
  setBottomNav,
  fetchTeamYears,
  fetchTeamInfo,
  fetchTeamYearAwards,
  fetchTeamYearEvents,
  fetchTeamYearMatches,
  fetchTeamEventStatus,
} from '../actions'

// Selectors
import { getCurrentPageState, getYear } from '../selectors/CommonPageSelectors'
import {
  getTeamNumber,
  getTeamModel,
  getTeamYears,
  getSortedTeamYearEvents,
  getAwardsByEvent,
  getMatchesByEvent,
  getStatusByEvent,
} from '../selectors/TeamPageSelectors'

// Components
import Hidden from 'material-ui/Hidden'

// TBA Components
import TeamPageDesktop from './TeamPageDesktop'
// import TeamPageMobile from './TeamPageMobile'

const mapStateToProps = (state, props) => ({
  // Params
  teamNumber: getTeamNumber(state, props),
  year: getYear(state, props),
  // States
  isLoading: state.getIn(['appState', 'loadingCount']) > 0,
  yearMenuOpen: getCurrentPageState(state, props).get('yearMenuOpen'),
  // Data
  team: getTeamModel(state, props),
  validYears: getTeamYears(state, props),
  teamYearEvents: getSortedTeamYearEvents(state, props),
  awardsByEvent: getAwardsByEvent(state, props),
  matchesByEvent: getMatchesByEvent(state, props),
  statusByEvent: getStatusByEvent(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  pushHistory: (path) => dispatch(push(path)),
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
  fetchTeamYears: (teamNumber) => dispatch(fetchTeamYears(teamNumber)),
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearAwards: (teamNumber, year) => dispatch(fetchTeamYearAwards(teamNumber, year)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
  fetchTeamYearMatches: (teamNumber, year) => dispatch(fetchTeamYearMatches(teamNumber, year)),
  fetchTeamEventStatus: (teamNumber, eventKey) => dispatch(fetchTeamEventStatus(teamNumber, eventKey)),
})

class TeamPageBase extends PureComponent {
  reset = props => {
     // Set without overriding
    props.resetPage({
      // activeEventGroup: 'week-1',
      yearMenuOpen: false,
    })
    // Fetch data
    this.refreshFunction(props)
  }

  constructor(props) {
    super(props)
    this.reset(props)
    props.setBottomNav('teams')
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.reset(nextProps)
    }

    // Temporary until API endpoint to fetch all team@event statuses for a year
    // @fangeugene 2018-01-26
    if (this.props.teamYearEvents !== nextProps.teamYearEvents) {
      nextProps.teamYearEvents.forEach(event => this.props.fetchTeamEventStatus(this.props.teamNumber, event.key))
    }
  }

  refreshFunction = (props=this.props) => {
    this.props.fetchTeamYears(props.teamNumber)
    this.props.fetchTeamInfo(props.teamNumber)
    this.props.fetchTeamYearAwards(props.teamNumber, props.year)
    this.props.fetchTeamYearEvents(props.teamNumber, props.year)
    this.props.fetchTeamYearMatches(props.teamNumber, props.year)
  }

  setYearMenuOpen = (isOpen) => {
    this.props.setPageState({ yearMenuOpen: isOpen })
  }

  render() {
    console.log("Render TeamPageBase")

    const {
      teamNumber,
      team,
      validYears,
      year,
      teamYearEvents,
      awardsByEvent,
      matchesByEvent,
      statusByEvent,
    } = this.props

    let documentTitle = `Team ${teamNumber} (${year})`
    if (team && team.get('nickname')) {
      documentTitle = `${team.get('nickname')} - Team ${teamNumber} (${year})`
    }

    return (
      <React.Fragment>
        <Hidden smDown>
          <TeamPageDesktop
            documentTitle={documentTitle}
            year={year}
            validYears={validYears}
            refreshFunction={this.refreshFunction}
            setYearMenuOpen={this.setYearMenuOpen}
            setPageState={this.props.setPageState}
            pushHistory={this.props.pushHistory}
            isLoading={this.props.isLoading}
            yearMenuOpen={this.props.yearMenuOpen}
            teamNumber={teamNumber}
            team={team}
            teamYearEvents={teamYearEvents}
            awardsByEvent={awardsByEvent}
            matchesByEvent={matchesByEvent}
            statusByEvent={statusByEvent}
          />
        </Hidden>
        <Hidden mdUp>
          <TeamPageDesktop
            documentTitle={documentTitle}
            year={year}
            validYears={validYears}
            refreshFunction={this.refreshFunction}
            setYearMenuOpen={this.setYearMenuOpen}
            setPageState={this.props.setPageState}
            pushHistory={this.props.pushHistory}
            isLoading={this.props.isLoading}
            yearMenuOpen={this.props.yearMenuOpen}
            teamNumber={teamNumber}
            team={team}
            teamYearEvents={teamYearEvents}
            awardsByEvent={awardsByEvent}
            matchesByEvent={matchesByEvent}
            statusByEvent={statusByEvent}
          />
        </Hidden>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamPageBase)
