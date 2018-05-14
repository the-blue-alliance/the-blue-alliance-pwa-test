import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'

import MatchBreakdownTable from './MatchBreakdownTable'
import MatchVideos from './MatchVideos'

class MatchPage extends PureComponent {
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

    let eventName
    if (this.props.matchObj) {
      eventName = this.props.matchObj.event_key
    }
    if (this.props.event) {
      eventName = this.props.event.get('name')
    }

    return (
      <TBAPageContainer
        refreshFunction={this.refreshFunction}
      >
        <ResponsiveLayout>
          <h1>
            {this.props.matchObj && this.props.matchObj.getDisplayName()}
            <small>{this.props.matchObj && <Link to={{pathname: `/event/${this.props.matchObj.event_key}`}}>@ {eventName}</Link>}</small>
          </h1>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <MatchBreakdownTable match={this.props.matchObj}/>
            </Grid>
            <Grid item xs={6}>
              <MatchVideos match={this.props.matchObj}/>
            </Grid>
          </Grid>
        </ResponsiveLayout>
      </TBAPageContainer>
    )
  }
}

export default MatchPage
