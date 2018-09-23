import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
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
    const { component, className, scrollEl, ...restProps } = this.props

    let Component = component
    if (!Component) {
      Component = 'a'
    }

    return (
      <Component
        onClick={this.handleClick}
        className={className ? className : this.props.classes.root}
        {...restProps}
      >
        {this.props.children}
      </Component>
    )
  }
}

export default withStyles(styles)(ScrollLink)
