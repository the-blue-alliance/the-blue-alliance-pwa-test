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
    zIndex: theme.zIndex.appBar - 1,
  },
  dot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 12,
    height: 40,
    width: 32,
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`,
    backgroundColor: theme.palette.common.white,
    borderRadius: '20px 0 0 20px',
    boxShadow: theme.shadows[4],
    cursor: 'pointer',
  },
  icon: {
    margin: -6,
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
        this.setState({scrollPos: scrollPercentage * (this.ref.clientHeight - 64)})  // Offset by dot size + margin (56 + 8)
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

  show = () => {
    clearTimeout(this.hideTimeout)
    this.setState({showScroll: true})
  }

  hide = () => {
    if (this.scrolling || this.mouseOver) {
      return
    }
    clearTimeout(this.hideTimeout)
    this.hideTimeout = setTimeout(() => this.setState({showScroll: false}), 3000)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.updateScrollPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateScrollPosition)
    clearInterval(this.detectScrollingInterval)
    clearTimeout(this.hideTimeout)
  }

  render() {
    const { classes } = this.props
    const { showScroll, scrollPos } = this.state
    console.log(showScroll)

    return (
      <div
        className={classes.container}
        style={showScroll ? null : {right: -40}}
        ref={(el) => this.ref = el}
      >
        <div
          className={classes.dot}
          style={{transform: `translateY(${scrollPos}px)`}}
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
