import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = {}

class ScrollRestore extends PureComponent {
  isThrottled = false
  isScrolling = false
  isScrollingTimeout = null

  scrollHandler = () => {
    if (!this.isThrottled) {
      // Keep track if scrolling
      this.isScrolling = true
      clearTimeout(this.isScrollingTimeout)
      this.isScrollingTimeout = setTimeout(() => {
        this.isScrolling = false
      }, 500)

      // Throttle scroll handler
      this.isThrottled = true
      setTimeout(() => {
        // Update scroll state
        if (this.ref && (this.props.scrollState !== this.ref.scrollTop)) {
          this.props.setScrollState(this.props.scrollId, this.ref.scrollTop)
        }
        this.isThrottled = false
      }, 100)
    }
  }

  componentDidMount() {
    if (!this.isScrolling) {
      if (this.props.scrollState) {
        if (this.ref.scrollTop !== this.props.scrollState) {
          this.ref.scrollTop = this.props.scrollState
        }
      } else {
        this.ref.scrollTop = 0
      }
    }
  }

  componentDidUpdate() {
    if (!this.isScrolling) {
      if (this.props.scrollState) {
        if (this.ref.scrollTop !== this.props.scrollState) {
          this.ref.scrollTop = this.props.scrollState
        }
      } else {
        this.ref.scrollTop = 0
      }
    }
  }

  render() {
    console.log(`Render ScrollRestore: ${this.props.scrollId}`)

    const { contentRef, children, className } = this.props
    return (
      <div
        ref={(r)=> {
          this.ref = r
          if (contentRef) {
            contentRef(r)
          }
        }}
        onScroll={this.scrollHandler}
        className={className}
      >
        {children}
      </div>
    )
  }
}

ScrollRestore.propTypes = {
  scrollId: PropTypes.string.isRequired,
}

export default withStyles(styles)(ScrollRestore)
