// General
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
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
import Hidden from '@material-ui/core/Hidden'

// TBA Components
import TBAHelmet from '../components/TBAHelmet'
import TeamPageDesktop from './TeamPageDesktop'
import TeamPageMobile from './TeamPageMobile'

const mapStateToProps = (state, props) => ({
  // Params
  teamNumber: getTeamNumber(state, props),
  year: getYear(state, props),
  // States
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
  static fetchData({ store, params }) {
    return Promise.all([
      store.dispatch(fetchTeamYears(params.teamNumber)),
      store.dispatch(fetchTeamInfo(params.teamNumber)),
    ])
  }

  refreshFunction = () => {
    this.props.fetchTeamYears(this.props.teamNumber)
    this.props.fetchTeamInfo(this.props.teamNumber)
    this.props.fetchTeamYearAwards(this.props.teamNumber, this.props.year)
    this.props.fetchTeamYearEvents(this.props.teamNumber, this.props.year)
    this.props.fetchTeamYearMatches(this.props.teamNumber, this.props.year)
    this.props.fetchTeamYearEventStatuses(this.props.teamNumber, this.props.year)
  }

  setYearMenuOpen = (isOpen) => {
    this.props.setPageState({ yearMenuOpen: isOpen })
  }

  componentDidMount() {
    this.props.resetPage({
      activeTab: 0,
      yearMenuOpen: false,
    })
    this.props.setNav('teams')

    // Fetch data async
    ReactDOM.unstable_deferredUpdates(() => this.refreshFunction())
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

    let teamTitle = `Team ${teamNumber}`
    if (team && team.get('nickname')) {
      teamTitle = `${team.get('nickname')} - Team ${teamNumber}`
    }

    return (
      <React.Fragment>
        <TBAHelmet>
          <title>{`${teamTitle} (${year})`}</title>
          {team &&
            <meta
              name='description'
              content={`Team information and competition results for ${teamTitle}` + (team.getCityStateCountry() ? ` from ${team.getCityStateCountry()}.` : '.')}
            />
          }
        </TBAHelmet>
        <Hidden smDown>
          <TeamPageDesktop
            year={year}
            validYears={validYears}
            refreshFunction={this.refreshFunction}
            setYearMenuOpen={this.setYearMenuOpen}
            setPageState={this.props.setPageState}
            pushHistory={this.props.pushHistory}
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
            year={year}
            validYears={validYears}
            refreshFunction={this.refreshFunction}
            setYearMenuOpen={this.setYearMenuOpen}
            setPageState={this.props.setPageState}
            pushHistory={this.props.pushHistory}
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
