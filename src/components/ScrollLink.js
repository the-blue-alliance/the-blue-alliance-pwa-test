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

    const { scrollEl, to, offset } = this.props

    // Weird bug breaks scrolling if scrollTop === 0
    // https://github.com/tsuyoshiwada/sweet-scroll/issues/38
    if (scrollEl) {
      const els = document.getElementsByClassName(scrollEl.className)
      let el = null
      if (els) {
        el = els[0]
      }
      if (el.scrollTop === 0) {
        el.scrollTop = 1  // Set scrollTop = 1 to fix weird bug
      }
    }


    const scrollOptions = {
      duration: 250,
      easing: 'easeOutQuint',
      offset: offset ? offset : 0,
    }

    let scroller
    if (scrollEl) {
      scroller = new SweetScroll(scrollOptions, `.${scrollEl.className}`)
    } else {
      scroller = new SweetScroll(scrollOptions)
    }
    scroller.to(`#${to}`)
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
