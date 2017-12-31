import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'

import TBANavDrawerContentContainer from '../containers/TBANavDrawerContentContainer'

const styles = theme => ({
  root:  {
    zIndex: 1,
    position: 'absolute',
  }
})

class TBANavDrawer extends PureComponent {
  render() {
    console.log("Render TBANavDrawer")

    return (
      <Drawer
        className={this.props.classes.root}
        type="permanent"
        open={this.props.mobileDrawerOpen}
        onClose={this.props.closeMobileDrawer}
      >
        <TBANavDrawerContentContainer />
      </Drawer>
    )
  }
}

export default withStyles(styles)(TBANavDrawer);
