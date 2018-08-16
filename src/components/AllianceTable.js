import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'

import Skeleton from './Skeleton'

const styles = theme => ({
  tr: {
    height: 32,
  },
  medalIcon: {
    height: 18,
  },
})

class AllianceTable extends PureComponent {
  render() {
    console.log("Render AllianceTable")

    const { classes, eventKey, alliances } = this.props

    if (alliances === null) {
      return null
    }

    let teamsPerAlliance = 3  // Default to 3 when loading
    if (alliances) {
      teamsPerAlliance = alliances.getIn([0, 'picks']).size
    }

    const yearStr = eventKey.substr(0, 4)

    return (
      <React.Fragment>
        <h3>Alliances</h3>
        <Paper elevation={4}>
          <Table padding='dense'>
            <TableHead>
              <TableRow className={classes.tr}>
                <TableCell>Alliance</TableCell>
                <TableCell>Status</TableCell>
                {[...Array(teamsPerAlliance).keys()].map(i => {
                  if (i === 0) {
                    return <TableCell key={i} numeric>Captain</TableCell>
                  } else {
                    return <TableCell key={i} numeric>{`Pick ${i}`}</TableCell>
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {alliances ?
                alliances.map((a, i) => {
                  let status
                  if (a.getIn(['status', 'status']) === 'won') {
                    status = <img src='/medal-gold.png' className={classes.medalIcon}/>
                  } else if (a.getIn(['status', 'level']) === 'f') {
                    status = <img src='/medal-silver.png' className={classes.medalIcon}/>
                  } else {
                    status = a.getIn(['status', 'level']).toUpperCase()
                  }

                  return (
                    <TableRow key={i} className={classes.tr}>
                      <TableCell component="th" scope="row">
                        {a.get('name') ? a.get('name') : `Alliance ${i+1}`}
                      </TableCell>
                      <TableCell>
                        {status}
                      </TableCell>
                      {a.get('picks').map(teamKey => {
                        const teamNum = teamKey.substr(3)
                        let backupTeam = null
                        if (a.getIn(['backup', 'out']) === teamKey) {
                          const backupTeamNum = a.getIn(['backup', 'in']).substr(3)
                          backupTeam = <React.Fragment>
                            &nbsp;(<Link to={{pathname: `/team/${backupTeamNum}/${yearStr}`, hash: eventKey, state: {modal: true}}}>
                              <Tooltip title={`This team was called as a backup for Team ${teamNum}`} placement='top'>
                                <span>{backupTeamNum}</span>
                              </Tooltip>
                            </Link>)
                          </React.Fragment>
                        }
                        return (
                          <TableCell key={teamKey} numeric>
                            <Link to={{pathname: `/team/${teamNum}/${yearStr}`, hash: eventKey, state: {modal: true}}}>{teamNum}</Link>
                            {backupTeam}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })
                :
                [...Array(4).keys()].map(i => (
                  <TableRow key={i} className={classes.tr}>
                    <TableCell component="th" scope="row"><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    )
  }
}

AllianceTable.propTypes = {
  classes: PropTypes.object.isRequired,
  alliances: ImmutablePropTypes.list,
}

export default withStyles(styles)(AllianceTable)
