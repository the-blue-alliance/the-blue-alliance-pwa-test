import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import TBAPageContainer from '../containers/TBAPageContainer'
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
    this.props.resetPage(this.props.location.key)
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
      <TBAPageContainer
        title='Teams'
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
      </TBAPageContainer>
    )
  }
}

export default withStyles(styles)(TeamListPage);
