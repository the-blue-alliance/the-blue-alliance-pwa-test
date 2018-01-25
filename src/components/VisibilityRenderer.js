import { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class VisibilityRenderer extends PureComponent {
  state = {
    renderState: 0,  // 0: FastRender for layout, 1: Render if visible, 2: Render regardless
    isVisible: false,
  }

  updateVisibility = () => {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    const containmentRect = {
      top: 0,
      left: 0,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      right: window.innerWidth || document.documentElement.clientWidth,
    }
    const isVisible = (
      rect.top <= containmentRect.bottom &&
      rect.bottom >= containmentRect.top &&
      rect.left <= containmentRect.right &&
      rect.right >= containmentRect.left
    )

    let newState = {
      renderState: this.state.renderState + 1,
    }
    if (this.state.isVisible !== isVisible) {
      newState['isVisible'] = isVisible
    }
    if (newState.renderState === 1) {
      // Update state before render occurs
      this.setState(newState)
    } else if (newState.renderState === 2) {
      // Render without cascading
      setTimeout(() => this.setState(newState))
    }
  }

  componentDidMount() {
    this.updateVisibility()
  }

  componentWillReceiveProps() {
    this.setState({
      renderState: 0,
      isVisible: false,
    })
  }

  componentWillUpdate() {
    this.updateVisibility()
  }

  componentDidUpdate() {
    this.updateVisibility()
  }

  render() {
    if (this.state.renderState === 0 ||
        (this.state.renderState === 1 && !this.state.isVisible)) {
      return this.props.fastRender
    }
    return this.props.render
  }
}

VisibilityRenderer.propTypes = {
  render: PropTypes.element.isRequired,
  fastRender: PropTypes.element.isRequired,
}

export default VisibilityRenderer
