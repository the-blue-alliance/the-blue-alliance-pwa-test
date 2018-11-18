// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

// TBA Components

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'fixed',
    transition: '0.15s',
    right: 0,
    top: 56,
    height: 'calc(100% - 56px - 56px)',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48,
      height: 'calc(100% - 48px - 56px)',
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
      height: 'calc(100% - 64px - 56px)',
    },
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 56px)',
    },
    zIndex: theme.zIndex.appBar,
  },
  dot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 12,
    height: 64,
    width: 32,
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`,
    backgroundColor: theme.palette.common.white,
    borderRadius: '20px 0 0 20px',
    boxShadow: theme.shadows[4],
    cursor: 'pointer',
  },
  icon: {
    margin: '0 -6px',
    pointerEvents: 'none',
  },
})

class FastScroll extends PureComponent {
  state = {
    showScroll: false,
    scrollPos: 0,
  }
  scrolling = false

  handleScroll = () => {
    clearTimeout(this.hideTimeout)
    this.updateScrollPosition()
    if (this.scrolling) {
      return
    }
    this.scrolling = true
    this.show()
    this.detectScrollingInterval = setInterval(() => {
      if (this.lastScrollPos === this.scrollPos) {
        clearInterval(this.detectScrollingInterval)
        this.scrolling = false
        this.hide()
      }
      this.lastScrollPos = this.scrollPos
    }, 100)
  }

  updateScrollPosition = () => {
    this.scrollPos = window.pageYOffset
    const scrollPercentage = Math.min(1, this.scrollPos / (document.documentElement.offsetHeight - window.innerHeight))
    if (!this.raf) {
      this.raf = requestAnimationFrame(() => {
        this.raf = undefined
        this.setState({scrollPos: scrollPercentage * (this.ref.clientHeight - 88)})  // Offset by dot size + margins
      })
    }
  }

  handleMouseOver = () => {
    this.mouseOver = true
    this.show()
  }

  handleMouseOut = () => {
    this.mouseOver = false
    this.hide()
  }

  handleDragStart = (e) => {
    if (!this.dragging) {
      document.body.style['user-select'] = 'none'
      this.dragging = true
      this.dragCursorStart = e.clientY || e.touches[0].clientY
      this.dragScrollStart = window.pageYOffset
      document.addEventListener('mousemove', this.handleDrag)
      document.addEventListener('touchmove', this.handleDrag, {passive: false, cancelable: true})
      document.addEventListener('mouseup', this.handleDragStop)
      document.addEventListener('touchend', this.handleDragStop)
    }
  }

  handleDragStop = () => {
    document.body.style['user-select'] = ''
    this.dragging = false
    this.hide()
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('touchmove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleDragStop)
    document.removeEventListener('touchend', this.handleDragStop)
  }

  handleDrag = (e) => {
    e.preventDefault()
    const diff = (e.clientY || e.touches[0].clientY) - this.dragCursorStart
    const scrollPercentage = diff / (this.ref.clientHeight - 88)
    window.scrollTo(0, this.dragScrollStart + scrollPercentage * (document.documentElement.offsetHeight - window.innerHeight))
  }

  show = () => {
    clearTimeout(this.hideTimeout)
    this.setState({showScroll: true})
  }

  hide = () => {
    if (this.scrolling || this.mouseOver || this.dragging) {
      return
    }
    clearTimeout(this.hideTimeout)
    this.hideTimeout = setTimeout(() => this.setState({showScroll: false}), 3000)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.updateScrollPosition)
    this.dotRef.addEventListener('mousedown', this.handleDragStart)
    this.dotRef.addEventListener('touchstart', this.handleDragStart)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateScrollPosition)
    this.dotRef.removeEventListener('mousedown', this.handleDragStart)
    this.dotRef.removeEventListener('touchstart', this.handleDragStart)
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('touchmove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleDragStop)
    document.removeEventListener('touchend', this.handleDragStop)
    clearInterval(this.detectScrollingInterval)
    clearTimeout(this.hideTimeout)
  }

  render() {
    const { classes } = this.props
    const { showScroll, scrollPos } = this.state

    return (
      <div
        className={classes.container}
        style={showScroll ? null : {right: -40}}
        ref={(el) => this.ref = el}
      >
        <div
          className={classes.dot}
          style={{transform: `translateY(${scrollPos}px)`}}
          ref={(el) => this.dotRef = el}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <ArrowDropUpIcon className={classes.icon} />
          <ArrowDropDownIcon className={classes.icon} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(FastScroll)
