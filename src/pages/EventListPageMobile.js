import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'

import TBAPageContainer from '../containers/TBAPageContainer'

const styles = theme => ({
})

class EventListPageMobile extends PureComponent {
  render() {
    console.log("Render EventListPageMobile")

    return (
      <TBAPageContainer
        documentTitle={this.props.documentTitle}
        title='Events'
        refreshFunction={this.props.refreshFunction}
        // filterFunction={this.filterFunction}
        // tabs={this.tabs.length !== 0 &&
        //   <Tabs
        //     value={this.props.pageState.get('tabIdx')}
        //     onChange={this.tabHandleChange}
        //     indicatorColor="white"
        //     scrollable
        //     scrollButtons="auto"
        //   >
        //     {this.tabs}
        //   </Tabs>
        // }
      >
        MOBILE!
      </TBAPageContainer>
    )
  }
}

EventListPageMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  groupedEvents: ImmutablePropTypes.list,
}

export default withStyles(styles)(EventListPageMobile)
