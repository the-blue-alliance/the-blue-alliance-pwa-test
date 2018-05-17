import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

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

  componentDidUpdate() {
    // Select first tab if current tab is no longer present
    if (this.props.groupedEvents.size !== 0 &&
        !this.props.groupedEvents.map(group => group.get('slug')).includes(this.props.activeGroup)) {
      this.props.setPageState({activeEventGroup: this.props.groupedEvents.getIn([0, 'slug'])})
    }
  }

  render() {
    console.log("Render GroupedEventTabs")
    if (this.props.activeGroup === null) {
      return null
    }
    return (
      <Tabs
        value={this.props.activeGroup}
        onChange={this.tabHandleChange}
        scrollable
        scrollButtons="auto"
        className='hide-scrollbar'
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
  activeGroup: PropTypes.string,
}

export default withStyles(styles)(GroupedEventTabs)
