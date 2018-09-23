// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

// Actions
import { resetPage, setNav, fetchEventInfo, fetchMatchInfo } from '../actions'

// Selectors
import { getEventKey, getEvent, getMatchKey, getMatch } from '../selectors/MatchPageSelectors'

// Components
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// TBA Components
import TBAPage from '../components/TBAPage'
import MatchBreakdownTable from '../components/MatchBreakdownTable'
import MatchVideos from '../components/MatchVideos'

const mapStateToProps = (state, props) => ({
  // States
  // Params
  eventKey: getEventKey(state, props),
  matchKey: getMatchKey(state, props),
  // Data
  event: getEvent(state, props),
  matchObj: getMatch(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setNav: (value) => dispatch(setNav(value)),
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchMatchInfo: (matchKey) => dispatch(fetchMatchInfo(matchKey)),
})

const styles = theme => ({
})

class MatchPage extends PureComponent {
  componentDidMount() {
    this.props.resetPage({})
    this.props.setNav('matches')
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchEventInfo(this.props.eventKey)
    this.props.fetchMatchInfo(this.props.matchKey)
  }

  render() {
    console.log("Render Match Page")

    const { matchObj: match, event } = this.props

    let eventName
    if (match) {
      eventName = match.event_key
    }
    if (event) {
      eventName = `${event.name} (${event.year})`
    }
    return (
      <TBAPage
        title={match && event && `${match.getDisplayName()} - ${eventName}`}
        metaDescription={match && event && `Match results and video for ${match.getDisplayName()} at the ${event.year} ${event.name} FIRST Robotics Competition in ${event.getCityStateCountry()}.`}
        refreshFunction={this.refreshFunction}
      >
        <Typography variant='display1' gutterBottom>
          {match && match.getDisplayName()} @ <small>{match && <Link to={{pathname: `/event/${match.event_key}`}}>{eventName}</Link>}</small>
        </Typography>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <MatchBreakdownTable match={match}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchVideos match={match}/>
          </Grid>
        </Grid>
      </TBAPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MatchPage))
