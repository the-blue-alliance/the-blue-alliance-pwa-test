import React, { PureComponent } from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import MatchTable from './MatchTable'

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
        <DialogTitle>Team {this.props.team.get('team_number')} - {this.props.team.get('nickname')}</DialogTitle>
        <DialogContent>
          <MatchTable matches={this.props.matches} />
        </DialogContent>
      </Dialog>
    )
  }
}

export default TeamAtEventDialog
