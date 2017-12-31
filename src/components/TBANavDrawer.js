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
        type="permanent"
        className={this.props.classes.root}
      >
        <TBANavDrawerContentContainer />
      </Drawer>
    )
  }
}

export default withStyles(styles)(TBANavDrawer);
