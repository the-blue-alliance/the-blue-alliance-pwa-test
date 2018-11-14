import { fromJS } from 'immutable';
import Match from '../database/Match';

export const match = new Match(fromJS(
  {
    "actual_time": 1491090895,
    "alliances": {
      "blue": {
        "dq_team_keys": [],
        "score": 285,
        "surrogate_team_keys": [],
        "team_keys": [
          "frc8",
          "frc2473",
          "frc5677"
        ]
      },
      "red": {
        "dq_team_keys": [],
        "score": 522,
        "surrogate_team_keys": [],
        "team_keys": [
          "frc4990",
          "frc254",
          "frc604"
        ]
      }
    },
    "comp_level": "f",
    "event_key": "2017casj",
    "key": "2017casj_f1m2",
    "match_number": 2,
    "post_result_time": 1491091056,
    "predicted_time": 1491090900,
    "score_breakdown": {
      "blue": {
        "adjustPoints": 0,
        "autoFuelHigh": 0,
        "autoFuelLow": 0,
        "autoFuelPoints": 0,
        "autoMobilityPoints": 15,
        "autoPoints": 15,
        "autoRotorPoints": 0,
        "foulCount": 1,
        "foulPoints": 0,
        "kPaBonusPoints": 0,
        "kPaRankingPointAchieved": false,
        "robot1Auto": "Mobility",
        "robot2Auto": "Mobility",
        "robot3Auto": "Mobility",
        "rotor1Auto": false,
        "rotor1Engaged": true,
        "rotor2Auto": false,
        "rotor2Engaged": true,
        "rotor3Engaged": true,
        "rotor4Engaged": false,
        "rotorBonusPoints": 0,
        "rotorRankingPointAchieved": false,
        "tba_rpEarned": null,
        "techFoulCount": 0,
        "teleopFuelHigh": 0,
        "teleopFuelLow": 0,
        "teleopFuelPoints": 0,
        "teleopPoints": 270,
        "teleopRotorPoints": 120,
        "teleopTakeoffPoints": 150,
        "totalPoints": 285,
        "touchpadFar": "ReadyForTakeoff",
        "touchpadMiddle": "ReadyForTakeoff",
        "touchpadNear": "ReadyForTakeoff"
      },
      "red": {
        "adjustPoints": 0,
        "autoFuelHigh": 31,
        "autoFuelLow": 0,
        "autoFuelPoints": 31,
        "autoMobilityPoints": 15,
        "autoPoints": 106,
        "autoRotorPoints": 60,
        "foulCount": 0,
        "foulPoints": 5,
        "kPaBonusPoints": 20,
        "kPaRankingPointAchieved": false,
        "robot1Auto": "Mobility",
        "robot2Auto": "Mobility",
        "robot3Auto": "Mobility",
        "rotor1Auto": true,
        "rotor1Engaged": true,
        "rotor2Auto": false,
        "rotor2Engaged": true,
        "rotor3Engaged": true,
        "rotor4Engaged": true,
        "rotorBonusPoints": 100,
        "rotorRankingPointAchieved": false,
        "tba_rpEarned": null,
        "techFoulCount": 0,
        "teleopFuelHigh": 64,
        "teleopFuelLow": 0,
        "teleopFuelPoints": 21,
        "teleopPoints": 411,
        "teleopRotorPoints": 120,
        "teleopTakeoffPoints": 150,
        "totalPoints": 522,
        "touchpadFar": "ReadyForTakeoff",
        "touchpadMiddle": "ReadyForTakeoff",
        "touchpadNear": "ReadyForTakeoff"
      }
    },
    "set_number": 1,
    "time": 1491091800,
    "videos": [
      {
        "key": "O_85VsHz2YM",
        "type": "youtube"
      },
      {
        "key": "5BpOX_5ayuM",
        "type": "youtube"
      },
      {
        "key": "IL9JE9hn7xE",
        "type": "youtube"
      }
    ],
    "winning_alliance": "red"
  }
));
