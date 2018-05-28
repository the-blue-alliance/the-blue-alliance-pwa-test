import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import TBAPageContainer from '../containers/TBAPageContainer'
import TBAHelmet from '../components/TBAHelmet'
import ResponsiveLayout from './ResponsiveLayout'

import MatchBreakdownTable from './MatchBreakdownTable'
import MatchVideos from './MatchVideos'

import { fetchEventInfo, fetchMatchInfo } from '../actions'

class MatchPage extends PureComponent {
  static fetchData({ store, params }) {
    return Promise.all([
      store.dispatch(fetchEventInfo(params.matchKey.split('_')[0])),
      store.dispatch(fetchMatchInfo(params.matchKey)),
    ])
  }

  constructor(props) {
    super(props)
    props.setNav('matches')
    props.resetPage({})
  }

  componentDidMount() {
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
      eventName = event.name
    }
    return (
      <TBAPageContainer
        refreshFunction={this.refreshFunction}
      >
        {match && event &&
          <TBAHelmet>
            <title>{`${match.getDisplayName()} - ${event.year} ${event.name}`}</title>
            <meta
              name='description'
              content={`Match results and video for ${match.getDisplayName()} at the ${event.year} ${event.name} FIRST Robotics Competition in ${event.getCityStateCountry()}.`}
            />
          </TBAHelmet>
        }
        <ResponsiveLayout>
          <h1>
            {match && match.getDisplayName()}
            <small>{match && <Link to={{pathname: `/event/${match.event_key}`}}>@ {eventName}</Link>}</small>
          </h1>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <MatchBreakdownTable match={match}/>
            </Grid>
            <Grid item xs={6}>
              <MatchVideos match={match}/>
            </Grid>
          </Grid>
        </ResponsiveLayout>
      </TBAPageContainer>
    )
  }
}

export default MatchPage
