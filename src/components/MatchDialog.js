// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components
import AppBar from '@material-ui/core/AppBar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloseIcon from '@material-ui/icons/Close'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SwipeableViews from 'react-swipeable-views'

// TBA Components
import MatchBreakdownTable from './MatchBreakdownTable'
import MatchVideos from './MatchVideos'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    paddingTop: theme.spacing.unit*2,
    paddingBottom: theme.spacing.unit*2,
  },
  contentMobile: {
    position: 'fixed',
    top: 64 + 48,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
  },
  tabContent: {
    padding: theme.spacing.unit,
  },
  flex: {
    flex: 1,
    textAlign: 'center',
  },
  toolbar: {
    padding: 0,
  },
})

class MatchDialog extends PureComponent {
  reset = props => {
    props.resetModal({
      tabIdx: 0,
    })
  }

  constructor(props) {
    super(props)
    this.reset(props)
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.reset(nextProps)
    }
  }

  handleClose = (e) => {
    e.stopPropagation()
    this.props.handleClose()
  }

  handleClose = (e) => {
    e.stopPropagation()
    this.props.handleClose()
  }

  tabHandleChange = (event, value) => {
    this.props.setModalState({tabIdx: value})
  }

  tabHandleChangeIndex = index => {
    this.props.setModalState({tabIdx: index})
  }

  render() {
    console.log("Render Match Dialog")

    const { classes } = this.props

    return (
      <React.Fragment>
        <Hidden smDown>
          <Toolbar>
            <IconButton className={classes.button} aria-label="Back" onClick={() => this.props.goBack()}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {this.props.matchObj.getDisplayName()}
            </Typography>
            <IconButton className={classes.button} aria-label="Close" onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <DialogContent className={classes.content}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <MatchBreakdownTable match={this.props.matchObj}/>
              </Grid>
              <Grid item xs={6}>
                <MatchVideos match={this.props.matchObj}/>
              </Grid>
            </Grid>
          </DialogContent>
        </Hidden>
        <Hidden mdUp>
          <AppBar color='default'>
            <Toolbar className={classes.toolbar}>
              <IconButton className={classes.button} aria-label="Back" onClick={() => this.props.goBack()}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {this.props.matchObj.getDisplayName()}
              </Typography>
              <IconButton className={classes.button} aria-label="Close" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          <Tabs
            value={this.props.tabIdx}
            onChange={this.tabHandleChange}
            indicatorColor='primary'
            scrollable
            scrollButtons='auto'
            className='hide-scrollbar'
          >
            <Tab value={0} label='Breakdown' />
            <Tab value={1} label='Videos' />
          </Tabs>
          </AppBar>
          <DialogContent className={classes.contentMobile}>
            <SwipeableViews
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              index={this.props.tabIdx}
              onChangeIndex={this.tabHandleChangeIndex}
            >
              <div className={classes.tabContent}>
                <MatchBreakdownTable match={this.props.matchObj}/>
              </div>
              <div className={classes.tabContent}>
                <MatchVideos match={this.props.matchObj}/>
              </div>
            </SwipeableViews>
          </DialogContent>
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(MatchDialog)
