import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'

import TBASideNavContentContainer from '../containers/TBASideNavContentContainer'

const styles = theme => ({
  root:  {
    zIndex: 1,
    position: 'absolute',
  }
})

class TBASideNav extends PureComponent {
  render() {
    console.log("Render TBASideNav")

    return (
      <Drawer
        type="permanent"
        className={this.props.classes.root}
      >
        <TBASideNavContentContainer />
      </Drawer>
    )
  }
}

export default withStyles(styles)(TBASideNav);
