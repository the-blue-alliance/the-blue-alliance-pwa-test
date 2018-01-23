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
