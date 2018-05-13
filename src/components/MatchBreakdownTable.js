import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import Icon from 'material-ui/Icon';


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

    const { match } = this.props

    if (match === undefined) {
      return <CircularProgress color="secondary" size={100} />
    }

    return (
      <table className={this.props.classes.table} border='1'>
        <tbody>
          <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>{this.renderTeams(match, 'red')}</td>
            <td className={this.props.classes.td}>Teams</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>{this.renderTeams(match, 'blue')}</td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>{match.getIn(['score_breakdown', 'red', 'autoMobilityPoints'])}</td>
            <td className={this.props.classes.td}>Auto Mobility</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>{match.getIn(['score_breakdown', 'blue', 'autoMobilityPoints'])}</td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>
              <Icon style={{fontSize: 14}}>keyboard_arrow_up</Icon> {match.getIn(['score_breakdown', 'red', 'autoFuelHigh'])} <Icon style={{fontSize: 14}}>keyboard_arrow_down</Icon> {match.getIn(['score_breakdown', 'red', 'autoFuelLow'])}
            </td>
            <td className={this.props.classes.td}>Auto Fuel</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>
              <Icon style={{fontSize: 14}}>keyboard_arrow_up</Icon> {match.getIn(['score_breakdown', 'blue', 'autoFuelHigh'])} <Icon style={{fontSize: 14}}>keyboard_arrow_down</Icon> {match.getIn(['score_breakdown', 'blue', 'autoFuelLow'])}
            </td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>{match.getIn(['score_breakdown', 'red', 'autoFuelPoints'])}</td>
            <td className={this.props.classes.td}>Auto Pressure Points</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>{match.getIn(['score_breakdown', 'blue', 'autoFuelPoints'])}</td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>
              {match.getIn(['score_breakdown', 'red', 'rotor1Auto']) && <Icon style={{fontSize: 14}}>check</Icon>}
              {match.getIn(['score_breakdown', 'red', 'rotor2Auto']) && <Icon style={{fontSize: 14}}>check</Icon>}
            </td>
            <td className={this.props.classes.td}>Auto Rotors</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>
              {match.getIn(['score_breakdown', 'blue', 'rotor1Auto']) && <Icon style={{fontSize: 14}}>check</Icon>}
              {match.getIn(['score_breakdown', 'blue', 'rotor2Auto']) && <Icon style={{fontSize: 14}}>check</Icon>}
            </td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>{match.getIn(['score_breakdown', 'red', 'autoRotorPoints'])}</td>
            <td className={this.props.classes.td}>Auto Rotor Points</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>{match.getIn(['score_breakdown', 'blue', 'autoRotorPoints'])}</td>
          </tr>
          <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
            <th className={classNames({[this.props.classes.th]: true, [this.props.classes.redScore]: true})}>{match.getIn(['score_breakdown', 'red', 'autoPoints'])}</th>
            <th className={this.props.classes.th}>Total Auto</th>
            <th className={classNames({[this.props.classes.th]: true, [this.props.classes.blueScore]: true})}>{match.getIn(['score_breakdown', 'blue', 'autoPoints'])}</th>
          </tr>

          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>
              <Icon style={{fontSize: 14}}>keyboard_arrow_up</Icon> {match.getIn(['score_breakdown', 'red', 'teleopFuelHigh'])} <Icon style={{fontSize: 14}}>keyboard_arrow_down</Icon> {match.getIn(['score_breakdown', 'red', 'teleopFuelLow'])}
            </td>
            <td className={this.props.classes.td}>Teleop Fuel</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>
              <Icon style={{fontSize: 14}}>keyboard_arrow_up</Icon> {match.getIn(['score_breakdown', 'blue', 'teleopFuelHigh'])} <Icon style={{fontSize: 14}}>keyboard_arrow_down</Icon> {match.getIn(['score_breakdown', 'blue', 'teleopFuelLow'])}
            </td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>{match.getIn(['score_breakdown', 'red', 'teleopFuelPoints'])}</td>
            <td className={this.props.classes.td}>Teleop Pressure Points</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>{match.getIn(['score_breakdown', 'blue', 'teleopFuelPoints'])}</td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>
              {match.getIn(['score_breakdown', 'red', 'rotor1Auto']) && <Icon style={{fontSize: 14}}>check_circle</Icon>}
              {match.getIn(['score_breakdown', 'red', 'rotor2Auto']) && <Icon style={{fontSize: 14}}>check_circle</Icon>}
              {(!match.getIn(['score_breakdown', 'red', 'rotor1Auto']) && match.getIn(['score_breakdown', 'red', 'rotor1Engaged'])) && <Icon style={{fontSize: 14}}>check</Icon>}
              {(!match.getIn(['score_breakdown', 'red', 'rotor2Auto']) && match.getIn(['score_breakdown', 'red', 'rotor2Engaged'])) && <Icon style={{fontSize: 14}}>check</Icon>}
              {match.getIn(['score_breakdown', 'red', 'rotor3Engaged']) && <Icon style={{fontSize: 14}}>check</Icon>}
              {match.getIn(['score_breakdown', 'red', 'rotor4Engaged']) && <Icon style={{fontSize: 14}}>check</Icon>}
            </td>
            <td className={this.props.classes.td}>Teleop Rotors</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>
              {match.getIn(['score_breakdown', 'blue', 'rotor1Auto']) && <Icon style={{fontSize: 14}}>check_circle</Icon>}
              {match.getIn(['score_breakdown', 'blue', 'rotor2Auto']) && <Icon style={{fontSize: 14}}>check_circle</Icon>}
              {(!match.getIn(['score_breakdown', 'blue', 'rotor1Auto']) && match.getIn(['score_breakdown', 'blue', 'rotor1Engaged'])) && <Icon style={{fontSize: 14}}>check</Icon>}
              {(!match.getIn(['score_breakdown', 'blue', 'rotor2Auto']) && match.getIn(['score_breakdown', 'blue', 'rotor2Engaged'])) && <Icon style={{fontSize: 14}}>check</Icon>}
              {match.getIn(['score_breakdown', 'blue', 'rotor3Engaged']) && <Icon style={{fontSize: 14}}>check</Icon>}
              {match.getIn(['score_breakdown', 'blue', 'rotor4Engaged']) && <Icon style={{fontSize: 14}}>check</Icon>}
            </td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>{match.getIn(['score_breakdown', 'red', 'teleopRotorPoints'])}</td>
            <td className={this.props.classes.td}>Teleop Rotor Points</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>{match.getIn(['score_breakdown', 'blue', 'teleopRotorPoints'])}</td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>{match.getIn(['score_breakdown', 'red', 'teleopTakeoffPoints'])}</td>
            <td className={this.props.classes.td}>Takeoff Points</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>{match.getIn(['score_breakdown', 'blue', 'teleopTakeoffPoints'])}</td>
          </tr>
          <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
            <th className={classNames({[this.props.classes.th]: true, [this.props.classes.redScore]: true})}>{match.getIn(['score_breakdown', 'red', 'teleopPoints'])}</th>
            <th className={this.props.classes.th}>Total Teleop</th>
            <th className={classNames({[this.props.classes.th]: true, [this.props.classes.blueScore]: true})}>{match.getIn(['score_breakdown', 'blue', 'teleopPoints'])}</th>
          </tr>

          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>
              {(match.getIn(['score_breakdown', 'red', 'kPaRankingPointAchieved']) || match.getIn(['score_breakdown', 'red', 'kPaBonusPoints']) > 0) ? <Icon style={{fontSize: 14}}>check</Icon> : <Icon style={{fontSize: 14}}>clear</Icon>}
              {match.getIn(['score_breakdown', 'red', 'kPaBonusPoints']) > 0 && `(+${match.getIn(['score_breakdown', 'red', 'kPaBonusPoints'])})`}
            </td>
            <td className={this.props.classes.td}>Pressure Reached</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>
              {(match.getIn(['score_breakdown', 'blue', 'kPaRankingPointAchieved']) || match.getIn(['score_breakdown', 'blue', 'kPaBonusPoints']) > 0) ? <Icon style={{fontSize: 14}}>check</Icon> : <Icon style={{fontSize: 14}}>clear</Icon>}
              {match.getIn(['score_breakdown', 'blue', 'kPaBonusPoints']) > 0 && `(+${match.getIn(['score_breakdown', 'blue', 'kPaBonusPoints'])})`}
            </td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>
              {(match.getIn(['score_breakdown', 'red', 'rotorRankingPointAchieved']) || match.getIn(['score_breakdown', 'red', 'rotorBonusPoints']) > 0) ? <Icon style={{fontSize: 14}}>check</Icon> : <Icon style={{fontSize: 14}}>clear</Icon>}
              {match.getIn(['score_breakdown', 'red', 'rotorBonusPoints']) > 0 && `(+${match.getIn(['score_breakdown', 'red', 'rotorBonusPoints'])})`}
            </td>
            <td className={this.props.classes.td}>All Rotors Engaged</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>
              {(match.getIn(['score_breakdown', 'blue', 'rotorRankingPointAchieved']) || match.getIn(['score_breakdown', 'blue', 'rotorBonusPoints']) > 0) ? <Icon style={{fontSize: 14}}>check</Icon> : <Icon style={{fontSize: 14}}>clear</Icon>}
              {match.getIn(['score_breakdown', 'blue', 'rotorBonusPoints']) > 0 && `(+${match.getIn(['score_breakdown', 'blue', 'rotorBonusPoints'])})`}
            </td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>+{match.getIn(['score_breakdown', 'red', 'foulPoints'])}</td>
            <td className={this.props.classes.td}>Fouls</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>+{match.getIn(['score_breakdown', 'blue', 'foulPoints'])}</td>
          </tr>
          <tr className={this.props.classes.tr}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.red]: true})}>{match.getIn(['score_breakdown', 'red', 'adjustPoints'])}</td>
            <td className={this.props.classes.td}>Adjustments</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blue]: true})}>{match.getIn(['score_breakdown', 'blue', 'adjustPoints'])}</td>
          </tr>
          <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
            <th className={classNames({[this.props.classes.th]: true, [this.props.classes.redScore]: true})}>{match.getIn(['score_breakdown', 'red', 'totalPoints'])}</th>
            <th className={this.props.classes.th}>Total Score</th>
            <th className={classNames({[this.props.classes.th]: true, [this.props.classes.blueScore]: true})}>{match.getIn(['score_breakdown', 'blue', 'totalPoints'])}</th>
          </tr>
          {match.get('comp_level') === 'qm' &&
          <tr className={classNames({[this.props.classes.tr]: true, [this.props.classes.key]: true})}>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.redScore]: true})}>+{match.getIn(['score_breakdown', 'red', 'tba_rpEarned'])}</td>
            <td className={this.props.classes.td}>Ranking Points</td>
            <td className={classNames({[this.props.classes.td]: true, [this.props.classes.blueScore]: true})}>+{match.getIn(['score_breakdown', 'blue', 'tba_rpEarned'])}</td>
          </tr>}
        </tbody>
      </table>
    )
  }
}

export default withStyles(styles)(MatchBreakdownTable);
