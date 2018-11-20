// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

// TBA Components

const SECTION_LABEL_HEIGHT = 24
const SUBSECTION_LABEL_HEIGHT = 8
const DOT_HEIGHT = 80
const DOT_LABEL_HEIGHT = 36
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
    fontSize: 20,
    whiteSpace: 'nowrap',
    padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px`,
    marginRight: theme.spacing.unit*6,
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
    right: theme.spacing.unit*6,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 14,
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
    right: theme.spacing.unit*6,
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

  yOffsetToPercent = (yOffset) => {
    let percent = 0
    let label = null
    for (let i=0; i<this.labelBreakpoints.length; i++) {
      const breakpoint = this.labelBreakpoints[i]
      const lastBreakpoint = this.labelBreakpoints[i-1]
      if (breakpoint.offsetTop <= yOffset) {
        percent = breakpoint.percentage
        if (i === this.labelBreakpoints.length - 1) {
          label = lastBreakpoint.label
        } else {
          label = breakpoint.label
        }
      } else {
        const percentageDiff = breakpoint.percentage - lastBreakpoint.percentage
        const diff = breakpoint.offsetTop - lastBreakpoint.offsetTop
        const partialPercentage = (yOffset - lastBreakpoint.offsetTop) / diff
        percent += partialPercentage * percentageDiff
        break
      }
    }
    return {percent, label}
  }

  percentChangeToYOffsetChange = (startPercent, percentChange) => {
    const start = Math.min(startPercent, startPercent + percentChange)
    const end = Math.max(startPercent, startPercent + percentChange)

    let yOffsetChange = 0
    for (let i=0; i<this.labelBreakpoints.length-1; i++) {
      const breakpoint = this.labelBreakpoints[i]
      const nextBreakpoint = this.labelBreakpoints[i+1]
      const lowerBound = breakpoint.percentage
      const upperBound = nextBreakpoint.percentage

      let overlap
      if (end < lowerBound || start > upperBound) {
        overlap = null
      } else if (start < lowerBound) {
        if (end > upperBound) {
          overlap = upperBound - lowerBound
        } else {
          overlap = end - lowerBound
        }
      } else {
        if (end > upperBound) {
          overlap = upperBound - start
        } else {
          overlap = end - start
        }
      }

      const diff = upperBound - lowerBound
      let scale
      if (overlap === null) {
        scale = 0
      } else if (diff === 0) {
        scale = 1
      } else {
        scale = overlap / diff
      }
      yOffsetChange += scale * (nextBreakpoint.offsetTop - breakpoint.offsetTop)
    }
    return percentChange < 0 ? -yOffsetChange : yOffsetChange
  }

  handleScroll = () => {
    clearTimeout(this.hideTimeout)
    this.updateScrollPosition()
    if (this.scrolling) {
      return
    }
    this.scrolling = true
    this.show()
    this.detectScrollingInterval = setInterval(() => {
      if (this.lastPageYOffset === this.pageYOffset) {
        clearInterval(this.detectScrollingInterval)
        this.scrolling = false
        this.hide()
      }
      this.lastPageYOffset = this.pageYOffset
    }, 100)
  }

  handleResize = () => {
    this.updateScrollPosition()
    this.updateLabelOffsets()
  }

  updateScrollPosition = () => {
    if (!this.updateScrollPositionRAF && this.labelBreakpoints) {
      this.updateScrollPositionRAF = requestAnimationFrame(() => {
        this.updateScrollPositionRAF = undefined
        this.pageYOffset = window.pageYOffset

        const { percent, label } = this.yOffsetToPercent(this.pageYOffset)
        const scrollPos = percent * (this.ref.clientHeight - DOT_HEIGHT) // Offset by dot size + margins
        this.setState({scrollPos, dotLabel: label})
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
      this.dragStartCursorPos = e.clientY || e.touches[0].clientY
      this.dragStartPageYOffset = window.pageYOffset
      this.dragStartPercent = this.yOffsetToPercent(this.dragStartPageYOffset).percent
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
      const cursorDiff = (e.clientY || e.touches[0].clientY) - this.dragStartCursorPos
      const percentChange = cursorDiff / (this.ref.clientHeight - DOT_HEIGHT)
      const yOffsetChange = this.percentChangeToYOffsetChange(this.dragStartPercent, percentChange)
      window.scrollTo(0, this.dragStartPageYOffset + yOffsetChange)
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

    // Compute spacing (as a percentage) between sections
    let count = sections.length
    if (subSections) {
      sections.forEach(section => {
        count += subSections[section.key].length - 1 // Don't count first subSection
      })
    }
    const spacing = 1 / (count + 1)

    const sectionLabelOffsets = {}
    let i = 1
    this.labelBreakpoints = [{percentage: 0, key: null, offsetTop: 0}]
    sections.forEach(section => {
      let offsetTop
      if (sectionOffsetTops) {
        offsetTop = sectionOffsetTops[section.key]
      } else {
        const el = document.getElementById(section.key)
        offsetTop = el.offsetTop
      }
      const percentage = i * spacing
      const offset = DOT_HEIGHT/2 + percentage*(this.ref.clientHeight - DOT_HEIGHT)
      sectionLabelOffsets[section.key] = {offset, label: section.label}
      if (!subSections) {
        this.labelBreakpoints.push({percentage, label: section.label, offsetTop: offsetTop - this.ref.offsetTop})
      }

      if (subSections && subSections[section.key]) {
        subSections[section.key].forEach(subSection => {
          let offsetTop
          if (sectionOffsetTops) {
            offsetTop = sectionOffsetTops[subSection.key]
          } else {
            const el = document.getElementById(subSection.key)
            offsetTop = el.offsetTop
          }
          const percentage = i * spacing
          const offset = DOT_HEIGHT/2 + percentage*(this.ref.clientHeight - DOT_HEIGHT)
          sectionLabelOffsets[subSection.key] = {offset, label: subSection.label}
          this.labelBreakpoints.push({percentage, label: subSection.label, offsetTop: offsetTop - this.ref.offsetTop})
          i++
        })
      } else {
        i++
      }
    })
    const limit = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight
    this.labelBreakpoints.push({percentage: 1, key: null, offsetTop: limit})

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
              return null
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
            return null
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
