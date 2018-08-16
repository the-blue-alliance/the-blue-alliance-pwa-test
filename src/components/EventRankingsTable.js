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
import { Link } from 'react-router-dom'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  tr: {
    height: 32,
  },
})

class EventRankingsTable extends PureComponent {
  render() {
    console.log("Render EventRankingsTable")

    const { classes, eventKey, rankings } = this.props
    console.log(rankings && rankings.toJS())

    if (rankings === null) {
      return null
    }

    if (!rankings) {
      return null
    }

    const yearStr = eventKey.substr(0, 4)

    return (
      <React.Fragment>
        <Paper elevation={4} className={classes.paper}>
          <Table padding='dense'>
            <TableHead>
              <TableRow className={classes.tr}>
                <TableCell numeric>Rank</TableCell>
                <TableCell numeric>Team</TableCell>
                {rankings.get('sort_order_info').map((so, i) =>
                  <TableCell key={i} numeric>{so.get('name')}</TableCell>
                )}
                {rankings.getIn(['rankings', 0, 'record']) && <TableCell numeric><nobr>W-L-T</nobr></TableCell>}
                <TableCell numeric>DQ</TableCell>
                <TableCell numeric>Played</TableCell>
                {rankings.get('extra_stats_info').map((es, i) =>
                  <TableCell key={i} numeric>{es.get('name')}*</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rankings.get('rankings').map((ranking, i) => {
                const teamNumber = ranking.get('team_key').substr(3)
                return (
                  <TableRow key={i} className={classes.tr}>
                    <TableCell numeric>{ranking.get('rank')}</TableCell>
                    <TableCell numeric>
                      <Link to={{pathname: `/team/${teamNumber}/${yearStr}`, hash: eventKey, state: {modal: true}}}>{teamNumber}</Link>
                    </TableCell>
                    {rankings.get('sort_order_info').map((so, i) =>
                      <TableCell numeric key={i}>{ranking.getIn(['sort_orders', i]).toFixed(so.get('precision'))}</TableCell>
                    )}
                    {rankings.getIn(['rankings', i, 'record']) &&
                      <TableCell numeric>{`${ranking.getIn(['record', 'wins'])}-${ranking.getIn(['record', 'losses'])}-${ranking.getIn(['record', 'ties'])}`}</TableCell>
                    }
                    <TableCell numeric>{ranking.get('dq')}</TableCell>
                    <TableCell numeric>{ranking.get('matches_played')}</TableCell>
                    {rankings.get('extra_stats_info').map((es, i) =>
                      <TableCell numeric key={i}>{ranking.getIn(['extra_stats', i]).toFixed(es.get('precision'))}</TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <small>*This column is calculated for your convenience by The Blue Alliance using data provided by <i>FIRST</i> and is not official.</small>
      </React.Fragment>
    )
  }
}

EventRankingsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  alliances: ImmutablePropTypes.list,
}

export default withStyles(styles)(EventRankingsTable)
