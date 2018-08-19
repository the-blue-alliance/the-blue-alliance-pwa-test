import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Observer from 'react-intersection-observer'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  headerLabel: {
    height: 40,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
    position: 'sticky',
    top: 56 + 48 - 1,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48 + 48 - 1,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64 + 48 - 1,
    },
    zIndex: theme.zIndex.appBar - 2,
  },
})

class EventPageSectionHeader extends PureComponent {
  state = {
    isRaised: false,
  }

  observerChange = (inView) => {
    this.setState({isRaised: !inView})
  }

  render() {
    console.log("Render EventPageSectionHeader")

    const { classes, label } = this.props

    return (
      <React.Fragment>
        <Observer
          tag="div"
          onChange={this.observerChange}
          rootMargin={`${-(56+48-1)}px`}
        />
        <Paper className={classes.headerLabel} elevation={this.state.isRaised ? 4 : 0} square={this.state.isRaised}>
          <Typography variant='title'>{label}</Typography>
        </Paper>
      </React.Fragment>
    )
  }
}

EventPageSectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(EventPageSectionHeader)
