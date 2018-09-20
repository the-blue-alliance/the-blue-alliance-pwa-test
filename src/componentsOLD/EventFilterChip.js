// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import Chip from '@material-ui/core/Chip'

// TBA Components

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
  dot: {
    marginRight: theme.spacing.unit,
    height: 12,
    width: 12,
    borderRadius: '50%',
    display: 'inline-block',
  },
})

class EventFilterChip extends PureComponent {
  render() {
    console.log("Render EventFilterChip")
    const { classes, theme, label, color, selected, ...restProps } = this.props

    return (
      <Chip
        className={classes.chip}
        style={selected && color ? {
          backgroundColor: color,
          color: theme.palette.getContrastText(color),
          border: `1px solid ${selected ? theme.palette.getContrastText(color) : '#fff'}`
        } : {}}
        label={
          <React.Fragment>
            <span
              className={classes.dot}
              style={{backgroundColor: color, border: `1px solid ${selected ? theme.palette.getContrastText(color) : '#000'}`}}
            />
            {label}
          </React.Fragment>}
        {...restProps}
      />
    )
  }
}

EventFilterChip.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(EventFilterChip)
