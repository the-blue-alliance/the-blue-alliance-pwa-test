// General
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import memoize from 'memoizee'

// Components
import List from '@material-ui/core/List'

const styles = theme => ({
  list: {
    padding: 0,
  },
})

class VirtualList extends PureComponent {
  state = {
    renderAll: false,
    scrollTop: 0,
    height: 0,
    offsetTop: null,
  }

  handleScroll = () => {
    const scrollTop = this.props.scrollElement.scrollTop
    const scrollBottom = scrollTop + this.props.scrollElement.clientHeight
    const thisRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    const scrollElRect = this.props.scrollElement.getBoundingClientRect()

    const offsetTop = thisRect.top - scrollElRect.top + scrollTop
    const offsetBottom = offsetTop + thisRect.height

    // Only update scrollTop if in view
    if (scrollBottom > offsetTop && scrollTop < offsetBottom) {
      this.setState({
        scrollTop,
        offsetTop,
      })
    } else {
      this.setState({
        offsetTop,
      })
    }
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

    if (this.props.renderAll) {
      requestAnimationFrame(() => {
        ReactDOM.unstable_deferredUpdates(() => this.setState({renderAll: true}))
      })
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

    if (this.state.renderAll && scrollElement) {
      this.unregisterEventListeners(scrollElement)
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
      items,
      itemCount,
      itemRenderer,
      itemHeight,
      overscanCount,
    } = this.props

    return (
      <List className={classes.list} style={{height: itemCount * itemHeight}}>
        {items.map((item, itemIndex) => {
          if(this.state.offsetTop === null) {
            return null
          }

          const top = itemHeight * itemIndex
          const bottom = itemHeight * (itemIndex + 1)
          const isVisible = (
            top <= this.state.scrollTop + this.state.height + itemHeight * overscanCount - this.state.offsetTop &&
            bottom >= this.state.scrollTop - itemHeight * overscanCount - this.state.offsetTop
          )
          if (!isVisible && !this.state.renderAll) {
            return null
          }
          return itemRenderer({
            itemIndex: itemIndex,
            style: this.computeItemStyleMemoized(itemHeight * itemIndex),
          })
        })}
      </List>
    )
  }
}

VirtualList.propTypes = {
  scrollElement: PropTypes.any,
  items: PropTypes.object.isRequired,
  itemCount: PropTypes.number.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  itemHeight: PropTypes.number.isRequired,
  overscanCount: PropTypes.number.isRequired,
  renderAll: PropTypes.bool.isRequired,
}

export default withStyles(styles)(VirtualList)
