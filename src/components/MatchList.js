import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
}

class MatchList extends PureComponent {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const match = this.matches.get(index)
    return (
      <div key={match.key} style={style}>
        <LinkContainer to={{pathname: `/match/${match.key}`, state: {modal: true}}}>
          <ListItem button divider disableRipple>
            <ListItemText primary={`${match.getDisplayName()}`} secondary="TODO" />
          </ListItem>
        </LinkContainer>
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
