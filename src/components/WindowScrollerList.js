import React, { PureComponent } from 'react'
import { AutoSizer, WindowScroller, List } from 'react-virtualized'


class WindowScrollerList extends PureComponent {
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
    console.log("Render WindowScrollerList")

    const { scrollElement, ...restProps } = this.props

    return (
      <WindowScroller scrollElement={scrollElement}>
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
              scrollTop={scrollTop}
              {...restProps}
            />
          )}
        </AutoSizer>)
      }}
      </WindowScroller>
    )
  }
}

export default WindowScrollerList
