// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Set } from 'immutable'

// Actions
import { push } from 'connected-react-router'
import { resetPage, setPageState, setBottomNav, fetchTeamInfo, fetchTeamYearEvents, fetchTeamYearMatches } from '../actions'

// Selectors
import { getCurrentPageState, getYear } from '../selectors/CommonPageSelectors'
import { getTeamNumber, getTeam, getSortedTeamYearEvents, getMatchesByEvent } from '../selectors/TeamPageSelectors'

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
  team: getTeam(state, props),
  teamYearEvents: getSortedTeamYearEvents(state, props),
  matchesByEvent: getMatchesByEvent(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  pushHistory: (path) => dispatch(push(path)),
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
  fetchTeamYearMatches: (teamNumber, year) => dispatch(fetchTeamYearMatches(teamNumber, year)),
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
  }

  refreshFunction = (props=this.props) => {
    this.props.fetchTeamInfo(props.teamNumber)
    this.props.fetchTeamYearEvents(props.teamNumber, props.year)
    this.props.fetchTeamYearMatches(props.teamNumber, props.year)
  }

  setYearMenuOpen = (isOpen) => {
    this.props.setPageState({ yearMenuOpen: isOpen })
  }

  render() {
    console.log("Render TeamPageBase")

    const { teamNumber, team, year, teamYearEvents, matchesByEvent } = this.props

    // Compute valid years
    // TODO: temporary until server fetch implemented
    let validYears = []
    for (let y=2018; y>=1992; y--) {
      validYears.push(y)
    }

    return (
      <div>
        <Hidden smDown>
          <TeamPageDesktop
            documentTitle={`Team ${teamNumber} (${year})`}
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
            matchesByEvent={matchesByEvent}
          />
        </Hidden>
        <Hidden mdUp>
          <TeamPageDesktop
            documentTitle={`Team ${teamNumber} (${year})`}
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
            matchesByEvent={matchesByEvent}
          />
        </Hidden>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamPageBase)
