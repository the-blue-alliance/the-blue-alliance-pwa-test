import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';


const styles = {
}


class TeamsList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.teams.size !== nextProps.teams.size) {
      return true;
    }
    return false;
  }

  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const team = this.props.teams.get(index).toJS()
    return (
      <div key={team.key} style={style}>
        <ListItem divider component={Link} to={`/team/${team.team_number}`}>
          <ListItemText primary={`${team.team_number} | ${team.nickname}`} />
        </ListItem>
      </div>
    )
  }

  render() {
    console.log("Render TeamsList");

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={this.props.teams.size}
            rowHeight={50}
            rowRenderer={this.rowRenderer}
          />
        )}
      </AutoSizer>
    )
  }
}

export default withStyles(styles)(TeamsList);
