import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = {}

class ScrollRestore extends PureComponent {
  isThrottled = false

  scrollHandler = () => {
    if (!this.isThrottled) {
      this.isThrottled = true
      setTimeout(() => {
        if (this.ref && (this.props.scrollState !== this.ref.scrollTop)) {
          this.props.setScrollState(this.props.scrollId, this.ref.scrollTop)
        }
        this.isThrottled = false
      }, 100)
    }
  }

  componentDidUpdate() {
    if (this.props.scrollState) {
      this.ref.scrollTop = this.props.scrollState
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
