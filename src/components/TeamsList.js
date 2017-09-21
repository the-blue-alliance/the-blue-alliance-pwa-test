import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';


const styles = {
}


class TeamsList extends Component {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const team = this.filteredTeams.get(index).toJS()
    return (
      <div key={team.key} style={style}>
        <ListItem divider component={Link} to={`/team/${team.team_number}`}>
          <ListItemText primary={`${team.team_number} | ${team.nickname}`} secondary={team.country} />
        </ListItem>
      </div>
    )
  }

  render() {
    console.log("Render TeamsList");
    this.filteredTeams = this.props.teams.filter(team =>
      team.get('nickname') && team.get('nickname').toLowerCase().includes(this.props.filter))

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={this.filteredTeams.size}
            rowHeight={69}
            rowRenderer={this.rowRenderer}
          />
        )}
      </AutoSizer>
    )
  }
}

export default withStyles(styles)(TeamsList);
