import React, { PureComponent } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

class TeamAtEventDialog extends PureComponent {
  handleClose = (e) => {
    e.stopPropagation()
    this.props.handleClose()
  }

  render() {
    console.log("Render Team@Event Dialog")

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
      >
        <DialogTitle>Team@Event {this.props.match.params.teamNumber}@{this.props.location.hash}</DialogTitle>
        <div>
          Details go here!
        </div>
      </Dialog>
    )
  }
}

export default TeamAtEventDialog
