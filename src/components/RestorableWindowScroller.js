import React, { PureComponent } from 'react';
import { AutoSizer, WindowScroller, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';


const styles = {
}


class RestorableWindowScoller extends PureComponent {
  componentDidMount() {
    this.list.measureAllRows()
  }

  componentDidUpdate() {
    this.list.measureAllRows()
  }

  render() {
    console.log("Render RestorableWindowScoller")

    return (
      <WindowScroller scrollElement={this.props.scrollElement}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              ref={(r) => this.list = r}
              autoHeight
              width={width}
              height={height}
              isScrolling={isScrolling}
              onScroll={(e) => {
                onChildScroll(e)
                this.props.scrollTopCallback(e.scrollTop)
              }}
              rowCount={this.props.rowCount}
              rowHeight={this.props.rowHeight}
              estimatedRowSize={this.estimatedRowSize}
              rowRenderer={this.props.rowRenderer}
              scrollTop={scrollTop}
            />
          )}
        </AutoSizer>
      )}
      </WindowScroller>
    );
  }
}

export default withStyles(styles)(RestorableWindowScoller);
