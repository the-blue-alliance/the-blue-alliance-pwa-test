import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views';

import TBAPageContainer from '../containers/TBAPageContainer'
import GroupedEventTabs from '../components/GroupedEventTabs'
import EventsList from '../components/EventsList'

const styles = theme => ({
})

class EventListPageMobile extends PureComponent {
  state = {isFirstRender: true}
  tabContents = []

  tabHandleChangeIndex = index => {
    this.props.setPageState({activeEventGroup: this.props.groupedEvents.get(index).get('slug')});
  }

  computeTabContents = (groupedEvents, isFirstRender) => {
    this.tabContents = groupedEvents.map((group) => {
      if (!isFirstRender || group.get('slug') === this.props.pageState.get('activeEventGroup')) {
        return <EventsList key={group.get('slug')} events={group.get('events')} />
      } else {
        return <div key={group.get('slug')} />
      }
    }).toJS()
  }

  componentWillMount() {
    this.computeTabContents(this.props.groupedEvents, this.state.isFirstRender)
  }

  componentDidMount() {
    // Rerender without cascading
    setTimeout(() => this.setState({ isFirstRender: false }), 0)
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.groupedEvents !== nextProps.groupedEvents ||
        this.state.isFirstRender !== nextState.isFirstRender) {
      this.computeTabContents(nextProps.groupedEvents, nextState.isFirstRender)
    }
  }

  render() {
    console.log("Render EventListPageMobile")

    // Build group -> index map
    let groupToIndex = {}
    this.props.groupedEvents.forEach((group, index) => {
      groupToIndex[group.get('slug')] = index
    })

    return (
      <TBAPageContainer
        documentTitle={this.props.documentTitle}
        title='Events'
        refreshFunction={this.props.refreshFunction}
        // filterFunction={this.filterFunction}
        tabs={this.props.groupedEvents.length !== 0 &&
          <GroupedEventTabs
            groupedEvents={this.props.groupedEvents}
            activeGroup={this.props.pageState.get('activeEventGroup')}
            setPageState={this.props.setPageState}
          />
        }
      >
        <SwipeableViews
          containerStyle={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          index={groupToIndex[this.props.pageState.get('activeEventGroup')]}
          onChangeIndex={this.tabHandleChangeIndex}
        >
          {this.tabContents}
        </SwipeableViews>
      </TBAPageContainer>
    )
  }
}

EventListPageMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  pageState: ImmutablePropTypes.map.isRequired,
  setPageState: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  groupedEvents: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles)(EventListPageMobile)
