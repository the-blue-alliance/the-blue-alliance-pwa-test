// Inspired by https://github.com/dvtng/react-loading-skeleton
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  '@keyframes progress': {
    from: {
      backgroundPosition: '-200px 0',
    },
    to: {
      backgroundPosition: 'calc(200px + 100%) 0',
    },
  },
  loading: {
    animation: 'progress 1.2s ease-in-out infinite',
    backgroundColor: '#eee',
    backgroundImage: 'linear-gradient(90deg, #eee, #f5f5f5, #eee)',
    backgroundSize: '200px 100%',
    backgroundRepeat: 'no-repeat',
    borderRadius: '6px',
    display: 'inline-block',
    lineHeight: '1',
    width: '100%',
  },
})

const Skeleton = (props) => {
  const { classes, rows, width } = props
  let num = 1
  if (rows) {
    num = rows
  }
  let style = {}
  if (width) {
    style.width = width
  }
  return (
    Array.from(Array(num).keys()).map(i => <span key={i} className={classes.loading} style={style}>&zwnj;</span>)
  )
}

Skeleton.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default withStyles(styles)(Skeleton)
