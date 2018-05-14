// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import Popover from '@material-ui/core/Popover'

// TBA Components

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
  },
  popover: {
    pointerEvents: 'none',
  },
  popperClose: {
    pointerEvents: 'none',
  },
})

class TeamAtEventPopover extends PureComponent {
  anchorEl = null
  state = {
    open: false,
  }

  handlePopoverOpen = () => {
    this.setState({ open: true })
  }

  handlePopoverClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, component, children, teamKey, wrapper, ...restProps } = this.props
    const Wrapper = wrapper
    return (
      <Wrapper
        ref={(r) => {this.anchorEl = r}}
        onMouseOver={this.handlePopoverOpen}
        onMouseOut={this.handlePopoverClose}
        {...restProps}
        >
          {children}
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={this.state.open}
          anchorEl={this.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={this.handlePopoverClose}
          transitionDuration={100}
        >
          {teamKey}
        </Popover>
      </Wrapper>
    )
  }
}

TeamAtEventPopover.propTypes = {
  classes: PropTypes.object.isRequired,
  wrapper: PropTypes.string.isRequired,
  teamKey: PropTypes.string.isRequired,
}

export default withStyles(styles)(TeamAtEventPopover)
