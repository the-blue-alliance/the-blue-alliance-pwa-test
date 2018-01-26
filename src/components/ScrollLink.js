import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import SweetScroll from 'sweet-scroll'

const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
})

class ScrollLink extends PureComponent {
  handleClick = (e) => {
    e.preventDefault()

    // Weird bug breaks scrolling if scrollTop === 0
    // https://github.com/tsuyoshiwada/sweet-scroll/issues/38
    const els = document.getElementsByClassName(this.props.scrollEl.className)
    let el = null
    if (els) {
      el = els[0]
    }
    if (el.scrollTop === 0) {
      el.scrollTop = 1  // Set scrollTop = 1 to fix weird bug
    }

    const scroller = new SweetScroll({
      duration: 250,
      easing: 'easeOutQuint',
    }, `.${this.props.scrollEl.className}`)
    scroller.to(`#${this.props.to}`)
  }

  render() {
    return (
      <a
        onClick={this.handleClick}
        className={this.props.classes.root}
      >
        {this.props.children}
      </a>
    )
  }
}

export default withStyles(styles)(ScrollLink)
