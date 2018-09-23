// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import { resetModal, setModalState } from '../../actions'
import { getCurrentModalState } from '../../selectors/CommonPageSelectors'
import { getEvent, getMatch } from '../../selectors/MatchPageSelectors'

// Components
import AppBar from '@material-ui/core/AppBar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloseIcon from '@material-ui/icons/Close'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import EventIcon from '@material-ui/icons/Event'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

// TBA Components
import TBAScrollRestore from '../TBAScrollRestore'
import MatchBreakdownTable from '../MatchBreakdownTable'
import MatchVideos from '../MatchVideos'

const styles = theme => ({
  content: {
    paddingTop: theme.spacing.unit*2,
    paddingBottom: theme.spacing.unit*2,
  },
  contentMobile: {
    position: 'fixed',
    top: 56,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
  },
  flex: {
    flex: 1,
    textAlign: 'center',
    overflow: 'hidden',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  toolbar: {
    padding: 0,
  },
  paper: {
    margin: theme.spacing.unit,
    overflow: 'hidden',
  },
})

class MatchDialog extends PureComponent {
  reset = props => {
    props.resetModal({
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

  render() {
    console.log("Render Match Dialog")

    const { classes, matchObj: match, event } = this.props

    return (
      <React.Fragment>
        <Hidden smDown>
          <Toolbar>
            <IconButton aria-label="Back" onClick={() => this.props.goBack()}>
              <ChevronLeftIcon />
            </IconButton>
            <div className={classes.flex}>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {match.getDisplayName()}
              </Typography>
              <Typography variant='subheading' noWrap>
                <Link to={{pathname: `/event/${event.key}`}}>@ {event.year} {event.name}</Link>
              </Typography>
            </div>
            <IconButton aria-label="Close" onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <DialogContent className={classes.content}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <MatchBreakdownTable match={match}/>
              </Grid>
              <Grid item xs={6}>
                <MatchVideos match={match}/>
              </Grid>
            </Grid>
          </DialogContent>
        </Hidden>
        <Hidden mdUp>
          <AppBar color='default'>
            <Toolbar className={classes.toolbar}>
              <IconButton aria-label="Back" onClick={() => this.props.goBack()}>
                <ChevronLeftIcon />
              </IconButton>
              <div className={classes.flex}>
                <Typography variant="title" color="inherit" className={classes.flex} noWrap>
                {match.getDisplayName()}
              </Typography>
                <Typography variant='subheading' noWrap>
                  @ {event.year} {event.name}
                </Typography>
              </div>
              <IconButton
                className={classes.button}
                component={Link}
                to={{pathname: `/event/${event.key}`}}
              >
                <EventIcon />
              </IconButton>
              <IconButton aria-label="Close" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent className={classes.contentMobile}>
            <TBAScrollRestore
              scrollId={match.key}
              className={classes.scrollContainer}
            >
              <Paper className={classes.paper}>
                <MatchBreakdownTable match={match}/>
                <MatchVideos match={match}/>
              </Paper>
            </TBAScrollRestore>
          </DialogContent>
        </Hidden>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  // Params
  // States
  tabIdx: getCurrentModalState(state, props).get('tabIdx'),
  // Data
  event: getEvent(state, props),
  matchObj: getMatch(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
  resetModal: (defaultState) => dispatch(resetModal(defaultState)),
  setModalState: (pageState) => dispatch(setModalState(pageState)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MatchDialog))
