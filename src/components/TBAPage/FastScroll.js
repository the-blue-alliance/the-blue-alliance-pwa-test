// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

// TBA Components

const SECTION_LABEL_HEIGHT = 18
const SUBSECTION_LABEL_HEIGHT = 6
const DOT_HEIGHT = 80
const DOT_LABEL_HEIGHT = 24
const styles = theme => ({
  container: {
    position: 'fixed',
    transition: '0.2s',
    opacity: 0,
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
    userSelect: 'none',
    pointerEvents: 'none',
  },
  backdrop: {
    background: 'linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.15) 30%)',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: '100%',
    transition: '0.2s',
  },
  dotContainer: {
    display: 'flex',
    alignItems: 'center',
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
    '-webkit-tap-highlight-color': 'transparent',
    pointerEvents: 'auto',
  },
  icon: {
    margin: '0 -6px',
    pointerEvents: 'none',
  },
  dotLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 16,
    whiteSpace: 'nowrap',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px`,
    marginRight: theme.spacing.unit*3,
    height: DOT_LABEL_HEIGHT,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[4],
    borderRadius: DOT_LABEL_HEIGHT/2,
    pointerEvents: 'none',
    cursor: 'none',
    transition: '0.2s',
  },
  labelContainer: {
    transition: '0.2s',
  },
  sectionLabel: {
    position: 'absolute',
    top: 0,
    right: theme.spacing.unit*5,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 12,
    whiteSpace: 'nowrap',
    padding: `${theme.spacing.unit/2}px ${theme.spacing.unit}px`,
    height: SECTION_LABEL_HEIGHT,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    borderRadius: SECTION_LABEL_HEIGHT/2,
    pointerEvents: 'none',
    cursor: 'none',
  },
  subSectionLabel: {
    position: 'absolute',
    top: 0,
    right: theme.spacing.unit*5,
    height: SUBSECTION_LABEL_HEIGHT,
    width: SUBSECTION_LABEL_HEIGHT,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    borderRadius: SUBSECTION_LABEL_HEIGHT/2,
    pointerEvents: 'none',
    cursor: 'none',
  },
})

class FastScroll extends PureComponent {
  state = {
    showScroll: false,
    scrollPos: 0,
    sectionLabelOffsets: {},
    dotLabel: null,
    dragging: false,
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

  handleResize = () => {
    this.updateScrollPosition()
    this.updateLabelOffsets()
  }

  updateScrollPosition = () => {
    this.scrollPos = window.pageYOffset
    const scrollPercentage = Math.min(1, this.scrollPos / (document.documentElement.offsetHeight - window.innerHeight))
    if (!this.updateScrollPositionRAF) {
      this.updateScrollPositionRAF = requestAnimationFrame(() => {
        this.updateScrollPositionRAF = undefined
        const scrollPos = scrollPercentage * (this.ref.clientHeight - DOT_HEIGHT) // Offset by dot size + margins
        // Find appropriate label
        let dotLabel = null
        for (let key in this.state.sectionLabelOffsets) {
          const offset = this.state.sectionLabelOffsets[key].offset
          if (offset > scrollPos + DOT_HEIGHT / 2) {
            break
          }
          dotLabel = this.state.sectionLabelOffsets[key].label
        }
        this.setState({scrollPos, dotLabel})
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
    if (e.cancelable && !this.dragging) {
      document.body.style['user-select'] = 'none'
      this.dragging = true
      this.dragCursorStart = e.clientY || e.touches[0].clientY
      this.dragScrollStart = window.pageYOffset
      document.addEventListener('mousemove', this.handleDrag)
      document.addEventListener('touchmove', this.handleDrag, {passive: false, cancelable: true})
      document.addEventListener('mouseup', this.handleDragStop)
      document.addEventListener('touchend', this.handleDragStop)
      this.setState({dragging: true})
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
    this.setState({dragging: false})
  }

  handleDrag = (e) => {
    if (e.cancelable) {  // Disable drag if mid scroll
      e.preventDefault()
      const diff = (e.clientY || e.touches[0].clientY) - this.dragCursorStart
      const scrollPercentage = diff / (this.ref.clientHeight - DOT_HEIGHT)
      window.scrollTo(0, this.dragScrollStart + scrollPercentage * (document.documentElement.offsetHeight - window.innerHeight))
    }
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

  updateLabelOffsets = () => {
    const { sections, subSections, sectionOffsetTops } = this.props
    if (!sections) {
      this.setState({sectionLabelOffsets: {}})
      return
    }
    const sectionLabelOffsets = {}
    sections.forEach(section => {
      let offsetTop
      if (sectionOffsetTops) {
        offsetTop = sectionOffsetTops[section.key]
      } else {
        const el = document.getElementById(section.key)
        offsetTop = el.offsetTop
      }
      const percentage = (offsetTop - this.ref.offsetTop) / (document.documentElement.offsetHeight - window.innerHeight)
      const offset = DOT_HEIGHT/2 + percentage*(this.ref.clientHeight - DOT_HEIGHT)
      sectionLabelOffsets[section.key] = {offset, label: section.label}

      if (subSections && subSections[section.key]) {
        subSections[section.key].forEach(subSection => {
          let offsetTop
          if (sectionOffsetTops) {
            offsetTop = sectionOffsetTops[subSection.key]
          } else {
            const el = document.getElementById(subSection.key)
            offsetTop = el.offsetTop
          }
          const percentage = (offsetTop - this.ref.offsetTop) / (document.documentElement.offsetHeight - window.innerHeight)
          const offset = DOT_HEIGHT/2 + percentage*(this.ref.clientHeight - DOT_HEIGHT)
          sectionLabelOffsets[subSection.key] = {offset, label: subSection.label}
        })
      }
    })
    this.setState({sectionLabelOffsets})
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.dotRef.addEventListener('mousedown', this.handleDragStart)
    this.dotRef.addEventListener('touchstart', this.handleDragStart)
    this.updateLabelOffsets()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sections !== this.props.sections || prevProps.subSections !== this.props.subSections) {
      this.updateLabelOffsets()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
    this.dotRef.removeEventListener('mousedown', this.handleDragStart)
    this.dotRef.removeEventListener('touchstart', this.handleDragStart)
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('touchmove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleDragStop)
    document.removeEventListener('touchend', this.handleDragStop)
    clearInterval(this.detectScrollingInterval)
    clearTimeout(this.hideTimeout)
    cancelAnimationFrame(this.updateScrollPositionRAF)
  }

  render() {
    const { classes, sections, subSections } = this.props
    const { showScroll, scrollPos, sectionLabelOffsets, dotLabel, dragging } = this.state

    return (
      <div
        className={classes.container}
        style={showScroll ? {opacity: 1} : {right: -40}}
        ref={(el) => this.ref = el}
      >
        <div className={classes.backdrop} style={{opacity: dragging ? 1 : 0}}/>
        <div className={classes.labelContainer} style={{opacity: dragging ? 1 : 0}}>
          {subSections && Object.keys(subSections).map(key => {
            return subSections[key].map((subSection, i) => {
              if (i !== 0 && !subSection.hide && sectionLabelOffsets[subSection.key]) { // Skip first one
                return (
                  <div
                    key={subSection.key}
                    className={classes.subSectionLabel}
                    style={{
                      transform: `translateY(${sectionLabelOffsets[subSection.key].offset - SUBSECTION_LABEL_HEIGHT/2}px)`,
                    }}
                  />
                )
              }
            })
          })}
          {sections && sections.map(section => {
            if (sectionLabelOffsets[section.key]) {
              return (
                <div
                  key={section.key}
                  className={classes.sectionLabel}
                  style={{
                    transform: `translateY(${sectionLabelOffsets[section.key].offset - SECTION_LABEL_HEIGHT/2}px)`,
                  }}
                >
                  {section.label}
                </div>
              )
            }
          })}
        </div>
        <div
          style={{transform: `translateY(${scrollPos}px)`}}
          className={classes.dotContainer}
        >
          {dotLabel &&
            <div
              className={classes.dotLabel}
              style={{opacity: dragging ? 1 : 0}}
            >
              {dotLabel}
            </div>
          }
          <div
            className={classes.dot}
            ref={(el) => this.dotRef = el}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          >
            <ArrowDropUpIcon className={classes.icon} />
            <ArrowDropDownIcon className={classes.icon} />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(FastScroll)
