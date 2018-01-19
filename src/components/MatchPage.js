import React, { PureComponent } from 'react';
import Grid from 'material-ui/Grid';

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'

import MatchBreakdownTable from './MatchBreakdownTable'
import MatchVideos from './MatchVideos'

class MatchPage extends PureComponent {
  constructor(props) {
    super(props)
    props.setBottomNav('matches')
    props.resetPage({})
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchMatchInfo(this.props.matchKey)
  }

  render() {
    console.log("Render Match Page")

    return (
      <TBAPageContainer
        title={`Match ${this.props.matchKey}`}
        refreshFunction={this.refreshFunction}
      >
        <ResponsiveLayout>
          <h1>Match {this.props.matchKey}</h1>
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

export default MatchPage;
