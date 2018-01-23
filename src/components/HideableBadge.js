import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Badge from 'material-ui/Badge'

class HideableBadge extends PureComponent {
  render() {
    const { hidden, children, ...restProps } = this.props
    if (hidden) {
      return (
        <div>
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
