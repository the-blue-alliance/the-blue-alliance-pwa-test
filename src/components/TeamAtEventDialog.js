import React, { PureComponent } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

class TeamAtEventDialog extends PureComponent {
  handleRequestClose = (e) => {
    e.stopPropagation()
    this.props.history.goBack()
  }

  render() {
    console.log("Render Team@Event Dialog")

    return (
      <Dialog
        open={true}
        onRequestClose={this.handleRequestClose}
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
