// import 'intersection-observer'  // Polyfill

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Observer from 'react-intersection-observer'
import { withStyles } from '@material-ui/core/styles'

import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  headerLabel: {
    height: 40,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
    position: 'sticky',
    top: -1,  // to ensure background pixels are covered up
  },
})

class EventListCardHeader extends PureComponent {
  state = {
    isRaised: false,
  }

  observerChange = (inView) => {
    this.setState({isRaised: !inView})
  }

  render() {
    console.log("Render EventListCardHeader")

    const { classes, label } = this.props

    return (
      <React.Fragment>
        <Observer
          tag="div"
          onChange={this.observerChange}
        />
        <Paper className={classes.headerLabel} elevation={this.state.isRaised ? 4 : 0}>
          <Typography variant='title'>{label}</Typography>
        </Paper>
        <Divider />
      </React.Fragment>
    )
  }
}

EventListCardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(EventListCardHeader)
