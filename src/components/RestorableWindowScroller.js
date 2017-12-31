import React, { PureComponent } from 'react';
import { AutoSizer, WindowScroller, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';


const styles = {
}


class RestorableWindowScoller extends PureComponent {
  componentDidMount() {
    if (this.props.rowCount > 0) {
      this.list.measureAllRows()
    }
  }

  componentDidUpdate() {
    if (this.props.rowCount > 0) {
      this.list.measureAllRows()
    }
  }

  render() {
    console.log("Render RestorableWindowScoller")

    return (
      <WindowScroller scrollElement={this.props.scrollElement}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => {
        // 2017-12-31 react-virtualized 9.15.0 sometimes has height undefined
        if (height === undefined) {
          height = 0
        }
        return (<AutoSizer disableHeight>
          {({ width }) => (
            <List
              ref={(r) => this.list = r}
              autoHeight
              width={width}
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              rowCount={this.props.rowCount}
              rowHeight={this.props.rowHeight}
              estimatedRowSize={this.estimatedRowSize}
              rowRenderer={this.props.rowRenderer}
              scrollTop={scrollTop}
            />
          )}
        </AutoSizer>)
      }}
      </WindowScroller>
    );
  }
}

export default withStyles(styles)(RestorableWindowScoller);
