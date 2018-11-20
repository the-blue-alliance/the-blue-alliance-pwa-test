import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Observer from 'react-intersection-observer'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  paper: {
    padding: `${theme.spacing.unit/2}px ${theme.spacing.unit*2}px`,
    position: 'sticky',
    top: 56 - 1,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48 - 1,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64 - 1,
    },
    zIndex: theme.zIndex.appBar - 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paperWithSpace: {
    top: 56 + 48 - 1,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48 + 48 - 1,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64 + 48 - 1,
    },
  },
  observer: {
    position: 'absolute',
    top: -56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: -48,
    },
    [theme.breakpoints.up('sm')]: {
      top: -64,
    },
  },
  observerWithSpace: {
    top: -(56 + 48),
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: -(48 + 48),
    },
    [theme.breakpoints.up('sm')]: {
      top: -(64 + 48),
    },
  },
})

class StickySectionHeader extends PureComponent {
  state = {
    isRaised: false,
  }

  observerChange = (inView) => {
    this.setState({isRaised: !inView})
  }

  render() {
    const { classes, label, withSpace } = this.props
    const { isRaised } = this.state

    return (
      <React.Fragment>
        <Paper
          className={classNames({[classes.paper]: true, [classes.paperWithSpace]: withSpace})}
          elevation={isRaised ? 4 : 0}
          square={isRaised}
        >
          <Observer
            className={classNames({[classes.observer]: true, [classes.observerWithSpace]: withSpace})}
            tag="div"
            onChange={this.observerChange}
          />
          {label}
        </Paper>
        <Divider />
      </React.Fragment>
    )
  }
}

StickySectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default withStyles(styles)(StickySectionHeader)
