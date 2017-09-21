import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';

import AppNavContainer from '../containers/AppNavContainer'
import TeamsList from './TeamsList'

const styles = {
}

class TeamListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchTeamListAll()
  }

  handleTextFieldChange = (e) => {
    this.setState({
      filter: e.target.value.toLowerCase()
    })
  }

  render() {
    console.log("Render TeamListPage")

    return (
      <AppNavContainer
        title={"Teams"}
        refreshFunction={this.refreshFunction}
      >
        <TextField
          label="Filter teams by number, name, or location"
          fullWidth
          margin="normal"
          onChange={this.handleTextFieldChange}
        />
        <TeamsList teams={this.props.allTeams} filter={this.state.filter}/>
      </AppNavContainer>
    )
  }
}

export default withStyles(styles)(TeamListPage);
