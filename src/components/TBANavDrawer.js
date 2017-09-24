import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';

import TBANavDrawerContentContainer from '../containers/TBANavDrawerContentContainer'

const styles = theme => ({
})

class TBANavDrawer extends PureComponent {
  render() {
    console.log("Render TBANavDrawer")

    return (
      <div className={this.props.classes.drawer}>
        <Drawer
          open={this.props.mobileDrawerOpen}
          onRequestClose={this.props.closeMobileDrawer}
        >
          <TBANavDrawerContentContainer />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(TBANavDrawer);
