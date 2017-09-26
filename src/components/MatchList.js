import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
}

class MatchList extends PureComponent {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const match = this.matches.get(index).toJS()
    return (
      <div key={match.key} style={style}>
        <ListItem divider component={Link} to={{pathname: `/match/${match.key}`, state: {modal: true}}}>
          <ListItemText primary={`${match.key}`} />
        </ListItem>
      </div>
    )
  }

  render() {
    console.log("Render MatchList");
    this.matches = this.props.matches

    if (this.props.matches !== undefined) {
      return (
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={this.matches.size}
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

export default withStyles(styles)(MatchList);
