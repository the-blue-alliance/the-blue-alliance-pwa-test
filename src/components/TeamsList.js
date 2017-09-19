import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';


const styles = {
}


class TeamsList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.teams.length !== nextProps.teams.length) {
      return true;
    }
    return false;
  }

  render() {
    console.log("Render TeamsList");

    const teams = this.props.teams

    function rowRenderer ({
      index, isScrolling, isVisible, key, parent, style
    }) {
      const team = teams[index]
      return (
        <div key={team.key} style={style}>
          <ListItem divider component={Link} to={`/team/${team.team_number}`}>
            <ListItemText primary={`${team.team_number} | ${team.nickname}`} />
          </ListItem>
        </div>
      )
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={this.props.teams.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    )
  }
}

export default withStyles(styles)(TeamsList);
