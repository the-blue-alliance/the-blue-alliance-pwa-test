// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'

// Components
import ButtonBase from 'material-ui/ButtonBase'
import { CircularProgress } from 'material-ui/Progress'
import Divider from 'material-ui/Divider'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel'
import Icon from 'material-ui/Icon'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import SwipeableViews from 'react-swipeable-views'

// TBA Components
import TBAPageContainer from '../containers/TBAPageContainer'
import EventFilterDialogContainer from '../containers/EventFilterDialogContainer'
import EventsList3 from '../components/EventsList3'
import GroupedEventTabsContainer from '../containers/GroupedEventTabsContainer'
import GroupedEventTabContentsContainer from '../containers/GroupedEventTabContentsContainer'

const styles = theme => ({
  yearSelector: {
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
    '& > div': {
      padding: `${theme.spacing.unit}px 0`,
    },
  },
  titleTeam: {
    float: 'left',
  },
  titleYear: {
    float: 'left',
  },
  arrowDropDown: {
    fontSize: 'inherit',
  },
  paper: {
    margin: theme.spacing.unit,
  },
  infoList: {
    padding: 0,
  },
  zeroDataContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataIcon: {
    width: '25%',
    height: 'auto',
    margin: '0 auto',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
})

class TeamPageMobile extends PureComponent {
  state = {
    yearMenuAnchorEl: null,
  }
  tabRefs = {}

  handleYearOpen = event => {
    this.setState({ yearMenuAnchorEl: event.currentTarget });
    this.props.setYearMenuOpen(true)
  }

  handleYearSelect = year => {
    this.props.setYearMenuOpen(false)
    if (year !== this.props.year) {
      this.props.pushHistory(`/team/${this.props.teamNumber}/${year}`)
    }
  }

  tabHandleChange = (event, value) => {
    this.props.setPageState({activeTab: value})
  }
    tabHandleChangeIndex = index => {
    this.props.setPageState({activeTab: index});
  }

  render() {
    console.log("Render TeamPageMobile")

    const {
      classes,
      year,
      validYears,
      isLoading,
      yearMenuOpen,
      teamNumber,
      team,
      teamYearEvents,
      awardsByEvent,
      matchesByEvent,
      statusByEvent,
    } = this.props

    return (
      <TBAPageContainer
        documentTitle={this.props.documentTitle}
        title={
          <ButtonBase
            className={classes.yearSelector}
            onClick={this.handleYearOpen}
          >
            <div>
              <Typography type='title' color='inherit' className={classes.titleTeam}>
                Team {teamNumber}
              </Typography>
              <br/>
              <Typography type='subheading' color='inherit' className={classes.titleYear}>
                {year} <Icon className={classes.arrowDropDown}>arrow_drop_down</Icon>
              </Typography>
            </div>
          </ButtonBase>
        }
        refreshFunction={this.props.refreshFunction}
        tabs={
          <Tabs
            value={this.props.activeTab}
            onChange={this.tabHandleChange}
            indicatorColor='white'
            scrollable
            scrollButtons='auto'
            className='hide-scrollbar'
          >
            <Tab value={0} label='Info' />
            <Tab value={1} label='Events' />
            <Tab value={2} label='Media' />
          </Tabs>
        }
      >
        <Menu
          anchorEl={this.state.yearMenuAnchorEl}
          open={yearMenuOpen}
          onClose={() => this.props.setYearMenuOpen(false)}
        >
          {validYears ?
            validYears.map(y =>
              <MenuItem
                key={y}
                selected={y === year}
                onClick={() => this.handleYearSelect(y)}
              >
                {y} Season
              </MenuItem>
            ).reverse()
            :
            <MenuItem
                key={year}
                selected={true}
                onClick={() => this.handleYearSelect(year)}
              >
              {year} Season
            </MenuItem>
          }
        </Menu>
        <SwipeableViews
          containerStyle={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          index={this.props.activeTab}
          onChangeIndex={this.tabHandleChangeIndex}
        >
          <div>
            <Paper className={classes.paper}>
              <List className={classes.infoList}>
                <ListItem>
                  <ListItemIcon>
                    <Icon>people</Icon>
                  </ListItemIcon>
                  <ListItemText primary={team && team.nickname ? team.nickname : `Team ${teamNumber}`} />
                </ListItem>
                {team && team.getCityStateCountry() &&
                  <React.Fragment>
                    <Divider inset />
                    <ListItem>
                      <ListItemIcon>
                        <Icon>location_on</Icon>
                      </ListItemIcon>
                      <ListItemText primary={team.getCityStateCountry()} />
                    </ListItem>
                  </React.Fragment>
                }
                {team && team.name &&
                  <React.Fragment>
                    <Divider inset />
                    <ListItem>
                      <ListItemIcon>
                        <Icon>info</Icon>
                      </ListItemIcon>
                      <ListItemText primary={team.name} />
                    </ListItem>
                  </React.Fragment>
                }
              </List>
            </Paper>

            <Paper className={classes.paper}>
              <List className={classes.infoList}>
                <ListItem>
                  <ListItemText primary='Social media' />
                </ListItem>
                {team && team.website &&
                  <React.Fragment>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <Icon>public</Icon>
                      </ListItemIcon>
                      <ListItemText primary={team.website} />
                    </ListItem>
                  </React.Fragment>
                }
                <Divider inset />
                <ListItem>
                  <ListItemIcon>
                    <Icon>public</Icon>
                  </ListItemIcon>
                  <ListItemText primary='Some other social media' />
                </ListItem>
              </List>
            </Paper>
          </div>
          {team ?
            <EventsList3 scrollId='events' events={teamYearEvents} team={team}/>
            :
            <div>TODO Placeholder</div>
          }
          <div>Media</div>
        </SwipeableViews>
      </TBAPageContainer>
    )
  }
}

TeamPageMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  setYearMenuOpen: PropTypes.func.isRequired,
  setPageState: PropTypes.func.isRequired,
  yearMenuOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
}

export default withStyles(styles)(TeamPageMobile)
