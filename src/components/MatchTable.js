import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';

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
    position: 'relative',
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
  rpDotA: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    height: '4px',
    width: '4px',
  },
  rpDotB: {
    position: 'absolute',
    top: '3px',
    left: '10px',
    height: '4px',
    width: '4px',
  },
});

class MatchTable extends PureComponent {
  renderRow(match) {
    const redScore = match.alliances.getIn(['red', 'score'])
    const blueScore = match.alliances.getIn(['blue', 'score'])
    const redWin = match.winning_alliance === 'red'
    const blueWin = match.winning_alliance === 'blue'
    const rpEarnedTextA = match.rpEarnedTextA()
    const rpEarnedTextB = match.rpEarnedTextB()
    return (
      <tr key={match.key} className={this.props.classes.tr}>
        <td className={this.props.classes.td}>
          <Link to={{pathname: `/match/${match.key}`, state: {modal: true}}}>{match.getDisplayName()}</Link>
        </td>
        {match.alliances.getIn(['red', 'team_keys']).map(teamKey => {
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
        {match.alliances.getIn(['blue', 'team_keys']).map(teamKey => {
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
        <td className={classNames({[this.props.classes.td]: true, [this.props.classes.redScore]: true, [this.props.classes.winner]: redWin})}>
          {match.rpEarnedA('red') && <Tooltip title={rpEarnedTextA} placement="top">
            <svg className={this.props.classes.rpDotA}>
              <circle cx="2" cy="2" r="2"/>
            </svg>
          </Tooltip>}
          {match.rpEarnedB('red') &&  <Tooltip title={rpEarnedTextB} placement="top">
            <svg className={this.props.classes.rpDotB}>
              <circle cx="2" cy="2" r="2"/>
            </svg>
          </Tooltip>}
          {redScore}
        </td>
        <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blueScore]: true, [this.props.classes.winner]: blueWin})}>
          {match.rpEarnedA('red') &&  <Tooltip title={rpEarnedTextA} placement="top">
            <svg className={this.props.classes.rpDotA}>
              <circle cx="2" cy="2" r="2"/>
            </svg>
          </Tooltip>}
         {match.rpEarnedB('red') &&  <Tooltip title={rpEarnedTextB} placement="top">
            <svg className={this.props.classes.rpDotB}>
              <circle cx="2" cy="2" r="2"/>
            </svg>
          </Tooltip>}
          {blueScore}
        </td>
      </tr>
    )
  }

  render() {
    console.log('Render MatchTable')

    if (this.props.matches === undefined) {
      return <CircularProgress color="accent" size={100} />
    } else if (this.props.matches.size === 0) {
      return <div>NO MATCHES</div>
    }

    const filteredMatches = this.props.matches.filter(match => this.props.compLevels.indexOf(match.get('comp_level')) !== -1)
    const qmMatches = filteredMatches.filter(match => match.get('comp_level') == 'qm')
    const efMatches = filteredMatches.filter(match => match.get('comp_level') == 'ef')
    const qfMatches = filteredMatches.filter(match => match.get('comp_level') == 'qf')
    const sfMatches = filteredMatches.filter(match => match.get('comp_level') == 'sf')
    const fMatches = filteredMatches.filter(match => match.get('comp_level') == 'f')

    return (
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
          {qmMatches.size > 0 &&
            <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
              <th className={this.props.classes.th} colSpan='9'>Qualifications</th>
            </tr>
          }
          {qmMatches.size > 0 && qmMatches.map(match => this.renderRow(match))}
          {efMatches.size > 0 &&
            <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
              <th className={this.props.classes.th} colSpan='9'>Octo-Finals</th>
            </tr>
          }
          {efMatches.size > 0 && efMatches.map(match => this.renderRow(match))}
          {qfMatches.size > 0 &&
            <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
              <th className={this.props.classes.th} colSpan='9'>Quarterfinals</th>
            </tr>
          }
          {qfMatches.size > 0 && qfMatches.map(match => this.renderRow(match))}
          {sfMatches.size > 0 &&
            <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
              <th className={this.props.classes.th} colSpan='9'>Semifinals</th>
            </tr>
          }
          {sfMatches.size > 0 && sfMatches.map(match => this.renderRow(match))}
          {fMatches.size > 0 &&
            <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
              <th className={this.props.classes.th} colSpan='9'>Finals</th>
            </tr>
          }
          {fMatches.size > 0 && fMatches.map(match => this.renderRow(match))}
        </tbody>
      </table>
    )
  }
}

export default withStyles(styles)(MatchTable);
