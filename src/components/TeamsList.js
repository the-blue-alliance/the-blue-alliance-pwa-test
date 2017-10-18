import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
}

class TeamsList extends PureComponent {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const team = this.filteredTeams.get(index).toJS()
    return (
      <div key={team.key} style={style}>
        <LinkContainer to={`/team/${team.team_number}`}>
          <ListItem button divider>
            <ListItemText primary={`${team.team_number} | ${team.nickname}`} secondary={team.country} />
          </ListItem>
        </LinkContainer>
      </div>
    )
  }

  render() {
    console.log("Render TeamsList");
    if (this.props.filter) {
      this.filteredTeams = this.props.teams.filter(team =>
        team.get('nickname') && team.get('nickname').toLowerCase().includes(this.props.filter))
    } else {
      this.filteredTeams = this.props.teams
    }

    if (this.props.teams !== undefined) {
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
    } else {
      return <CircularProgress color="accent" size={100} />
    }
  }
}

export default withStyles(styles)(TeamsList);
