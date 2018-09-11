import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class VisibilityRenderer extends PureComponent {
  state = {
    renderState: 0,  // 0: fastRender for layout, 1: preRender if visible, 2: Render if visible, 3: Render regardless
    isVisible: false,
  }

  updateVisibility = () => {
    if (this.props.disable) {
      return
    }

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

    let newState = {}
    if (this.state.isVisible !== isVisible) {
      newState['isVisible'] = isVisible
    }
    if (this.state.renderState === 0) {
      // Update state before render occurs
      newState['renderState'] = this.props.preRender ? 1 : 2
      this.setState(newState)
      return
    }
    if (this.state.renderState < 3) {
      newState['renderState'] = this.state.renderState + 1
    }
    if (Object.keys(newState).length > 0) {
      // Render without cascading
      requestIdleCallback(() => this.setState(newState))
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
    if (this.state.renderState === 3 || this.props.disable) {
      return this.props.render
    }
    if (this.state.renderState === 2 && this.state.isVisible) {
      return this.props.render
    }
    if (this.state.renderState === 1 && this.state.isVisible) {
      return this.props.preRender
    }
    return this.props.fastRender
  }
}

VisibilityRenderer.propTypes = {
  preRender: PropTypes.element,
  fastRender: PropTypes.element.isRequired,
  render: PropTypes.element.isRequired,
  disable: PropTypes.bool,
}

export default VisibilityRenderer
