import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

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
  th: {
    padding: theme.spacing.unit,
  },
  td: {
    padding: theme.spacing.unit,
  },
  medalIcon: {
    height: 18,
  },
})

class EventAllianceTable extends PureComponent {
  render() {
    console.log("Render EventAllianceTable")

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
      <Table padding='dense'>
        <TableHead>
          <TableRow className={classes.tr}>
            <TableCell className={classes.th}>Alliance</TableCell>
            <TableCell className={classes.th}>Status</TableCell>
            {[...Array(teamsPerAlliance).keys()].map(i => {
              if (i === 0) {
                return <TableCell key={i} className={classes.th} numeric>Captain</TableCell>
              } else {
                return <TableCell key={i} className={classes.th} numeric>{`Pick ${i}`}</TableCell>
              }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {alliances ?
            alliances.map((a, i) => {
              let status
              if (a.getIn(['status', 'status']) === 'won') {
                status = <img src='/medal-gold.png' className={classes.medalIcon} alt='Gold medal'/>
              } else if (a.getIn(['status', 'level']) === 'f') {
                status = <img src='/medal-silver.png' className={classes.medalIcon} alt='Silver medal'/>
              } else {
                status = a.getIn(['status', 'level']).toUpperCase()
              }

              return (
                <TableRow key={i} className={classes.tr}>
                  <TableCell component="th" scope="row" className={classes.td}>
                    {a.get('name') ? a.get('name') : `Alliance ${i+1}`}
                  </TableCell>
                  <TableCell className={classes.td}>
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
                      <TableCell key={teamKey} className={classes.td} numeric>
                        <Link to={{pathname: `/team/${teamNum}/${yearStr}`, hash: eventKey, state: {modal: true}}}>{teamNum}</Link>
                        {backupTeam}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
            :
            [...Array(8).keys()].map(i => (
              <TableRow key={i} className={classes.tr}>
                <TableCell component="th" scope="row" className={classes.td}><Skeleton /></TableCell>
                <TableCell className={classes.td}><Skeleton /></TableCell>
                <TableCell className={classes.td}><Skeleton /></TableCell>
                <TableCell className={classes.td}><Skeleton /></TableCell>
                <TableCell className={classes.td}><Skeleton /></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }
}

EventAllianceTable.propTypes = {
  classes: PropTypes.object.isRequired,
  alliances: ImmutablePropTypes.list,
}

export default withStyles(styles)(EventAllianceTable)
