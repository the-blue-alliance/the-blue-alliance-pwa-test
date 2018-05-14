import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import { ListItem, ListItemText, ListSubheader } from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';


const styles = {
  subHeader: {
    backgroundColor: indigo[500],
  },
  subHeaderText: {
    color: '#fff',
  },
}

class EventListItem extends PureComponent {
  render() {
    return (
      <LinkContainer to={`/event/${this.props.event.get('key')}`}>
        <ListItem button divider disableRipple>
          <ListItemText
            disableTypography
            style={{
              padding: 0,
            }}
            primary={
              this.props.event.get('short_name')
            }
            secondary={
              <Typography>
                <span style={{
                  float: 'left',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: 'calc(100% - 170px)',
                }}>
                  {this.props.event.getCityStateCountry()}
                </span>
                <span style={{
                  float: 'right',
                  width: 150,
                  textAlign: 'right',
                }}>
                  {this.props.event.getDateString()}
                </span>
              </Typography>

            }
          />
        </ListItem>
      </LinkContainer>
    )
  }
}

class EventsList extends PureComponent {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const classes = this.props.classes
    const item = this.listItems[index]
    if (item.type === 'label') {
      return (
        <div key={key} style={style}>
          <ListSubheader className={classes.subHeader}>
            <ListItemText primary={item.value} classes={{primary: classes.subHeaderText}}/>
          </ListSubheader>
        </div>
      )
    } else {
      return (
        <div key={key} style={style}>
          <EventListItem event={item.value}/>
        </div>
      )
    }
  }

  render() {
    console.log("Render EventsList")

    let eventsByType = {}
    let eventsByDistrictLabel = {}
    this.props.events.forEach(event => {
      const eventType = event.get('event_type')
      if (eventType === 1) {  // District Qualifier
        let label = `${event.getIn(['district', 'display_name'])} District Events`
        if (eventsByDistrictLabel[label]) {
          eventsByDistrictLabel[label].push(event)
        } else {
          eventsByDistrictLabel[label] = [event]
        }
      } else {
        if (eventsByType[eventType]) {
          eventsByType[eventType].push(event)
        } else {
          eventsByType[eventType] = [event]
        }
      }
    })

    // Combine everything in display order:
    // Regional, District Qualifier (alphabetical), District Div, District CMP, CMP DIV, CMP, FoC, Preseason, Offseason
    let sortedLabels = []
    for (let label in eventsByDistrictLabel) {
      sortedLabels.push(label)
    }
    sortedLabels.sort()

    let labelIdxs = new Set()
    this.listItems = []
    if (eventsByType[0]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Regional Events',
      })
      eventsByType[0].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByDistrictLabel) {
      sortedLabels.forEach(label => {
        labelIdxs.add(this.listItems.length)
        this.listItems.push({
          type: 'label',
          value: label,
        })
        eventsByDistrictLabel[label].forEach(event => {
          this.listItems.push({
            type: 'event',
            value: event,
          })
        })
      })
    }
    if (eventsByType[5]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'District Championship Divisions',
      })
      eventsByType[5].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[2]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'District Championships',
      })
      eventsByType[2].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[3]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Championship Divisions',
      })
      eventsByType[3].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[4]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Championship Finals',
      })
      eventsByType[4].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[6]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Festival of Champions',
      })
      eventsByType[6].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[100]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Preseason Events',
      })
      eventsByType[100].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[99]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Offseason Events',
      })
      eventsByType[99].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={this.listItems.length}
            rowHeight={({ index }) => labelIdxs.has(index) ? 24 : 64}
            rowRenderer={this.rowRenderer}
          />
        )}
      </AutoSizer>
    );
  }
}

export default withStyles(styles)(EventsList);
