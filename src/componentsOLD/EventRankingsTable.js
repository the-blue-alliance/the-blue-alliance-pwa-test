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
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'

function getSorting(order, orderBy) {
  return (a, b) => {
    if (orderBy.startsWith('so_')) {
      const i = parseInt(orderBy.substr(3), 10)
      a = a.getIn(['sort_orders', i])
      b = b.getIn(['sort_orders', i])
    } else if (orderBy.startsWith('es_')) {
      const i = parseInt(orderBy.substr(3), 10)
      a = a.getIn(['extra_stats', i])
      b = b.getIn(['extra_stats', i])
    } else if (orderBy === 'team_key') {
      a = parseInt(a.get('team_key').substr(3), 10)
      b = parseInt(b.get('team_key').substr(3), 10)
    } else if (orderBy === 'record') {
      a = a.getIn(['record', 'wins']) + 0.5 * a.getIn(['record', 'ties'])
      b = b.getIn(['record', 'wins']) + 0.5 * b.getIn(['record', 'ties'])
    } else {
      a = a.get(orderBy)
      b = b.get(orderBy)
    }

    if (a < b) {
      return order === 'desc' ? 1 : -1
    } else if (a > b) {
      return order === 'desc' ? -1 : 1
    } else {
      return 0
    }
  }
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    overflowX: 'auto',
  },
  tr: {
    height: 32,
  },
  th: {
    padding: theme.spacing.unit,
  },
  td: {
    padding: theme.spacing.unit,
  },
})

class EventRankingsTable extends PureComponent {
  state = {
    order: 'asc',
    orderBy: 'rank',
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    const flip = orderBy === 'rank' || orderBy === 'team_key'
    const defaultState = flip ? 'asc' : 'desc'
    const altState = flip ? 'desc' : 'asc'

    let order = defaultState
    if (this.state.orderBy === property && this.state.order === defaultState) {
      order = altState
    }

    this.setState({ order, orderBy })
  }

  createSortHandler = property => event => {
    this.handleRequestSort(event, property)
  }

  render() {
    console.log("Render EventRankingsTable")

    const { classes, eventKey, rankings } = this.props
    const { order, orderBy } = this.state

    if (rankings === null) {
      return null
    }

    if (!rankings) {
      return null
    }

    const yearStr = eventKey.substr(0, 4)

    const columns = [{key: 'rank', label: 'Rank'}, {key: 'team_key', label: 'Team'}]
    rankings.get('sort_order_info').forEach((so, i) => columns.push({key: `so_${i}`, label: so.get('name')}))
    if (rankings.getIn(['rankings', 0, 'record'])) {
      columns.push({key: 'record', label: <nobr>W-L-T</nobr>})
    }
    columns.push({key: 'dq', label: 'DQ'})
    columns.push({key: 'played', label: 'Played'})
    rankings.get('extra_stats_info').forEach((es, i) => columns.push({key: `es_${i}`, label: `${es.get('name')}*`}))

    return (
      <React.Fragment>
        <Paper elevation={4} className={classes.paper}>
          <Table padding='dense'>
            <TableHead>
              <TableRow className={classes.tr}>
                {columns.map(col => {
                  return (
                    <TableCell
                      key={col.key}
                      numeric
                      sortDirection={orderBy === col.key ? order : false}
                      className={classes.th}
                    >
                      <Tooltip
                        title='Sort'
                        placement='bottom-end'
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === col.key}
                          direction={order}
                          onClick={this.createSortHandler(col.key)}
                        >
                          {col.label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  )
                }, this)}
              </TableRow>
            </TableHead>
            <TableBody>
              {rankings.get('rankings').sort(getSorting(order, orderBy)).map((ranking, i) => {
                const teamNumber = ranking.get('team_key').substr(3)
                return (
                  <TableRow key={i} className={classes.tr}>
                    <TableCell className={classes.td} numeric>{ranking.get('rank')}</TableCell>
                    <TableCell className={classes.td} numeric>
                      <Link to={{pathname: `/team/${teamNumber}/${yearStr}`, hash: eventKey, state: {modal: true}}}>{teamNumber}</Link>
                    </TableCell>
                    {rankings.get('sort_order_info').map((so, i) =>
                      <TableCell className={classes.td} numeric key={i}>{ranking.getIn(['sort_orders', i]).toFixed(so.get('precision'))}</TableCell>
                    )}
                    {rankings.getIn(['rankings', i, 'record']) &&
                      <TableCell className={classes.td} numeric>{`${ranking.getIn(['record', 'wins'])}-${ranking.getIn(['record', 'losses'])}-${ranking.getIn(['record', 'ties'])}`}</TableCell>
                    }
                    <TableCell className={classes.td} numeric>{ranking.get('dq')}</TableCell>
                    <TableCell className={classes.td} numeric>{ranking.get('matches_played')}</TableCell>
                    {rankings.get('extra_stats_info').map((es, i) =>
                      <TableCell className={classes.td} numeric key={i}>{ranking.getIn(['extra_stats', i]).toFixed(es.get('precision'))}</TableCell>
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
