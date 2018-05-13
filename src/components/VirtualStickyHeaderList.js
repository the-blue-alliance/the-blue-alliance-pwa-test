// General
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import memoize from 'memoizee'

// Components
import List from 'material-ui/List'

const styles = theme => ({
  list: {
    padding: 0,
  },
})

class VirtualStickyHeaderList extends PureComponent {
  state = {
    scrollTop: 0,
    height: 0,
    offsetTop: 0,
  }

  handleScroll = () => {
    this.setState({
      scrollTop: this.props.scrollElement.scrollTop,
      offsetTop: ReactDOM.findDOMNode(this).getBoundingClientRect().top -
        this.props.scrollElement.getBoundingClientRect().top +
        this.props.scrollElement.scrollTop,
    })
  }

  handleResize = () => {
    const rect = this.props.scrollElement.getBoundingClientRect()
    this.setState({height: rect.height})
  }

  registerEventListeners = (scrollElement) => {
    scrollElement.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  }

  unregisterEventListeners = (scrollElement) => {
    scrollElement.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }

  updatePosition = (scrollElement) => {
    this.handleScroll()
    this.handleResize()
  }

  computeHeaderStyle = (top, height) => {
    return {
      position: 'absolute',
      top: top,
      width: '100%',
      height: height,
    }
  }

  computeHeaderStyleMemoized = memoize(this.computeHeaderStyle)

  computeItemStyle = (top) => {
    return {
      position: 'absolute',
      top: top,
      width: '100%'
    }
  }

  computeItemStyleMemoized = memoize(this.computeItemStyle)

  componentDidMount() {
    const scrollElement = this.props.scrollElement

    if (scrollElement) {
      this.updatePosition(scrollElement)
      this.registerEventListeners(scrollElement)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {scrollElement} = this.props
    const {scrollElement: prevScrollElement} = prevProps

    if (scrollElement && (!prevScrollElement || prevScrollElement !== scrollElement)) {
      this.updatePosition(scrollElement)

      if (prevScrollElement) {
        this.unregisterEventListeners(prevScrollElement)
      }
      this.registerEventListeners(scrollElement)
    }
  }

  componentWillUnmount() {
    const scrollElement = this.props.scrollElement
    if (scrollElement) {
      this.unregisterEventListeners(scrollElement)
    }
  }

  render() {
    const {
      classes,
      headers,
      items,
      headerRenderer,
      itemRenderer,
      headerHeight,
      itemHeight,
      overscanCount,
    } = this.props

    let headerOffset = 0
    let headerOffsets = []
    headers.forEach(header => {
      headerOffsets.push(headerOffset)
      headerOffset += headerHeight + itemHeight * items[header.key].length
    })

    return (
      <List subheader={<div />} className={classes.list} style={{height: headerOffset}}>
        {headers.map((header, headerIndex) => {
          return (
            <div
              key={header.key}
              style={this.computeHeaderStyleMemoized(
                headerOffsets[headerIndex],
                headerHeight + itemHeight * items[header.key].length
              )}
            >
              {headerRenderer({headerIndex: headerIndex})}
              {items[header.key].map((item, itemIndex) => {
                const top = headerOffsets[headerIndex] + headerHeight + itemHeight * itemIndex
                const bottom = headerOffsets[headerIndex] + headerHeight + itemHeight * (itemIndex + 1)
                const isVisible = (
                  top <= this.state.scrollTop + this.state.height + itemHeight * overscanCount - this.state.offsetTop &&
                  bottom >= this.state.scrollTop - itemHeight * overscanCount - this.state.offsetTop
                )
                if (!isVisible) {
                  return null
                }
                return itemRenderer({
                  headerKey: header.key,
                  itemIndex: itemIndex,
                  style: this.computeItemStyleMemoized(headerHeight + itemHeight * itemIndex),
                })
              })}
            </div>
          )
        })}
      </List>
    )
  }
}

VirtualStickyHeaderList.propTypes = {
  scrollElement: PropTypes.any,
  headers: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
  headerRenderer: PropTypes.func.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  headerHeight: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
  overscanCount: PropTypes.number.isRequired,
}

export default withStyles(styles)(VirtualStickyHeaderList)
