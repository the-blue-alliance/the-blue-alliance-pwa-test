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
    top: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
    right: 0,
    bottom: 56,
    [theme.breakpoints.up('md')]: {
      bottom: 0,
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
  },
  icon: {
    margin: -6,
  },
})

class FastScroll extends PureComponent {
  state = {
    scrollPos: 0,
  }

  handleScroll = () => {
    const scrollPercentage = window.pageYOffset / (document.documentElement.offsetHeight - window.innerHeight)
    if (!this.raf) {
      this.raf = requestAnimationFrame(() => {
        this.raf = undefined
        this.setState({scrollPos: scrollPercentage * (this.ref.clientHeight - 56)})  // Offset by dot size
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { classes } = this.props
    const { scrollPos } = this.state

    return (
      <div
        className={classes.container}
        ref={(el) => this.ref = el}
      >
        <div
          className={classes.dot}
          style={{transform: `translateY(${scrollPos}px)`}}
        >
          <ArrowDropUpIcon className={classes.icon} />
          <ArrowDropDownIcon className={classes.icon} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(FastScroll)
