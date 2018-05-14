import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Badge from '@material-ui/core/Badge'

class HideableBadge extends PureComponent {
  render() {
    const { hidden, children, style, ...restProps } = this.props
    if (hidden) {
      return (
        <div style={style}>
          {children}
        </div>
      )
    } else {
      return (
        <Badge
          {...restProps}
        >
          {children}
        </Badge>
      )
    }
  }
}

HideableBadge.propTypes = {
  hidden: PropTypes.bool.isRequired,
}

export default HideableBadge
