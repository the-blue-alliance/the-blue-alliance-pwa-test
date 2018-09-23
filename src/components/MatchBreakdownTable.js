import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ClearIcon from '@material-ui/icons/Clear'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'


const styles = theme => ({
  table: {
    padding: '5px 0',
    margin: 0,
    width: '100%',
    marginLeft: 'auto',
    backgroundColor: '#ffffff',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
    fontSize: '14px',
    '& tr': {
      padding: '5px 0',
      border: '1px solid #ddd',
    },
    '& th': {
      fontWeight: 'bold',
      textAlign: 'center',
      verticalAlign: 'middle !important',
      padding: '5px',
    },
    '& td': {
      position: 'relative',
      textAlign: 'center',
      verticalAlign: 'middle !important',
      padding: '5px',
    },
  },
  key: {
    backgroundColor: '#f0f0f0',
  },
  icon: {
    top: '0.125em',
    position: 'relative',
    fontSize: '14px',
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
});

class MatchBreakdownTable extends PureComponent {
  renderTeams(match, color) {
    const teamKeys = match.getIn(['alliances', color, 'team_keys'])
    return teamKeys.map(teamKey => {
      const teamNum = teamKey.substr(3)
      return (
        <div key={teamKey}>
          <Link to={{pathname: `/team/${teamNum}/${match.getYear()}`, hash: match.event_key, state: {modal: true}}}>{teamNum}</Link>
        </div>
      )
    })
  }

  render() {
    console.log('Render MatchBreakdownTable')

    const { classes, match } = this.props

    if (match === undefined) {
      return <CircularProgress color="secondary" size={100} />
    }

    return (
      <table className={classes.table} border='1'>
        <tbody>
          <tr className={classes.key}>
            <td className={classes.red}>{this.renderTeams(match, 'red')}</td>
            <td>Teams</td>
            <td className={classes.blue}>{this.renderTeams(match, 'blue')}</td>
          </tr>
          <tr>
            <td className={classes.red}>{match.getIn(['score_breakdown', 'red', 'autoMobilityPoints'])}</td>
            <td>Auto Mobility</td>
            <td className={classes.blue}>{match.getIn(['score_breakdown', 'blue', 'autoMobilityPoints'])}</td>
          </tr>
          <tr>
            <td className={classes.red}>
              <KeyboardArrowUpIcon className={classes.icon}/> {match.getIn(['score_breakdown', 'red', 'autoFuelHigh'])} <KeyboardArrowDownIcon className={classes.icon}/> {match.getIn(['score_breakdown', 'red', 'autoFuelLow'])}
            </td>
            <td>Auto Fuel</td>
            <td className={classes.blue}>
              <KeyboardArrowUpIcon className={classes.icon}/> {match.getIn(['score_breakdown', 'blue', 'autoFuelHigh'])} <KeyboardArrowDownIcon className={classes.icon}/> {match.getIn(['score_breakdown', 'blue', 'autoFuelLow'])}
            </td>
          </tr>
          <tr>
            <td className={classes.red}>{match.getIn(['score_breakdown', 'red', 'autoFuelPoints'])}</td>
            <td>Auto Pressure Points</td>
            <td className={classes.blue}>{match.getIn(['score_breakdown', 'blue', 'autoFuelPoints'])}</td>
          </tr>
          <tr>
            <td className={classes.red}>
              {match.getIn(['score_breakdown', 'red', 'rotor1Auto']) && <CheckIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'red', 'rotor2Auto']) && <CheckIcon className={classes.icon}/>}
            </td>
            <td>Auto Rotors</td>
            <td className={classes.blue}>
              {match.getIn(['score_breakdown', 'blue', 'rotor1Auto']) && <CheckIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'blue', 'rotor2Auto']) && <CheckIcon className={classes.icon}/>}
            </td>
          </tr>
          <tr>
            <td className={classes.red}>{match.getIn(['score_breakdown', 'red', 'autoRotorPoints'])}</td>
            <td>Auto Rotor Points</td>
            <td className={classes.blue}>{match.getIn(['score_breakdown', 'blue', 'autoRotorPoints'])}</td>
          </tr>
          <tr className={classes.key}>
            <th className={classes.redScore}>{match.getIn(['score_breakdown', 'red', 'autoPoints'])}</th>
            <th>Total Auto</th>
            <th className={classes.blueScore}>{match.getIn(['score_breakdown', 'blue', 'autoPoints'])}</th>
          </tr>

          <tr>
            <td className={classes.red}>
              <KeyboardArrowUpIcon className={classes.icon}/> {match.getIn(['score_breakdown', 'red', 'teleopFuelHigh'])} <KeyboardArrowDownIcon className={classes.icon}/> {match.getIn(['score_breakdown', 'red', 'teleopFuelLow'])}
            </td>
            <td>Teleop Fuel</td>
            <td className={classes.blue}>
              <KeyboardArrowUpIcon className={classes.icon}/> {match.getIn(['score_breakdown', 'blue', 'teleopFuelHigh'])} <KeyboardArrowDownIcon className={classes.icon}/> {match.getIn(['score_breakdown', 'blue', 'teleopFuelLow'])}
            </td>
          </tr>
          <tr>
            <td className={classes.red}>{match.getIn(['score_breakdown', 'red', 'teleopFuelPoints'])}</td>
            <td>Teleop Pressure Points</td>
            <td className={classes.blue}>{match.getIn(['score_breakdown', 'blue', 'teleopFuelPoints'])}</td>
          </tr>
          <tr>
            <td className={classes.red}>
              {match.getIn(['score_breakdown', 'red', 'rotor1Auto']) && <CheckCircleIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'red', 'rotor2Auto']) && <CheckCircleIcon className={classes.icon}/>}
              {(!match.getIn(['score_breakdown', 'red', 'rotor1Auto']) && match.getIn(['score_breakdown', 'red', 'rotor1Engaged'])) && <CheckIcon className={classes.icon}/>}
              {(!match.getIn(['score_breakdown', 'red', 'rotor2Auto']) && match.getIn(['score_breakdown', 'red', 'rotor2Engaged'])) && <CheckIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'red', 'rotor3Engaged']) && <CheckIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'red', 'rotor4Engaged']) && <CheckIcon className={classes.icon}/>}
            </td>
            <td>Teleop Rotors</td>
            <td className={classes.blue}>
              {match.getIn(['score_breakdown', 'blue', 'rotor1Auto']) && <CheckCircleIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'blue', 'rotor2Auto']) && <CheckCircleIcon className={classes.icon}/>}
              {(!match.getIn(['score_breakdown', 'blue', 'rotor1Auto']) && match.getIn(['score_breakdown', 'blue', 'rotor1Engaged'])) && <CheckIcon className={classes.icon}/>}
              {(!match.getIn(['score_breakdown', 'blue', 'rotor2Auto']) && match.getIn(['score_breakdown', 'blue', 'rotor2Engaged'])) && <CheckIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'blue', 'rotor3Engaged']) && <CheckIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'blue', 'rotor4Engaged']) && <CheckIcon className={classes.icon}/>}
            </td>
          </tr>
          <tr>
            <td className={classes.red}>{match.getIn(['score_breakdown', 'red', 'teleopRotorPoints'])}</td>
            <td>Teleop Rotor Points</td>
            <td className={classes.blue}>{match.getIn(['score_breakdown', 'blue', 'teleopRotorPoints'])}</td>
          </tr>
          <tr>
            <td className={classes.red}>{match.getIn(['score_breakdown', 'red', 'teleopTakeoffPoints'])}</td>
            <td>Takeoff Points</td>
            <td className={classes.blue}>{match.getIn(['score_breakdown', 'blue', 'teleopTakeoffPoints'])}</td>
          </tr>
          <tr className={classes.key}>
            <th className={classes.redScore}>{match.getIn(['score_breakdown', 'red', 'teleopPoints'])}</th>
            <th>Total Teleop</th>
            <th className={classes.blueScore}>{match.getIn(['score_breakdown', 'blue', 'teleopPoints'])}</th>
          </tr>

          <tr>
            <td className={classes.red}>
              {(match.getIn(['score_breakdown', 'red', 'kPaRankingPointAchieved']) || match.getIn(['score_breakdown', 'red', 'kPaBonusPoints']) > 0) ? <CheckIcon className={classes.icon}/> : <ClearIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'red', 'kPaBonusPoints']) > 0 && `(+${match.getIn(['score_breakdown', 'red', 'kPaBonusPoints'])})`}
            </td>
            <td>Pressure Reached</td>
            <td className={classes.blue}>
              {(match.getIn(['score_breakdown', 'blue', 'kPaRankingPointAchieved']) || match.getIn(['score_breakdown', 'blue', 'kPaBonusPoints']) > 0) ? <CheckIcon className={classes.icon}/> : <ClearIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'blue', 'kPaBonusPoints']) > 0 && `(+${match.getIn(['score_breakdown', 'blue', 'kPaBonusPoints'])})`}
            </td>
          </tr>
          <tr>
            <td className={classes.red}>
              {(match.getIn(['score_breakdown', 'red', 'rotorRankingPointAchieved']) || match.getIn(['score_breakdown', 'red', 'rotorBonusPoints']) > 0) ? <CheckIcon className={classes.icon}/> : <ClearIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'red', 'rotorBonusPoints']) > 0 && `(+${match.getIn(['score_breakdown', 'red', 'rotorBonusPoints'])})`}
            </td>
            <td>All Rotors Engaged</td>
            <td className={classes.blue}>
              {(match.getIn(['score_breakdown', 'blue', 'rotorRankingPointAchieved']) || match.getIn(['score_breakdown', 'blue', 'rotorBonusPoints']) > 0) ? <CheckIcon className={classes.icon}/> : <ClearIcon className={classes.icon}/>}
              {match.getIn(['score_breakdown', 'blue', 'rotorBonusPoints']) > 0 && `(+${match.getIn(['score_breakdown', 'blue', 'rotorBonusPoints'])})`}
            </td>
          </tr>
          <tr>
            <td className={classes.red}>+{match.getIn(['score_breakdown', 'red', 'foulPoints'])}</td>
            <td>Fouls</td>
            <td className={classes.blue}>+{match.getIn(['score_breakdown', 'blue', 'foulPoints'])}</td>
          </tr>
          <tr>
            <td className={classes.red}>{match.getIn(['score_breakdown', 'red', 'adjustPoints'])}</td>
            <td>Adjustments</td>
            <td className={classes.blue}>{match.getIn(['score_breakdown', 'blue', 'adjustPoints'])}</td>
          </tr>
          <tr className={classes.key}>
            <th className={classes.redScore}>{match.getIn(['score_breakdown', 'red', 'totalPoints'])}</th>
            <th>Total Score</th>
            <th className={classes.blueScore}>{match.getIn(['score_breakdown', 'blue', 'totalPoints'])}</th>
          </tr>
          {match.get('comp_level') === 'qm' &&
          <tr className={classes.key}>
            <td className={classes.redScore}>+{match.getIn(['score_breakdown', 'red', 'tba_rpEarned'])}</td>
            <td>Ranking Points</td>
            <td className={classes.blueScore}>+{match.getIn(['score_breakdown', 'blue', 'tba_rpEarned'])}</td>
          </tr>}
        </tbody>
      </table>
    )
  }
}

export default withStyles(styles)(MatchBreakdownTable);
