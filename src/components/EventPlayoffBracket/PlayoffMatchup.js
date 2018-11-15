// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

// Components

// TBA Components

const styles = theme => ({
  spacer: {
    flexGrow: 1,
    '&:first-child': {
      flexGrow: 0.5,
    },
    '&:last-child': {
      flexGrow: 0.5,
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: theme.spacing.unit/2,
    margin: `0 ${theme.spacing.unit/2}px`,
  },
  labelLeft: {
    borderRight: '1px solid #000',
  },
  labelRight: {
    borderLeft: '1px solid #000',
  },
  finalsLabel: {
    flexGrow: 0,
  },
  alliance: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing.unit/2,
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.spacing.unit/2,
    boxShadow: theme.shadows[2],
  },
  red: {
    marginTop: theme.spacing.unit,
  },
  blue: {
    marginBottom: theme.spacing.unit,
  },
  redLeft: {
    borderLeft: `5px solid ${theme.palette.type === 'light' ? '#FFDDDD' : '#802020'}`,
  },
  blueLeft: {
    borderLeft: `5px solid ${theme.palette.type === 'light' ? '#DDDDFF' : '#202080'}`,
  },
  redRight: {
    borderRight: `5px solid ${theme.palette.type === 'light' ? '#FFDDDD' : '#802020'}`,
  },
  blueRight: {
    borderRight: `5px solid ${theme.palette.type === 'light' ? '#DDDDFF' : '#202080'}`,
  },
})

const PlayoffMatchup = ({classes, level, rightSide}) => {
  const isFinals = level === 'F'
  return (
    <React.Fragment>
      <div className={classes.spacer}/>
      <div
        className={classNames({
          [classes.alliance]: true,
          [classes.red]: true,
          [rightSide ? classes.redRight : classes.redLeft]: true,
        })}
      >
        <div>9999</div>
        <div>9999</div>
        <div>9999</div>
        <div>9999</div>
      </div>
      <div
        className={classNames({
          [classes.label]: true,
          [rightSide ? classes.labelRight : classes.labelLeft]: !isFinals,
          [classes.finalsLabel]: isFinals,
        })}
      >
        <div>2 - 1</div>
      </div>
      <div
        className={classNames({
          [classes.alliance]: true,
          [classes.blue]: true,
          [rightSide || isFinals ? classes.blueRight : classes.blueLeft]: true,
        })}
      >
        <div>9999</div>
        <div>9999</div>
        <div>9999</div>
        <div>9999</div>
      </div>
      <div className={classes.spacer}/>
    </React.Fragment>
  )
}

export default withStyles(styles)(PlayoffMatchup)
