import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

const styles = theme => ({
  table: {
    padding: '5px 0',
    margin: '0 0 1em 0',
    width: '100%',
    marginLeft: 'auto',
    backgroundColor: '#ffffff',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  key: {
    backgroundColor: '#f0f0f0',
  },
  tr: {
    padding: '5px 0',
    border: '1px solid #ddd',
  },
  th: {
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle !important',
    padding: '5px',
  },
  td: {
    textAlign: 'center',
    verticalAlign: 'middle !important',
    padding: '5px',
  },
  red: {
    backgroundColor: '#ffeeee',
  },
  blue: {
    backgroundColor: '#eeeeff',
  },
  redScore: {
    backgroundColor: '#ffdddd',
  },
  blueScore: {
    backgroundColor: '#ddddff',
  },
  winner: {
    fontWeight: 'bold',
  },
});

class MatchTable extends PureComponent {
  render() {
    console.log('Render MatchTable');

    return (
      <Paper>
        <table className={this.props.classes.table} border='1'>
          <thead className={this.props.classes.thead}>
            <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
              <th className={this.props.classes.th}>Match</th>
              <th className={this.props.classes.th} colSpan='3'>Red Alliance</th>
              <th className={this.props.classes.th} colSpan='3'>Blue Alliance</th>
              <th className={this.props.classes.th} colSpan='2'>Scores</th>
            </tr>
          </thead>
          <tbody>
            {this.props.matches.map((match, i) => {
              const redScore = match.alliances.red.score
              const blueScore = match.alliances.blue.score
              const redWin = match.winning_alliance === 'red'
              const blueWin = match.winning_alliance === 'blue'
              return (
                <tr key={i} className={this.props.classes.tr}>
                  <td className={this.props.classes.td}>
                    <Link to={{pathname: `/match/${match.key}`, state: {modal: true}}}>{match.getDisplayName()}</Link>
                  </td>
                  {match.alliances.red.team_keys.map(teamKey => {
                    const teamNum = teamKey.substr(3)
                    return (
                      <td
                        key={teamKey}
                        className={classNames({
                            [this.props.classes.td]: true,
                            [this.props.classes.red]: true,
                            [this.props.classes.winner]: redWin
                        })}
                      >
                        <Link to={`/team/${teamNum}`}>{teamNum}</Link>
                      </td>
                    )
                  })}
                  {match.alliances.blue.team_keys.map(teamKey => {
                    const teamNum = teamKey.substr(3)
                    return (
                      <td
                        key={teamKey}
                        className={classNames({
                            [this.props.classes.td]: true,
                            [this.props.classes.blue]: true,
                            [this.props.classes.winner]: blueWin
                        })}
                      >
                        <Link to={`/team/${teamNum}`}>{teamNum}</Link>
                      </td>
                    )
                  })}
                  <td className={classNames({[this.props.classes.td]: true, [this.props.classes.redScore]: true, [this.props.classes.winner]: redWin})}>{redScore}</td>
                  <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blueScore]: true, [this.props.classes.winner]: blueWin})}>{blueScore}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Paper>
    )
  }
}

export default withStyles(styles)(MatchTable);
