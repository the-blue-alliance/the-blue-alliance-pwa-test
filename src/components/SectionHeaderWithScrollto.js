import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Observer from 'react-intersection-observer'
import { withStyles } from '@material-ui/core/styles'

import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import ExpandMore from '@material-ui/icons/ExpandMore'
import SweetScroll from 'sweet-scroll'

const styles = theme => ({
  paper: {
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
    // textAlign: 'center',
  },
  observer: {
    position: 'absolute',
    top: -(56 + 48),
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: -(48 + 48),
    },
    [theme.breakpoints.up('sm')]: {
      top: -(64 + 48),
    },
  },
})

class SectionHeaderWithScrollto extends PureComponent {
  state = {
    isRaised: false,
    anchorEl: null,
  }

  observerChange = (inView) => {
    this.setState({isRaised: !inView})
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleScroll = id => {
    const scroller = new SweetScroll({
      duration: 250,
      offset: -48,
    })
    scroller.to(`#${id}`)
    this.setState({ anchorEl: null })
  }

  render() {
    console.log("Render SectionHeaderWithScrollto")

    const { classes, sectionKey, label, sections } = this.props
    const { isRaised, anchorEl } = this.state

    return (
      <React.Fragment>
        <Paper
          className={classes.paper}
          elevation={isRaised ? 4 : 0}
          square={isRaised}
        >
          <Observer
            className={classes.observer}
            tag="div"
            onChange={this.observerChange}
          />
          <div className={classes.flex}>
            {label}
          </div>
          <Hidden mdUp implementation='css'>
            <IconButton onClick={this.handleClick}>
              <ExpandMore/>
            </IconButton>
          </Hidden>
        </Paper>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          disableRestoreFocus
        >
          <ListSubheader component="div">Jump To:</ListSubheader>
          {sections.map(({ key, label }) => {
            return (
              <MenuItem
                key={key}
                onClick={this.handleScroll.bind(this, key)}
                selected={key === sectionKey}
              >
                {label}
              </MenuItem>
            )
          })}
        </Menu>
      </React.Fragment>
    )
  }
}

SectionHeaderWithScrollto.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default withStyles(styles)(SectionHeaderWithScrollto)
