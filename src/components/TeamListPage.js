import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import AppNavContainer from '../containers/AppNavContainer'
import TeamsList from './TeamsList'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  teamsList: {
    flexGrow: 1,
    height: '100%',
  }
}

class TeamListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
    this.props.resetPage()
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
        <div className={this.props.classes.container}>
          <TextField
            label="Filter teams by number, name, or location"
            fullWidth
            margin="normal"
            onChange={this.handleTextFieldChange}
          />
          <div className={this.props.classes.teamsList}>
            <TeamsList
              teams={this.props.allTeams}
              filter={this.state.filter}
            />
          </div>
        </div>
      </AppNavContainer>
    )
  }
}

export default withStyles(styles)(TeamListPage);
