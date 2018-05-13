// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

// Components
import ButtonBase from 'material-ui/ButtonBase'
import Divider from 'material-ui/Divider'
import Icon from 'material-ui/Icon'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import Skeleton from 'react-loading-skeleton'
import SwipeableViews from 'react-swipeable-views'

// TBA Components
import TBAPageContainer from '../containers/TBAPageContainer'
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'
import TeamAtEventMobile from '../components/TeamAtEventMobile'

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
  nameText: {
    overflowWrap: 'break-word',
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
  scrollContainer: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
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
      isLoading,
      year,
      validYears,
      yearMenuOpen,
      teamNumber,
      team,
      teamYearEvents,
      awardsByEvent,
      matchesByEvent,
      statusByEvent,
    } = this.props

    let views = []
    views.push(
      <ScrollRestoreContainer
        key="info"
        scrollId="info"
        className={classes.scrollContainer}
      >
        <Paper className={classes.paper}>
          <List className={classes.infoList}>
            <ListItem>
              <ListItemIcon>
                <Icon>people</Icon>
              </ListItemIcon>
              <ListItemText primary={!team ? <Skeleton /> : (team.nickname ? team.nickname : `Team ${teamNumber}`)} />
            </ListItem>
            {(!team || team.getCityStateCountry()) &&
              <React.Fragment>
                <Divider inset />
                <ListItem>
                  <ListItemIcon>
                    <Icon>location_on</Icon>
                  </ListItemIcon>
                  <ListItemText primary={!team ? <Skeleton /> : team.getCityStateCountry()} />
                </ListItem>
              </React.Fragment>
            }
            {(!team || team.name) &&
              <React.Fragment>
                <Divider inset />
                <ListItem>
                  <ListItemIcon>
                    <Icon>info</Icon>
                  </ListItemIcon>
                  <ListItemText primary={!team ? <Skeleton count={2}/> : team.name} className={classes.nameText} />
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
      </ScrollRestoreContainer>
    )
    teamYearEvents.forEach(event => {
      if (statusByEvent && matchesByEvent) {
        const status = statusByEvent.get(`${event.key}_frc${teamNumber}`)
        const matches = matchesByEvent.get(event.key)
        const awards = awardsByEvent.get(event.key)
        const scrollRefKey = `scrollRef_${event.key}`
        views.push(
          <ScrollRestoreContainer
            key={event.key}
            scrollId={`${event.key}_matches`}
            className={classes.scrollContainer}
            contentRef={el => {
              if (!this.state[scrollRefKey]) {
                this.setState({[scrollRefKey]: el})
              }
            }}
          >
            <TeamAtEventMobile
              scrollElement={this.state[scrollRefKey]}
              isLoading={isLoading}
              event={event}
              matches={matches}
              status={status}
              awards={awards}
              teamKey={`frc${teamNumber}`}
            />
          </ScrollRestoreContainer>
        )
      } else {
        views.push(<div key={event.key}>TODO</div>)
      }
    })

    return (
      <TBAPageContainer
        documentTitle={this.props.documentTitle}
        title={
          <ButtonBase
            className={classes.yearSelector}
            onClick={this.handleYearOpen}
          >
            <div>
              <Typography variant='title' color='inherit' className={classes.titleTeam}>
                Team {teamNumber}
              </Typography>
              <br/>
              <Typography variant='subheading' color='inherit' className={classes.titleYear}>
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
            scrollable
            scrollButtons='auto'
            className='hide-scrollbar'
          >
            <Tab value={0} label='Info' />
            {teamYearEvents.map((event, idx) =>
              <Tab key={event.key} value={idx + 1} label={event.short_name} />
            )}
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
          {views}
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
