// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

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
import TeamPageMobile from './TeamPageMobile'

const mapStateToProps = (state, props) => ({
  // Params
  teamNumber: getTeamNumber(state, props),
  year: getYear(state, props),
  // States
  isLoading: state.getIn(['appState', 'loadingCount']) > 0,
  activeTab: getCurrentPageState(state, props).get('activeTab'),
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
  setNav: (value) => dispatch(setNav(value)),
  fetchTeamYears: (teamNumber) => dispatch(fetchTeamYears(teamNumber)),
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearAwards: (teamNumber, year) => dispatch(fetchTeamYearAwards(teamNumber, year)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
  fetchTeamYearMatches: (teamNumber, year) => dispatch(fetchTeamYearMatches(teamNumber, year)),
  fetchTeamYearEventStatuses: (teamNumber, year) => dispatch(fetchTeamYearEventStatuses(teamNumber, year)),
})

class TeamPageBase extends PureComponent {
  reset = props => {
     // Set without overriding
    props.resetPage({
      activeTab: 0,
      yearMenuOpen: false,
    })
    // Fetch data
    this.refreshFunction(props)
  }

  constructor(props) {
    super(props)
    this.reset(props)
    props.setNav('teams')
  }

  refreshFunction = (props=this.props) => {
    this.props.fetchTeamYears(props.teamNumber)
    this.props.fetchTeamInfo(props.teamNumber)
    this.props.fetchTeamYearAwards(props.teamNumber, props.year)
    this.props.fetchTeamYearEvents(props.teamNumber, props.year)
    this.props.fetchTeamYearMatches(props.teamNumber, props.year)
    this.props.fetchTeamYearEventStatuses(props.teamNumber, props.year)
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
          <TeamPageMobile
            documentTitle={documentTitle}
            year={year}
            validYears={validYears}
            refreshFunction={this.refreshFunction}
            setYearMenuOpen={this.setYearMenuOpen}
            setPageState={this.props.setPageState}
            pushHistory={this.props.pushHistory}
            isLoading={this.props.isLoading}
            activeTab={this.props.activeTab}
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
