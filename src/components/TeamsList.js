import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import WindowScrollerList from './WindowScrollerList'

const styles = {
}

class TeamsList extends PureComponent {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const team = this.filteredTeams.get(index)
    const cityStateCountry = team.getCityStateCountry()
    return (
      <div key={team.get('key')} style={style}>
        <LinkContainer to={`/team/${team.get('team_number')}`}>
          <ListItem button divider disableRipple>
            <ListItemText primary={`${team.get('team_number')} | ${team.get('nickname')}`} secondary={cityStateCountry ? cityStateCountry : '--'} />
          </ListItem>
        </LinkContainer>
      </div>
    )
  }

  render() {
    console.log("Render TeamsList");
    if (this.props.filter) {
      this.filteredTeams = this.props.teams.filter(team => (
        (String(team.get('team_number')).includes(this.props.filter.toLowerCase())) ||
        (team.get('nickname') && team.get('nickname').toLowerCase().includes(this.props.filter.toLowerCase())) ||
        (team.getCityStateCountry() && team.getCityStateCountry().toLowerCase().includes(this.props.filter.toLowerCase()))
      ))
    } else {
      this.filteredTeams = this.props.teams
    }

    if (this.props.teams !== undefined) {
      return (
        <WindowScrollerList
          scrollElement={this.props.scrollElement}
          rowCount={this.filteredTeams.size}
          rowHeight={69}
          rowRenderer={this.rowRenderer}
        />
      )
    } else {
      return <CircularProgress color="accent" size={100} />
    }
  }
}

export default withStyles(styles)(TeamsList);
