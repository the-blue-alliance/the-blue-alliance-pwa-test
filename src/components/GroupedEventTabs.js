import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'

import Tabs, { Tab } from 'material-ui/Tabs';

const styles = theme => ({
})

class PureTab extends PureComponent {
  render() {
    const {...allProps} = this.props
    return <Tab {...allProps} />
  }
}

class GroupedEventTabs extends PureComponent {
  tabHandleChange = (event, value) => {
    this.props.setPageState({activeEventGroup: value})
  }

  componentWillUpdate(nextProps, nextState) {
    // Select first tab if current tab is no longer present
    if (nextProps.groupedEvents.size !== 0 &&
        !nextProps.groupedEvents.map(group => group.get('slug')).includes(nextProps.activeGroup)) {
      this.props.setPageState({activeEventGroup: nextProps.groupedEvents.getIn([0, 'slug'])})
    }
  }

  render() {
    console.log("Render GroupedEventTabs")

    return (
      <Tabs
        value={this.props.activeGroup}
        onChange={this.tabHandleChange}
        indicatorColor="white"
        scrollable
        scrollButtons="auto"
      >
        {this.props.groupedEvents.map((group) =>
          <PureTab key={group.get('slug')} value={group.get('slug')} label={group.get('label')} />
        )}
      </Tabs>
    )
  }
}

GroupedEventTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  setPageState: PropTypes.func.isRequired,
  groupedEvents: ImmutablePropTypes.list,
  activeGroup: PropTypes.string.isRequired,
}

export default withStyles(styles)(GroupedEventTabs)
